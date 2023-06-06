<template>
    <div id="login">
        <header>
            <h1 class="loginText">로그인</h1>
        </header>
        <main class="loginBox">
            <div class="inputWrapper">
                <input class="inputBox" type="text" v-model="userId" placeholder="ID"/>
                <img class="checkImg1" v-if="userId.length >= 4" src="../assets/ok.svg" alt="">
            </div>
            <div class="inputWrapper">
                <input class="inputBox" type="password" v-model="userPw" @keyup.enter="login" placeholder="비밀번호"/>
                <img class="checkImg2" v-if="userPw.length >= 6" src="../assets/ok.svg" alt="">
            </div>
            <button class="loginButton" @click="login">로그인</button>
        </main>
        <nav class="nav">
            <ul>
                <li><router-link to="/create">회원가입</router-link></li>
                <li><router-link to="/find">비밀번호 찾기</router-link></li>
            </ul>
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
// 전체 레이아웃 스타일
#login
    display: grid
    grid-template-areas: "header" "main" "nav"
    grid-gap: 1rem
    align-items: center
    justify-content: center

// 로그인 텍스트 스타일
.loginText
    grid-area: header
    color: #FFC600
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
    font-family: "Noto Sans KR"
    font-weight: bold
    font-size: 24pt

// 로그인 박스 스타일
.loginBox
    grid-area: main

    // 입력 필드 스타일
    .inputWrapper
        display: flex
        justify-content: space-between
        align-items: center
        margin-bottom: 1rem

        .inputBox
            width: 200px
            height: 35px
            border-width: 2px
            border-radius: 8px

        // 체크 이미지 스타일
        .checkImg1,
        .checkImg2
            height: 20px
            width: 20px

// 로그인 버튼 스타일
.loginButton
    width: 100%
    height: 35px
    background-color: #FFC600
    border-width: 1px
    border-radius: 8px

// 네비게이션 스타일
.nav
    grid-area: nav

    ul
        display: flex
        gap: .5rem

        li
            list-style: none
            &:not(:last-child)::after
                content: "|"
                margin-left: .5rem

</style>