// 封装的promise  jsonp
import jsonp from 'jsonp'
function JSONP(url,opt){
    return new Promise((resolve,reject)=>{
        jsonp(url,opt,(err,data)=>{
            // console.log(err)
            // console.log(data)
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}
export default JSONP
