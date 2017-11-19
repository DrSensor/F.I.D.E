const { dialog, app } = require('electron').remote
const fs = require('fs')
const junk = require('junk')

export const openDirectory = (path) => new Promise((resolve, reject) => {
  let options = {
    defaultPath: path || app.getPath('home'),
    properties: ['openDirectory', 'createDirectory']
  }

  dialog.showOpenDialog(options, function (filePaths) {
    try {
      let projectPath = filePaths[0]
      fs.readdir(projectPath, (err, files) => {
        let paths = files.filter(f => !f.startsWith('.') && junk.not(f))
        if (err) reject(err)
        else resolve({ content: paths, source: projectPath })
      })
    } catch (error) {
      reject(Error('IGNORE'))
    }
  })
})

// backup/save project configuration and database
export const backupImplementation = function () {
  Error('Not yet implemented')
  let options = {
    defaultPath: window.localStorage.getItem('project_path') || app.getPath('home'),
    filters: [
      { name: 'Database', extensions: ['db'] },
      { name: 'Config', extensions: ['json', 'ini'] }
    ]
  }
  return dialog.showSaveDialog(options)
}
