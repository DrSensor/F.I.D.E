const STORE_STATE = {
  requesting: false,
  things: [],
  order: 'asc'
}

const getters = {
  thingsName: state => state.things.map(thing => thing.name)
}

const state = function () {
  return STORE_STATE
}

export default {
  state,
  getters
}
