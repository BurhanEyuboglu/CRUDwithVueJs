import Vue from 'vue'
import Router from 'vue-router'
import ToDos from '@/components/ToDos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/to-dos',
      name: 'ToDo',
      component: ToDos,
      meta: {
        requiresAuth: true
      }
    } 
  ]
})
