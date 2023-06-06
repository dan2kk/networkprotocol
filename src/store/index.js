import { createStore } from 'vuex'
import {io} from 'socket.io-client'

export default createStore({
  state: {
    serverURL: process.env.NODE_ENV === "production" ? window.location.protocol + "//" + window.location.host : "https://localhost:9091",
    userInfo: {
      userId: "",
      userPw: "",
      userName: "",
    },
    isLogined: false,
  },
  getters: {
    getServerURL(state){
      return state.serverURL
    },
    getUserInfo(state){
      return state.userInfo
    },
    getIsLogined(state){
      return state.isLogined
    },
  },
  mutations: {
    setuserInfo(state, ui){
      state.userInfo.userId = ui.userId;
      state.userInfo.userPw = ui.userPw;
      state.userInfo.userName = ui.userName;
      console.log(state.userInfo)
    },
    setIsLogined(state, tf){
      if(tf) state.isLogined = true;
      else{
        state.userInfo.userId="";
        state.userInfo.userPw="";
        state.userInfo.userName="";
        state.userInfo.userToken="";
        state.isLogined= false;
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
