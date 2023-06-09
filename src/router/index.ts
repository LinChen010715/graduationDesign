import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
  } from 'vue-router'

  import menu from '@/router/menu'
  import HomePage from '../layout/layout.vue'
  import Login from '@/views/login/index.vue'
  
  const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      children:menu
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router
  export {routes}