const mutations = {
  'ERROR' (state, payload) {
    state.error_detail = payload
  },
  'REQUEST_CALL]loading' (state, payload) {
    state.requesting = true
  },
  'REQUEST_CALL]finish' (state, payload) {
    state.requesting = false
  }
}

export default {
  mutations
}
