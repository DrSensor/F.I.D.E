import inRange from 'lodash/inRange'

const STORE_STATE = {
  opening: false,
  openedProject: null,
  folders: [],
  files: [],
  history: []
}

const getters = {
  emptyFolders: state => state.folders.filter(f => f.itemCount === 0),
  smallFolders: state => state.folders.filter(f => inRange(f.itemCount, 1, 5)),
  bigFolders: state => state.folders.filter(f => f.itemCount > 5),
  breadcrumbs: state => state.history.filter(h => h.name)
}

const state = function () {
  return STORE_STATE
}

export default {
  state,
  getters
}
