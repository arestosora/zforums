import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import { authState } from '@/core/auth';

const authRoutes = [
  {
    path: '/register', name: 'register', component: RegisterView,
    beforeEnter: (_to: any, _from: any, next: (arg0: string | undefined) => void) => {
      if (authState.isAuthenticated) next('/');
      else next(undefined);
    }
  },
  {
    path: '/login', name: 'login', component: LoginView,
  }
];

export default authRoutes;
