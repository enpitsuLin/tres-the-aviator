<script setup lang="ts">
import { Colors } from '../../colors'
</script>

<template>
  <TresMesh name="glass-R" :position="[6, 0, 3]">
    <TresBoxGeometry :args="[4, 5, 5]" />
    <TresMeshLambertMaterial :color="Colors.brown" />
  </TresMesh>
  <TresMesh name="glass-L" :position="[6, 0, -3]">
    <TresBoxGeometry :args="[4, 5, 5]" />
    <TresMeshLambertMaterial :color="Colors.brown" />
  </TresMesh>
  <TresMesh name="glass-A">
    <TresBoxGeometry :args="[11, 1, 11]" />
    <TresMeshLambertMaterial :color="Colors.brown" />
  </TresMesh>
</template>
