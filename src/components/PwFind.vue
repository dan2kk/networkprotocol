<template>
    <div id="find">
        찾으려는 ID: <input v-model="findId" type="text" @keyup.enter="find"/>
        <button @click="find">비밀번호 찾기</button>
    </div>
</template>

<script>
import axios from 'axios'
import router from "@/router";
export default {
    name: "PwFind.vue",
    data(){
        return{
            findId:""
        }
    },
    methods:{
        async find(){
            const serverURL = this.$store.getters.getServerURL
            console.log("Find ID attempt, ID: "+this.findId);
            let findResult = (await axios.get(serverURL+'/login/find', {params: {id:this.findId}})).data
            if(!findResult.state){
                alert('입력하신 아이디를 찾을 수 없습니다. 다시 시도해주세요!')
            }
            else{
                alert('입력하신 아이디의 비밀번호는 '+ findResult.findPw +' 입니다')
            }
            router.push({path:'/'})
        }
    }
}
</script>

<style lang="scss">

</style>