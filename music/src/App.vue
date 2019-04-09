<template>
  <div id="app">
   <musicHeader></musicHeader>
   <navigate></navigate>
   <router-view></router-view>
   <player></player>
  </div>
</template>

<script>
import musicHeader from 'components/common/music-header/music-header.vue'
import navigate from 'components/common/navigate/navigate.vue'

import apiconfig from'common/api/apiconfig.js'
import player from 'components/common/player/player.vue'
export default {
  name: 'App',
  components:{musicHeader,navigate,player},
  created(){
   
  }
}
</script>

<style lang='less' scoped>
@import '~common/css/index.less';
// @import './common/css/mixin.less';
#app{
  background: @bgcolor;
  position:fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
