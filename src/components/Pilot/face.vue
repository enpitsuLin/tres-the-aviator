<script setup lang="ts">
import { Colors } from '../../colors'
</script>

<template>
  <TresMesh name="face">
    <TresBoxGeometry :args="[10, 10, 10]" />
    <TresMeshLambertMaterial :color="Colors.pink" />
  </TresMesh>
</template>
