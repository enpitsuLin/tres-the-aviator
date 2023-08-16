<script setup lang="ts">
import * as THREE from 'three'
import { shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { Colors } from '../../colors'
import { useGame } from '../../composables/useGame'

const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1)
const geomPropellerVertices = geomPropeller.getAttribute('position') as THREE.BufferAttribute

geomPropellerVertices.setY(4, geomPropellerVertices.getY(4) - 5)
geomPropellerVertices.setZ(4, geomPropellerVertices.getZ(4) + 5)

geomPropellerVertices.setY(5, geomPropellerVertices.getY(5) - 5)
geomPropellerVertices.setZ(5, geomPropellerVertices.getZ(5) - 5)

geomPropellerVertices.setY(6, geomPropellerVertices.getY(6) + 5)
geomPropellerVertices.setZ(6, geomPropellerVertices.getZ(6) + 5)

geomPropellerVertices.setY(7, geomPropellerVertices.getY(7) + 5)
geomPropellerVertices.setZ(7, geomPropellerVertices.getZ(7) - 5)

geomPropellerVertices.needsUpdate = true

const propeller = shallowRef<THREE.Mesh>()

const { game } = useGame()

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  const deltaTime = delta * 1000
  if (propeller.value)
    propeller.value.rotation.x += 0.2 + game.planeSpeed * deltaTime * 0.005
})
</script>

<template>
  <TresMesh
    ref="propeller"
    name="propeller"
    cast-shadow
    receive-shadow
    :geometry="geomPropeller"
    :position="[60, 0, 0]"
  >
    <TresMeshPhongMaterial :color="Colors.brown" flat-shading />
    <TresMesh
      name="blade1"
      cast-shadow
      receive-shadow
      :position="[8, 0, 0]"
    >
      <TresBoxGeometry :args="[1, 80, 6, 1, 1]" />
      <TresMeshPhongMaterial :color="Colors.brownDark" flat-shading />
    </TresMesh>
    <TresMesh
      name="blade1"
      cast-shadow
      receive-shadow
      :position="[8, 0, 0]"
      :rotation-x="Math.PI / 2"
    >
      <TresBoxGeometry :args="[1, 80, 6, 1, 1]" />
      <TresMeshPhongMaterial :color="Colors.brownDark" flat-shading />
    </TresMesh>
  </TresMesh>
</template>
