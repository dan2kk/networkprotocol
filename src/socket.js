import { reactive } from "vue";
import { io } from "socket.io-client";
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
export let constraints = {
    video: false,
    audio: false
}
export const socket1 = io(URL,  { transports: ['websocket'] });
let P2P = require('socket.io-p2p');
export const socket = new P2P(socket1,  {
    numClients: 7,
    autoUpgrade: false
})

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
export const startStream = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = document.querySelector('video');
        video.srcObject = stream;

        video.onloadedmetadata = () => {
            video.play();
        }
        console.log("localVideo started")
        socket.emit('start-stream', JSON.stringify({
            name: state.userName,
            channel: state.nowChannel,
            stream: stream
        }));
        socket.stream = stream;

    } catch (err) {
        console.error("Error in startStream: ", err);
    }
};


socket.on('stream', (stream) => {
    console.log(stream instanceof MediaStream)
    let video = document.getElementById('remoteVideo');
    if ("srcObject" in video) {
        video.srcObject = stream;
    } else {
        video.src = window.URL.createObjectURL(stream);
    }
    video.onloadedmetadata = function() {
        video.play();
    }
    console.log("stream event started")
});
