<template>
  <div>공사중</div>
</template>

<script>
import router from "@/router";
import {io} from 'socket.io-client'
export default {
    name: "main",
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
            const serverURL = this.$store.getters.getServerURL
            let socket = new io(serverURL)
            socket.on("connect", ()=>{
                console.log(socket.id)
                this.connected = true;
            },
            error => {
                //fail
                console.log("연결 실패:",error);
                this.connected = false;
            })
        }
    },
    computed:{
        userInfo(){
            return this.$store.getters.getUserInfo
        },
        isLogined(){
            return this.$store.getters.getIsLogined
        },
    }
}
</script>

<style scoped>

</style>