<template>
    <div>공사중</div>
    <button @click="test">테스트</button>
    <div id="upperbar">
        <TextBox class="user-info-box" :text='this.getUserName' size="150" />
        <TextBox class="logout" @click="logout" text="Logout" size="75"/>
    </div>
    <div id="channellist" v-for="item in this.getChannelInfo">
        <TextBox class="channelName" :text="item.name" size="150"/>
        <TextBox class="channelUsers" :text="item.users" size="75"/>
        <TextBox class="channelisLocked" text="잠김" v-if="item.locked" size="75"/>
    </div>
</template>

<script>
import router from "@/router";
import {login, createChannel, joinChannel,refreshChannel, socket, state} from "@/socket";
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
        getChannelInfo(){
            return state.channelList
        }
    },
    methods:{
        test(){
          login()
          refreshChannel()
          createChannel("test", true, "wogh123")
        },
        async logout(){
            this.$store.commit("setIsLogined", false)
            await router.push("/")
            socket.disconnect()
        }
    }
}
</script>

<style lang="sass" scoped>
#upperbar
  display: flex
    justify-content: space-between

  .user-info-box, .logout
    margin: 1rem
    font-size: 14px


#channellist
  display: flex
  flex: wrap
  margin: 1rem

  .channelName, .channelUsers, .channelisLocked
    width: auto
    margin: 0.5rem
    font-size: 14px

</style>