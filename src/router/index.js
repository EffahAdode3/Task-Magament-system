import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Signpup from '../views/Signup.vue'
 import AddTask from  '../views/Add Task.vue'
import Dashboard from  '../views/Dashboard.vue'
import Archive from '../views/Archive.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: ' Login ',
      component:  Login 
    },
    {
      path: '/Signpup',
      name: ' Signpup ',
      component:  Signpup 
    },
    {
      path: '/addTask',
      name: ' AddTask ',
      component:  AddTask 
    },
    {
      path: '/',
      name: ' Dashboard ',
      component:  Dashboard 
    },
    {
      path: '/archive',
      name: ' Archive ',
      component:  Archive 
    },
  ]
})
export default router
