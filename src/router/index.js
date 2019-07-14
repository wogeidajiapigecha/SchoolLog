import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/teacher/today',
      name: 'home',
      component: resolve => require(['../components/teacher/Home.vue'], resolve),
      children:[
        {
          path: '/teacher/today',
          component: resolve => require(['../components/teacher/Today'], resolve),
          meta: {title: '今日出勤'},
        },
        {
          path: '/teacher/history',
          component: resolve => require(['../components/teacher/History'], resolve),
          meta: {title: '历史出勤'},
        },
        {
          path: '/teacher/me',
          component: resolve => require(['../components/teacher/Me'], resolve),
          meta: {title: '我'},
        },
        {
          path: '/teacher/record',
          name: 'record',
          component: resolve => require(['../components/teacher/Record.vue'], resolve),
        }
      ]
    },
    {
      path: '/office/today',
      name: 'home',
      component: resolve => require(['../components/office/Home.vue'], resolve),
      children:[
        {
          path: '/office/today',
          component: resolve => require(['../components/office/Today'], resolve),
          meta: {title: '今日出勤'},
        },
        {
          path: '/office/history',
          component: resolve => require(['../components/office/History'], resolve),
          meta: {title: '历史出勤'},
        },
        {
          path: '/office/me',
          component: resolve => require(['../components/office/Me'], resolve),
          meta: {title: '我'},
        },
        {
          path: '/office/record',
          name: 'record',
          component: resolve => require(['../components/office/Record.vue'], resolve),
        }
      ]
    },
    {
      path: '/school/today',
      name: 'home',
      component: resolve => require(['../components/school/Home.vue'], resolve),
      children:[
        {
          path: '/school/today',
          component: resolve => require(['../components/school/Today'], resolve),
          meta: {title: '今日出勤'},
        },
        {
          path: '/school/history',
          component: resolve => require(['../components/school/History'], resolve),
          meta: {title: '历史出勤'},
        },
        {
          path: '/school/me',
          component: resolve => require(['../components/school/Me'], resolve),
          meta: {title: '我'},
        },
        {
          path: '/school/record',
          name: 'record',
          component: resolve => require(['../components/school/Record.vue'], resolve),
        }
      ]
    },
  ]
})
