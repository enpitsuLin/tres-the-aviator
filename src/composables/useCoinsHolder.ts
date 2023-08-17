import * as THREE from 'three'
import { shallowRef } from 'vue'
import { useGame } from './useGame'
import { useParticlesHolder } from './useParticlesHolder'
import { useObjectsManager } from './useObjectManager'

export class Coin {
  mesh: THREE.Mesh
  angle = 0
  dist = 0
  distance = 0
  constructor() {
    const geom = new THREE.TetrahedronGeometry(5, 0)
    const mat = new THREE.MeshPhongMaterial({
      color: 0x009999,
      shininess: 0,
      specular: 0xFFFFFF,
      flatShading: true,
    })
    this.mesh = new THREE.Mesh(geom, mat)
    this.mesh.castShadow = true
  }
}

export const mesh = shallowRef<THREE.Object3D>()
export const coinsPool = shallowRef()
export const coinsInUse = shallowRef<Coin[]>([])

export function useCoinsHolder() {
  const { game, addEnergy } = useGame()
  const { airplane } = useObjectsManager()
  const { spawnParticles } = useParticlesHolder()

  function spawnCoins() {
    const nCoins = 1 + Math.floor(Math.random() * 10)
    const d = game.seaRadius + game.planeDefaultHeight + (-1 + Math.random() * 2) * (game.planeAmpHeight - 20)
    const amplitude = 10 + Math.round(Math.random() * 10)
    for (let i = 0; i < nCoins; i++) {
      let coin: Coin
      if (coinsPool.value.length)
        coin = coinsPool.value.pop()!

      else
        coin = new Coin()

      mesh.value?.add(coin.mesh)
      coinsInUse.value.push(coin)
      coin.angle = -(i * 0.02)
      coin.distance = d + Math.cos(i * 0.5) * amplitude
      coin.mesh.position.y = -game.seaRadius + Math.sin(coin.angle) * coin.distance
      coin.mesh.position.x = Math.cos(coin.angle) * coin.distance
    }
  }

  function rotateCoins(deltaTime: number) {
    for (let i = 0; i < coinsInUse.value.length; i++) {
      const coin = coinsInUse.value[i]
      coin.angle += game.speed * deltaTime * game.coinsSpeed
      if (coin.angle > Math.PI * 2)
        coin.angle -= Math.PI * 2
      coin.mesh.position.y = -game.seaRadius + Math.sin(coin.angle) * coin.distance
      coin.mesh.position.x = Math.cos(coin.angle) * coin.distance
      coin.mesh.rotation.z += Math.random() * 0.1
      coin.mesh.rotation.y += Math.random() * 0.1

      const diffPos = airplane.value?.position.clone().sub(coin.mesh.position.clone())
      const d = diffPos?.length()
      if (d && d < game.coinDistanceTolerance) {
        coinsPool.value.unshift(coinsInUse.value.splice(i, 1)[0])
        mesh.value?.remove(coin.mesh)

        spawnParticles(coin.mesh.position.clone(), 5, 0x009999, 0.8)
        addEnergy()
        i--
      }
      else if (coin.angle > Math.PI) {
        coinsPool.value.unshift(coinsInUse.value.splice(i, 1)[0])
        mesh.value?.remove(coin.mesh)
        i--
      }
    }
  }
  return { spawnCoins, mesh, coinsPool, coinsInUse, rotateCoins }
}
