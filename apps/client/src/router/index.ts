import { createRouter, createWebHistory } from 'vue-router';
import { isLoading } from '@/loadingState';
import RegisterComponent from '@/components/RegisterComponent.vue';
import HomeComponent from '@/components/HomeComponent.vue';
import ProfileComponent from '@/components/ProfileComponent.vue';
import AboutComponent from '@/components/AboutComponent.vue';
import PostComponent from '@/components/PostComponent.vue';
import PostComments from '@/components/PostCommentsComponent.vue';
import NotFound from '@/components/NotFoundComponent.vue';

import { authState } from '../auth';

const routes = [
  { path: '/', name: 'home', component: HomeComponent },
  { path: '/about', name: 'about', component: AboutComponent },
  { path: '/register', name: 'register', component: RegisterComponent,
    beforeEnter: (_to: any, _from: any, next: (arg0: string | undefined) => void) => {
      if (authState.isAuthenticated) next('/');
      else next(undefined);
    }
  },
  { path: '/profile', name: 'profile', component: ProfileComponent,
    beforeEnter: (_to: any, _from: any, next: (arg0: string | undefined) => void) => {
      if (authState.isAuthenticated) next(undefined);
      else next('/register');
    }
  },
  { path: '/posts', name: 'posts', component: PostComponent,
    beforeEnter: (_to: any, _from: any, next: (arg0: string | undefined) => void) => {
      if (authState.isAuthenticated) next(undefined);
      else next('/register');
    }
  },
  { path: '/post/:id', name: 'postComments', component: PostComments, props: true,
    beforeEnter: (_to: any, _from: any, next: (arg0: string | undefined) => void) => {
      if (authState.isAuthenticated) next(undefined);
      else next('/');
    }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  isLoading.value = true;
  if (to.path === '/') {
    if (authState.isAuthenticated) {
      next('/posts');
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  isLoading.value = false; 
});

export default router;
