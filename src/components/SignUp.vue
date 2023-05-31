<template>
    <div id="login">
        <div class="loginText">회원가입</div>
        <div class="loginBox">
            <div class="idin">
                <div>
                    <input class="inputBox" type="text" v-model="userId" placeholder="ID"/>
                    <img class="checkImg1" v-if="userId.length >= 4" src="../assets/ok.svg" alt="">
                </div>
            </div>
            <div class="pwin">
                <div>
                    <input class="inputBox" type="text" v-model="userPw" placeholder="비밀번호"/>
                    <img class="checkImg2" v-if="userPw.length >= 6" src="../assets/ok.svg" alt="">
                </div>
            </div>
            <div class="nickin">
                <div>
                    <input class="inputBox" type="text" v-model="userName" placeholder="닉네임"/>
                    <img class="checkImg3" v-if="userName.length >= 3" src="../assets/ok.svg" alt="">
                </div>
            </div>
            <button class="createButton" @click="create">회원가입</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
    name: "SignUp",
    data(){
        return{
            userId:"",
            userPw:"",
            userName:"",
        }
    },
    methods:{
        async create(){
            const serverURL = this.$store.getters.getServerURL
            console.log("회원가입 시도!")
            if(this.userId.length < 4){
                alert('아이디 길이는 4 이상이어야 합니다.')
                return
            }
            if(this.userPw.length < 6){
                alert('비밀번호 길이는 6 이상이어야 합니다.')
                return
            }
            if(this.userName.length < 3){
                alert('닉네임 길이는 3 이상이어야 합니다.')
                return
            }
            let createResult = (await axios.post(serverURL+'/login/create', {params: {id: this.userId, pw: this.userPw, name: this.userName}})).data
            if(!createResult.state){
                alert('기존에 존재하는 아이디및 닉네임입니다!')
            }
            else{
                alert('회원가입 완료!')
                router.push({path:'/'})
            }
        },
    }
}
</script>

<style lang="sass">
.createButton
  height: 35px
  width: 75px
  background-color: #FFC600
  border-width: 1px
  border-radius: 8px
  position: absolute
  top: 155px
  left: 250px

.nickin
    width: 200px
    height: 50px
    top: 10px
  
.checkImg3
    height: 20px
    width: 20px
    position: absolute
    top: 165px
    left: 220px
  
</style>