<template>
    <div class='singer'>
        <div class='wapper'>
            <ul class='content'>
                <li v-for='(group,index) of singerList' 
                :key='index'>
                    <div class='title' :ref='group.title'>{{group.title}}</div>
                    <ul class='singer-group'>
                        <li class='singer-item'  v-for='(item,index) in group.item' 
                        :key='index'>
                            <div @click="goDetail(item)">
                                <img width='50' height='50' v-lazy='item.avator' alt="">
                                <span>{{item.name}}</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <!-- 侧边栏 -->
        <ul class='slider'
        @touchstart='start'
        @touchmove='move'
        @touchend='end'
        >
            <li v-for='(item,index) in sliderData'
            :key="index"
            :class='index==Findex?"sel":""'
            @click='go(item,index)'
            >
                {{item==='hot'?'热':item}}
            </li>
        </ul>
        <router-view></router-view>>
    </div>
</template>
<script>
import apiconfig from'common/api/apiconfig.js'
import BScroll from 'better-scroll'
import Singer from 'common/js/singer-data.js'
export default {
    data(){
        return{
            singerList:[],
            Findex:0,
        }

    },
    methods:{
        start(e){
            // console.log('按下')
            this.startY=e.touches[0].clientY
            // console.log(this.startY)
            // console.log(e)
            // console.log(e.target.innerText);
            // console.log(this.sliderData)
            this.satrtIndex=this.sliderData.indexOf(e.target.innerText)
            // console.log(this.satrtIndex)

        },
        move(e){
            //  console.log('滑动')
             let moveY=e.touches[0].clientY
            //  console.log(this.moveY)
             let distance = moveY - this.startY
             let index = Math.ceil(distance/18)
            //  console.log(distance,index)
            this.Findex = index+this.satrtIndex

            // console.log(this.sliderData.length)

            if(this.Findex<=0){
                this.Findex=0
            }else if(this.Findex>=this.sliderData.length-1){
                this.Findex=this.sliderData.length-1
            }
            let Findex = this.sliderData[this.Findex]
            // console.log(this.Findex)
            // console.log(Findex)
            // console.log(this.$refs[Findex])
            this.scroll.scrollToElement(this.$refs[Findex][0])
        },
        end(e){
            //  console.log('抬起')
        },
        go(item,index){
            // 滚动到某个元素
            // console.log(item)
            // console.log(this.$refs)
            // console.log(this.$refs[item])
            // console.log(this.Findex)
            // console.log(index)
            this.Findex=index
            this.scroll.scrollToElement(this.$refs[item][0])
        },
        // 引入本页列表数据
        getList(){
            this.$axios.get(apiconfig.singerApi)
            .then((data)=>{
                // console.log(data)
                let list = data.data.list
                // console.log(list)
                this.singerList = Singer.initData(list)


      
                this.$nextTick(()=>{
                    this.initScroll()
                })
                // console.log(obj)
                // console.log(arr)
                // console.log(this.singerList)
            })
        },
        initScroll(){
            this.scroll = new BScroll('.wapper',{probeType:3,click:true})
            this.scroll.on('scroll',(pos)=>{
                // console.log(this.ceateScrollHeight)
                // console.log(pos.y)
                for (let index = 0; index < this.ceateScrollHeight.length; index++) {
                    if(this.ceateScrollHeight[index]<=Math.abs(pos.y)){
                        this.Findex=index+1
                    }
                    else if(Math.abs(pos.y)<=this.ceateScrollHeight[0]){
                        this.Findex=0
                    } 
                }
            })
            // console.log(this.singerList)
            // console.log(this.$refs)
        },
        goDetail(item){
            // console.log(item)
            // this.$router.push(`singer/detail/${item.singer_mid}`)
            this.$router.push({name:'detail',params:{info:item}})
        }
       
    },
    computed:{
            sliderData(){
                let arr = this.singerList.map((item)=>{
                return item.title
            })
            // console.log(arr)
            return arr
        },
        ceateScrollHeight(){

            // 获取左边每组距离顶部的高度
            // console.log(this.singerList)
            let arr = this.singerList.map((el)=>{
                // console.log(el)
                return 30+70*el.item.length
            })
            // console.log(arr)
            // return arr
            let heights=[]
            let height=0
            for (let index = 0; index < arr.length; index++) {
                height += arr[index]
                heights.push(height)
            }
            // console.log(arr)
            // console.log(heights)
            return heights

        }
    },
    created(){
        this.getList()
        

    },
    mounted(){

    }
}
</script>
<style lang="less" scoped>
@import '~common/css/index.less';
.singer{
    .top(88);
    .bottom(0);
    position: fixed;
    .w(375);
    .wapper{
        .w(375);
        .h(590);
        overflow: hidden;
    }
     ul{
        li{
            .title{
                .w(375);
                box-sizing: border-box;
                .h(30);
                .l_h(30);
                color: @fontColorWO;
                background: #333;
                font-size: @fontSize-l;
                .padding(0,0,0,20);
            }
            .singer-group{
                color: #fff;
                .singer-item{
                    .h(70);
                    .w(375);
                    .padding(20,0,0,20);
                    box-sizing: border-box;
                    div{
                      display: flex;
                      img{
                          border-radius:50%; 
                      }
                      span{
                          display: inline-block;
                          .h(50);
                          .l_h(50);
                          color:@fontColorWO;
                          font-size: @fontSize-m;
                          .padding(0,0,0,20);
                      }
                    }
                }
            }
        }
    }
    .slider{
        z-index: 999;
        border-radius:10px;
        .padding(20,0,20,0); 
        position: absolute;
        right: 10px;
        top:50%;
        .w(20);
        transform: translate3d(0,-50%,0);
        background:@fontColorNormal;
        //  background: #fff;
        li{
            .w(20);
            .h(18);
            font-size: @fontSize-s;
            text-align: center;
            color: @fontColorWO;
            
        }
        .sel{
            color:@fontColor;
        }
    }
}
</style>
