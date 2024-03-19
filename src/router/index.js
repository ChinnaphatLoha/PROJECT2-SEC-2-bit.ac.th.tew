// getting started from https://router.vuejs.org/guide/

import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import TestComponents from '@/views/TestComponents.vue'

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
      path: '/test',
      name: 'test',
      component: TestComponents
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    }
  ]
})

export default router
