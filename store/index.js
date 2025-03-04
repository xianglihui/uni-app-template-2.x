// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// #endif

// #ifdef VUE3
import { createStore } from 'vuex'
// #endif

import userinfo from '@/store/global/global.js'

// #ifdef VUE3
const store = createStore({
    ...userinfo,
})
// #endif

export default store