<template>
  <div id="login">
      ID: <input v-model="userId" type="text">
      비밀번호: <input v-model="userPw" type="password" @keyup="loginEnter">
      <button @click="login">로그인</button>
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import axios from 'axios'
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
        },
        async login(){
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
                this.$store.commit("setuserInfo", true)
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

<style scoped>

</style>