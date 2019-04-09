<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide"
             v-for='(item,index) in list'
             :key='index'
             >
                <img :src="item.picUrl" alt="">
            </div>
            
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        
        <!-- 如果需要导航按钮 -->
        <!-- <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div> -->
        
        <!-- 如果需要滚动条 -->
        <!-- <div class="swiper-scrollbar"></div> -->
    </div>
</template>

<script>
import Swiper from 'swiper'
import apiconfig from'common/api/apiconfig.js'
export default {
    data(){
        return{
            list:[]
        }
    },
    methods:{
        initswiper(){
            new Swiper ('.swiper-container', {
                // direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项
                autoplay:true,
                
                // 如果需要分页器
                pagination: {
                el: '.swiper-pagination',
                },
                
                // 如果需要前进后退按钮
                // navigation: {
                // nextEl: '.swiper-button-next',
                // prevEl: '.swiper-button-prev',
                // },
                
                // 如果需要滚动条
                // scrollbar: {
                // el: '.swiper-scrollbar',
                // },
            })        
        },
        initdata(){
            // console.log(this)
            let url = apiconfig.bannerApi
            // console.log(url)
            this.$axios.get(url)
            .then((data)=>{
                this.list=data.data.slider
            // console.log(this.list)
                this.$nextTick(()=>{
                    //在上一次数据更新结束并且页面加载完成执行
                      this.initswiper()
                })
            })
        }
    },
 
    created(){
        this.initdata()
    },
    mounted(){
      
    }
       
}
</script>

<style lang="less" scoped>
@import '../../../../node_modules/swiper/dist/css/swiper.min.css';
@import '~common/css/index.less';
.swiper-container{
    .w(375);
    .h(180);
    img{
        width: 100%;
        height: 100%;
    }
}

</style>

