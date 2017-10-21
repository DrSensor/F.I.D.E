import store from './store'
import mutations from './mutations'

/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this SECTION.
 */
import camelCase from 'lodash/camelCase'

const files = require.context('.', true, /\.js$/)
const path = require('path')
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  var modulename = key.split(path.sep)
  var filename = modulename[modulename.length - 1]
  modulename = modulename.slice(1, modulename.length - 1)
  if (modulename.length === 1 && filename === 'index.js') {
    modulename = camelCase(modulename[0])
    modules[modulename] = files(key).default
  }
})
/* END OF SECTION */

export default {
  namespaced: true,
  ...store,
  ...mutations,
  modules
}
