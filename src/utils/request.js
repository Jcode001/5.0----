import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// if (sessionStorage.getItem('userInfo') == null) {
//   let _one = window.location.href.split('//')[0]
//   let _two = window.location.href.split('//')[1].split('/')[0]
//   let _url = _one + '//' + _two + '/#/'
//   console.log('window.location.href', _url)
//   location.href = _url;
// }
// 发送请求设置
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 接收后端返回来的数据设置
service.interceptors.response.use(response => {
  const res = response.data
  // if (res.code !== 20000) {
  //   Message({
  //     message: res.message || 'Error',
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //   //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
  //   //     confirmButtonText: 'Re-Login',
  //   //     cancelButtonText: 'Cancel',
  //   //     type: 'warning'
  //   //   }).then(() => {
  //   //     store.dispatch('user/resetToken').then(() => {
  //   //       location.reload()
  //   //     })
  //   //   })
  //   // }
  //   return Promise.reject(new Error(res.message || 'Error'))
  // } else {
    // console.log(res,'21333333333333333333333333333333');
    return res
  // }
},
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
