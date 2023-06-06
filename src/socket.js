import { reactive } from "vue";
import { io } from "socket.io-client";
import store from "@/store/index"
import router from "@/router";
import {Peer} from "peerjs"

export const state = reactive({
    connected: false,
    userName: null,
    channelList: [], //channel 객체 들어옴
    userList: [],
    nowChannel: null,
    messageList: [],
    peerId: null
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? window.location.protocol + "//" + window.location.host : "https://localhost:9091"
const peerConnectionConfig = {
    'iceServers': [
        {'urls': 'stun:stun.stunprotocol.org:3478'},
        {'urls': 'stun:stun.l.google.com:19302'},
    ]
}
export let constraints = {
    video: true,
    audio: true
}

export const socket = io(URL);
socket.on("connect", () => {
    console.log("socket connected")
    state.connected = true;
});

socket.on("disconnect", () => {
    console.log("socket disconnected")
    state.connected = false;
});
socket.on("message", async (data)=>{
    console.log(data)
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
                for(let i=0; i<state.userList.length; i++){
                    if(state.userList[i].name == state.userName){ //자기자신은 제거
                        state.userList.splice(i, 0)
                    }
                }
                await router.push("/chat")
            }
            else{
                console.error(data.msg)
            }
            break
        case "userJoin":
            state.userList.push(data.user)
            state.messageList.push({
                user:"서버 관리자",
                msg: data.user.name+"님이 참가하셨습니다."
            })
            console.log("userJoin")
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
        case "stream":
            let stream = null
            if(constraints.video || constraints.audio){
                stream = await navigator.mediaDevices.getUserMedia(constraints);
            }
            const video = document.querySelector('#localVideo');
            video.srcObject = stream
            video.onloadedmetadata = () => {
                video.play();
            }
            let call = p2pSocket.call(data.peerId, stream)
            call.on("stream", (stream)=>{
                const rVideo = document.querySelector('#'+data.name);
                rVideo.srcObject = stream
                rVideo.onloadedmetadata = () => {
                    rVideo.play();
                }
                console.log("remoteVideo started")
            })
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
const p2pSocket = new Peer({config: peerConnectionConfig})
p2pSocket.on('open', async function(id) {
    state.peerId = id
    console.log("p2pSocket opened id: ", state.peerId)
});
export const startStream = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = document.querySelector('#localVideo');
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
        }
        console.log("localVideo started")
        p2pSocket.on('call', function(call){
            call.answer(stream)
        })
        console.log("send server request")
        socket.emit("start-stream", JSON.stringify({
            peerId: state.peerId,
            name: state.userName,
            channel: state.nowChannel
        }))
    } catch (err) {
        console.error("Error in startStream: ", err);
    }
};
