import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import LayoutComponent from '@/common/components/LayoutComponent.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('BaseLayout', LayoutComponent)

app.mount('#app')
