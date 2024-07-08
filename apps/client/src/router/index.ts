import { createRouter, createWebHistory } from 'vue-router';
import { authState } from '@/core/auth';
import { AppRoutes } from './routes';

const routes = AppRoutes;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
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

export default router;
