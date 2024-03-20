import { createRouter, createWebHistory } from 'vue-router'
import { getCookie } from '@/backend/utils/cookie-session-utils'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import ProjectFormView from '@/views/ProjectFormView.vue'
import TestComponent from '@/views/TestComponents.vue'
import RetroFeedBackView from '@/views/RetroFeedBackView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginView
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterView
        }
      ]
    },
    {
      path: '/',
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'project/form',
          name: 'project-create',
          component: ProjectFormView
        },
        {
          path: '/test',
          name: 'test',
          component: TestComponent
        }
      ]
    },
    {
      path: '/meeting',
      name: 'meeting-feedback',
      component: RetroFeedBackView

    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth) && !getCookie('bit_tkn')) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
