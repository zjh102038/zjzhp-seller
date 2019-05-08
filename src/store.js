import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    goodDetail:[],
    dataList:[]
  },
  mutations: {
    toDetails(state,payload){
      state.goodDetail  = payload
      // console.log(store.state)
    },
    setData(state,res){
      state.dataList = res
    }
  },
  actions: {
    // toDetails(context){
    //   context.commit('toDetails')
    // }
  }
})

export default store
