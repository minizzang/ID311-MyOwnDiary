import Vue from 'vue'
import Router from 'vue-router'
import Diary from '@/views/Diary'
import Todo from '@/views/Todo'
import Memo from '@/views/Memo'
import Login from '@/views/Login'
import Signup from '@/views/SignUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/diary',
      name: 'Diary',
      component: Diary
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo
    },
    {
      path: '/memo',
      name: 'Memo',
      component: Memo
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})
