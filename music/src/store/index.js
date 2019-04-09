import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import song from './song'



const store = new Vuex.Store({
    modules:{
        song
    }
})
export default store