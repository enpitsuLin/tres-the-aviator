<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import Game from './components/Game.vue'
import { useGame } from './composables/useGame'

const { game } = useGame()
</script>

<template>
  <TresCanvas clear-color="gray" window-size shadow>
    <OrbitControls />
    <TresPerspectiveCamera
      :position="[0, 200, game.planeDefaultHeight]"
      :look-at="[0, 0, 0]"
    />
    <!-- <TresFog :args="[0xF7D9AA, 100, 950]" /> -->
    <Game />
  </TresCanvas>
</template>

<style scoped>
</style>
