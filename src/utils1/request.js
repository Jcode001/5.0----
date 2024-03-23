import axios from 'axios'
import {
  Toast
} from 'vant'
import Vant from 'vant';
import router from '../router'
import {
  setLocal,
  getLocal
} from '@/common/js/utils'
// 
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://backend-api-01.newbee.ltd/api/v1' : 'http://backend-api-01.newbee.ltd/api/v1'
// axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://172.16.21.34:8007' : 'http://172.16.21.34:8007'
// axios.defaults.baseURL = process.env.NODE_ENV == '172.16.21.34' 
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['Authorization'] = document.cookie
// Authorization: document.cookie,
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  console.log('axios表格汇总的', res);
  if (typeof res.data !== 'object') {
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }

  // var i = getLocal('token')
  // console.log(i, '11111111111111111111');
  // console.log(getLocal('token') == null, '2345679876543234567');
  // if (getLocal('token') == null) {
  //   Toast.fail('未登录')
  //   router.push({
  //     path: '/login'
  //   })

  // }
  // if (res.data.code != 200) {
  //   // if (res.data.message) Toast.fail(res.data.message)
  //   // if (res.data.code == 416) {
  //   //   router.push({
  //   //     path: '/login'
  //   //   })
  //   // }
  //   return Promise.reject(res.data)
  // }

  return res.data
})

export default axios
