import { flatten, uniq, eq, omit, compact, pick, mapKeys, isEmpty } from 'lodash'
import MQTTPattern from 'mqtt-pattern'

const listAttrs = things => {
  let attrs = things.map(thing => thing.topicPattern.split(/[+]+|[/][+]|[/]/)) // .replace(/\/#\w*/, '') in case need to remove rest attr
  return uniq(flatten(attrs)).filter(attr => !eq(attr, '') && !eq(attr, 'thingName') && !/#[\w]+/.test(attr))
}

const collectionToObject = (keys, arrayOfObject) => {
  let names = {}
  arrayOfObject = arrayOfObject || [{}]
  for (let key of keys) {
    let a = arrayOfObject.map(attr => attr[key])
    names[key] = uniq(compact(a))
  }
  return names
}

const STORE_STATE = {
  requesting: false,
  things: []
}

const getters = {
  thingsName: state => state.things.map(thing => thing.name),
  attributesType: state => listAttrs(state.things).filter(attr => !/thing[\w]+/.test(attr)),
  attributesName: (state, getters) => {
    let attrs = state.things.map(thing => {
      let vendorPattern = thing.topicPattern.replace(/([+]|[/][+])thingName/, '').match(/([+]|[/][+])thing[\w]+/g) || []
      vendorPattern = vendorPattern.map(type => type.replace('+', ''))
      return omit(MQTTPattern.extract(thing.topicPattern, thing.topic), ['thingName', ...vendorPattern])
    })
    return collectionToObject(getters.attributesType, attrs)
  },
  vendorAttributesType: state => listAttrs(state.things).filter(attr => /thing[\w]+/.test(attr)).map(attr => attr.replace('thing', '')),
  vendorAttributesName: (state, getters) => {
    let attrs = state.things.map(thing => {
      let vendorPattern = thing.topicPattern.replace(/([+]|[/][+])thingName/, '').match(/([+]|[/][+])thing[\w]+/g) || []
      vendorPattern = vendorPattern.map(type => type.replace('+', ''))
      let attr = pick(MQTTPattern.extract(thing.topicPattern, thing.topic), vendorPattern)
      return mapKeys(attr, (val, key) => key.replace('thing', ''))
    }).filter(a => !isEmpty(a))
    return collectionToObject(getters.vendorAttributesType, attrs)
  }
}

const state = function () {
  return STORE_STATE
}

export default {
  state,
  getters
}
