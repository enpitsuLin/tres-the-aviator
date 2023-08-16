<script setup lang="ts">
import * as THREE from 'three'
import { ref, shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { useGame } from '../composables/useGame'
import Cloud from './Cloud.vue'

const { game } = useGame()

const nClouds = 20
const stepAngle = Math.PI * 2 / nClouds
const cloudsProps = Array.from({ length: nClouds }, (_, i) => {
  const a = stepAngle * i
  const h = game.seaRadius + 150 + Math.random() * 200
  return {
    position: new THREE.Vector3(Math.cos(a) * h, Math.sin(a) * h, -300 - Math.random() * 500),
    rotationZ: a + Math.PI * 2,
    key: `${i}`,
  }
})
const sky = shallowRef<THREE.Object3D>()
const clouds = ref<InstanceType<typeof Cloud>[]>([])

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
  moveClouds(delta * 1000)
})

function moveClouds(deltaTime: number) {
  if (!clouds.value.length)
    return

  clouds.value.forEach((c) => {
    c.rotate()
  })

  if (sky.value)
    sky.value.rotation.z += game.speed * deltaTime
}
defineExpose({ moveClouds })
</script>

<template>
  <TresObject3D ref="sky" name="sky" :position-y="-game.seaRadius">
    <Cloud
      v-for="({ key, ...prop }) in cloudsProps"
      v-bind="prop"
      ref="clouds"
      :key="key"
    />
  </TresObject3D>
</template>
