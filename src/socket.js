import { reactive } from "vue";
import { io } from "socket.io-client";
import * as P2P from "socket.io-p2p";
import store from "@/store/index"
import router from "@/router";

export const state = reactive({
    connected: false,
    userName: null,
    channelList: [], //channel 객체 들어옴
    userList: [],
    nowChannel: null,
    messageList: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "https://localhost:9091";
const peerConnectionConfig = {
    'iceServers': [
        {'urls': 'stun:stun.stunprotocol.org:3478'},
        {'urls': 'stun:stun.l.google.com:19302'},
    ]
}
let constraints = {
    video: true,
    audio: true
}
export const socket = io(URL);

//export const peerSocket  = new P2P(socket)

socket.on("connect", () => {
    console.log("socket connected")
    state.connected = true;
});

socket.on("disconnect", () => {
    console.log("socket disconnected")
    state.connected = false;
});
socket.on("message", (data)=>{
    try{
        data = JSON.parse(data)
    }
    catch(e){
        console.error(e)
    }
    switch(data.type){
        case "login":
            if(data.success){
                state.channelList = data.channels
                console.log("Login success!!")
            }
            else{
                console.error("Already Logined in Server!!")
            }
            break
        case "channelCreate":
            if(data.success){
                state.nowChannel = data.channelName
                router.push("/chat")
            }
            else{
                console.error("channel name already exits")
            }
            break
        case "channelJoin":
            if(data.success){
                state.nowChannel = data.channelName
                state.userList = data.candidate
                router.push("/chat")
            }
            else{
                console.error(data.msg)
            }
            break
        case "channelList":
            state.channelList = data.channels
            console.log(state.channelList)
            break
        case "chatMessage":
            state.messageList.push({
                user: data.user,
                msg: data.msg
            })
            console.log(data.user + " "+data.msg)
            break
    }
})
export function login(){
    if(!state.userName){
        state.userName= store.state.userInfo.userName
    }
    console.log(state.userName)
    socket.emit("login", JSON.stringify({
        name: state.userName
    }))
}
export function createChannel(name, islocked, password){
    socket.emit("channelCreate", JSON.stringify({
        name: state.userName,
        channelName: name,
        isLocked: islocked,
        password: password
    }))
    state.messageList = []
}
export function joinChannel(name, pw){
    socket.emit("channelJoin", JSON.stringify({
        name: state.userName,
        channelName: name,
        password: pw
    }))
    state.messageList= []
}
export function refreshChannel(){
    socket.emit("channelList")
}
export function sendMessageToServer(msg){
    socket.emit("chatMessage", JSON.stringify({
        name: state.userName,
        channel: state.nowChannel,
        msg: msg
    }))
}
