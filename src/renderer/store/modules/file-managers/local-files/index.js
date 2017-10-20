import { openDirectory } from '@/services/local-files/project'
import { openFolder } from '@/services/local-files/folder'
import { getThumbnailByExtension, getExtension } from '@/utils/files'
import { lstatSync } from 'fs'
import { join } from 'path'

const isDirectory = source => lstatSync(source).isDirectory()
const isFile = source => lstatSync(source).isFile()

const split2FoldersFiles = (content, source) => {
  return {
    folders: content.filter(dir => isDirectory(join(source, dir)))
      .map(dir => {
        return {
          name: dir,
          uri: new URL(join(source, dir), 'file://').href,
          itemCount: undefined
        }
      }),
    files: content.filter(file => isFile(join(source, file)))
      .map(file => {
        let ext = getExtension(file)
        return {
          name: file,
          uri: new URL(join(source, file), 'file://').href,
          thumbnail: getThumbnailByExtension(ext)
        }
      })
  }
}

export default {
  namespaced: true,
  actions: {
    openProject ({ state, commit }) {
      const FMcommit = (mutationType, payload) => commit(`fileManagers/${mutationType}`, payload, { root: true })
      let path = window.localStorage.getItem('active_project_path')

      FMcommit('OPENING]loading')
      openDirectory(path).then(({ content, source }) => {
        let pathsByType = split2FoldersFiles(content, source)
        FMcommit('OPENING_PROJECT]finish', pathsByType)
      }).catch(error => FMcommit('OPENING]cancel', error.stack))
    },

    openFolder ({ state, commit }, uri) {
      const FMcommit = (mutationType, payload) => commit(`fileManagers/${mutationType}`, payload, { root: true })

      FMcommit('OPENING]loading')
      if (uri.includes('file://')) {
        let path = uri.replace('file://', '')
        openFolder(path).then(({ content, source }) => {
          let pathsByType = split2FoldersFiles(content, source)
          FMcommit('OPENING_FOLDER]finish', pathsByType)
        }).catch(error => FMcommit('OPENING]cancel', error.stack))
      } else FMcommit('OPENING]cancel', `uri is not local-file, ${uri}`)
    },

    openFile () {
      Error('not yet implemented')
    }
  }
}
