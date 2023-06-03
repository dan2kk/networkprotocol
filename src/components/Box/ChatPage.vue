<template>
    <div class="chat-container">
        <div class="video-chat">
            <video id="localVideo" autoplay playsinline></video>
            <video id="remoteVideo" autoplay playsinline></video>
        </div>
        <div class="chat">
            <div id="messages" v-for="message in this.getMessage">{{message.user}}  ) {{message.msg}} ||  </div>
            <form @submit.prevent="sendMessage">
                <input type="text" v-model="newMessage" placeholder="Type your message" />
                <button type="submit">Send</button>
            </form>
        </div>
        <button @click="startVideoCall">Start Video</button>
        <button @click="startAudioCall">Start Audio</button>
    </div>
</template>

<script>
import {state, sendMessageToServer} from "@/socket"

export default {
    data() {
        return{
            newMessage: "",
        };
    },
    methods:
    {
        sendMessage(){
            sendMessageToServer(this.newMessage)
            this.newMessage = ""
        }
    },
    computed:{
        getMessage(){
            return state.messageList
        }
    }
}
</script>
<style scoped>
.chat-container {
    display: flex; flex-direction: column;
}
.video-chat {
    display: flex; height: 50vh;
}
video {
    width: 50%; object-fit: cover;
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