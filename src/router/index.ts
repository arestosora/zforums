import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from '@/components/RegisterComponent.vue'
import HomeComponent from '@/components/HomeComponent.vue'
import ProfileComponent from '@/components/ProfileComponent.vue'
import AboutComponent from '@/components/AboutComponent.vue'
import PostComponent from '@/components/PostComponent.vue'
import { authState } from '../auth';
import NotFound from '@/components/NotFoundComponent.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/about',
      name: 'about',
      component: AboutComponent
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterComponent,
      beforeEnter: (to, from, next) => {
        if (authState.isAuthenticated) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileComponent,
      beforeEnter: (to, from, next) => {
        if (authState.isAuthenticated) {
          next();
        } else {
          next('/register');
        }
      }
    },
    {
      path: '/post',
      name: 'post',
      component: PostComponent,
      beforeEnter: (to, from, next) => {
        if (authState.isAuthenticated) {
          next();
        } else {
          next('/register');
        }
      }
    },
    {
      path: '/:pathMatch(.*)*', // Captura todas las rutas no definidas
      name: 'NotFound',
      component: NotFound,
    },
  ]
})

export default router
