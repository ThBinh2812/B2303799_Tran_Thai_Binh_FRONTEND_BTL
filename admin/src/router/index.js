import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

// Import các trang chức năng
// import ReadersPage from '@/views/ReadersPage.vue';
// import EmployeesPage from '@/views/EmployeesPage.vue';
import BooksPage from '@/views/BooksPage.vue';
// import StatisticsPage from '@/views/StatisticsPage.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: '/books' }, // Trang mặc định
      { path: 'books', component: BooksPage },
      // { path: 'readers', component: ReadersPage },
      // { path: 'employees', component: EmployeesPage },
      // { path: 'statistics', component: StatisticsPage },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;
