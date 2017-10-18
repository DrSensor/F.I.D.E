const STORE_STATE = {
  error_detail: {
    id: Number,
    message: String,
    meta: Object
  },
  requesting: false
}

const getters = {
  errorMessage: state => state.error_detail.message
}

const state = function () {
  return STORE_STATE
}

export default {
  state,
  getters
}
