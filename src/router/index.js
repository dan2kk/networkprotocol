import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "@/components/LoginPage.vue";

const routes = [
  {
    path: '/',
    name: 'login,',
    component: LoginPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
