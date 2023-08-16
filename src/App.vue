<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import Game from './components/Game.vue'
import { useGame } from './composables/useGame'

const { game } = useGame()
</script>

<template>
  <TresCanvas clear-color="gray" window-size shadow>
    <TresPerspectiveCamera
      :position="[0, 200, game.planeDefaultHeight]"
    />
    <TresFog :args="[0xF7D9AA, 100, 950]" />
    <Game />
  </TresCanvas>
</template>

<style scoped>
</style>
