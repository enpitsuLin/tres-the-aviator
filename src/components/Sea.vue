<script setup lang="ts">
import * as THREE from 'three'
import { ref } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { useGame } from '../composables/useGame'
import { Colors } from '../colors'

const { game } = useGame()
const waves = ref<Record<'x' | 'y' | 'z' | 'ang' | 'amp' | 'speed', number>[]>([])

const geom = new THREE.CylinderGeometry(game.seaRadius, game.seaRadius, game.seaLength, 40, 10, true)

const vertices = geom.getAttribute('position') as THREE.BufferAttribute
const l = vertices.count
geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2))
vertices.needsUpdate = true

for (let i = 0; i < l; i++) {
  const v = {
    x: vertices.getX(i),
    y: vertices.getY(i),
    z: vertices.getZ(i),
  }
  waves.value.push({
    y: v.y,
    x: v.x,
    z: v.z,
    ang: Math.random() * Math.PI * 2,
    amp: game.wavesMinAmp + Math.random() * (game.wavesMaxAmp - game.wavesMinAmp),
    speed: game.wavesMinSpeed + Math.random() * (game.wavesMaxSpeed - game.wavesMinSpeed),
  })
};

function moveWaves(delta: number) {
  for (let i = 0; i < l; i++) {
    const vprops = waves.value[i]
    vertices.setX(i, vprops.x + Math.cos(vprops.ang) * vprops.amp)
    vertices.setY(i, vprops.y + Math.sin(vprops.ang) * vprops.amp)

    vprops.ang += vprops.speed * delta
    vertices.needsUpdate = true
  }
}

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  moveWaves(delta)
})
</script>

<template>
  <TresMesh name="waves" :geometry="geom" receive-shadow :position-y="-game.seaRadius">
    <TresMeshPhongMaterial
      flat-shading
      transparent
      :side="THREE.DoubleSide"
      :color="Colors.blue"
      :opacity=".8"
    />
  </TresMesh>
</template>
