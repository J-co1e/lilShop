export default {
  namespaced: true,//开启命名空间
  state: {
    sum:0,
    number:0
  },
  mutations: {
    ADD_NUM(state,value){
      state.sum+=value
    }
  },
  getters: {
    
  },
  actions: {
  },
}