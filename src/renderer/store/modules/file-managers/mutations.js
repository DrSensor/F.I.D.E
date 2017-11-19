/* How to use it
const FMcommit = (mutationType, status, payload) => commit(`fileManagers/${mutationType}]${status}`, payload, { root: true })
*/
import { findLastIndex } from 'lodash'
import {
  historySchema,
  foldersSchema,
  filesSchema
} from './validations'
import validate from '@/utils/validate'

const mutations = {
  'OPENING]loading' (state) {
    state.opening = true
  },
  'OPENING_PROJECT]finish' (state, { project, folders, files }) {
    state.openedProject = project
    state.folders = validate(folders, foldersSchema) || []
    state.files = validate(files, filesSchema) || []
    state.history = []
    state.opening = false
    state.openedFile = null
  },
  'OPENING_FOLDER]finish' (state, { origin, folders, files }) {
    state.folders = validate(folders, foldersSchema) || []
    state.files = validate(files, filesSchema) || []
    state.history.push(origin)
    if (!validate(state.history, historySchema)) state.history.pop()
    state.opening = false
  },
  'OPENING_FILE]finish' (state, file) {
    state.openedFile = file
    state.opening = false
  },
  'CLOSE_FOLDER' (state, uri) {
    const popIndex = (array, index) => {
      let a = array
      a.splice(index + 1, state.history.length)
      a.pop()
      return a || []
    }
    let index = findLastIndex(state.history, { uri: uri })
    let history = popIndex(state.history, index)
    state.history = validate(history, historySchema)
  },
  'CLOSE_FILE' (state, uri) {
    if (state.openedFile.uri === uri) state.openedFile = null
  },
  'OPENING]cancel' (state, payload) {
    state.opening = false
  },
  'TOGGLE_ORDER' (state) {
    state.order = state.order === 'asc' ? 'desc' : 'asc'
  }
}

export default {
  mutations
}
