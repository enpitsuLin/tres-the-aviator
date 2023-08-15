<script setup lang="ts">
import Light from './Light.vue'
import Pilot from './Pilot/index.vue'
import AirPlane from './AirPlane/index.vue'

// todo
</script>

<template>
  <Light />

  <AirPlane>
    <Pilot :position="[-10, 27, 0]" />
  </AirPlane>
</template>
