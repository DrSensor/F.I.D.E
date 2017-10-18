import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import store from './store'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  ...store,
  ...mutations,
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
