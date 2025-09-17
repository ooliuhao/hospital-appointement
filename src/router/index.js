import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import store from '@/store/index'
import util from '@/libs/util.js'
import { Message } from 'element-ui';

Vue.use(VueRouter)

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  // scrollBehavior (to, from, savedPosition) {
  //   console.log("savedPosition")
  //   console.log(savedPosition)
    // return {
    //   // el: document.getElementsByClassName('middle')[0],
    //   top: 0,
    //   behavior: 'smooth',
    // }
    // return { x: 0, y: -10000 }
  // }
})


/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // await store.dispatch('basicInfo/page/isLoaded')
  // await store.dispatch('basicInfo/size/isLoaded')
  // store.commit('basicInfo/search/set', false)

  const needProfileList = ['physical','examinations','vaccines']
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some(r => r.meta.auth)) {
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    const token = util.cookies.get('token')
    const loggedIn = JSON.parse(localStorage.getItem('user'))
    if (loggedIn && loggedIn !== 'undefined') {
      const loginName = JSON.parse(localStorage.getItem('user')).name
      if((loginName == null || loginName == 'undefined'|| loginName == 'Undefined') && needProfileList.includes(to.name)) {
        Message.warning("Please Complete Your Profile!");
        
        
        next({
          path: '/profile',
          // query: {
          //   redirect: to.fullPath
          // }
        })
      }
      next()
    } else {
      // console.log('meiyoudenglu ')
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    // 不需要身份校验 直接通过
    next()
  }
})

// router.afterEach(to => {
  // // 多页控制 打开新的页面
  // store.dispatch('basicInfo/page/open', to)
  // // 更改标题
  // util.title(to.meta.title)
// })

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router
