/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', true, /\.js$/)
const path = require('path')
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  var modulename = key.split(path.sep)
  var filename = modulename[modulename.length - 1]
  modulename = modulename.slice(1, modulename.length - 1)
  if (modulename.length === 1 && filename === 'index.js') {
    modules[modulename[0]] = files(key).default
  }
})

export default modules
