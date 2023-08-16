import { shallowRef } from 'vue'

export function useObjectsManager() {
  const airplane = shallowRef<THREE.Object3D>()

  return { airplane }
}
