import { createApp } from 'vue'
import * as THREE from 'three'
import App from './App.vue'

window.THREE = THREE
createApp(App).mount('#app')
