<template>
  <div class="music-header">
      <router-link 
        tag='div'
        to='/recommend'
        active-class='sel'
      >推荐</router-link>
      <router-link 
        tag='div'
        to='/singer'
        active-class='sel'
      >歌手</router-link>
      <router-link 
        tag='div'
        to='/rank'
        active-class='sel'
      >排行</router-link>
      <router-link 
        tag='div'
        to='/search'
        active-class='sel'
      >搜索</router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang='less' scoped>
@import '~common/css/index.less';

.music-header{
  color: @navFontColor;
  .w(375);
  .l_h(44);
  text-align: center;
  font-size:@fontSize-m; 
   display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 1.125rem;
  div{
    .l_h(44);
  }
  .sel{
    border-bottom: 1px solid @fontColor;
    color: @fontColor;
  }
}



</style>