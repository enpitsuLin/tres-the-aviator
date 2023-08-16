<script setup lang="ts">
import { useParticlesHolder } from '../composables/useParticlesHolder'

const { mesh } = useParticlesHolder()
</script>

<template>
  <TresObject3D ref="mesh" />
</template>
