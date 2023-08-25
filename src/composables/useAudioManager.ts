import { useToggle } from '@vueuse/core'
import * as THREE from 'three'
import { shallowRef } from 'vue'

const loader = new THREE.AudioLoader()
const listener = new THREE.AudioListener()
const buffers = new Map<string, AudioBuffer>()

export function useAudioManager() {
  const [loaded, toggleLoaded] = useToggle(false)
  const loadPromise = shallowRef<Promise<void>[]>([])

  function load(soundId: string, path: string) {
    const promise = new Promise<void>((resolve, reject) => {
      loader.load(path,
        (audioBuffer) => {
          buffers.set(soundId, audioBuffer)
          resolve()
        },
        () => { },
        reject,
      )
    })
    loadPromise.value.push(promise)
  }

  function play(soundId: string, options: { loop?: boolean; volume?: number } = {}) {
    const buffer = buffers.get(soundId)
    if (!buffer)
      return

    const sound = new THREE.Audio(listener)
    sound.setBuffer(buffer)
    if (options.loop)
      sound.setLoop(true)

    if (options.volume)
      sound.setVolume(options.volume)

    sound.play()
  }

  async function loadAll() {
    await Promise.all(loadPromise.value)
    toggleLoaded(true)
  }

  return { load, play, loadAll, loaded }
}
