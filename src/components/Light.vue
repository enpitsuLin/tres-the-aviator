<script setup lang="ts">
import type * as THREE from 'three'
import { ref, shallowRef, watchPostEffect } from 'vue'

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
</script>

<template>
  <TresHemisphereLight :args="[0xAAAAAA, 0x000000, 0.9]" />
  <TresAmbientLight :color="0xDC8874" :intensity=".5" />
  <TresDirectionalLight
    ref="shadowLight"
    cast-shadow
    :color="0xFFFFFF"
    :intensity=".9"
  />
  <TresCameraHelper
    v-if="shadowLight && isReady"
    :args="[shadowLight.shadow.camera]"
    :position="[150, 350, 350]"
  />
</template>
