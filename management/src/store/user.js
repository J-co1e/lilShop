import Cookie from 'js-cookie'
export default{
  state:{
    token:''
  },
  mutations:{
    setToken(state,value){
      state.token=value
      Cookie.set('token',value)
    },
    clearToken(state,value){
      state.token=''
      Cookie.remove('token')
    },
    getToken(state,value){
      state.token=state.token || Cookie.get('token')
    }
  }

}