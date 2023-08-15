<script setup lang="ts">
import * as THREE from 'three'
import { shallowRef, watchPostEffect } from 'vue'
import { Colors } from '../../colors'

const vertices = new Float32Array([
  40, 25, 25,
  40, 25, -25,
  40, -25, 25,

  40, -25, -25,
  -40, 15, -5,
  -40, 15, 5,

  -40, 5, -5,
  -40, 5, 5,
  -40, 15, -5,

  40, 25, -25,
  -40, 15, 5,
  40, 25, 25,

  -40, 5, 5,
  40, -25, 25,
  -40, 5, -5,

  40, -25, -25,
  -40, 15, 5,
  40, 25, 25,

  -40, 5, 5,
  40, -25, 25,
  40, 25, -25,

  -40, 15, -5,
  40, -25, -25,
  -40, 5, -5,
])

const geomCabin = new THREE.BoxGeometry()
geomCabin.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

const engine = shallowRef<THREE.Mesh>()
watchPostEffect(() => {
  if (engine.value)
    engine.value.position.x = 50
})

const suspensionGeom = new THREE.BoxGeometry(4, 20, 4)
suspensionGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 10, 0))
</script>

<template>
  <TresMesh name="cabin" :geometry="geomCabin">
    <TresMeshPhongMaterial :color="Colors.red" flat-shading />
  </TresMesh>

  <TresMesh
    ref="engine"
    name="engine"
    cast-shadow
    receive-shadow
    :position="[50, 0, 0]"
  >
    <TresBoxGeometry :args="[20, 50, 50, 1, 1, 1]" />
    <TresMeshPhongMaterial :color="Colors.white" flat-shading />
  </TresMesh>

  <TresMesh
    name="tail-plane"
    cast-shadow
    receive-shadow
    :position="[-40, 20, 0]"
  >
    <TresBoxGeometry :args="[15, 20, 5, 1, 1, 1]" />
    <TresMeshPhongMaterial :color="Colors.red" flat-shading />
  </TresMesh>

  <TresMesh
    name="wings"
    cast-shadow
    receive-shadow
    :position="[0, 15, 0]"
  >
    <TresBoxGeometry :args="[30, 5, 120, 1, 1, 1]" />
    <TresMeshPhongMaterial :color="Colors.red" flat-shading />
  </TresMesh>

  <TresMesh
    name="wings-shield"
    cast-shadow
    receive-shadow
    :position="[5, 27, 0]"
  >
    <TresBoxGeometry :args="[3, 15, 20, 1, 1, 1]" />
    <TresMeshPhongMaterial
      :color="Colors.white"
      :opacity=".3"
      flat-shading
      transparent
    />
  </TresMesh>

  <TresMesh
    name="suspension"
    :position="[-35, -5, 0]"
    :rotate-z="-0.3"
    :geometry="suspensionGeom"
  >
    <TresMeshPhongMaterial :color="Colors.red" flat-shading />
  </TresMesh>
</template>
