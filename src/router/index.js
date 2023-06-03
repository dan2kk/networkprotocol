import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "@/components/LoginPage.vue";
import PwFind from "@/components/PwFind.vue";
import SignUp from "@/components/SignUp.vue";
import MainPage from "@/components/MainPage.vue"
import ChatPage from "@/components/Box/ChatPage.vue";
const routes = [
  {
    path: '/',
    name: 'login,',
    component: LoginPage
  },
  {
    path: '/find',
    name: 'find,',
    component: PwFind
  },
  {
    path: '/create',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/main',
    name: 'main',
    component: MainPage
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatPage
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
