import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Signpup from '../views/Signup.vue'
 import AddTask from  '../views/Add Task.vue'
import Dashboard from  '../views/Dashboard.vue'
import Archive from '../views/Archive.vue'
import ForgetPasswordEmail from '../views/ForgetPasswordEmail.vue'
import ResetPassword from '../views/ResetPassword.vue'
// import chat from '../views/Chat.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: ' Login ',
      component:  Login 
    },
    // {
    //   path: '/chat',
    //   name: ' chat ',
    //   component:  chat 
    // },
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
    {
      path: '/forgetPasswordEmail',
      name: ' ForgetPasswordEmail ',
      component:  ForgetPasswordEmail 
    },

    {
      path: '/reset_password/:token',
      name: 'ResetPassword ',
      component:  ResetPassword  
    },

  ]
})
export default router
