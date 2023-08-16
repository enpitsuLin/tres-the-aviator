<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { useGame } from '../composables/useGame'
import { useObjectsManager } from '../composables/useObjectManager'
import { Coin, useCoinsHolder } from '../composables/useCoinsHolder'

const props = withDefaults(defineProps<{ count?: number }>(), {
  count: 20,
})

const { game } = useGame()
const { airplane } = useObjectsManager()

const { mesh, coinsPool, coinsInUse } = useCoinsHolder()
coinsPool.value = Array.from({ length: props.count }, _ => new Coin())

function rotateCoins(deltaTime: number) {
  for (let i = 0; i < coinsInUse.value.length; i++) {
    const coin = coinsInUse.value[i]
    coin.angle += game.speed * deltaTime * game.coinsSpeed
    if (coin.angle > Math.PI * 2)
      coin.angle -= Math.PI * 2
    coin.mesh.position.y = -game.seaRadius + Math.sin(coin.angle) * coin.distance
    coin.mesh.position.x = Math.cos(coin.angle) * coin.distance
    coin.mesh.rotation.z += Math.random() * 0.1
    coin.mesh.rotation.y += Math.random() * 0.1

    const diffPos = airplane.value?.position.clone().sub(coin.mesh.position.clone())
    const d = diffPos?.length()
    if (d && d < game.coinDistanceTolerance) {
      coinsPool.value.unshift(coinsInUse.value.splice(i, 1)[0])
      mesh.value?.remove(coin.mesh)
      // particlesHolder.spawnParticles(coin.mesh.position.clone(), 5, 0x009999, 0.8)
      // addEnergy()
      i--
    }
    else if (coin.angle > Math.PI) {
      coinsPool.value.unshift(coinsInUse.value.splice(i, 1)[0])
      mesh.value?.remove(coin.mesh)
      i--
    }
  }
}

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  rotateCoins(delta * 1000)
})
</script>

<template>
  <TresObject3D ref="mesh" />
</template>
