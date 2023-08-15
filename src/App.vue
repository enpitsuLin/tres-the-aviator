<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import Game from './components/Game.vue'
</script>

<template>
  <TresCanvas clear-color="gray" window-size>
    <OrbitControls />
    <TresPerspectiveCamera :position="[0, 200, 100]" :look-at="[0, 0, 0]" />
    <Game />
  </TresCanvas>
</template>

<style scoped>
</style>
