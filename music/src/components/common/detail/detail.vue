<template>
    <div class="detail" v-if="this.$route.params.info">
         <div class="cover">
            <i class="backList"
            @click="backList"
            >《</i>
            <h1>{{this.$route.params.info.name}}</h1>
            <img :src="this.$route.params.info.avator" alt="">
        </div>
        <div class='wrapper'>      
            <ul class='content'>
                <li v-for='(item,index) of singerList' 
                :key='index'
                @click="goPlayer(index)">
                  <h2>{{item.songname}}</h2>
                  <p > {{item.singername}}.{{item.albumname}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import $jsonp from 'common/unit/jsonp.js'
import BScroll from 'better-scroll'
export {mapMutations,mapState} from 'vuex'
export default {
    data(){
        return{
            // hehe:'',
            singerList:[]
        }
    },
    methods:{
        // 返回歌手页
        backList(){
            // console.log(this)
             this.$router.back()
        },
        goPlayer(index){
            // console.log(this.singerList)
            // console.log(this.hehe)
            // console.log(index)
            this.$store.commit('addSongList',{songlist:this.singerList,currentIndex:index})
        },
        initList(singerMid){
            // console.log(singerMid)
            let url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${singerMid}`


            $jsonp(url,{param:'jsonpCallback'})
            .then((data)=>{
                // console.log(data)
                // this.hehe=data.data.singer_name,
                
                // console.log(data.data)
                this.singerList=data.data.list.map((item)=>{
                    // console.log(item)
                    return {
                        songname:item.musicData.songname,
                        songmid:item.musicData.songmid,
                        albummid:item.musicData.albummid,
                        albumname:item.musicData.albumname,
                        singername:item.musicData.singer[0].name,
                        avator:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.musicData.albummid}.jpg?max_age=2592000`

                    }
                })
                // console.log(this.singerList)
                this.$nextTick(()=>{
                    this.initScroll()
                })
                
            })
        },
        initScroll(){
            this.scroll = new BScroll('.wrapper',{probeType:3,click:true})
        },
    },
    created(){
        if(!this.$route.params.info){
            return this.$router.back()
        }
        // console.log(this.$route.params.info)
        this.initList(this.$route.params.info.singer_mid)
    }
}
</script>
<style lang='less' scoped>
@import '~common/css/index.less';
.detail{
    position: fixed;
    z-index: 10000;
    top: 0;
    bottom: 0;
    .w(375);
    // background: red;
    .cover img{
        z-index: 1000;
        width: 100%;
    }
    .cover h1{
        font-weight: normal;
        position: absolute;
        .top(0);
        left: 10%;
        z-index: 40;
        width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
    }
    .cover i{
        position: absolute;
        .top(5);
        .left(5);
        font-style: normal;
        font-size: @fontSize-xl;
        color: #ffcd32;
}
    
    .wrapper{
        .w(375);
        .h(600);
        overflow: hidden;
        position: absolute;
        .top(263);
        background: @bgcolor;
        .content{
            .padding(30,30,20,30)
        }
        .content li{
            align-items: center;
            box-sizing: border-box;
            .h(64)
        }
        .content h2{
            font-weight: normal;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: #fff;
            font-size: @fontSize-m;
            .l_h(24)
        }
        .content p{
            font-size: @fontSize-m;
            .l_h(20);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-top: 4px;
            color: hsla(0,0%,100%,.3);
        }
    }

}
</style>

