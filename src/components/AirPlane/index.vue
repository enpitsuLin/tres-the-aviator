<script setup lang="ts">
import type * as THREE from 'three'
import { useMouse, useWindowSize } from '@vueuse/core'
import { useRenderLoop, useTres } from '@tresjs/core'
import { computed, toValue } from 'vue'
import { useGame } from '../../composables/useGame'
import { normalize } from '../../utils'
import { useObjectsManager } from '../../composables/useObjectManager'
import AirPlaneBody from './MainBody.vue'
import PlaneWheel from './Wheel.vue'
import Propeller from './Propeller.vue'

const { game } = useGame()
const { x, y } = useMouse()
const { width, height } = useWindowSize()

const { camera: _camera } = useTres()
const { onLoop } = useRenderLoop()

const { airplane } = useObjectsManager()

const computedPos = computed(() => ({
  x: -1 + (x.value / width.value) * 2,
  y: 1 - (y.value / height.value) * 2,
}))

onLoop(({ delta }) => {
  const deltaTime = delta * 1000
  const mousePos = toValue(computedPos)
  if (game.status === 'playing') {
    game.planeSpeed = normalize(mousePos.x, -0.5, 0.5, game.planeMinSpeed, game.planeMaxSpeed)

    let targetY = normalize(mousePos.y, -0.75, 0.75, game.planeDefaultHeight - game.planeAmpHeight, game.planeDefaultHeight + game.planeAmpHeight)
    let targetX = normalize(mousePos.x, -1, 1, -game.planeAmpWidth * 0.7, -game.planeAmpWidth)
    game.planeCollisionDisplacementX += game.planeCollisionSpeedX
    targetX += game.planeCollisionDisplacementX

    game.planeCollisionDisplacementY += game.planeCollisionSpeedY
    targetY += game.planeCollisionDisplacementY

    if (airplane.value) {
      airplane.value.position.y += (targetY - airplane.value.position.y) * deltaTime * game.planeMoveSensivity
      airplane.value.position.x += (targetX - airplane.value.position.x) * deltaTime * game.planeMoveSensivity

      airplane.value.rotation.z = (targetY - airplane.value.position.y) * deltaTime * game.planeRotXSensivity
      airplane.value.rotation.x = (airplane.value.position.y - targetY) * deltaTime * game.planeRotZSensivity
    }
    const camera = _camera.value as THREE.PerspectiveCamera

    camera.fov = normalize(mousePos.x, -1, 1, 40, 80)
    camera.updateProjectionMatrix()
    camera.position.y += ((airplane.value?.position.y ?? game.planeDefaultHeight) - camera.position.y) * deltaTime * game.cameraSensivity

    game.planeCollisionSpeedX += (0 - game.planeCollisionSpeedX) * deltaTime * 0.03
    game.planeCollisionDisplacementX += (0 - game.planeCollisionDisplacementX) * deltaTime * 0.01
    game.planeCollisionSpeedY += (0 - game.planeCollisionSpeedY) * deltaTime * 0.03
    game.planeCollisionDisplacementY += (0 - game.planeCollisionDisplacementY) * deltaTime * 0.01
  }
})
</script>

<template>
  <TresObject3D
    ref="airplane"
    name="airplane"
    :scale="[0.25, 0.25, 0.25]"
    :position-y="game.planeDefaultHeight"
  >
    <AirPlaneBody />

    <PlaneWheel />
    <Propeller />
    <slot />
  </TresObject3D>
</template>
