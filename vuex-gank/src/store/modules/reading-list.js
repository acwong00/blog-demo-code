import { DELETE_FROM_READING_LIST } from '../mutation-types'

const state = {
  readingList: []
}

const getters = {
  ids(state) {
    return state.readingList.map(item => item._id)
  }
}

const actions = {
  deleteItem ({ commit }, id) {
    commit(DELETE_FROM_READING_LIST, { id })
  }
}

const mutations = {
  [DELETE_FROM_READING_LIST] (state, { id }) {
    state.readingList = state.readingList.filter(item => item._id !== id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}