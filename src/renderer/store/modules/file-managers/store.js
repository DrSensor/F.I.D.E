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
  sortByType: state => {
    let ordered = orderBy(state.files, ['type'], [state.order])
    if (state.order === 'asc') {
      return [].concat(state.folders, ordered)
    } else return [].concat(ordered, state.folders)
  },
  breadcrumbs: state => state.history.filter(h => h.name)
}

const state = function () {
  return STORE_STATE
}

export default {
  state,
  getters
}
