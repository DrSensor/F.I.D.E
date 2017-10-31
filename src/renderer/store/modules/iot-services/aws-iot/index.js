import { iot as Iot } from 'aws-sdk'
import { isEmpty } from 'lodash'

let iot

export default {
  namespaced: true,
  state () {
    return {
      authenticating: false,
      authenticated: false,
      error: ''
    }
  },

  mutations: {
    'AUTHENTICATE]loading' (state, payload) {
      state.authenticating = true
    },
    'AUTHENTICATE]finish' (state, payload) {
      state.authenticating = false
      state.authenticated = !isEmpty(payload.endpointAddress)
      state.error = payload.error
    }
  },

  actions: {
    async auth ({ state, commit, dispatch }, options) {
      iot = new Iot(options)
      commit('AUTHENTICATE]loading')
      return iot.describeEndpoint().promise().then(data => {
        commit('AUTHENTICATE]finish', data)
      }).catch(error => {
        commit('AUTHENTICATE]finish', { error: error.message })
      })
    },

    listThings ({ state, commit, dispatch }, payload) {

    },

    createUpdateThing ({ state, commit, dispatch }, payload) {

    },

    deleteThing ({ state, commit, dispatch }, payload) {

    }
  }
}
