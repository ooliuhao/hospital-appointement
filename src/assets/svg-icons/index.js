import Vue from 'vue'

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./icons', false, /\.svg$/)
// console.log(req)
const iconMap = requireAll(req)
// console.log(iconMap)
Vue.prototype.$IconSvg = iconMap.map(e => e.default.id.slice(3))
