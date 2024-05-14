<script setup lang="ts">
import type * as THREE from 'three'
import { ref, shallowRef, watchPostEffect } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { useObjectsManager } from '../composables/useObjectManager'

const { ambientLight } = useObjectsManager()

const shadowLight = shallowRef<THREE.DirectionalLight>()
const isReady = ref(false)
watchPostEffect(() => {
  if (!shadowLight.value)
    return

  shadowLight.value.shadow.camera.left = -400
  shadowLight.value.shadow.camera.right = 400
  shadowLight.value.shadow.camera.top = 400
  shadowLight.value.shadow.camera.bottom = -400
  shadowLight.value.shadow.camera.near = 1
  shadowLight.value.shadow.camera.far = 1000
  shadowLight.value.shadow.mapSize.width = 4096
  shadowLight.value.shadow.mapSize.height = 4096

  isReady.value = true
})

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (ambientLight.value)
    ambientLight.value.intensity += (0.5 - ambientLight.value.intensity) * delta * 5 * Math.PI
})
const isDev = import.meta.env.DEV
</script>

<template>
  <TresHemisphereLight :args="[0xAAAAAA, 0x000000, 0.9]" />
  <TresAmbientLight ref="ambientLight" :color="0xDC8874" :intensity=".5 * Math.PI" />
  <TresDirectionalLight
    ref="shadowLight"
    cast-shadow
    :color="0xFFFFFF"
    :intensity=".9 * Math.PI"
    :position="[150, 350, 350]"
  />
  <TresCameraHelper
    v-if="shadowLight && isReady && isDev "
    :args="[shadowLight.shadow.camera]"
  />
</template>
