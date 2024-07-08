import PostCommentView from '@/views/PostCommentView.vue';
import { authState } from '@/core/auth';

const commentsRoutes = [
  {
    path: '/post/:id', name: 'postComments', component: PostCommentView, props: true,
    beforeEnter: (_to: any, _from: any, next: (arg0: string | undefined) => void) => {
      if (authState.isAuthenticated) next(undefined);
      else next('/');
    }
  }
];

export default commentsRoutes;
