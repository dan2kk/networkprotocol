<template>
  <div>공사중</div>
  <button @click="test">테스트</button>
  <div id="upperbar">
      <TextBox class="user-info-box" :text='this.getUserName' size="150" />
      <TextBox class="logout" @click="logout" text="Logout" size="75"/>
  </div>
  <div id="channellist">

  </div>
</template>

<script>
import router from "@/router";
import {login, createChannel, joinChannel, socket} from "@/socket";
import TextBox from "@/components/Box/TextBox.vue";

export default {
    components:{
        TextBox
    },
    name: "MainPage",
    data(){
        return{

        }
    },
    created(){
        if(!this.isLogined){
            alert("옳바르지 않은 접근입니다!")
            router.push("/")
        }
        else{

        }
    },
    computed:{
        getUserName(){
            return this.$store.getters.getUserInfo.userName +"님 환영합니다!"
        },
        isLogined(){
            return this.$store.getters.getIsLogined
        },
    },
    methods:{
        test(){
          login();
          createChannel("test", false, null);
          joinChannel("test1", null)
        },
        async logout(){
            this.$store.commit("setIsLogined", false)
            await router.push("/")
            socket.disconnect()
        }
    }
}
</script>

<style scoped>

</style>