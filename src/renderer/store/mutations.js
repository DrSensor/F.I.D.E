const mutations = {
  'ERROR' (state, payload) {
    state.error_detail = payload
  },
  'SUBSCRIBE_TOPIC]add' (state, topic) {
    state.subscribedTopics += [topic]
  },
  'PUBLISH_TOPIC]add' (state, topic) {
    state.publishedTopics += [topic]
  }
}

export default {
  mutations
}
