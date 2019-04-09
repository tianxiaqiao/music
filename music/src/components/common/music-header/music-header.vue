<template>
  <div class="music-header">
   Chicken Music
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
@import '~common/css/index.less';
// @import './common/css/mixin.less';
.music-header{
  color: @fontColor;
  .w(375);
  .l_h(44);
  text-align: center;
  font-size:@fontSize-l; 
}
</style>