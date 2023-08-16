<script setup lang="ts">
import { watchOnce } from '@vueuse/core'
import * as THREE from 'three'
import { ref } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { Colors } from '../../colors'
import { useGame } from '../../composables/useGame'

const { game } = useGame()

const hairGeom = new THREE.BoxGeometry(4, 4, 4)
const hairMat = new THREE.MeshLambertMaterial({ color: Colors.brown })
const hair = new THREE.Mesh(hairGeom, hairMat)
hair.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 2, 0))

const hairArray = Array.from({ length: 12 }, (_, i) => {
  const h = hair.clone()
  const col = i % 3
  const row = Math.floor(i / 3)
  const startPosZ = -4
  const startPosX = -4
  h.position.set(startPosX + row * 4, 0, startPosZ + col * 4)
  h.geometry.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1))
  return h
})

const hairsTop = ref<THREE.Object3D>()

watchOnce(hairsTop, (hairsTop) => {
  hairsTop?.add(...hairArray)
})

const hairSideGeom = new THREE.BoxGeometry(12, 4, 2)
hairSideGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(-6, 0, 0))

const angleHairs = ref(0)

function updateHairs(delta: number) {
  const hairs = hairsTop.value?.children ?? []
  const l = hairs?.length

  for (let i = 0; i < l; i++) {
    const h = hairs[i]
    h.scale.y = 0.75 + Math.cos(angleHairs.value + i / 3) * 0.25
  }

  angleHairs.value += game.speed * (delta) * 40
}

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
  updateHairs(delta * 1000)
})
</script>

<template>
  <TresObject3D name="hairs" :position="[-5, 5, 0]">
    <TresObject3D ref="hairsTop" name="hair-top" />
    <TresMesh name="hair-side-R" :position="[8, -2, 6]" :geometry="hairSideGeom" :material="hairMat" />
    <TresMesh name="hair-side-L" :position="[8, -2, -6]" :geometry="hairSideGeom" :material="hairMat" />

    <TresMesh name="hair-back" :position="[-1, -4, 0]" :material="hairMat">
      <TresBoxGeometry :args="[2, 8, 10]" />
    </TresMesh>
  </TresObject3D>
</template>
