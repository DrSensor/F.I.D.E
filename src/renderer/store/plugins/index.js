/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
import createPersistedState from 'vuex-persistedstate'

const files = require.context('.', true, /\.js$/)
const path = require('path')
const plugins = []

files.keys().forEach(key => {
  if (key === './index.js') return
  var pluginname = key.split(path.sep)
  var filename = pluginname[pluginname.length - 1]
  pluginname = pluginname.slice(1, pluginname.length - 1)
  if (pluginname.length === 1 && filename.includes('.js')) {
    plugins.push(files(key).default)
  }
})

let persistenceState = createPersistedState({ storage: window.sessionStorage })
plugins.push(persistenceState)

export default plugins
