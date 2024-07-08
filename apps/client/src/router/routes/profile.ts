import ProfileView from '@/views/ProfileView.vue';
import { authState } from '@/core/auth';

const profileRoutes = [
  {
    path: '/profile', name: 'profile', component: ProfileView,
    beforeEnter: (_to: any, _from: any, next: (arg0: string | undefined) => void) => {
      if (authState.isAuthenticated) next(undefined);
      else next('/login');
    }
  }
];

export default profileRoutes;
