<template>
  <div id="login">
      <div class="loginText">로그인</div>
      <div class="loginBox">
          <div class="idin">
              <div>
                  <input class="inputBox" type="text" v-model="userId" placeholder="ID"/>
                  <img class="checkImg1" v-if="userId.length >= 4" src="../assets/ok.svg" alt="">
              </div>
          </div>
          <div class="pwin">
              <div>
                  <input class="inputBox" type="password" v-model="userPw" placeholder="비밀번호"/>
                  <img class="checkImg2" v-if="userPw.length >= 6" src="../assets/ok.svg" alt="">
              </div>
          </div>
          <button class="loginButton" @click="login">로그인</button>
      </div>
      <nav class="nav">
          <router-link to="/create">회원가입</router-link>  |
          <router-link to="/find">비밀번호 찾기</router-link>  |
      </nav>
  </div>
</template>

<script>
import {io} from 'socket.io-client'
import axios from 'axios'
import router from "@/router";
import {state} from "@/socket"
export default {
    name: "LoginPage",
    data(){
        return{
            userId:"",
            userPw:"",
            loginState: false,
        }
    },
    methods:{
        loginEnter(e){
            if(e.keyCode === 13 && this.userId !== '' && this.message !== ''){
                this.login()
            }
        },
        async login(){
            alert("Login")
            const serverURL = this.$store.getters.getServerURL
            console.log("Login attempt, ID: "+this.userId);
            console.log("PW: "+ this.userPw);
            const loginMessage ={
                userID: this.userId,
                userPW: this.userPw
            };
            let loginResult = (await axios.get(serverURL+'/login', {params: {id: this.userId, pw: this.userPw}})).data
            if(!loginResult.state){
                alert('아이디 혹은 비밀번호가 옳바르지 않습니다. 다시 로그인해주세요!')
            }
            else{
                let loginInfo = {
                    userId: this.userId,
                    userPw: this.userPw,
                    userName: loginResult.userName
                }
                console.log(loginInfo)
                this.$store.commit("setuserInfo", loginInfo)
                this.$store.commit("setIsLogined", true)
                state.userName = loginResult.userName
                await router.push("/main")
            }
        },
        connect(){
            const serverURL = this.$store.getters.getServerURL
            let socket = new io(serverURL)
            socket.on("connect", ()=>{
                console.log(socket.id)
                this.connected = true;
            })
        }

    }
}

</script>

<style lang="sass">

.loginText
    position: absolute
    top: 50px
    left: 60px
    color: #FFC600
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
    font-family: "Noto Sans KR"
    font-weight: bold
    font-size: 24pt

.loginBox
    position: absolute
    width: 300px
    height: 300px
    top: 100px

.idin
    width: 200px
    height: 50px
    top: 10px
.pwin
  width: 200px
  height: 50px
  top: 10px
.inputBox
  height: 35px
  width: 200px
  border-width: 2px
  border-radius: 8px
.loginButton
  height: 35px
  width: 75px
  background-color: #FFC600
  border-width: 1px
  border-radius: 8px
  position: absolute
  top: 110px
  left: 250px
.nav
  position: absolute
  top: 120px
  left: 60px
.checkImg2
  height: 20px
  width: 20px
  position: absolute
  top: 115px
  left: 220px
.checkImg1
  height: 20px
  width: 20px
  position: absolute
  top: 65px
  left: 220px

</style>