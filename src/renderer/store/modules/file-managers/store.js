import { orderBy } from 'lodash'

const STORE_STATE = {
  opening: false,
  openedProject: null,
  folders: [],
  files: [],
  history: [],
  order: 'asc'
}

const getters = {
  sortByName: state => orderBy([].concat(state.folders, state.files),
    ['name'], [state.order]),
  sortByType: state => [].concat(state.folders, orderBy(state.files,
    ['type'], [state.order])),
  breadcrumbs: state => state.history.filter(h => h.name)
}

const state = function () {
  return STORE_STATE
}

export default {
  state,
  getters
}
