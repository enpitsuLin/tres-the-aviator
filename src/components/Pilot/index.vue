<script setup lang="ts">
import PilotBody from './body.vue'
import PilotFace from './face.vue'
import PilotHairs from './hairs.vue'
import PilotGlass from './glass.vue'
import PilotEar from './ear.vue'
</script>

<template>
  <TresObject3D name="pilot">
    <PilotBody />
    <PilotFace />
    <PilotHairs />
    <PilotGlass />
    <PilotEar />
  </TresObject3D>
</template>
