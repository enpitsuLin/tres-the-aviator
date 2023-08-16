<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { Coin, useCoinsHolder } from '../composables/useCoinsHolder'

const props = withDefaults(defineProps<{ count?: number }>(), {
  count: 20,
})

const { mesh, coinsPool, rotateCoins } = useCoinsHolder()
coinsPool.value = Array.from({ length: props.count }, _ => new Coin())

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  rotateCoins(delta * 1000)
})
</script>

<template>
  <TresObject3D ref="mesh" />
</template>
