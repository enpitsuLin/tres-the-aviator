<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { useGame } from '../composables/useGame'
import { useCoinsHolder } from '../composables/useCoinsHolder'
import { useEnemiesHolder } from '../composables/useEnemiesHolder'
import { useObjectsManager } from '../composables/useObjectManager'
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
const { airplane } = useObjectsManager()

onLoop(({ delta: _delta }) => {
  const deltaTime = _delta * 1000

  if (game.status === 'playing') {
    if (Math.floor(game.distance) % game.distanceForCoinsSpawn === 0 && Math.floor(game.distance) > game.coinLastSpawn) {
      game.coinLastSpawn = Math.floor(game.distance)
      spawnCoins()
    }

    if (Math.floor(game.distance) % game.distanceForSpeedUpdate === 0 && Math.floor(game.distance) > game.speedLastUpdate) {
      game.speedLastUpdate = Math.floor(game.distance)
      game.targetBaseSpeed += game.incrementSpeedByTime * deltaTime
    }

    if (Math.floor(game.distance) % game.distanceForEnnemiesSpawn === 0 && Math.floor(game.distance) > game.ennemyLastSpawn) {
      game.ennemyLastSpawn = Math.floor(game.distance)
      spawnEnemies()
    }

    if (Math.floor(game.distance) % game.distanceForLevelUpdate === 0 && Math.floor(game.distance) > game.levelLastUpdate) {
      game.levelLastUpdate = Math.floor(game.distance)
      game.level++

      game.targetBaseSpeed = game.initSpeed + game.incrementSpeedByLevel * game.level
    }

    // updateDistance
    game.distance += game.speed * deltaTime * game.ratioSpeedDistance

    // updateEnergy
    game.energy -= game.speed * deltaTime * game.ratioSpeedEnergy
    game.energy = Math.max(0, game.energy)
    if (game.energy < 1)
      game.status = 'gameover'

    game.baseSpeed += (game.targetBaseSpeed - game.baseSpeed) * deltaTime * 0.02
    game.speed = game.baseSpeed * game.planeSpeed
  }
  else if (game.status === 'gameover') {
    if (!airplane.value)
      return
    game.speed *= 0.99
    airplane.value.rotation.z += (-Math.PI / 2 - airplane.value.rotation.z) * 0.0002 * deltaTime
    airplane.value.rotation.x += 0.0003 * deltaTime
    game.planeFallSpeed *= 1.05
    airplane.value.position.y -= game.planeFallSpeed * deltaTime

    if (airplane.value.position.y < -200)
      game.status = 'waitingReplay'
  }
  else if (game.status === 'waitingReplay') {
    // Do nothing
  }
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
