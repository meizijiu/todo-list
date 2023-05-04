import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createAnalytics } from '@vercel/analytics'
import App from './App.vue'

const app = createApp(App)

const analytics = createAnalytics('prj_hT12ELDAXFatrkIBCMT4rMd8a2nE')

analytics.page()

app.use(createPinia()).use(ElementPlus).mount('#app')
