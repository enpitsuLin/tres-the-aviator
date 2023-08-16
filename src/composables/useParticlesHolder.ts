import { Power2, TweenMax } from 'gsap'
import * as THREE from 'three'
import { shallowRef } from 'vue'

export const particlesPool = shallowRef<Particle[]>([])

export const mesh = shallowRef<THREE.Object3D>()

export class Particle {
  mesh: THREE.Mesh<THREE.TetrahedronGeometry, THREE.MeshPhongMaterial>
  constructor() {
    const geom = new THREE.TetrahedronGeometry(3, 0)
    const mat = new THREE.MeshPhongMaterial({
      color: 0x009999,
      shininess: 0,
      specular: 0xFFFFFF,
      flatShading: true,
    })
    this.mesh = new THREE.Mesh(geom, mat)
  }

  explode(pos: THREE.Vector3, color: THREE.ColorRepresentation, scale: number) {
    const _p = this.mesh.parent
    this.mesh.material.color = new THREE.Color(color)
    this.mesh.material.needsUpdate = true
    this.mesh.scale.set(scale, scale, scale)
    const targetX = pos.x + (-1 + Math.random() * 2) * 50
    const targetY = pos.y + (-1 + Math.random() * 2) * 50
    const speed = 0.6 + Math.random() * 0.2
    TweenMax.to(this.mesh.rotation, speed, { x: Math.random() * 12, y: Math.random() * 12 })
    TweenMax.to(this.mesh.scale, speed, { x: 0.1, y: 0.1, z: 0.1 })
    TweenMax.to(this.mesh.position, speed, {
      x: targetX,
      y: targetY,
      delay: Math.random() * 0.1,
      ease: Power2.easeOut,
      onComplete: () => {
        if (_p)
          _p.remove(this.mesh)
        this.mesh.scale.set(1, 1, 1)
        particlesPool.value.unshift(this)
      },
    })
  }
}
export function useParticlesHolder() {
  function spawnParticles(
    pos: THREE.Vector3,
    density: number,
    color: THREE.ColorRepresentation,
    scale: number,
  ) {
    const nPArticles = density
    for (let i = 0; i < nPArticles; i++) {
      let particle: Particle
      if (particlesPool.value.length)
        particle = particlesPool.value.pop()!

      else
        particle = new Particle()

      mesh.value?.add(particle.mesh)
      particle.mesh.visible = true
      particle.mesh.position.y = pos.y
      particle.mesh.position.x = pos.x
      particle.explode(pos, color, scale)
    }
  }
  return { particlesPool, mesh, spawnParticles }
}
