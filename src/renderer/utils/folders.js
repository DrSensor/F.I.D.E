import { join } from 'path'
import fs from 'fs'

/* computes a size of a filesystem folder (or a file)
example
```
fsSize('/home/wildan', (err, size) => {
  console.log(size)
})
```
*/
export function fsSize (path, callback) {
  fs.lstat(path, function (error, stats) {
    if (error) {
      return callback(error)
    }

    if (!stats.isDirectory()) {
      return callback(null, stats.size)
    }

    let total = stats.size
    fs.readdir(path, function (error, names) {
      if (error) {
        return callback(error)
      }

      let left = names.length
      if (left === 0) {
        return callback(null, total)
      }

      function done (size) {
        total += size
        left--
        if (left === 0) {
          callback(null, total)
        }
      }

      for (let name of names) {
        fsSize(join(path, name), function (error, size) {
          if (error) {
            return callback(error)
          } done(size)
        })
      }
    })
  })
}
