const mutations = {
  'ERROR' (state, payload) {
    state.error_detail = payload
  },
  'SUBSCRIBED_TOPIC]add' (state, topic) {
    state.subscribedTopics += [topic]
  },
  'PUBLISHED_TOPIC]add' (state, topic) {
    state.publishedTopics += [topic]
  }
}

export default {
  mutations
}
