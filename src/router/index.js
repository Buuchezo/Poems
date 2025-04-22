import { createRouter, createWebHistory } from 'vue-router'
import HomepageComponent from '@/views/HomepageComponent.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

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
<<<<<<< HEAD
      path: '/soul-food',
      name: 'soulFood',
      component: () => import('@/views/SoulFoodContainer.vue'),
    },
    {
=======
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
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
<<<<<<< HEAD
      meta: { type: 'poem' },
    },
    {
      path: '/soulfoods/:id', // Poem ID will be passed in URL
      name: 'SoulFoodDetails',
      component: () => import('@/views/MessageComponent.vue'),
      props: true, // Makes the route params available as props in MessageComponent
      meta: { type: 'soulfood' },
    },
    {
      path: '/edit-poem/:id',
      name: 'editpoem',
      component: () => import('@/views/EditPoemComponent.vue'),
    },
    {
      path: '/edit-soulfood/:id',
      name: 'editsoulfood',
      component: () => import('@/views/EditSoulFoodComponent.vue'),
    },
=======
    },
    {
      path: '/edit/:id',
      name: 'EditPoem',
      component: () => import('@/views/EditPoemComponent.vue'),
    },
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
  ],
})

let isAuthChecked = false

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  const checkAuth = () => {
    onAuthStateChanged(auth, (user) => {
      if (requiresAuth && !user) {
        next('/login')
      } else {
        next()
      }
    })
  }

  if (!isAuthChecked) {
    isAuthChecked = true
    checkAuth()
  } else {
    const user = auth.currentUser
    if (requiresAuth && !user) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
