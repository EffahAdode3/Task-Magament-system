import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Signpup from '../views/Signup.vue'
import component from '../components/SideBarAndNav.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ' Login ',
      component:  Login 
    },
    {
      path: '/Signpup',
      name: ' Signpup ',
      component:  Signpup 
    },
    {
      path: '/component',
      name: ' component ',
      component:  component 
    },
  ]
})

export default router
