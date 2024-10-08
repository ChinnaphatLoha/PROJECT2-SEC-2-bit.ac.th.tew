import { createRouter, createWebHistory } from 'vue-router'
import { getCookie } from '@/backend/utils/cookie-session-utils'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import ProjectFormView from '@/views/ProjectFormView.vue'
import MeetingFormView from '@/views/MeetingFormView.vue'
import ProjectView from '@/views/ProjectView.vue'
import RetroFeedBackView from '@/views/RetroFeedBackView.vue'
import NotFound from '@/common/components/NotFound.vue'
import { useUserStore } from '@/stores/store'

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
          path: 'project/new',
          name: 'project-create',
          component: ProjectFormView
        },
        {
          path: 'project/:pid/edit',
          name: 'project-edit',
          component: ProjectFormView
        },
        {
          path: 'project/:pid/meeting/new',
          name: 'meeting-create',
          component: MeetingFormView
        },
        {
          path: 'project/:pid/meeting/:mid/edit',
          name: 'meeting-edit',
          component: MeetingFormView
        },
        {
          path: 'project/:pid',
          name: 'project-view',
          component: ProjectView
        },
        {
          path: 'project/:pid/meeting/:mid',
          name: 'meeting-feedback',
          component: RetroFeedBackView
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: NotFound
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = getCookie('bit_tkn')
  const isLoginPage = to.name === 'login' || to.name === 'register'
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    if (from.name === 'register') {
      next({ name: 'register' })
    } else {
      next({ name: 'login' })
    }
  } else if (isLoginPage && isAuthenticated) {
    useUserStore().fetchDataFromLocal()
    next({ name: 'home' })
  } else if (!useUserStore().currentUser && isAuthenticated) {
    useUserStore().fetchDataFromLocal()
    next()
  } else {
    next()
  }
})

export default router
