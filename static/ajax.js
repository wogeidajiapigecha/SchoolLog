/**
 * @author lzs
 * @name 请求封装
 */

import axios from 'axios'

let axiosIns = axios.create({
  timeout: 200000,
});

axiosIns.defaults.baseURL = Config.prodUrl;

let ajaxMethod = ['get', 'post', 'delete', 'put'];
let api = {};

ajaxMethod.forEach((method) => {
  //数组取值的两种方式
  api[method] = function (uri, data, type) {
    return new Promise(function (resolve, reject) {
      axiosIns[method](uri, data).then((response) => {
        resolve(response.data)
      }).catch((err) => {
        reject(err);
      })
    })
  }
});

api.getWithHeaders = function (url, token) {
  return axios.get(url, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(res => {
    return res
  }).catch(e => {
    return "error"
  })
}

export default api;
