/*
* 1.新增全局Loading
* */
import axios from 'axios'
import qs from 'qs'

import {sleep} from '@/assets/js/public'
// Loading 还可以以服务的方式调用。引入 Loading 服务
import {Loading, Message} from 'element-ui'
// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 超时
axios.defaults.timeout = 10 * 1000;

// 缓存
axios.defaults.withCredentials = true;

// url
axios.defaults.baseURL = '';

// 设置loading
let axiosLoading = null;

// request请求拦截器
axios.interceptors.request.use(
  config => {
    //调用loading,配置options
    const selector = config.data.querySelector;
    if(selector){
      //console.log('request: '+new Date().getSeconds()+'.'+new Date().getMilliseconds());
      axiosLoading = Loading.service({
        //lock: true,
        target: selector,
        text: '数据加载中...'
      });
    }
    if(config.method === 'post'){
      /*
      * data的json只能是一层键值对？
      * 能不能是对象的属性，又是一个键值对；
      * 模拟获取data的数据
      * */
      //config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    
    if(axiosLoading) axiosLoading.close();
    Message.error('请求数据报错');
    return Promise.reject(error);
  }
);

// response响应拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.total){
      sleep(1500);
      if(axiosLoading){
        //console.log('response: '+new Date().getSeconds()+'.'+new Date().getMilliseconds());
        axiosLoading.close();
      }
    }
    // setTimeout(()=>{
    // },1500);
    // if(response.data.code === 200){
    //   return response;
    // }
    // else{
    //   Message.error(response.data);
    // }
    return response;
  },
  error => {
    axiosLoading.close();
    Message.error('请求数据失败，请稍后再试');
    return Promise.reject(error);
  }
);

// 封装promise
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        response => {
          // setTimeout(()=>{
            resolve(response.data)
          // },1500)
        },
        error => {
          reject(error)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

//拦截地址
export default {
  get(url, params){
    //console.info(url);
    //console.info(params);
    return get(url, params);
  },
  post(url, params){
    if(params.querySelector){
      console.info(url);
      console.info(params);
    }
    return post(url, params);
  }
}

