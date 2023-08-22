<script setup lang="ts">
import * as THREE from 'three'
import { ref, shallowRef } from 'vue'
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
    if (i % 41 === 0 || (i + 1) % 41 === 0)
      continue
    const vprops = waves.value[i]

    vertices.setX(i, vprops.x + Math.cos(vprops.ang) * vprops.amp)
    vertices.setY(i, vprops.y + Math.sin(vprops.ang) * vprops.amp)

    vprops.ang += vprops.speed * delta
    vertices.needsUpdate = true
  }
}

const mesh = shallowRef<THREE.Mesh>()

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  moveWaves(delta * 1000)
  if (mesh.value) {
    mesh.value.rotation.z += game.speed * delta * 1000//* game.seaRotationSpeed;

    if (mesh.value.rotation.z > 2 * Math.PI)
      mesh.value.rotation.z -= 2 * Math.PI
  }
})
</script>

<template>
  <TresMesh
    ref="mesh"
    name="waves"
    receive-shadow
    :geometry="geom"
    :position-y="-game.seaRadius"
  >
    <TresMeshPhongMaterial
      flat-shading
      transparent
      :color="Colors.blue"
      :opacity=".8"
    />
  </TresMesh>
</template>
