<script setup lang="ts">
import { Colors } from '../../colors'
</script>

<template>
  <TresMesh name="body" :position="[2, -12, 0]">
    <TresBoxGeometry :args="[15, 15, 15]" />
    <TresMeshPhongMaterial :color="Colors.brown" flat-shading />
  </TresMesh>
</template>
