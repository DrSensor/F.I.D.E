/* How to use it
const FMcommit = (mutationType, status, payload) => commit(`fileManagers/${mutationType}]${status}`, payload, { root: true })
*/
import { isEmpty, findLastIndex } from 'lodash'
import {
  historySchema,
  foldersSchema,
  filesSchema
} from './validations'

const validate = (payload, schema) => {
  let errorDetails = schema.validate(payload)
  let isValid = isEmpty(errorDetails)
  if (isValid) return payload
  else {
    console.warn(errorDetails)
    return undefined
  }
}

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
  },
  'OPENING_FOLDER]finish' (state, { origin, folders, files }) {
    state.folders = validate(folders, foldersSchema) || []
    state.files = validate(files, filesSchema) || []
    state.history.push(origin)
    if (!validate(state.history, historySchema)) state.history.pop()
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
