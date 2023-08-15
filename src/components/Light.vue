<script setup lang="ts">
import type * as THREE from 'three'
import { ref } from 'vue'

const shadowLight = ref<THREE.DirectionalLight>()
</script>

<template>
  <TresHemisphereLight :args="[0xAAAAAA, 0x000000, 0.9]" />
  <TresAmbientLight :color="0xDC8874" :intensity=".5" />
  <TresDirectionalLight ref="shadowLight" :color="0xFFFFFF" :intensity=".9" />
  <TresCameraHelper v-if="shadowLight" cast-shadow :args="[shadowLight.shadow.camera]" :position="[150, 350, 350]" />
</template>
