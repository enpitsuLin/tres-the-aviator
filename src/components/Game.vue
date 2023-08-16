<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { useGame } from '../composables/useGame'
import { useCoinsHolder } from '../composables/useCoinsHolder'
import { useEnemiesHolder } from '../composables/useEnemiesHolder'
import Light from './Light.vue'
import Pilot from './Pilot/index.vue'
import AirPlane from './AirPlane/index.vue'
import Sky from './Sky.vue'
import Sea from './Sea.vue'
import Coins from './Coins.vue'
import Enemies from './Enemies.vue'
import Particles from './Particles.vue'

const { onLoop } = useRenderLoop()
const { game } = useGame()
const { spawnCoins } = useCoinsHolder()
const { spawnEnemies } = useEnemiesHolder()

onLoop(({ delta: _delta }) => {
  const delta = _delta * 1000
  game.distance += game.speed * delta * game.ratioSpeedDistance
  // fieldDistance.innerHTML = Math.floor(game.distance)
  // const d = 502 * (1 - (game.distance % game.distanceForLevelUpdate) / game.distanceForLevelUpdate)
  // levelCircle.setAttribute('stroke-dashoffset', d)

  if (game.status === 'playing') {
    if (Math.floor(game.distance) % game.distanceForCoinsSpawn === 0 && Math.floor(game.distance) > game.coinLastSpawn) {
      game.coinLastSpawn = Math.floor(game.distance)
      spawnCoins()
    }

    if (Math.floor(game.distance) % game.distanceForSpeedUpdate === 0 && Math.floor(game.distance) > game.speedLastUpdate) {
      game.speedLastUpdate = Math.floor(game.distance)
      game.targetBaseSpeed += game.incrementSpeedByTime * delta
    }

    if (Math.floor(game.distance) % game.distanceForEnnemiesSpawn === 0 && Math.floor(game.distance) > game.ennemyLastSpawn) {
      game.ennemyLastSpawn = Math.floor(game.distance)
      spawnEnemies()
    }

    if (Math.floor(game.distance) % game.distanceForLevelUpdate === 0 && Math.floor(game.distance) > game.levelLastUpdate) {
      game.levelLastUpdate = Math.floor(game.distance)
      game.level++
      // fieldLevel.innerHTML = Math.floor(game.level)

      game.targetBaseSpeed = game.initSpeed + game.incrementSpeedByLevel * game.level
    }
  }

  game.baseSpeed += (game.targetBaseSpeed - game.baseSpeed) * delta * 0.02
  game.speed = game.baseSpeed * game.planeSpeed
})
</script>

<template>
  <Light />
  <Sky />
  <Sea />
  <Coins />
  <Enemies />
  <Particles />
  <AirPlane>
    <Pilot :position="[-10, 27, 0]" />
  </AirPlane>
</template>
