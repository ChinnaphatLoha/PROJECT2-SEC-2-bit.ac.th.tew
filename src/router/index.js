// getting started from https://router.vuejs.org/guide/

import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import RetroFeedBackView from '@/views/RetroFeedBackView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/retro_feeback',
      name: 'retro_feeback',
      component: RetroFeedBackView
    }
  ]
})

export default router
