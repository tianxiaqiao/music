<template>
    <div class="search">
        <div class="search-box">
            <div class="searchInput">
                <i class="iconfont">&#xe7f6;</i>
                <input type="text" class="text" placeholder="搜索歌曲、歌手" v-model="input">
                <p class="close"  v-show="show"
                @click="close"
                >X</p>
            </div>
        </div>
        <div class="wrapper">
            <div class="content">
                <ul   v-show="show">
                    <li 
                    v-for="(item,index) in this.list"
                    :key="index" 
                    class="singList"
                    @click="goPlayer(index)"
                    >
                        <div class="iconfont">&#xe680;</div>
                        <p>{{item.songname}}-{{item.singername}}</p>
                    </li>
                </ul>
                <div class="hot" v-show="active">
                    <h1>热门搜索</h1>
                    <ul class="hotList">
                        <li v-for="(item,index) in this.showList.slice(0,16)"
                        :key="index"
                        @click="hotFind(index)"
                        >
                            <span>{{item.k}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import apiconfig from'common/api/apiconfig.js'
import jsonp from 'jsonp'
export default {
    data(){
        return{
            input:'',
            show:false,
            active:true,
            showList:[],
            list:[]
        }
    },
    methods:{
        initScroll(){
            new BScroll('.wrapper',{click:true})
        },

        goPlayer(index){
            // console.log(this.singerList)
            // console.log(this.$store)
            // console.log(index)
            this.$store.commit('addSongList',{songlist:this.list,currentIndex:index})
        },

        // 搜索
        search(){
            let url = '/seach/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w='+this.input+'&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5'
            this.$axios.get(url)
            .then((data)=>{
                // console.log(data)
                // console.log(data.data.song.list)
                this.list = data.data.song.list.map((item)=>{
                    return {
                        songname:item.songname,
                        songmid:item.songmid,
                        albummid:item.albummid,
                        albumname:item.albumname,
                        singername:item.singer[0].name,
                        avator:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`

                    }
                })
                // console.log(this.list)
            })
          
        },

        // 请求热搜数据
        hotList(){
            this.$axios.get(apiconfig.hotApi)
            .then((data)=>{
                // console.log(data)
                this.showList = data.data.hotkey
                // console.log(data.data.hotkey)
                // console.log(this.showList)
            })
        },
        hotFind(index){
            this.input = this.showList[index].k
            // console.log(hotSearch)
        },
        showState(){
            // console.log(this.input)
            if(this.input==''){
                this.active=true
                this.show=false
            }else{
                this.show=true
                this.active=false
            }
        },
        close(){
            this.input=''
        },
    },
    watch:{
        input(newV,oldV){
            // console.log(newV)
            // console.log(oldV)
            this.search()
        }
    },
    created(){
        this.close() 
        this.hotList()
        // console.log(this)
        // this.search()
        

    },
    mounted(){
        this.initScroll()
        this.hotList()
    },
    updated(){
        // console.log(this.input)
        this.showState()
        // this.search() 
        

    }
}
</script>
<style lang="less" scoped>
@import '~common/css/index.less';

.search{
    .w(375);
    .search-box{
        width: 100%;
        .h(40);
        .padding(20,0,20,0);
        .searchInput{
            .w(335);
            height: 100%;
            border-radius: 6px;
            display: flex;
            margin: 0 auto;
            background: @bggcolor;
            .padding(0,6,0,6);
            box-sizing: border-box;
            .iconfont{
                .w(24);
                .h(24);  
                font-size: @fontSize-t;
                .margin(8,8,8,0);
            }
            .text{
                .w(274);
                .h(18); 
                border: none; 
                outline:medium;
                background: @bggcolor;
                .margin(11,0,11,0);
                color: #fff;
            }
            .close{
                .w(16);
                .h(16); 
                .l_h(16);
                text-align: center;
                border-radius: 16px;
                font-size: @fontSize-l;
                background: @bgcolor;
                color: @bggcolor;
                .margin(12,0,12,0);
            }
        }
    }
    .wrapper{
        width: 100%;
        .h(500);
        overflow: hidden;
        color: @rankColor;
        .content{
            .padding(0,30,0,30);
            .singList{
                .h(36);
                .h(14);
                display: flex;
                // justify-content: space-between;
                font-size: @fontSize-l;
                .padding(0,0,20,0);
                .iconfont{
                    .w(40);
                    height: 100%;
                    font-size: @fontSize-s;
                }
                p{
                    height: 100%;
                    font-size: @fontSize-s;
                }
            }
            .hot{
                width: 100%;
                .padding(0,20,20,0);
                color: @navFontColor;
                font-size: @fontSize-m;
                h1{
                    font-size: @fontSize-m;
                    font-weight: normal;
                    .margin(0,0,20,0);
                }
                .hotList{
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        .padding(5,10,5,10);
                        .margin(0,20,10,0);
                        border-radius: 6px;
                        background: #333;
                    }

                }
            }
        }
    }
    
}
</style>
