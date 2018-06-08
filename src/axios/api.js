import axios from 'axios'
import qs from 'qs'
// Loading 还可以以服务的方式调用。引入 Loading 服务
import {Loading, Message} from 'element-ui'
// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 超时
axios.defaults.timeout = 30 * 1000;

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
    axiosLoading = Loading.service({
      lock: true,
      text: '数据加载中...'
    });
    if(config.method === 'post'){
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    axiosLoading.close();
    Message.error('请求数据报错');
    return Promise.reject(error);
  }
);

/*axios.interceptors.request.use(function(config) {
  return config;
}, function(error) {
  return Promise.reject(error);
});*/

// response响应拦截器
axios.interceptors.response.use(
  res => {
    axiosLoading.close();
    if(res.data.code === 200){
      return res;
    }
    else{
      Message.error(res.data.msg);
    }
  },
  error => {
    axiosLoading.close();
    Message.error('请求数据失败，请稍后再试');
    return Promise.reject(res.data.msg);
  }
);

/*axios.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  return Promise.reject(error);
});*/

// 封装promise
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject(error.data)
      })
  })
}

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        res => {
          resolve(res.data)
        },
        error => {
          reject(error.data)
        }
      )
      .catch(error => {
        reject(error.data)
      })
  })
}

// export function fetch(url, params) {
//   return new Promise((resolve, reject) => {
//     axios
//       .post(url, params)
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       })
//   })
// }

//拦截地址
export default {
  get(url, params){
    console.info(url);
    console.info(params);
    return get(url, params);
  },
  post(url, params){
    console.info(url);
    console.info(params);
    return post(url, params);
  }
  // $http(url,params){
  //   console.info(url);
  //   console.info(params);
  //   return fetch(url, params);
  // }
}

