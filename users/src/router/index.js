import { createRouter, createWebHistory } from 'vue-router';
import AuthLayout from '@/layouts/AuthLayout.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {path: '', redirect: '/auth/login' }, // Trang mặc định trong /auth
      {path: 'login', component: LoginPage },
      {path: 'register', component: RegisterPage },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;
