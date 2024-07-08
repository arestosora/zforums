import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'
import PostsView from '@/views/PostsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PostCommentView from '@/views/PostCommentView.vue'
import { authState } from '@/core/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/register', name: 'register', component: RegisterView,
      beforeEnter: (_to: any, _from: any, next: (arg0: string | undefined) => void) => {
        if (authState.isAuthenticated) next('/');
        else next(undefined);
      }
    },
    {
      path: '/login', name: 'login', component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/posts', name: 'posts', component: PostsView,
      beforeEnter: (_to: any, _from: any, next: (arg0: string | undefined) => void) => {
        if (authState.isAuthenticated) next(undefined);
        else next('/login');
      }
    },
    {
      path: '/profile', name: 'profile', component: ProfileView,
      beforeEnter: (_to: any, _from: any, next: (arg0: string | undefined) => void) => {
        if (authState.isAuthenticated) next(undefined);
        else next('/login');
      }
    },
    {
      path: '/post/:id', name: 'postComments', component: PostCommentView, props: true,
      beforeEnter: (_to: any, _from: any, next: (arg0: string | undefined) => void) => {
        if (authState.isAuthenticated) next(undefined);
        else next('/');
      }
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
  ]
})

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

export default router
