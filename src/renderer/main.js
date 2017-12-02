import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'

import App from './App'
import router from './router'
import store from './store'

import '@/utils/security'

Vue.use(Vuetify)

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

// https://github.com/vuejs/Discussion/issues/394
Vue.mixin({
  methods: {
    $ready (fn) {
      if (process.env.NODE_ENV === 'production') {
        return this.$nextTick(fn)
      }

      setTimeout(() => {
        this.$nextTick(fn)
      }, 500)
    }
  }
})
