<script setup lang="ts">

</script>

<template>
  <TresHemisphereLight :args="[0xAAAAAA, 0x000000, 0.9]" />
  <TresAmbientLight :color="0xDC8874" :intensity=".5" />
  <TresDirectionalLight :color="0xFFFFFF" :intensity=".9" />
  <TresCameraHelper cast-shadow :position="[150, 350, 350]" />
</template>
