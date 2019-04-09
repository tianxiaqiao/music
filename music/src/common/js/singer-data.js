export default{
    initData(data){
        // console.log(data)
        let obj = {
            'hot':{
                title:'hot',
                item:[]
            }
        }
        let index=0
        data.forEach(element=>{

            // 添加分组
            index++
            if(index<=20){
                obj.hot.item.push({
                    name:element.Fsinger_name,
                    avator:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${element.Fsinger_mid}.jpg?max_age=2592000`,
                    Findex:element.Findex,
                    singer_mid:element.Fsinger_mid
                })
            }


            // 添加分组
            if(obj[element.Findex]){
                obj[element.Findex].item.push({
                    name:element.Fsinger_name,
                    avator:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${element.Fsinger_mid}.jpg?max_age=2592000`,
                    Findex:element.Findex,
                    singer_mid:element.Fsinger_mid
                })
            }else{
                obj[element.Findex]={
                    title:element.Findex,
                    item:[]
                }
                obj[element.Findex].item.push({
                    name:element.Fsinger_name,
                    avator:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${element.Fsinger_mid}.jpg?max_age=2592000`,
                    Findex:element.Findex,
                    singer_mid:element.Fsinger_mid
                })

            }
        })
        // 干掉9
        let arr = []
        let hot = []
        for(const key in obj){
            if(key!=9){
                if(key=='hot'){
                    hot.push(obj[key])
                }else{
                arr.push(obj[key])
                }
            }
        }
        // 排序
        arr.sort((a,b)=>{
            return a.title.charCodeAt()-b.title.charCodeAt()
        })
        return  hot.concat(arr)
    }
}