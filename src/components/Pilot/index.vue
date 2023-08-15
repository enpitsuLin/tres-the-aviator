<script setup lang="ts">
import type { TresVector3 } from '@tresjs/core'
import PilotBody from './body.vue'
import PilotFace from './face.vue'
import PilotHairs from './hairs.vue'
import PilotGlass from './glass.vue'
import PilotEar from './ear.vue'

defineProps<{ position?: TresVector3 }>()
</script>

<template>
  <TresObject3D name="pilot" :position="position">
    <PilotBody />
    <PilotFace />
    <PilotHairs />
    <PilotGlass />
    <PilotEar />
  </TresObject3D>
</template>
