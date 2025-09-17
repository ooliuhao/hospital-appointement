import axios from 'axios'
import store from '@/store/index.js'
import {serialize} from '@/util/util'

 
const request = axios.create({
  baseURL: '/api',  // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
  timeout: 120000,
  withCredentials: true,
})

let isRefreshing = false;
let refreshSubscribers = [];

// Function to refresh the access token
const refreshToken = async () => {
  try {
    const refreshToken = store.state.auth.user.refreshToken;
    const response = await axios.post('/api/auth/refreshtoken', { refreshToken });
    store.commit('auth/updateAccessToken', response.data.accessToken);
    const user = JSON.parse(localStorage.getItem('user'));
    user.accessToken = response.data.accessToken;
    localStorage.setItem('user', JSON.stringify(user));
    refreshSubscribers.forEach((subscriber) => subscriber(response.data.accessToken));
    refreshSubscribers = [];
    return Promise.resolve(response);
  } catch (error) {
    // console.log("was here" )
    if (error.response && error.response.status === 403 && error.response.data.message === 'Unauthorized!jwt expired') {
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
};

 
// request 请求器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
  if(config.headers['Content-Type']) {

  } else {
    config.headers['Content-Type'] = 'application/json'

  }
  const isToken = (config.headers || {}).isToken === false
  let user = JSON.parse(localStorage.getItem('user')) ; //JSON.parse(localStorage.getItem('user'));
  if (user&&user.accessToken && !isToken) {
    config.headers['x-access-token'] = user.accessToken// token
  }
  // headers中配置serialize为true开启序列化
  if (config.methods === 'post' && config.headers.serialize) {
    config.data = serialize(config.data)
    delete config.data.serialize
  }
  return config
  }, error => {
  return Promise.reject(error)
})
  
const handleError = async(error) => {
  const originalRequest = error.config;
 
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const response = await refreshToken();
        originalRequest.headers['x-access-token'] = response.data.accessToken;
        refreshSubscribers.forEach((subscriber) => subscriber(response.data.accessToken));
        refreshSubscribers = [];
        return request(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    } else {
      return new Promise((resolve) => {
        refreshSubscribers.push((accessToken) => {
          originalRequest.headers['x-access-token'] = accessToken;
          resolve(request(originalRequest));
        });
      });
    }
  } else if (error.response && error.response.status === 403 && error.response.data.message === 'Unauthorized!TokenExpiredError: jwt expired') {
   
    localStorage.removeItem('user');
    window.location.href = '/';
  }
  return Promise.reject(error);
};
 
// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  response => {
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === 'blob') {
      return res
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }
    return res;
  },
  error => handleError(error)
)
 
 
export default request