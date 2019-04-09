<template>    
    <div class="player" v-if='songlist.length'>
        <div class="fullScreen" v-show="this.fullScreen">
            <div class="bg">
                <img :src="songInfo.avator" alt="">
            </div>
            <div class="header">
                <span @click="screenChange">《</span>
                <h1>{{songInfo.songname}}</h1>
                <h2>{{songInfo.singername}}</h2>
            </div>
            <div class="cdWrapper">
                <div class="cdBox">
                    <div class="cd">
                        <img :src="songInfo.avator" alt="">
                    </div>
                </div>
                <div class="lyri">
                    {{this.lrc}}
                </div>
            </div>
            <div class="bottom">
                <div class="dot">
                    <span></span>
                    <span></span>
                </div>
                <div class="barWrapper">
                    <span id="startTime">{{startTime}}</span>
                    <div class="barBox">
                        <div class="innerBar"></div>
                        <div class="progpressBtn"></div>
                        <div class="progpressBar"></div>
                    </div>
                    <span id="endTime">{{endTime}}</span>
                </div>
                <div class="btn">
                    <div><i class="iconfont">&#xe66c;</i></div>
                    <div><i class="iconfont"  @click="prevSong">&#xe654;</i></div>
                    <div><i class="iconfont" v-show="play"  @click="player">&#xe60c;</i></div>
                    <div><i class="iconfont" v-show="!play" @click="player">&#xe6ad;</i></div>
                    <div><i class="iconfont"  @click="nextSong">&#xe656;</i></div>
                    <div><i class="iconfont">&#xe617;</i></div>
                </div>
            </div>
            <audio   
                ref='audio'
                @canplay="canPlay"
                :src="songInfo.audiosrc"
                @timeupdate="updateTime"
                >
            </audio>
                    <!-- <button>prev</button>
                    <button>next</button> -->
        </div>
       

        <!-- 小播放屏幕 -->
        <div class="smallScreen" 
        v-show="!this.fullScreen" 
        @click="screenChange"
        >
            <div class="left">
                <div class="sg">
                    <img :src="songInfo.avator" alt="">
                </div>
                <div class="smallHeader">
                    <h1>{{songInfo.songname}}</h1>
                    <h2>{{songInfo.singername}}</h2>
                </div>
            </div>
            <div class="smallBtn">
                <div><i class="iconfont" v-show="play"  @click="player">&#xe60c;</i></div>
                <div><i class="iconfont" v-show="!play" @click="player">&#xe6ad;</i></div>
                <div><i class="iconfont">&#xe617;</i></div>
            </div>

        </div>
    </div>
</template>

