import Vue from 'vue'
import Router from 'vue-router'
import Diary from '@/views/Diary'
import Todo from '@/views/Todo'
import Memo from '@/views/Memo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/diary',
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
    }
  ]
})
