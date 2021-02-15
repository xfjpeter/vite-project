import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'login', component: () => import('@/views/login.vue') },
    { path: '/home', name: 'home', component: () => import('@/views/home.vue') }
  ]
})

export default router
