const fs = require('fs')
const junk = require('junk')

export const openFolder = (path) => new Promise((resolve, reject) => {
  fs.readdir(path, (err, files) => {
    var paths = files.filter(f => !f.startsWith('.') && junk.not(f))
    if (err) reject(err)
    else resolve({ content: paths, source: path })
  })
})
