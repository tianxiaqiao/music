<template>
    <div class="rank">
        <div class="wrapper">
            <div class="content">
                <ul>
                    <li class="rankList" v-for="(item,index) in this.rankList"
                    :key="index"
                    @click="goList(item)"
                    >
                        <img v-lazy="item.picUrl" alt="">
                        <ul class="right">
                            <li v-for="(items,indexs) in item.songList"
                            :key="indexs"
                            >{{indexs+1}} {{items.songname}}-{{items.singername}}</li>
                           
                        </ul>
                    </li>
                </ul>
            </div>
        </div>  
        <router-view></router-view>
    </div>
</template>
<script>
// import Axios from 'axios'

import apiconfig from 'common/api/apiconfig.js'
import BScroll from 'better-scroll'
export default {
    data(){
        return{
            rankList:[],
        }
    },
    methods:{
        goList(item){
            // console.log(this)
            this.$router.push({name:'list',params:{info:item}})
        },
        initScroll(){
            new BScroll('.wrapper',{click:true})
        },
        initList(){
            // console.log(this.$axios)
            this.$axios.get(apiconfig.rankApi)
            .then((data)=>{
                // console.log(data)
                let num = data.indexOf('(')
                // console.log(num)
                // JSON.parse将JSON字符串转换为对象
                // console.log(data.slice(num + 1, -1))
                //  console.log(JSON.parse(data.slice(num + 1, -1)))
                this.rankList = JSON.parse(data.slice(num + 1, -1)).data.topList
                // console.log(this.rankList)
            })
        }
    },
    created(){
        this.initList()
    },
    mounted(){
        this.initScroll()
    }
}
</script>
<style lang="less" scoped>
@import '~common/css/index.less';
.rank{
    .wrapper{
        .w(375);
        .h(590);
        overflow: hidden;
        .content{
            box-sizing: border-box;
            .padding(5,20,20,20);
            .rankList{
                display: flex;
                .margin(20,0,0,0);
                font-size: @fontSize-s;
                color: @rankColor;
                background: #333;
                .right{
                    flex: 1;
                    .padding(8,20,0,20);
                    box-sizing: border-box;
                    li{
                        .l_h(28);
                           overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap
                    }
                }
            }
            .rankList img{
                .w(100);
                .h(100);
            }
            .rankList ul{
                .w(100);
                .h(100);
            }
        }
    }
}

</style>
