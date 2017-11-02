import { iot as Iot } from 'aws-sdk'
import { isEmpty } from 'lodash'

const opts = JSON.parse(window.localStorage.getItem('aws-iot'))
let iot = new Iot(opts)

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
      window.localStorage.setItem('aws', JSON.stringify(options))

      try {
        const endpoint = await iot.describeEndpoint().promise()
        commit('AUTHENTICATE]finish', endpoint)
        return endpoint.endpointAddress
      } catch (error) {
        commit('AUTHENTICATE]finish', { error: error.message })
        throw error
      }
    },

    async listThings ({ state, commit, dispatch }, params) {
      const IoTcommit = (mutationType, payload) => commit(`iotServices/${mutationType}`, payload, { root: true })
      IoTcommit('THINGS]loading')

      try {
        const data = await iot.listThings(params).promise()
        IoTcommit('THINGS_LIST]finish', data)
        return data
      } catch (error) {
        IoTcommit('THINGS]cancel', { error: error.message })
        throw error
      }
    },

    async createUpdateThing ({ state, commit, dispatch }, params) {
      const IoTcommit = (mutationType, payload) => commit(`iotServices/${mutationType}`, payload, { root: true })
      IoTcommit('THINGS]loading')

      try {
        const dataUpdate = await iot.updateThing(params).promise()
        IoTcommit('THINGS_UPDATE]finish', dataUpdate)
        return dataUpdate
      } catch (errorUpdate) {
        try {
          const dataCreate = await iot.createThing(params).promise()
          IoTcommit('THINGS_CREATE]finish', dataCreate)
          return dataCreate
        } catch (errorCreate) {
          const errMessage = `${errorCreate.message}\n${errorUpdate.message}`
          IoTcommit('THINGS]cancel', { error: errMessage })
          throw new Error(errMessage)
        }
      }
    },

    async deleteThing ({ state, commit, dispatch }, params) {
      const IoTcommit = (mutationType, payload) => commit(`iotServices/${mutationType}`, payload, { root: true })
      IoTcommit('THINGS]loading')

      try {
        const data = await iot.deleteThing(params).promise()
        IoTcommit('THINGS_DELETE]finish', data)
        return data
      } catch (error) {
        IoTcommit('THINGS]cancel', { error: error.message })
        throw error
      }
    }
  }
}
