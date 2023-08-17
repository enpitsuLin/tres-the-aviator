import { shallowRef } from 'vue'

const airplane = shallowRef<THREE.Object3D>()
const ambientLight = shallowRef<THREE.AmbientLight>()

export function useObjectsManager() {
  return { airplane, ambientLight }
}
