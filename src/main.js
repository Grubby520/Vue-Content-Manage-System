import Vue from 'vue'
import App from './App'
import router from './router'
// import eCharts from 'echarts'
// Vue.prototype.$echarts  = eCharts;

import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../static/css/main.css'// 重置样式

import iView from 'iview'
import 'iview/dist/styles/iview.css'; // 使用CSS

import '../static/icon-fonts/iconfont.css'

require('./mock.js')
Vue.config.productionTip = false

import "babel-polyfill"; // babel垫片，编译新的API

Vue.use(ElementUI);
Vue.use(iView);

Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App),
    created: function () {
        console.log(this);
    }
}).$mount('#app');
