import { thingsSchema } from './validations'
import validate from '@/utils/validate'

function createOrUpdate (state, payload) {
  state.requesting = false
  return state
}

const mutations = {
  'THINGS]loading' (state, payload) {
    state.requesting = true
  },
  'THINGS_LIST]finish' (state, payload) {
    state.requesting = false
    state.things = validate(payload, thingsSchema)
  },
  'THINGS_CREATE]finish' (state, payload) {
    state = createOrUpdate(state, payload)
  },
  'THINGS_UPDATE]finish' (state, payload) {
    state = createOrUpdate(state, payload)
  },
  'THINGS_DELETE]finish' (state, payload) {
    state.requesting = false
  },
  'THINGS]cancel' (state, payload) {
    state.requesting = false
    state.error = payload
  }
}

export default {
  mutations
}
