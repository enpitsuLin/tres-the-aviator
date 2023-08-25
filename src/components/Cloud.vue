<script setup lang="ts">
import * as THREE from 'three'
import { shallowRef } from 'vue'
import type { TresVector3 } from '@tresjs/core'
import { Colors } from '../colors'

defineProps<{ position: TresVector3;rotationZ: number }>()

const geom = new THREE.BoxGeometry(20, 20, 20)
const mat = new THREE.MeshPhongMaterial({
  color: Colors.white,

})
const nBlocs = 3 + Math.floor(Math.random() * 3)

const _position = new THREE.Vector3().normalize()

const blocks = Array.from({ length: nBlocs }, (_, i) => {
  const position = _position.clone()
  position.x = i * 15
  position.y = Math.random() * 10
  position.z = Math.random() * 10
  const rotationY = Math.random() * Math.PI * 2
  const rotationZ = Math.random() * Math.PI * 2
  const s = 0.1 + Math.random() * 0.9
  return { position, rotationY, rotationZ, scale: s, id: `m-${i}` }
})

const could = shallowRef<THREE.Object3D>()

function rotate() {
  if (!could.value)
    return
  could.value?.children.forEach((m, i) => {
    m.rotation.z += Math.random() * 0.005 * (i + 1)
    m.rotation.y += Math.random() * 0.002 * (i + 1)
  })
}

defineExpose({ rotate })
</script>

<template>
  <TresObject3D ref="could" :rotate-z="rotationZ" :position="position" name="cloud">
    <TresMesh
      v-for="item in blocks"
      :key="item.id"
      cast-shadow
      receive-shadow
      :material="mat"
      :geometry="geom"
      :scale="[item.scale, item.scale, item.scale]"
      :position="item.position"
      :rotation-y="item.rotationY"
      :rotation-z="item.rotationZ"
    />
  </TresObject3D>
</template>
