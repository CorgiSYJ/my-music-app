import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favoriteList:localStorage.getItem("__favorite__") || [],
    playHistory:localStorage.getItem("__play__") || [],
  },
  mutations: {

  },
  actions: {
    
  }
})
