<script setup lang="ts">
import { Colors } from '../../colors'
</script>

<template>
  <TresMesh name="wheelProtecR" :position="[25, -20, 25]">
    <TresBoxGeometry :args="[30, 15, 10, 1, 1, 1]" />
    <TresMeshPhongMaterial :color="Colors.red" flat-shading />
  </TresMesh>
  <TresMesh name="wheelProtecL" :position="[25, -20, -25]">
    <TresBoxGeometry :args="[30, 15, 10, 1, 1, 1]" />
    <TresMeshPhongMaterial :color="Colors.red" flat-shading />
  </TresMesh>
  <TresMesh name="wheelTireR" :position="[25, -28, 25]">
    <TresBoxGeometry :args="[24, 24, 4]" />
    <TresMeshPhongMaterial :color="Colors.brownDark" flat-shading />
    <TresMesh name="wheelAxis">
      <TresBoxGeometry :args="[10, 10, 6]" />
      <TresMeshPhongMaterial :color="Colors.brown" flat-shading />
    </TresMesh>
  </TresMesh>
  <TresMesh name="wheelTireL" :position="[25, -28, -25]">
    <TresBoxGeometry :args="[24, 24, 4]" />
    <TresMeshPhongMaterial :color="Colors.brownDark" flat-shading />
    <TresMesh name="wheelAxis">
      <TresBoxGeometry :args="[10, 10, 6]" />
      <TresMeshPhongMaterial :color="Colors.brown" flat-shading />
    </TresMesh>
  </TresMesh>
  <TresMesh name="wheelTireB" :position="[-35, -5, 0]" :scale="[0.5, 0.5, 0.5]">
    <TresBoxGeometry :args="[24, 24, 4]" />
    <TresMeshPhongMaterial :color="Colors.brownDark" flat-shading />
    <TresMesh name="wheelAxis">
      <TresBoxGeometry :args="[10, 10, 6]" />
      <TresMeshPhongMaterial :color="Colors.brown" flat-shading />
    </TresMesh>
  </TresMesh>
</template>
