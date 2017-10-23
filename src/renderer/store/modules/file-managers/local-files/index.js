import { openDirectory } from '@/services/local-files/project'
import { openFolder } from '@/services/local-files/folder'
import {
  getThumbnailByExtension,
  getFileType,
  isDirectory,
  isFile
} from '@/utils/files'
import { join, parse } from 'path'

const split2FoldersFiles = (content, source) => {
  return {
    folders: content.filter(dir => isDirectory(join(source, dir)))
      .map(dir => {
        return {
          name: dir,
          uri: new URL(join(source, dir), 'file://').href,
          type: 'folder',
          itemCount: undefined
        }
      }),
    files: content.filter(file => isFile(join(source, file)))
      .map(file => {
        let {ext, type} = getFileType(join(source, file))
        return {
          name: file,
          uri: new URL(join(source, file), 'file://').href,
          type: type,
          thumbnail: getThumbnailByExtension(ext)
        }
      })
  }
}

export default {
  namespaced: true,

  actions: {
    openProject ({ state, commit, dispatch }, uri) {
      const FMcommit = (mutationType, payload) => commit(`fileManagers/${mutationType}`, payload, { root: true })
      const open = function (openFunc, path) {
        openFunc(path).then(({ content, source }) => {
          let pathsByType = split2FoldersFiles(content, source)
          let projectDetail = {
            projectName: parse(source).name,
            origin: 'local-files',
            uri: new URL(source, 'file://').href
          }
          FMcommit('OPENING_PROJECT]finish', {
            project: projectDetail,
            ...pathsByType
          })
        }).catch(error => FMcommit('OPENING]cancel', error.stack))
      }

      let path = window.localStorage.getItem('active_project_path')
      FMcommit('OPENING]loading')
      if (uri) {
        open(openFolder, uri.replace('file://', ''))
      } else {
        open(openDirectory, path)
      }
    },

    openFolder ({ state, commit }, uri) {
      const FMcommit = (mutationType, payload) => commit(`fileManagers/${mutationType}`, payload, { root: true })

      FMcommit('OPENING]loading')
      if (uri.includes('file://')) {
        let path = uri.replace('file://', '')
        openFolder(path).then(({ content, source }) => {
          let pathsByType = split2FoldersFiles(content, source)
          let origin = {
            name: parse(source).name,
            uri: new URL(source, 'file://').href
          }
          FMcommit('OPENING_FOLDER]finish', {
            origin: origin,
            ...pathsByType
          })
        }).catch(error => FMcommit('OPENING]cancel', error.stack))
      } else FMcommit('OPENING]cancel', `uri is not local-file, ${uri}`)
    },

    closeFolder ({ state, commit }, uri) {
      commit('fileManagers/CLOSE_FOLDER', uri, { root: true })
    },

    openFile () {
      Error('not yet implemented')
    }
  }
}
