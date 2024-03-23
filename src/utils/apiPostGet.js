import axios from 'axios';
const apipost = (_this,url,data) => {
    axios.post(url, data).then(
      success => {
        _this.viewUpdate(success.data.data) // 调用组件中的methods
      },
      error => {
        // console.log(error, "设置数据请求失败！！！请求失败1");
      }
    )
}
const huanjin = (_this,url,data) => {
    axios.get(url, data).then(
      success => {
        _this.viewUpdates(success.data.data) // 调用组件中的methods
        // console.log( "环境数据请求成功！！！请求成功");
      },
      error => {
        // console.log(error, "环境数据请求失败！！！请求失败2");
      }
    )
}
const kufang = (_this,url) => {
    axios.get(url).then(
      success => {
        _this.kufangshuju(success.data.data) // 调用组件中的methods
        console.log(success.data.data, "库房数据请求成功！！！请求成功");
      },
      error => {
        // console.log(error, "库房数据请求失败！！！请求失败2");
      }
    )
}
// const Friendservice = (_this,url) => {
//     axios.get(url).then(
//       success => {
//         _this.Friendservice(success.data.data) // 调用组件中的methods
//         console.log( "友商数据请求成功！！！请求成功");
//       },
//       error => {
//         console.log(error, "友商数据请求失败！！！请求失败2");
//       }
//     )
// }

export default {
  apipost, // 暴露函数
  huanjin,
  kufang,
  // Friendservice
}