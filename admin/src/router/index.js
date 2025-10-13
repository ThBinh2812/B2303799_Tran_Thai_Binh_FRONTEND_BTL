import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

// import EmployeesPage from '@/views/EmployeesPage.vue';
import BooksPage from '@/views/BooksPage.vue';
import PublishersPage from '@/views/PublishersPage.vue';
// import StatisticsPage from '@/views/StatisticsPage.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: '/books' }, // Trang mặc định
      { path: 'books', component: BooksPage },
      { path: 'publishers', component: PublishersPage },
      // { path: 'statistics', component: StatisticsPage },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;
