import request from '../utils/request.js'; //引入request.js
// import axios from 'axios'
import store from "../store/index.js";
console.log(store.state.VuexIp, 'this.$store.state.VuexIp,');
console.log(store.state.VuexPort, 'this.$store.state.VuexPort,');
const baseURL = 'http://' + store.state.VuexIp + ':' + store.state.VuexPort; //发送请求的IP和端口
export function postLogin(data) {
  return request({
    /*post方式请求*/
    baseURL: baseURL,
    url: '/user/login',
    method: 'post',
    data: data,
  });
}
export function getLogin() {
  return request({
    url: '/user/login',
    method: 'get',
  });
}
export function getBorrowedArchiveTotal() {//获取档案在借数量
  return request({
    baseURL: baseURL,
    url: '/bigData/queryBorrowedArchiveTotal',
    method: 'get',
  });
}
export function getRecordClassify() { //请求档案分类的数据
  return request({
    baseURL: baseURL,
    url: '/classify/getClassifyAndArchive',
    method: 'get',
  });
}
export function getR(data) { //请求档案分类的数据
  console.log('11111111111111111111111111111111');
  return request({
    baseURL: baseURL,
    url: '/user/get/' + data,
    method: 'get',

  });
}



//n新的
export function GetSystemData(data) { //读取设置
  console.log(data, 'api.js  apis.js');
  return request({
    baseURL: 'http://172.16.21.54:8086',
    url: '/GetSystemData',
    method: 'POST',
    data: data
  });
}
