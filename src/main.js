import Vue from 'vue'
import App from './App'
import router from './router'
// import eCharts from 'echarts'
// Vue.prototype.$echarts  = eCharts;

import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'// 重置样式

import './assets/icon-fonts/iconfont.css'

require('./mock.js')
Vue.config.productionTip = false

import "babel-polyfill"; // babel垫片，编译新的API

Vue.use(ElementUI);


Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App),
    created: function () {
        console.log(this);
    }
}).$mount('#app');
