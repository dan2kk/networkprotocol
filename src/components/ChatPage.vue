<template>
    <div class="chat-container">
        <div class="video-chat-remote-list">
            <div id="video-chat-remote-users" v-for="user in this.getUserList">
                <video class="remoteVideo" :id="user.name" autoplay playsinline></video>
                <label>{{user.name}}</label>
            </div>
        </div>
        <div class="video-chat-local">
            <video id="localVideo" autoplay playsinline></video>
        </div>
        <div class="chat">
            <div id="messages" v-for="message in this.getMessage">{{message.user}}  ) {{message.msg}} ||  </div>
            <form @submit.prevent="sendMessage">
                <input type="text" v-model="newMessage" placeholder="Type your message" />
                <button type="submit">Send</button>
            </form>
        </div>
        <button @click="switchVideoCall">비디오 On/Off</button>
        <button @click="startVideoCall">화상/음성 채팅 시작</button>
    </div>
</template>

<script>
import {state, sendMessageToServer, constraints, startStream, endStream} from "@/socket"
import router from "@/router";

export default {
    data() {
        return{
            newMessage: "",
        };
    },
    created(){
        if(!this.$store.getters.getIsLogined || !state.nowChannel){
            alert("옳바르지 않은 접근입니다!")
            router.push("/")
        }
    },
    methods:
    {
        sendMessage(){
            sendMessageToServer(this.newMessage)
            this.newMessage = ""
        },
        switchVideoCall(){
            constraints.video = !constraints.video
            alert("비디오 활성화: "+constraints.video)
        },
        startVideoCall(){
            endStream()
            startStream()
        }
    },
    computed:{
        state() {
            return state
        },
        getMessage(){
            return state.messageList
        },
        getUserList(){
            return state.userList
        }

    }
}
</script>
<style scoped>
.chat-container {
    display: flex; flex-direction: column;
}
.video-chat-remote-list {
    display: flex;
    height: 25%;
    width: 100%;
    float: left
}
#localVideo {
    width: 50%; object-fit: cover;
}
.remoteVideo{
    width: 25%;
    object-fit: cover;
}

.chat {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
button {
    margin-top: 1rem;
}
</style>