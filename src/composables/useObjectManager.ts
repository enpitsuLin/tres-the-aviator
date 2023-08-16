import { shallowRef } from 'vue'

const airplane = shallowRef<THREE.Object3D>()

export function useObjectsManager() {
  return { airplane }
}
