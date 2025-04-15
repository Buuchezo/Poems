import { createRouter, createWebHistory } from 'vue-router'
import HomepageComponent from '@/views/HomepageComponent.vue'
import PoemContainer from '@/views/PoemContainer.vue'
import AdminComponent from '@/views/AdminComponent.vue'
import LoginComponent from '@/views/LoginComponent.vue'
import MessageComponent from '@/views/MessageComponent.vue'

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
      component: PoemContainer,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminComponent,
      meta: { requiresAuth: true },
    },
    {
      path: '/poem/:id', // Poem ID will be passed in URL
      name: 'PoemDetails',
      component: MessageComponent,
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
