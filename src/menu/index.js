import { uniqueId } from 'lodash'

// 插件
import aboutUs from './modules/aboutUs.js'
// 组件
import profile from './modules/profile.js'
// 功能
import appointment from './modules/appointment.js'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

// 菜单 侧边栏
export const menuAside = supplementPath([
  // demoComponents,
  // aboutUs,
  // demoPlayground
])

// 菜单 顶栏
export const menuHeader = supplementPath([
  {
    path: '/index',
    title: 'Home',
    icon: 'hospital-iconhome'
  },
  appointment,
  profile,
  aboutUs
])
