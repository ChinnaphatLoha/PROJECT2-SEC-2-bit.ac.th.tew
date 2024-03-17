import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import ProjectFormView from '@/views/ProjectFormView.vue'

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
        }
      ]
    }
  ]
})

export default router
