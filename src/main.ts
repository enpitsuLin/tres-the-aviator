import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import './styles/demo.css'
import './styles/game.css'

// https://github.com/YunYouJun/wc-github-corners
import 'wc-github-corners'

const app = createApp(App)
const head = createHead()

app.use(head)
app.mount('#app')
