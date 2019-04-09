// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入Vue源码
import Vue from 'vue'
// 引入一个单文件组件
import App from './App'

import './common/css/reset.css'

import Axios from './axios/index'
Vue.prototype.$axios=Axios

// 给原型jsonp
import jsonp from 'jsonp'
Vue.prototype.$jsonp=jsonp

import router from './router/index'

// 阿里矢量图标
import icon from './assets/icon/iconfont.css'
import font from './assets/font/iconfont.css'

Vue.config.productionTip = false

// 引入vuex
import store from './store'


// 引入图片懒加载
import lazyLoad from 'vue-lazyload'
Vue.use(lazyLoad,{
  error:require('@/assets/logo.png'),
  loading: require('@/assets/logo.png'),
  attempt:1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  store,
  template: '<App/>'
})