<script>
import {Base64} from 'js-base64'
import Lyric from 'lyric-parser'
import {mapState,mapGetters,mapMutations} from 'vuex'
export default {
    data(){
        return{
            fullScreen:true,
            lrc:'',
            play:false,
            startTime:'',
            endTime:'',
        }
    },
    methods:{
        //获取音乐时间
        updateTime(e){
            // console.log(e)
            // console.log(e.target.currentTime)
            // 获取播放时间
            let interval = parseInt(e.target.currentTime)
            // console.log(interval)
            let startSeconds = this.pad(interval % 60)
            // console.log(seconds)
            let startMunite = parseInt(interval / 60 )
            // console.log(munite)
            this.startTime = `${startMunite}:${startSeconds}`
            
            // 获取音乐总时间
            // console.log(e.target.duration)
            let totalTime = parseInt(e.target.duration)
            let endSeconds = this.pad(totalTime % 60)
            let endMunite = parseInt(totalTime / 60 )
            this.endTime = `${endMunite}:${endSeconds}`
        },
        // 音乐开始时间补零
        pad(num){
            if(num<10){
                num = '0'+num
            }
            return num
        },

        // 播放与暂停
        player(){
            // console.log(1)
            this.fullScreen=true
            this.play=!this.play
            if(!this.play){
                this.$refs.audio.play()//播放歌曲
            }else{
                this.$refs.audio.pause()//暂停歌曲
            }
            if(this.play){
                this.lrcObj.togglePlay()//暂停歌词
            }else{
                this.lrcObj.play()//播放歌词
            }
 
        },
        // 大小屏幕切换
        screenChange(){
            this.fullScreen=!this.fullScreen
        },

        // 获取歌词
        getLyric(url){
            this.$axios.get(url)
            .then((data)=>{
                // console.log(data)
                let text = Base64.decode(data.lyric)
                // console.log(text)
                this.lrcObj = new Lyric(text,(lrc)=>{
                    // console.log(lrc)
                    this.lrc=lrc.txt
                    // console.log(this.lrc)
                })
                this.lrcObj.play()//播放歌词
                // console.log(lrcObj)
            })
        },
        // 上一曲下一曲
        ...mapMutations(['nextSong','prevSong']),
        canPlay(){
            // console.log(12345678)
            this.$refs.audio.play()//更新播放歌曲
            this.play=false
        },

    },
    watch:{
        songInfo(newSong,oldSong){
            this.getLyric(this.songInfo.lyricsrc)
            // console.log(newSong)
        },
    },
    computed:{
        ...mapState({songlist:state=>state.song.songlist,
                    currentIndex:state=>state.song.currentIndex
                    }),

        // ...mapGetters(['currentSong']),
        songInfo(){
            let info = this.songlist[this.currentIndex]
            // console.log(info)
            if(info==[]||info==undefined){
                return []
            }else{
                // console.log(info)
                let songmid=info.songmid
                // console.log(songmid)
                // info.audiosrc=`http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?guid=4330738943&vkey=6600F10AAA2F84495349CA493F978E7CDD703CF976C3B6B284D910C709CE66A0C17CF838558D335C0871F900618C01A0D8748D0092424A2D&uin=0&fromtag=38`
                info.audiosrc=`http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?guid=5000225016&vkey=481963A8BEEDA47CB2E6657B139287DACF1E7B8E9C9F2F3CEC185C7F72B1469CB7F458CB2496EDC8FBC877001C60458AF45F70C49C97889D&uin=0&fromtag=38`
                info.lyricsrc=`/gc/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${songmid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1552895615274`
            }
            // console.log(info)
            return info
        }

    },
    created(){
            this.startTime='0'+':'+'00'
            this.endTime='0'+':'+'00'
    },
    mounted(){
        // console.log(this.songlist)
        // console.log(this.songInfo)
        this.audio=this.$refs.audio

    },
    updataed(){
        // console.log(this.songInfo)
    }
}
</script>
<style lang='less' scoped>
@import '~common/css/index.less';
.player{
    .fullScreen{
        position: fixed;
        .w(375);
        top:0;
        bottom: 0;
        background: #333;
        z-index: 100000000;
        .bg{
            position: absolute;
            z-index: -999;
            .w(375);
            height: 100%;
            img{
                width: 100%;
                height: 100%;
                filter: blur(10px);
                opacity: 0.9;
            }
        }
        .cdWrapper{
            .margin(0,0,120,0);
            .cdBox{
                .h(300);
                position: relative;
                width: 100%;
                clear:before;
                .cd{
                    position: absolute;
                    left: 10%;
                    top: 0;
                    // .margin(0,0,0,215) ;
                    box-sizing: border-box;
                    width: 80%;
                    .h(300);
                    border-radius: 50%;
                    border: 10px solid hsla(0,0%,100%,.1);
                    overflow: hidden;
                    img{
                        display:inline-block;
                        width: 100%;;
                        height: 100%;
                    }
                }
            }
            .lyri{
                width: 80%;
                margin: 30px auto 0;
                overflow: hidden;
                text-align: center;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                color: hsla(0,0%,100%,.5);
            }
        }
        audio{
            position: relative;
            left: 10%;
        }
        .bottom{
            .barWrapper{
                font-size: @fontSize-s;
                color: #fff;
                display: flex;
                justify-content: space-between;
                .padding(0,35,0,35);
                .barBox{
                        display: flex;
                        justify-content: space-between;
                        .w(230);
                        position: relative;
                        .margin(0,0,30,0);
                    .innerBar{
                        width: 100%;
                        .h(4);
                        position: relative;
                        .top(5%);
                        background: rgba(0,0,0,.3);
                    }
                    .progpressBar{
                            position: absolute;
                            .top(5%);
                            .w(100);
                            .h(4);
                            background: #ffcd32;
                    }
                    .progpressBtn{
                        position: absolute;
                        .left(92);
                        box-sizing: border-box;
                        .w(16);
                        .h(16);
                        border: 3px solid #fff;
                        border-radius: 50%;
                        background: #ffcd32;
                        z-index: 3;
                    }
                
                }
            }
            .btn{
                .padding(0,0,0,30);
                .iconfont{
                    color: #ffcd32;
                    font-size: @fontSize-d;
                    float: left;
                    .margin(0,27,0,0)
                }
    
            }
        }
        .header{
            .margin(0,0,20,0);
            h1{
                font-weight: normal;
                width: 70%;
                margin: 0 auto;
                .l_h(40);
                text-align: center;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: @fontSize-xl;
                color: #fff;
            }
            span{
                position: absolute;
                .top(0);
                .padding(9,9,9,9);
                font-size: @fontSize-t;
                color: #ffcd32;
                transform: rotate(-90deg);
            }
            h2{
                line-height: 20px;
                text-align: center;
                font-size: 14px;
                color: #fff;
            }
        }
    }
    .smallScreen{
        z-index: 1;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 180;
        width: 100%;
        .h(60);
        background: @bggcolor;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        .padding(0,10,0,0);
        .left{
            display: flex;
            .sg{
                .w(40);
                .h(40);
                .padding(10,10,0,20);
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .smallHeader{
                .margin(10,0,0,0);
                h1{
                    font-weight: normal;
                    margin-bottom: 2px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-size: 14px;
                    color: #fff;
                }
                h2{
                    font-weight: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-size: 12px;
                    color: hsla(0,0%,100%,.3);
                }
            }
        }
        .smallBtn{
            display: flex;
            justify-content: space-between;
            .iconfont{
                width: 30px;
                padding: 0 10px;
                color: #ffcd32;
                font-size: @fontSize-y;

            }
        }
 
    }
}

</style>


