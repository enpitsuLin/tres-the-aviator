import * as THREE from 'three'
import { shallowRef } from 'vue'
import { Colors } from '../colors'
import { useGame } from './useGame'
import { useObjectsManager } from './useObjectManager'
import { useParticlesHolder } from './useParticlesHolder'

export class Enemy {
  mesh: THREE.Mesh<THREE.TetrahedronGeometry, THREE.MeshPhongMaterial>
  angle = 0
  dist = 0
  distance = 0
  constructor() {
    const geom = new THREE.TetrahedronGeometry(8, 2)
    const mat = new THREE.MeshPhongMaterial({
      color: Colors.red,
      shininess: 0,
      specular: 0xFFFFFF,
      flatShading: true,
    })
    this.mesh = new THREE.Mesh(geom, mat)
    this.mesh.castShadow = true
  }
}

export const mesh = shallowRef<THREE.Object3D>()
export const enemiesInUse = shallowRef<Enemy[]>([])
export const enemiesPool = shallowRef<Enemy[]>([])

export function useEnemiesHolder() {
  const { spawnParticles } = useParticlesHolder()
  const { game, removeEnergy } = useGame()
  const { airplane, ambientLight } = useObjectsManager()

  function spawnEnemies() {
    const nEnemies = game.level

    for (let i = 0; i < nEnemies; i++) {
      let enemy: Enemy
      if (enemiesPool.value.length)
        enemy = enemiesPool.value.pop()!

      else
        enemy = new Enemy()

      enemy.angle = -(i * 0.1)
      enemy.distance = game.seaRadius + game.planeDefaultHeight + (-1 + Math.random() * 2) * (game.planeAmpHeight - 20)
      enemy.mesh.position.y = -game.seaRadius + Math.sin(enemy.angle) * enemy.distance
      enemy.mesh.position.x = Math.cos(enemy.angle) * enemy.distance

      mesh.value?.add(enemy.mesh)
      enemiesInUse.value.push(enemy)
    }
  }
  function rotateEnemies(deltaTime: number) {
    for (let i = 0; i < enemiesInUse.value.length; i++) {
      const enemy = enemiesInUse.value[i]
      enemy.angle += game.speed * deltaTime * game.ennemiesSpeed

      if (enemy.angle > Math.PI * 2)
        enemy.angle -= Math.PI * 2

      enemy.mesh.position.y = -game.seaRadius + Math.sin(enemy.angle) * enemy.distance
      enemy.mesh.position.x = Math.cos(enemy.angle) * enemy.distance
      enemy.mesh.rotation.z += Math.random() * 0.1
      enemy.mesh.rotation.y += Math.random() * 0.1

      const diffPos = airplane.value?.position.clone().sub(enemy.mesh.position.clone())
      const d = diffPos?.length()

      if (d && d < game.ennemyDistanceTolerance) {
        spawnParticles(enemy.mesh.position.clone(), 15, Colors.red, 3)

        enemiesPool.value.unshift(enemiesInUse.value.splice(i, 1)[0])
        mesh.value?.remove(enemy.mesh)
        game.planeCollisionSpeedX = 100 * diffPos!.x / d
        game.planeCollisionSpeedY = 100 * diffPos!.y / d
        if (ambientLight.value)
          ambientLight.value.intensity = 2 * Math.PI

        removeEnergy()
        i--
      }
      else if (enemy.angle > Math.PI) {
        enemiesPool.value.unshift(enemiesInUse.value.splice(i, 1)[0])
        mesh.value?.remove(enemy.mesh)
        i--
      }
    }
  }
  return {
    spawnEnemies,
    rotateEnemies,
    mesh,
    enemiesInUse,
    enemiesPool,
  }
}
