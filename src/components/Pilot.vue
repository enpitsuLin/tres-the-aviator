<script setup lang="ts">
import * as THREE from 'three'

const Colors = {
  red: 0xF25346,
  white: 0xD8D0D1,
  brown: 0x59332E,
  brownDark: 0x23190F,
  pink: 0xF5986E,
  yellow: 0xF4CE93,
  blue: 0x68C3C0,

}
const hairsPositions = Array.from({ length: 12 }, (_, i) => {
  const col = i % 3
  const row = Math.floor(i / 3)
  return [-4 + row * 4, 0, -4 + col * 4] as [number, number, number]
})
</script>

<template>
  <TresObject3D name="pilot">
    <TresMesh name="body" :position="[2, -12, 0]">
      <TresBoxGeometry :args="[15, 15, 15]" />
      <TresMeshPhongMaterial :color="Colors.brown" flat-shading />
    </TresMesh>
    <TresMesh name="face">
      <TresBoxGeometry :args="[10, 10, 10]" />
      <TresMeshLambertMaterial :color="Colors.pink" />
    </TresMesh>

    <TresObject3D name="hairs">
      <TresMesh
        v-for="(pos, i) in hairsPositions"
        :key="`name${i}`"
        :name="`name${i}`"
        :position="pos"
        :matrix="new THREE.Matrix4().makeTranslation(0, 2, 0)"
      >
        <TresBoxGeometry :args="[4, 4, 4]" />
        <TresMeshLambertMaterial :color="Colors.brown" />
      </TresMesh>
    </TresObject3D>
  </TresObject3D>
</template>
