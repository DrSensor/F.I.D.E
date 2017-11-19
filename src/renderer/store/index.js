import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import plugins from './plugins'
import store from './store'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  ...store,
  ...mutations,
  ...actions,
  modules,
  plugins,
  strict: process.env.NODE_ENV !== 'production'
})
