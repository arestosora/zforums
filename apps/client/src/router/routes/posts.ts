import PostsView from '@/views/PostsView.vue';
import { authState } from '@/core/auth';

const postsRoutes = [
  {
    path: '/posts', name: 'posts', component: PostsView,
    beforeEnter: (_to: any, _from: any, next: (arg0: string | undefined) => void) => {
      if (authState.isAuthenticated) next(undefined);
      else next('/login');
    }
  }
];

export default postsRoutes;
