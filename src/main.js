import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import projectComponent from '@/plugin/project'

import '@/assets/style/iconfont/iconfont.css';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import avueEnLocale from "@smallwei/avue/lib/locale/lang/en";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';



Vue.use(Avue, {locale: avueEnLocale,size: "small",
menuType: "text",});

Vue.config.productionTip = false

Vue.use(ElementUI, {locale});
Vue.use(projectComponent)

new Vue({
  router,
  store,
  mounted() {
    window.addEventListener('beforeunload', this.clearLocalStorage);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.clearLocalStorage);
  },
  methods: {
    clearLocalStorage(event) {
      // 检查是否是关闭浏览器的操作
      if (event.clientY < 0) {
        localStorage.clear();
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
