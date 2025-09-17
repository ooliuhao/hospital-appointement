
import layoutHeaderAside from '@/layout'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const frameIn = [
  {
    path: '/',
    name: 'layout',
    redirect: 'index',
    component: layoutHeaderAside,
    children: [
      {
      path: 'index',
      name: 'index',
      meta: {
        title: 'Home',
        // auth: true
      },
      component: _import('system/index')
    }, 
    {
      path: 'appointment/physical-exam',
      name: 'physical',
      meta: {
        title: 'Physical',
        auth: true
      },
      component: _import('appointment/physical'),
    }, 
    {
      path: 'appointment/examinations',
      name: 'examinations',
      meta: {
        title: 'Examinations',
        auth: true
      },
      component: _import('appointment/examinations'),
    }, 
    {
      path: 'appointment/vaccines',
      name: 'vaccines',
      meta: {
        title: 'Vaccines',
        auth: true
      },
      component: _import('appointment/vaccines'),
    }, 
    {
      path: 'appointment/history',
      name: 'history',
      meta: {
        title: 'History',
        auth: true
      },
      component: _import('appointment/history'),
    },
    // {
    //   path: 'appointment/physical-exam/order',
    //   name: 'order',
    //   meta: {
    //     title: 'Order',
    //     auth: true
    //   },
    //   component: _import('appointment/physical/component/form.vue')
    // }, 
    {
      path: 'profile',
      name: 'Profile',
      meta: {
        title: 'Profile',
        auth: true
      },
      component: _import('profile')
    },
    {
      path: 'aboutus',
      name: 'aboutus',
      meta: {
        title: 'About Us',
        auth: true
      },
      component: _import('aboutus')
    }
  ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/aboutView.vue')
  }
]

// 框架之外的登陆页面
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/system/loginView')
  }
]

const errorPage = [
  {
    path: '*',
    name: '404',
    component: () => import('@/views/system/error/404')
  }
]

export default [
  ...frameIn,
  ...frameOut,
  ...errorPage,
]
