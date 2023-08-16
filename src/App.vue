<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import Game from './components/Game.vue'
import { useGame } from './composables/useGame'

const { game } = useGame()
</script>

<template>
  <TresCanvas
    alpha
    antialias
    window-size
    use-legacy-lights
    style=" background: linear-gradient(#e4e0ba, #f7d9aa);"
  >
    <TresPerspectiveCamera
      :position="[0, 200, game.planeDefaultHeight]"
    />
    <TresFog :args="[0xF7D9AA, 100, 950]" />
    <Game />
  </TresCanvas>
</template>

<style scoped>
</style>
