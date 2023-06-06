<template>
    <div>공사중</div>
    <div id="upperbar">
        <TextBox class="user-info-box" :text='this.getUserName' size="150" bgc="white" />
        <button @click="test">테스트방 생성</button>
        <button @click="test1">테스트방 참가</button>
        <TextBox class="logout" @click="logout" text="Logout" size="75" bgc="white"/>
    </div>
    <div class="channellist">
        <TextBox class="channelName" text="방번호" size="100" bgc="pink"/>
        <TextBox class="channelName" text="체널 이름" size="300" bgc="pink"/>
        <TextBox class="channelUsers" text="방생성" size="100" bgc="pink"/>
    </div>
    <div class="channellist" v-for="item in this.getChannelInfo">
        <TextBox class="channelNumber" :text="item.number" size="100" bgc="pink"/>
        <TextBox class="channelName" :text="item.name" size="300" bgc="pink"/>
        <TextBox class="channelUsers" :text="item.users" size="100" bgc="pink"/>
    </div>
    <!--
    <CustomModal class="custom-modal" v-if="this.onCreateModal" v-on:modal-close="closeCreateModal"/>
    <CustomModal class="custom-modal" v-if="this.onJoinModal" v-on:modal-close="closeJoinModal"/>
    -->
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
            onCreateModal : false,
            onJoinModal: false
        }
    },
    created(){
        if(!this.isLogined){
            alert("옳바르지 않은 접근입니다!")
            router.push("/")
        }
        else{
            refreshChannel()
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
        async test(){
            await login()
            await createChannel("test", true, "wogh123")
        },
        async test1(){
            await login()
            await joinChannel("test", "wogh123")
        },
        async logout(){
            this.$store.commit("setIsLogined", false)
            await router.push("/")
            socket.disconnect()
        },
        async clickEvent(item){
            if(item.isLocked){
                this.onJoinModal = true
            }
            else{
                await joinChannel(item.name)
            }
        },
        closeCreateModal(){
            this.onCreateModal = false
        },
        closeJoinModal(){
            this.onJoinModal = false
        }
    }
}
</script>

<style lang="sass" scoped>
#upperbar
    display: flex
    justify-content: space-between
    height: 52px
    width: 500px
.user-info-box, .logout
    margin: 2px
    font-size: 14px
button
    height: 30px
    background-color: #ffffff

.channellist
    display: flex
    width: 500px
    .channelName, .channelUsers, .channelNumber
        margin: 0.5rem
        font-size: 14px

</style>