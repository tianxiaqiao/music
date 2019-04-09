<template>
    <div class='recommend'>
        
        <div class="wrapper">
            <div class="content">
                <Banner></Banner>
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>
                    <li class="item" v-for='(item,index) in homeList'
                    :key='index'
                    @click="goList(item)"
                    >
                        <div class="left">
                            <img v-lazy="item.imgurl" width="60" height="60" alt="">
                        </div>
                        <div class="right">
                            <h2>{{item.creator.name}}</h2>
                            <p>{{item.dissname}}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
// import axios from 'axios'
import BScroll from 'better-scroll'
import Banner  from 'components/common/banner/banner.vue'
import apiconfig from'common/api/apiconfig.js'
export default {
    components:{
       Banner 
    },
    data(){
        return{
            homeList:[]
        }
    },
    methods:{
        initScroll(){
            new BScroll('.wrapper',{click:true})
        },
        initRecommoedData(){
            let url = apiconfig.listApi
            // console.log(url)
            // console.log(this)
            this.$axios.get(url)
            .then((data)=>{
                // console.log(data)
                this.homeList=data.data.list
                // console.log(this.homeList)
            })
        },
        goList(item){
            // console.log(item)
            this.$router.push({name:'title',params:{info:item}})
        }
    }, 
    created(){
        this.initRecommoedData()
    },
    mounted(){
        this.initScroll()
    }
}
</script>
<style lang="less" scoped>
@import '~common/css/index.less';
.recommend{
    .wrapper{
        .w(375);
        .h(590);
        overflow: hidden;
    }
    .list-title{
        color: @fontColor;
        text-align: center;
        .l_h(65);
        font-size: @fontSize-m;
    }
    .item{
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding: 0 20px 20px;
        .left{
            padding-right: 20px;
        }
        .right{
            flex: 1;
            .l_h(20);
            overflow: hidden;
            font-size: @fontSize-m;
            color: #fff;
        }
        .right h2{
            font-weight: normal;
            font-size:100%;
            margin-bottom: 10px;
        }
        .right p{
            font-weight: normal;
            font-size:100%;
            color: @homeListColor;
        }
    }
 
}

</style>
