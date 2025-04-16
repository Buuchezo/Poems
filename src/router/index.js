import { createRouter, createWebHistory } from 'vue-router'
import HomepageComponent from '@/views/HomepageComponent.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomepageComponent,
    },
    {
      path: '/poems',
      name: 'poems',
      component: () => import('@/views/PoemContainer.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginComponent.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminComponent.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/poem/:id', // Poem ID will be passed in URL
      name: 'PoemDetails',
      component: () => import('@/views/MessageComponent.vue'),
      props: true, // Makes the route params available as props in MessageComponent
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('loggedIn') === 'true'

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
