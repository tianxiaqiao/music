import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // 在vue中使用路由

//引入组件

import Recommend from 'pages/Recommend/Recommend'
import Singer from 'pages/Singer/Singer'
import Rank from 'pages/Rank/Rank'
import Search from 'pages/Search/Search'
import Detail from 'components/common/detail/detail.vue'
import List from 'components/common/list/list.vue'
import Title from 'components/common/title/title.vue'

const router=new VueRouter({
    routes:[
        {
            path:'/recommend',//匹配hash值
            name:'recommend',//路由的名字
            component:Recommend,//要渲染的组件
            children:[
                {
                    path:'title',
                    name:'title',
                    component:Title,//要渲染的组件
                }
            ]
        },
        {
            path:'/singer',//匹配hash值
            name:'singer',//路由的名字
            component:Singer,//要渲染的组件
            children:[
                {
                    path:'detail',
                    name:'detail',
                    component:Detail,
                }
            ]
        },
        {
            path:'/rank',//匹配hash值
            name:'rank',//路由的名字
            component:Rank,//要渲染的组件
            children:[
                {
                    path:'list',
                    name:'list',
                    component:List,//要渲染的组件
                }
            ]
        },
        {
            path:'/search',//匹配hash值
            name:'search',//路由的名字
            component:Search//要渲染的组件
        },
        {
            path:'/',
            redirect:'/recommend' //重定向
        }
    ]
})
// console.log(router)
export default router
