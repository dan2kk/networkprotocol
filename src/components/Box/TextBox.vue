<template>
    <div :style= "setStyle" :class= "[`text-box`, size || ``, color || ``, bgc || '']">
        <div class="text-box-text valign-text-middle">
            {{ text }}
        </div>
    </div>
</template>

<script>
export default {
    name: "TextBox",
    props: ["text", "size", "color", "bgc"],
    computed:{
        setStyle(){
            let size
            let color
            let bgc
            if (this.size == undefined) size = "150px"
            else size = this.size

            if (this.color == undefined) color = "black"
            else color = this.color
            if (this.bgc == undefined) bgc = "black"
            else bgc = this.bgc
            return {
                '--size' : `${size}px`,
                '--color' : `${color}`,
                '--background-color' : `${bgc}`
            }
        }
    }
};
</script>

<style lang="sass">
@import '@/../variables'

.text-box
  align-items: flex-start
  display: flex
  height: 48px
  position: relative
  width: var(--size)
  background-color: var(--background-color)
  border: 0px white solid
  border-radius: 7px


.text-box-text
  align-self: stretch
  flex: 1
  letter-spacing: 0
  line-height: normal
  text-align: center
  color: var(--color)
  font-family: "Noto Sans KR", Helvetica
  font-size: 14px
  font-style: normal
  font-weight: 400
</style>
