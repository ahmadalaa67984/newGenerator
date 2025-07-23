import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/signin'
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/views/SignupPage.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('@/views/SigninPage.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/app',
      name: 'Application',
      component: () => import('@/views/ApplicationPage.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Check authentication status on app start
  if (!authStore.user && !authStore.loading) {
    await authStore.checkAuth()
  }

  const isAuthenticated = authStore.isAuthenticated
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest

  if (requiresAuth && !isAuthenticated) {
    // Redirect to signin if authentication is required but user is not authenticated
    next({ name: 'Signin' })
  } else if (requiresGuest && isAuthenticated) {
    // Redirect to app if guest is required but user is authenticated
    next({ name: 'Application' })
  } else {
    next()
  }
})

export default router 