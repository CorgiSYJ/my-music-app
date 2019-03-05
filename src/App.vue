<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!--占位符用来显示其它的组-->
    <router-view></router-view> 
    <player></player>
  </div>
</template>

<script>
//引入m-header.vue子组件
import MHeader from './components/m-header/m-header.vue'
import Tab from './components/tab/tab.vue'
import Player from './components/player/player.vue'

export default {
  data(){
    return{

    }
  },
  created(){

  },
  methods: {
    
  },
  components:{
    MHeader,
    Tab,
    Player
  }
}
</script>

<style>
#app{
  position:fixed;
  top:0px;
  width:100%;
  height:100%;
}
</style>
