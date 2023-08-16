<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { Enemy, useEnemiesHolder } from '../composables/useEnemiesHolder'

const { mesh, enemiesPool, rotateEnemies } = useEnemiesHolder()
enemiesPool.value = Array.from({ length: 10 }, _ => new Enemy())

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  rotateEnemies(delta * 1000)
})
</script>

<template>
  <TresObject3D ref="mesh" />
</template>
