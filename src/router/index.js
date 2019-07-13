import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['../components/Home.vue'], resolve),
      children:[
        {
          path: '/today',
          component: resolve => require(['../components/Today'], resolve),
          meta: {title: '今日出勤'},
        },
        {
          path: '/history',
          component: resolve => require(['../components/History'], resolve),
          meta: {title: '历史出勤'},
        },
        {
          path: '/me',
          component: resolve => require(['../components/Me'], resolve),
          meta: {title: '我'},
        },
        {
          path: '/record',
          name: 'record',
          component: resolve => require(['../components/Record.vue'], resolve),
        }
      ]
    },
  ]
})
