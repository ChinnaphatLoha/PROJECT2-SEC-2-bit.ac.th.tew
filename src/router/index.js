import { createRouter, createWebHistory } from 'vue-router'
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

export default router
