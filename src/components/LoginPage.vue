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
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import axios from 'axios'
import router from "@/router";
export default {
    name: "LoginPage",
    data(){
        return{
            userId:"",
            userPw:"",
            loginState: false,
        }
    },
    created(){
        this.connect()
    },
    methods:{
        loginEnter(e){
            if(e.keyCode === 13 && this.userId !== '' && this.message !== ''){
                this.login()
            }
            //this.$store.commit("setIsLogined", true)
        },
        login1(){
            alert("Test")
            let loginInfo = {
                userId: "dan2kk",
                userPw: "wogh123",
                userName: "정재호"
            }
            this.$store.commit("setuserInfo", loginInfo)
            this.$store.commit("setIsLogined", true)
            router.push("/main")
        },
        async login(){
            alert("Login")
            const serverURL = "http://localhost:9876"
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
                this.$store.commit("setuserInfo", loginInfo)
                this.$store.commit("setIsLogined", true)
                router.push("/main")
            }
        },
        connect(){
            const serverURL = "http://localhost:9876"
            let socket = new SockJS(serverURL)
            this.stompClient = Stomp.over(socket);
            console.log("소켓연결을 시도합니다. 서버주소: ${serverURL}")
            this.stompClient.connect(
                {},
                frame => {
                    //success
                    this.connected = true;
                    console.log("연결 성공", frame);
                    //server의 메세지 전송 endpoint를 subscribe한다
                    //pub, sub 구조를 위해 stomp를 쓴다
                    this.stompClient.subscribe("/send", res => {
                        console.log("sub message:", res.body);

                        //data를 json으로 parsing하고 list에 넣는다
                        this.recvList.push(JSON.parse(res.body))
                    });
                },
                error => {
                    //fail
                    console.log("연결 실패:",error);
                    this.connected = false;
                }
            );
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