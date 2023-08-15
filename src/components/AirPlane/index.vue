<script setup lang="ts">
import AirPlaneBody from './MainBody.vue'
import PlaneWheel from './Wheel.vue'
import Propeller from './Propeller.vue'
</script>

<template>
  <TresObject3D name="airplane">
    <AirPlaneBody />

    <PlaneWheel />
    <Propeller />
    <slot />
  </TresObject3D>
</template>
