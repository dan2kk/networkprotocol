<template>
  <router-view/>
</template>
<script>
export default {
    name: "App",
    computed:{
        isLogined(){
            return this.$store.getters.getIsLogined
        }
    }

}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    height: 1280px;
    width: 960px
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
