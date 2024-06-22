import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from '@/components/RegisterComponent.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: RegisterComponent
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: null
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    // }
  ]
})

export default router
