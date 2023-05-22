<template>
  <div>공사중</div>
</template>

<script>
import router from "@/router";

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