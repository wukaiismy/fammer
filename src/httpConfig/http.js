/**
 * ajax请求配置
 */

import axios from "axios";
import apiURL from "./api.js";
import store from "@/store";
import { getToken } from "@/httpConfig/auth";
//import Qs from 'qs'
//  创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 //  请求超时时间
});

service.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
service.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
//整理数据
service.defaults.transformRequest = function(data) {
  // data = Qs.stringify(data);

  data = JSON.stringify(data);

  return data;
};

// 路由请求拦截
// http request 拦截器
service.interceptors.request.use(
  config => {
    //config.data = JSON.stringify(config.data);
    // config.headers["Content-Type"] = "application/json;charset=UTF-8";
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers["Authorization"] = getToken();
    }

    return config;
  },
  error => {
    return Promise.reject(error.response);
  }
);

// 路由响应拦截
// http response 拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code == "403") {
      console.log(response);
      store.dispatch("FedLogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
      //      cookie.del("ticket")
      //      window.location.href='http://login.com'
      return;
    } else {
      return response;
    }
  },
  error => {
    return Promise.reject(error.response); // 返回接口返回的错误信息
  }
);
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}, herders) {
  return new Promise((resolve, reject) => {
    service.post(url, data, { herders }).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.delete(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.put(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
// export default axios;
