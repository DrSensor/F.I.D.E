import { isEmpty } from 'lodash'

const mutations = {
  'ERROR' (state, payload) {
    state.error_detail = payload
  },

  'REGISTER_FILE' (state, type) {
    if (isEmpty(type)) delete state['fileManagers'].openedFile.registerAs
    else state['fileManagers'].openedFile.registerAs = type
  },

  'SUBSCRIBE_TOPIC]add' (state, topic) {
    state.subscribedTopics.push(topic)
  },

  'PUBLISH_TOPIC]add' (state, topic) {
    state.publishedTopics.push(topic)
  },

  'ANNOTATION]add' (state, annotation) {
    state.annotations.push(annotation)
  }
}

export default {
  mutations
}
