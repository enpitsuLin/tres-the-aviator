<script setup lang="ts">
import { Colors } from '../../colors'
</script>

<template>
  <TresMesh :position="[0, 0, -6]" name="ear-L">
    <TresMeshLambertMaterial :color="Colors.pink" />
    <TresBoxGeometry :args="[2, 3, 3]" />
  </TresMesh>

  <TresMesh :position="[0, 0, 6]" name="ear-R">
    <TresMeshLambertMaterial :color="Colors.pink" />
    <TresBoxGeometry :args="[2, 3, 3]" />
  </TresMesh>
</template>
