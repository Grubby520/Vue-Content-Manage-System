import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    fullScreenLoading: false,
  },
  mutations:{
    showScreenLoading (state) {
      state.fullScreenLoading = true
    },
    hiddenScreenLoading (state) {
      state.fullScreenLoading = false
    }
  }
})
