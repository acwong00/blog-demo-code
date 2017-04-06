import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import { ADD_TO_READING_LIST } from './mutation-types'
import gankList from './modules/gank-list'
import readingList from './modules/reading-list'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: ['Android', 'iOS', '前端']
  },

  modules: {
    gankList,
    readingList
  },

  actions: {
    addToReadingList({ commit }, id) {
      commit(ADD_TO_READING_LIST, { id })
    }
  },

  mutations: {
    [ADD_TO_READING_LIST](state, { id }) {
      state.readingList.readingList
        .push(state.gankList.ganks.find(gank => gank._id === id))
    }
  },

  plugins: [createLogger()]
})