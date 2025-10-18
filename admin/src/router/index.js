import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import BooksPage from '@/views/BooksPage.vue';
import PublishersPage from '@/views/PublishersPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: '', redirect: '/auth/login' }, // Trang mặc định trong /auth
      { path: 'login', component: LoginPage },
    ],
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: '/books' }, // Trang mặc định khi truy cập /
      { path: 'books', component: BooksPage },
      { path: 'publishers', component: PublishersPage },
      // { path: 'statistics', component: StatisticsPage },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
