import request from '@/utils/request'
// import axios from "axios";
var URL;
export function login() { //登录
  return request({
    /*get方式请求*/
    // url: '/api/HDW/getHDW1',
    // method: 'get',

    /*post方式请求*/
    url: URL,
    method: 'post',
    data: {
      cmd: '30001',
      Pwd: "ABC85410D238D4B5BAE2EA3830E3D787",
      UserName: "admin",
      localip: "10.168.2.60",
    },
    // dataType: "json",
    // contentType: "application/json",
  });
}
// export function getPandianPlan() { //获取盘点计划
//   return request({
//     /*get方式请求*/
//     // url: '/api/HDW/getHDW1',
//     // method: 'get',

//     /*post方式请求*/
//     url: URL,
//     method: 'post',
//     data: {
//       cmd: '30002',
//       PResult: '0',
//       UserId: '10',
//       localip: "10.168.2.60"
//     },
//     // dataType: "json",
//     // contentType: "application/json",
//   });
// }
export function getRecordData(data,URLs) { //首页-获取档案数据
  return request({
    /*get方式请求*/
    // url: '/api/HDW/getHDW1',
    // method: 'get',

    /*post方式请求*/
    url: 'http://' + URLs + '/KFPTService/getRfid',
    method: 'post',
    data: data,
    // dataType: "json",
    // contentType: "application/json",
  });
}
export function getkuFang(data, URLs) { //库房选择
  return request({
    /*get方式请求*/
    // url: '/api/HDW/getHDW1',
    // method: 'get',

    /*post方式请求*/
    url: 'http://' + URLs + '/KFPTService/getRfid',
    method: 'post',
    data: data,
    // dataType: "json",
    // contentType: "application/json",
  });
}
export function getMijijiaquyu(data,URLs) { //密集架区域选择
  return request({
    /*get方式请求*/
    // url: '/api/HDW/getHDW1',
    // method: 'get',

    /*post方式请求*/
    url: 'http://' + URLs + '/KFPTService/getRfid',
    method: 'post',
    data: data,
    // dataType: "json",
    // contentType: "application/json",
  });
}
export function getDanganXiajia(data, URLs) { //30013 档案盒下架
  return request({
    url: 'http://' + URLs + '/KFPTService/getRfid',
    method: 'post',
    data: data,
  });
}
export function getSearchXiang(data, URLs) { //30025 获取搜索项
  return request({
    /*get方式请求*/
    // url: '/api/HDW/getHDW1',
    // method: 'get',

    /*post方式请求*/
    url: 'http://' + URLs + '/KFPTService/getRfid',
    method: 'post',
    data: data,
    // dataType: "json",
    // contentType: "application/json",
  });
}
export function getCodeInfo(data,URLs) { //30027通过Code获取档案位置信息(档案详细信息)
  return request({
    /*get方式请求*/
    // url: '/api/HDW/getHDW1',
    // method: 'get',

    /*post方式请求*/
    url: 'http://' + URLs + '/KFPTService/getRfid',
    method: 'post',
    data: data,
    // dataType: "json",
    // contentType: "application/json",
  });
}
export function getSearchDanganHe(data, URLs) { //30030 门类下查找档案盒(档案盒搜索)
  return request({
    /*get方式请求*/
    // url: '/api/HDW/getHDW1',
    // method: 'get',

    /*post方式请求*/
    url: 'http://' + URLs + '/KFPTService/getRfid',
    method: 'post',
    // data: JSON.stringify(data),
    data: data,
  });
}
export function getSouXun(data,URLs) { //30033通过RFID获取档案盒位置
  return request({
    url: 'http://' + URLs + '/KFPTService/getRfid',
    method: 'post',
    data: data,
  });
}
export function getMijijiaZhuangtai(data,URLs) { //获取密集架状态
  return request({
    url: 'http://' + URLs + '/KFPTService/getRfid',
    method: 'post',
    data: data,
  });
}
export function getDanganMenlei(data,URLs) { //50001 获取档案门类
  return request({
    /*get方式请求*/
    // url: '/api/HDW/getHDW1',
    // method: 'get',

    /*post方式请求*/
    url: 'http://' + URLs + '/KFPTService/getRfid',
    method: 'post',
    data: data,
    // dataType: "json",
    // contentType: "application/json",
  });
}
export function getDanganCengbiao(data,URLs) { //50002  获取层标管理信息
  return request({
    method: 'post',
    url: 'http://' + URLs + '/KFPTService/getRfid',
    data: data,
  });
}
export function getDanganHeinfo(data,URLs) { //50006  指定内容查询档案盒信息
  return request({
    url: 'http://' + URLs + '/KFPTService/getRfid',
    method: 'post',
    data: data,
  });
}


//获取 高级搜索查询
export function getDataSeniorSerach(data, URLs) { //30023  层架位置获取档案盘点结果）
  return request({
    url: 'http://' + URLs + '/mutisearch1_hgl',
    method: 'post',
    data: data,
  });
}
//高级搜索 档案
export function getDataSeniorSerachDA(data, URLs) { //30023  层架位置获取档案盘点结果）
  return request({
    url: 'http://' + URLs + '/mutisearch1',
    method: 'post',
    data: data,
  });
}

//获取 高级搜索 搜索条件下拉框值
export function getDataSeniorSerachCondition(data, URLs) { //30023  层架位置获取档案盘点结果）
  return request({
    url: 'http://' + URLs + '/GetZLXData1_hgl',
    method: 'post',
    data: data,
  });
}
