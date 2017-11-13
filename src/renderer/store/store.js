const STORE_STATE = {
  error_detail: {
    id: 0,
    message: '',
    meta: {}
  },
  subscribedTopics: [],
  publishedTopics: [],
  annotations: []
}

const getters = {
  errorMessage: state => state.error_detail.message,
  requesting: state => state.fileManagers.opening || state.iotServices.requesting
}

const state = function () {
  return STORE_STATE
}

export default {
  state,
  getters
}
