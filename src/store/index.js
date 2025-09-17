import Vue from 'vue'
import Vuex from 'vuex'

import basicInfo from './modules/basicInfo'
import auth from "./modules/auth/index";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    basicInfo,
    auth,
  }
})
