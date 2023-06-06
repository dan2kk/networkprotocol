<template>
    <div :class="['channelJoinModal', item || null ]">
        <div class= "overlay-custom valign-text-middle notosanskr-bold-white-24px" @click="$emit('modal-close')" >
            <div class = empty-cart></div>
            창을 닫으려면 바깥을 클릭
        </div>
        <div class= "custom-modal-card">
            <main>
                <input class="inputBox" type="text" v-model="channelName" placeholder="채널 이름"/>
                <label class="custom-container">
                    <input checked="custom-checked" type="checkbox" @click="checkClicked">
                    <span class="custom-checkmark"></span>
                </label>
                <div class="inputWrapper" v-if="this.channelLocked">
                    <input class="inputBox" type="password" v-model="channelPw" @keyup.enter="joinChannel(this.channelName, this.channelPw)" placeholder="채널 비밀번호"/>
                </div>
            </main>
            <button @click="joinChannel(this.channelName, this.channelPw)">채널 접속</button>
        </div>
    </div>
</template>


<script>
import TextBox from "@/components/Box/TextBox.vue";
import {joinChannel} from "@/socket";

export default {
    name: "channelJoinModal",
    props: ["item"],
    components: {
        TextBox
    },
    computed: {
    },
    created(){
        this.channelName = this.item.name
        this.channelLocked = this.item.locked
    },
    data(){
        return{
            channelName: "",
            channelPw: "",
            channelLocked: false
        }
    },
    methods:{
        joinChannel,
        checkClicked(){
            this.channelLocked = !this.channelLocked
        }
    }
};



</script>

<style lang="sass">
@import '../../variables'

.channelJoinModal
  width: 600px
  height: 960px
  position: absolute
  top: 0px
  left: 0px

.overlay-custom
  width: 100%
  height: 100%
  position: absolute
  opacity: 0.3
  background-color: $black
  align-items: center
  border-radius: 15px

.custom-modal-card
  position: absolute
  left: 5%
  width: 90%
  margin-top: 30%
  background-color: $solitude
  z-index: 10
  border: 3px solid #b2c3e1
  overflow-y: auto
  border-top-left-radius: 15px
  border-top-right-radius: 15px

.custom-modal-card::-webkit-scrollbar
  display: none

.empty-cart
  width: 100%
  height: 80%
  opacity: 0
  background-color: black


.custom-checkbox-cart
  position: absolute
  left : 93%
  top: 60px

.custom-container
  display: block
  position: relative
  padding-left: 25px
  cursor: pointer
  font-size: 22px
  user-select: none
  input
    position: absolute
    opacity: 0
    cursor: pointer
    height: 0
    width: 0
    &:checked
      & ~.custom-checkmark
        background-color: #2196F3
        border-radius: 5px
        &:after
          display: block

.custom-checkmark
  &:after
    left: 9px
    top: 5px
    width: 5px
    height: 10px
    border: solid white
    border-width: 0 3px 3px 0
    transform: rotate(45deg)

.custom-checkmark
  position: absolute
  top: 0
  left: 0
  height: 25px
  width: 25px
  background-color: #ccc
  border-radius: 5px
  &:after
    content: ""
    position: absolute
    display: none


</style>