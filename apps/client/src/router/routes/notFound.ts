import NotFoundView from '@/views/NotFoundView.vue';

const notFoundRoutes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
];

export default notFoundRoutes;
