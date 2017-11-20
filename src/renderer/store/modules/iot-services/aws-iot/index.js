import { iot as Iot } from 'aws-sdk'
import { isEmpty, omit, find, intersection } from 'lodash'
import MQTTPattern from 'mqtt-pattern'

const opts = JSON.parse(window.localStorage.getItem('aws')) || {}
let iot = new Iot(omit(opts, ['endpoint']))

export default {
  namespaced: true,
  state () {
    return {
      endpoint: opts.endpoint || 'localhost',
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
      state.endpoint = payload.endpointAddress || 'localhost'
      state.error = payload.error
      let brokerList = JSON.parse(window.sessionStorage.getItem('broker')) || {}
      brokerList.awsIot = state.endpoint
      window.sessionStorage.setItem('broker', JSON.stringify(brokerList))
    }
  },

  actions: {
    async auth ({ state, commit, dispatch }, options) {
      iot = new Iot(options)
      commit('AUTHENTICATE]loading')

      try {
        const endpoint = await iot.describeEndpoint().promise()
        options.endpoint = endpoint.endpointAddress
        window.secureStorage.setItem('awsIot', JSON.stringify(options))
        commit('AUTHENTICATE]finish', endpoint)
        await dispatch('listThings')
        return endpoint.endpointAddress
      } catch (error) {
        commit('AUTHENTICATE]finish', { error: error.message })
        throw error
      }
    },

    async listThings ({ state, commit, dispatch }, params) {
      // http://docs.aws.amazon.com/iot/latest/developerguide/protocols.html#mqtt-ws
      const IoTcommit = (mutationType, payload) => commit(`iotServices/${mutationType}`, payload, { root: true })
      const paramsType = omit(params, ['attributeName', 'attributeValue'])
      IoTcommit('THINGS]loading')

      try {
        const data = await iot.listThings(params).promise()
        const dataT = await iot.listThingTypes(paramsType).promise()

        const things = data.things.map(thing => {
          let searchableAttributes = find(dataT.thingTypes, ['thingTypeName', thing.thingTypeName])
          let attrPattern = Object.keys(thing.attributes).sort()
          if (searchableAttributes) {
            searchableAttributes = searchableAttributes.thingTypeProperties.searchableAttributes
            attrPattern = intersection(searchableAttributes, attrPattern)
          }
          if (attrPattern.length || attrPattern[0] === '') {
            attrPattern = '/+' + attrPattern.reduce((sum, val) => `${sum}/+${val}`)
          } else attrPattern = ''
          let typeName = thing.thingTypeName ? `${thing.thingTypeName}/` : ''
          let thingType = thing.thingTypeName ? '+thingType/' : ''
          let attrName = MQTTPattern.fill(`${attrPattern}`, thing.attributes)
          return {
            name: thing.thingName,
            topic: `${typeName}${thing.thingName}${attrName}`,
            topicPattern: `${thingType}+thingName${attrPattern}/#path`
          }
        })

        IoTcommit('THINGS_LIST]finish', things)
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
