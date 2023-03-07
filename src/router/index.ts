import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
  } from 'vue-router'

  import menu from '@/router/menu'
  import HomePage from '../layout/layout.vue'
  
  const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      children:menu
    },
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router
  export {routes}