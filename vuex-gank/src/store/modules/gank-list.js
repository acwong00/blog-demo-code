import { getGanks } from '../api'
import { REQUEST_GANKS, RECEIVE_GANKS, CHANGE_CATEGORY } from '../mutation-types'

const state = {
  isFetching: false,
  ganks: []
}

const actions = {
  getGanks({ commit }, category) {
    commit(REQUEST_GANKS)
    getGanks(category)
      .then(response => response.data.results)
      .then(ganks => commit(RECEIVE_GANKS, { ganks }))
  }
}

const mutations = {
  [REQUEST_GANKS] (state) {
    state.isFetching = true
  },

  [RECEIVE_GANKS] (state, { ganks }) {
    state.isFetching = false
    state.ganks = ganks
  }
}

export default {
  state,
  actions,
  mutations
}
