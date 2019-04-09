<template>
    <div class="title" v-if="this.$route.params.info">
         <div class="cover">
            <i class="backList"
            @click="backList"
            >《</i>
            <h1>{{this.head}}</h1>
            <img :src="this.hehe" alt="">
        </div>
        <div class='wapper'>      
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
            hehe:'',
            head:'',
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
            // console.log(this.$store)
            // console.log(index)
            this.$store.commit('addSongList',{songlist:this.singerList,currentIndex:index})
        },
        initList(dissid){
            // console.log(dissid)
            let url = `/homelist/music/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=${dissid}&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0`

            this.$axios(url)
            .then((data)=>{
                // console.log(data)
                this.hehe=data.cdlist[0].logo,
                // console.log(this.hehe)
                this.head=data.cdlist[0].dissname,
                // console.log(data.cdlist[0].songlist)
                this.singerList=data.cdlist[0].songlist.map((item)=>{
                    // console.log(item)
                    return {
                        songname:item.songname,
                        songmid:item.songmid,
                        albummid:item.albummid,
                        albumname:item.albumname,
                        singername:item.singer[0].name,
                        avator:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`

                    }
                })
                // console.log(this.singerList)
                this.$nextTick(()=>{
                    this.initScroll()
                })
                
            })
        },
        initScroll(){
            // console.log(1)
            this.scroll = new BScroll('.wapper',{probeType:3,click:true})
        },
    },
    created(){
        // console.log(this)
        if(!this.$route.params.info){
            return this.$router.back()
        }
        // console.log(this.$route.params.info)
        this.initList(this.$route.params.info.dissid)
    },
}
</script>
<style lang='less' scoped>
@import '~common/css/index.less';
.title{
    position: fixed;
    z-index: 100;
    top: 0;
    bottom: 0;
    .w(375);
    // background: red;
    .cover img{
        z-index: 10;
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
    .wapper{
        width: 100%;
        .h(420);
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


