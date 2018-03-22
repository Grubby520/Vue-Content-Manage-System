import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(function(config) {
    return config;
  }, function(error) {
    return Promise.reject(error);
  });

// 响应拦截器
axios.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  return Promise.reject(error);
});

// 封装axios的post请求
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

//接口地址
export default {
    /*
    * login
    * */
    checkLogin(url, params) {
        return fetch(url, params);
    },

    /*
    * home
    * */
    getHomeList(url, params) {
        return fetch(url, params);
    },
    getHomeList_business(url, params) {
        return fetch(url, params);
    },

    getTable(url, params) {
        return fetch(url, params);
    },
    getUserPower(url,params){
        return fetch(url, params);
    },
    submitUserPower(url,params) {
        return fetch(url, params);
    }

}

