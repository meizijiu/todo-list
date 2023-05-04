import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { inject } from '@vercel/analytics'
import App from './App.vue'

const app = createApp(App)

inject();

app.use(createPinia()).use(ElementPlus).mount('#app')
