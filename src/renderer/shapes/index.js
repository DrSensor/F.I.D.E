export default sketch => {
  const files = require.context('.', true, /\.js$/)
  const path = require('path')

  files.keys().forEach(key => {
    if (key === './index.js' && key === './module.js') return
    var modulename = key.split(path.sep)
    var filename = modulename[modulename.length - 1]
    modulename = filename.split('.')
    if (modulename[modulename.length - 2] === 'shape' && modulename[0] !== '_' && modulename.length >= 3) {
      files(key).register(sketch)
    }
  })
}

// use object rest spread operator on export when its supported instead of babel-transform-imports
// export {...modules}
