<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { useGame } from '../composables/useGame'
import Light from './Light.vue'
import Pilot from './Pilot/index.vue'
import AirPlane from './AirPlane/index.vue'
import Sky from './Sky.vue'
import Sea from './Sea.vue'

const { onLoop } = useRenderLoop()
const { game } = useGame()

onLoop(({ delta }) => {
  game.distance += game.speed * delta * game.ratioSpeedDistance
  // fieldDistance.innerHTML = Math.floor(game.distance)
  // const d = 502 * (1 - (game.distance % game.distanceForLevelUpdate) / game.distanceForLevelUpdate)
  // levelCircle.setAttribute('stroke-dashoffset', d)

  game.baseSpeed += (game.targetBaseSpeed - game.baseSpeed) * delta * 0.02
  game.speed = game.baseSpeed * game.planeSpeed
})
</script>

<template>
  <Light />
  <Sky />
  <Sea />
  <AirPlane>
    <Pilot :position="[-10, 27, 0]" />
  </AirPlane>
</template>
