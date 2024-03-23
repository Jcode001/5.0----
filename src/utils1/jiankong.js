// 初始化插件
import $ from 'jquery'
// 全局保存当前选中窗口
var g_iWndIndex = 0; //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
var g_oLocalConfig = null; //本地配置

//错误码        
//通用错误
var ERROR_CODE_UNKNOWN = 1000; //未知错误
var ERROR_CODE_NETWORKERROR = 1001; //网络错误
var ERROR_CODE_PARAMERROR = 1002; //缺少插件元素

//登录模块
var ERROR_CODE_LOGIN_NOLOGIN = 2000; // 未登录
var ERROR_CODE_LOGIN_REPEATLOGIN = 2001; //设备已登录，重复登录
var ERROR_CODE_LOGIN_NOSUPPORT = 2002; //当前设备不支持Digest登录

//预览播放
var ERROR_CODE_PLAY_PLUGININITFAIL = 3000; //插件初始化失败
var ERROR_CODE_PLAY_NOREPEATPLAY = 3001; //当前窗口已经在预览
var ERROR_CODE_PLAY_PLAYBACKABNORMAL = 3002; //回放异常
var ERROR_CODE_PLAY_PLAYBACKSTOP = 3003; //回放停止
var ERROR_CODE_PLAY_NOFREESPACE = 3004; //录像过程中，硬盘容量不足

//对讲
var ERROR_CODE_TALK_FAIL = 5000; //语音对讲失败


var version = "V3.3.0build20230322"
export function asdbasd() {
  setTimeout(() => {
    console.log('初始化插 件参数及插入插件初始化插件参数及插入插件初始化插件参数及插入插件初始化插件参数及插入插件初始化插件参数及插入插件初始化插件参数及插入插件');
    // 初始化插件参数及插入插件
    // console.log(WebVideoCtrl.I_InitPlugin,'WebVideoCtrl.I_InitPluginWebVideoCtrl.I_InitPluginWebVideoCtrl.I_InitPlugin');
    // console.log(WebVideoCtrl,'WebVideoCtrl.I_InitPluginWebVideoCtrl.I_InitPluginWebVideoCtrl.I_InitPlugin');
    WebVideoCtrl.I_InitPlugin({
      // console.log(WebVideoCtrl,'WebVideoCtrl.I_InitPluginWebVideoCtrl.I_InitPluginWebVideoCtrl.I_InitPlugin');
      bWndFull: true, //是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
      iWndowType: 2,
      cbSelWnd: function (xmlDoc) {
        g_iWndIndex = parseInt($(xmlDoc).find("SelectWnd").eq(0).text(), 10);
        var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
        console.log(szInfo, '第1个编号，~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        showCBInfo(szInfo);
      },
      cbDoubleClickWnd: function (iWndIndex, bFullScreen) {
        var szInfo = "当前放大的窗口编号：" + iWndIndex;
        console.log(szInfo);
        if (!bFullScreen) {
          szInfo = "当前还原的窗口编号：" + iWndIndex;
        }
        showCBInfo(szInfo);
      },
      cbEvent: function (iEventType, iParam1, iParam2) {
        if (2 == iEventType) { // 回放正常结束
          showCBInfo("窗口" + iParam1 + "回放结束！");
        } else if (-1 == iEventType) {
          showCBInfo("设备" + iParam1 + "网络错误！");
        } else if (3001 == iEventType) {
          clickStopRecord(g_szRecordType, iParam1);
        }
      },
      cbInitPluginComplete: function () {
        WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin").then(() => {
          // 检查插件是否最新
          WebVideoCtrl.I_CheckPluginVersion().then((bFlag) => {
            if (bFlag) {
              alert("检测到新的插件版本，双击开发包目录里的HCWebSDKPlugin.exe升级！");
            }
          });
        }, () => {
          alert("插件初始化失败，请确认是否已安装插件；如果未安装，请双击开发包目录里的HCWebSDKPlugin.exe安装！");
        });
      }
    });

    // 窗口事件绑定
    $(window).bind({
      resize: function () {
        //WebVideoCtrl.I_Resize($("body").width(), $("body").height());
      }
    });
    console.log('1111111111111111111111111111111111111');
    //初始化日期时间
    var szCurTime = dateFormat(new Date(), "yyyy-MM-dd");
    $("#starttime").val(szCurTime + " 00:00:00");
    $("#endtime").val(szCurTime + " 23:59:59");
    $("#downloadstarttime").val(szCurTime + " 00:00:00");
    $("#downloadendtime").val(szCurTime + " 23:59:59");

    console.log('延时加载');
  }, 500);
};

// 显示操作信息
export function showOPInfo(szInfo, status, xmlDoc) {
  var szTip = "<div>" + dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo;
  if (typeof status != "undefined" && status != 200) {
    var szStatusString = $(xmlDoc).find("statusString").eq(0).text();
    var szSubStatusCode = $(xmlDoc).find("subStatusCode").eq(0).text();
    if ("" === szSubStatusCode) {
      if ("" === szSubStatusCode && "" === szStatusString) {
        szTip += "(" + status + ")";
      } else {
        szTip += "(" + status + ", " + szStatusString + ")";
      }
    } else {
      szTip += "(" + status + ", " + szSubStatusCode + ")";
    }
  }
  szTip += "</div>";

  $("#opinfo").html(szTip + $("#opinfo").html());
}
// 显示回调信息
export function showCBInfo(szInfo) {
  szInfo = "<div>" + dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo + "</div>";
  $("#cbinfo").html(szInfo + $("#cbinfo").html());
}
// 格式化时间
export function dateFormat(oDate, fmt) {
  var o = {
    "M+": oDate.getMonth() + 1, //月份
    "d+": oDate.getDate(), //日
    "h+": oDate.getHours(), //小时
    "m+": oDate.getMinutes(), //分
    "s+": oDate.getSeconds(), //秒
    "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
    "S": oDate.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}
// 获取本地参数
export function clickGetLocalCfg() {
  WebVideoCtrl.I_GetLocalCfg().then((oLocalConfig) => {
    g_oLocalConfig = oLocalConfig;
    $("#netsPreach").val(oLocalConfig.buffNumberType);
    $("#wndSize").val(oLocalConfig.playWndType);
    $("#rulesInfo").val(oLocalConfig.ivsMode);
    $("#captureFileFormat").val(oLocalConfig.captureFileFormat);
    $("#packSize").val(oLocalConfig.packgeSize);
    $("#recordPath").val(oLocalConfig.recordPath);
    $("#downloadPath").val(oLocalConfig.downloadPath);
    $("#previewPicPath").val(oLocalConfig.capturePath);
    $("#playbackPicPath").val(oLocalConfig.playbackPicPath);
    $("#devicePicPath").val(oLocalConfig.deviceCapturePath);
    $("#playbackFilePath").val(oLocalConfig.playbackFilePath);
    $("#protocolType").val(oLocalConfig.protocolType);
    $("#secretKey").val("\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F");
    showOPInfo("本地配置获取成功！");
  }, (oError) => {
    var szInfo = "本地配置获取失败！";
    showOPInfo(szInfo, oError.errorCode, oError.errorMsg);
  });
}

// 设置本地参数
export async function clickSetLocalCfg() {
  g_oLocalConfig.buffNumberType = $("#netsPreach").val();
  g_oLocalConfig.playWndType = $("#wndSize").val();
  g_oLocalConfig.ivsMode = $("#rulesInfo").val();
  g_oLocalConfig.captureFileFormat = $("#captureFileFormat").val();
  g_oLocalConfig.packgeSize = $("#packSize").val();
  g_oLocalConfig.recordPath = $("#recordPath").val();
  g_oLocalConfig.downloadPath = $("#downloadPath").val();
  g_oLocalConfig.capturePath = $("#previewPicPath").val();
  g_oLocalConfig.playbackPicPath = $("#playbackPicPath").val();
  g_oLocalConfig.deviceCapturePath = $("#devicePicPath").val();
  g_oLocalConfig.playbackFilePath = $("#playbackFilePath").val();
  g_oLocalConfig.protocolType = $("#protocolType").val();
  if ("\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F" !== $("#secretKey").val()) {
    g_oLocalConfig.secretKey = await WebVideoCtrl.I_GetEncryptString($("#secretKey").val());
  }
  WebVideoCtrl.I_SetLocalCfg(g_oLocalConfig).then(() => {
    showOPInfo("本地配置设置成功！");
  }, (oError) => {
    var szInfo = "本地配置设置失败！";
    showOPInfo(szInfo, oError.errorCode, oError.errorMsg);
  });
}

// 窗口分割数
export function changeWndNum(iType) {
  console.log(iType, 'iTypeiTypeiTypeiType');
  iType = parseInt(iType, 10);
  console.log(iType, 'iTypeiTypeiTypeiType-----------');
  WebVideoCtrl.I_ChangeWndNum(iType).then(() => {
    console.log('窗口分割成功！');
  }, (oError) => {
    console.log(oError, '窗口分割失败！');
    // showOPInfo(szInfo, oError.errorCode, oError.errorMsg);
    console.log(szInfo, oError.errorCode, oError.errorMsg);
  });
}

// 登录
export function clickLogin() {
  console.log('进入登录接口');
  // var szIP = "192.168.2.169"
  //     szPort = '80',
  //     szUsername = "admin"
  //     szPassword = "111...aaa"
  console.log(szIP,'进入登录接口进入登录接口进入登录接口szIPszIPszIP');
  console.log(szPort,'进入登录接口szPortszPortszPortszPort');
  console.log(szPassword,'进入登录接口szPasswordszPasswordszPassword');
  console.log(szPassword,'进入登录接口szPasswordszPasswordszPassword');
  var szIP = $("#loginip").val(),
    szPort = $("#port").val(),
    szUsername = $("#username").val(),
    szPassword = $("#password").val();
    
  // var szIP = $("#loginip").val(),
  //     szPort = "80",
  //     szUsername = "admin",
  //     szPassword = "111...aaa";
  //     alert(szIP)
  //     alert(szPort)
  //     alert(szUsername)
  //     alert(szPassword)

  if ("" == szIP || "" == szPort) {
    return;
  }

  var szDeviceIdentify = szIP + "_" + szPort;

  WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
    timeout: 3000,
    success: function (xmlDoc) {

      // console.log(xmlDoc,'xmlDoc');
      // showOPInfo(szDeviceIdentify + " 登录成功！");
      // alert(szDeviceIdentify + " 登录成功！");
      $("#ip").prepend("<option value='" + szDeviceIdentify + "'>" + szDeviceIdentify + "</option>");
      setTimeout(function () {
        $("#ip").val(szDeviceIdentify);
        setTimeout(function () {
          getChannelInfo();
        }, 1000);
        getDevicePort();
      }, 10);
      // dasdasdasda=1
      // console.log(dasdasdasda,'成功之后dasdasdasda');

      // $("#yulanhou").htlml() = 2;
      $("#yulanhou").html(1)


    },
    error: function (oError) {

      // if (oError.errorCode == '2001') {
      //     console.log('该IP和端口下设备已经登录过！！！！！！');
      //     $("#yulanhou").html(2)
      // }

      // else if (ERROR_CODE_LOGIN_REPEATLOGIN === status) {
      //     console.log('已登录过！');
      //     // $("#yulanhou").html(2)
      //     showOPInfo(szDeviceIdentify + " 已登录过！");
      // }
      // else {
      console.log('登录失败！');
      $("#yulanhou").html(0)
      showOPInfo(szDeviceIdentify + " 登录失败！", oError.errorCode, oError.errorMsg);
      // }


    }
  });
}

// 退出
export function clickLogout() {
  var szDeviceIdentify = $("#ip").val();

  if (null == szDeviceIdentify) {
    return;
  }

  WebVideoCtrl.I_Logout(szDeviceIdentify).then(() => {
    showOPInfo(szDeviceIdentify + " " + "退出成功！");
  }, () => {
    showOPInfo(szDeviceIdentify + " " + "退出失败！");
  });
}

// 获取设备信息
export function clickGetDeviceInfo() {
  console.log('获取设备信息----接口11111');
  var szDeviceIdentify = $("#ip").val();

  if (null == szDeviceIdentify) {
    return;
  }

  WebVideoCtrl.I_GetDeviceInfo(szDeviceIdentify, {
    success: function (xmlDoc) {
      var arrStr = [];
      arrStr.push("设备名称：" + $(xmlDoc).find("deviceName").eq(0).text() + "\r\n");
      arrStr.push("设备ID：" + $(xmlDoc).find("deviceID").eq(0).text() + "\r\n");
      arrStr.push("型号：" + $(xmlDoc).find("model").eq(0).text() + "\r\n");
      arrStr.push("设备序列号：" + $(xmlDoc).find("serialNumber").eq(0).text() + "\r\n");
      arrStr.push("MAC地址：" + $(xmlDoc).find("macAddress").eq(0).text() + "\r\n");
      arrStr.push("主控版本：" + $(xmlDoc).find("firmwareVersion").eq(0).text() + " " + $(xmlDoc).find("firmwareReleasedDate").eq(0).text() + "\r\n");
      arrStr.push("编码版本：" + $(xmlDoc).find("encoderVersion").eq(0).text() + " " + $(xmlDoc).find("encoderReleasedDate").eq(0).text() + "\r\n");

      showOPInfo(szDeviceIdentify + " 获取设备信息成功！");
      alert(arrStr.join(""));
    },
    error: function (oError) {
      showOPInfo(szDeviceIdentify + " 获取设备信息失败！", oError.errorCode, oError.errorMsg);
    }
  });
}

// 获取通道
export function getChannelInfo() {
  var szDeviceIdentify = $("#ip").val(),
    oSel = $("#channels").empty();
  // debugger;

  // oSels1 = $("#channelss").empty();

  console.log('获取通道列表数据接口--', szDeviceIdentify, oSel);
  // console.log('获取通道列表数据接口-@@@@@@@@@@@@@@@@@@@@@@@@@@@@-', oSels1);

  if (null == szDeviceIdentify) {
    return;
  }

  // 模拟通道
  WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
    success: function (xmlDoc) {
      console.log('模拟通道-方法');

      var oChannels = $(xmlDoc).find("VideoInputChannel");

      $.each(oChannels, function (i) {
        var id = $(this).find("id").eq(0).text(),
          name = $(this).find("name").eq(0).text();
        if ("" == name) {
          name = "Camera " + (i < 9 ? "0" + (i + 1) : (i + 1));
        }
        oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
        // oSels.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
      });
      console.log(szDeviceIdentify + '获取模拟通道成功！');
      showOPInfo(szDeviceIdentify + " 获取模拟通道成功！");
    },
    error: function (oError) {
      showOPInfo(szDeviceIdentify + " 获取模拟通道失败！", oError.errorCode, oError.errorMsg);
    }
  });
  // 数字通道
  WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
    success: function (xmlDoc) {
      console.log('数字通道-方法');
      var oChannels = $(xmlDoc).find("InputProxyChannelStatus");

      $.each(oChannels, function (i) {
        var id = $(this).find("id").eq(0).text(),
          name = $(this).find("name").eq(0).text(),
          online = $(this).find("online").eq(0).text();
        if ("false" == online) { // 过滤禁用的数字通道
          return true;
        }
        if ("" == name) {
          name = "IPCamera " + (i < 9 ? "0" + (i + 1) : (i + 1));
        }
        oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
        // oSels.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
      });
      console.log(szDeviceIdentify + " 获取数字通道成功！");
      showOPInfo(szDeviceIdentify + " 获取数字通道成功！");
    },
    error: function (oError) {
      showOPInfo(szDeviceIdentify + " 获取数字通道失败！", oError.errorCode, oError.errorMsg);
    }
  });
  // 零通道
  WebVideoCtrl.I_GetZeroChannelInfo(szDeviceIdentify, {
    success: function (xmlDoc) {
      var oChannels = $(xmlDoc).find("ZeroVideoChannel");

      $.each(oChannels, function (i) {
        var id = $(this).find("id").eq(0).text(),
          name = $(this).find("name").eq(0).text();
        if ("" == name) {
          name = "Zero Channel " + (i < 9 ? "0" + (i + 1) : (i + 1));
        }
        if ("true" == $(this).find("enabled").eq(0).text()) { // 过滤禁用的零通道
          oSel.append("<option value='" + id + "' bZero='true'>" + name + "</option>");
          // oSels.append("<option value='" + id + "' bZero='true'>" + name + "</option>");
        }
      });
      showOPInfo(szDeviceIdentify + " 获取零通道成功！");
    },
    error: function (oError) {
      showOPInfo(szDeviceIdentify + " 获取零通道失败！", oError.errorCode, oError.errorMsg);
    }
  });
}

// 获取端口
export function getDevicePort() {
  var szDeviceIdentify = $("#ip").val();

  if (null == szDeviceIdentify) {
    return;
  }

  WebVideoCtrl.I_GetDevicePort(szDeviceIdentify).then((oPort) => {
    $("#deviceport").val(oPort.iDevicePort);
    $("#rtspport").val(oPort.iRtspPort);

    showOPInfo(szDeviceIdentify + " 获取端口成功！");
  }, (oError) => {
    var szInfo = "获取端口失败！";
    showOPInfo(szDeviceIdentify + szInfo, oError.errorCode, oError.errorMsg);
  });
}

// 获取数字通道
async function clickGetDigitalChannelInfo() {
  var szDeviceIdentify = $("#ip").val(),
    iAnalogChannelNum = 0;

  $("#digitalchannellist").empty();

  if (null == szDeviceIdentify) {
    return;
  }

  // 模拟通道
  try {
    var oAnalogChannelInfo = await WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {});
    iAnalogChannelNum = $(oAnalogChannelInfo).find("VideoInputChannel").length;
  } finally {
    // 数字通道
    WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
      success: function (xmlDoc) {
        var oChannels = $(xmlDoc).find("InputProxyChannelStatus");

        $.each(oChannels, function () {
          var id = parseInt($(this).find("id").eq(0).text(), 10),
            ipAddress = $(this).find("ipAddress").eq(0).text(),
            srcInputPort = $(this).find("srcInputPort").eq(0).text(),
            managePortNo = $(this).find("managePortNo").eq(0).text(),
            online = $(this).find("online").eq(0).text(),
            proxyProtocol = $(this).find("proxyProtocol").eq(0).text();

          var objTr = $("#digitalchannellist").get(0).insertRow(-1);
          var objTd = objTr.insertCell(0);
          objTd.innerHTML = (id - iAnalogChannelNum) < 10 ? "D0" + (id - iAnalogChannelNum) : "D" + (id - iAnalogChannelNum);
          objTd = objTr.insertCell(1);
          objTd.width = "25%";
          objTd.innerHTML = ipAddress;
          objTd = objTr.insertCell(2);
          objTd.width = "15%";
          objTd.innerHTML = srcInputPort;
          objTd = objTr.insertCell(3);
          objTd.width = "20%";
          objTd.innerHTML = managePortNo;
          objTd = objTr.insertCell(4);
          objTd.width = "15%";
          objTd.innerHTML = "true" == online ? "在线" : "离线";
          objTd = objTr.insertCell(5);
          objTd.width = "25%";
          objTd.innerHTML = proxyProtocol;
        });
        showOPInfo(szDeviceIdentify + " 获取数字通道成功！");
      },
      error: function (oError) {
        showOPInfo(szDeviceIdentify + " 没有数字通道！", oError.errorCode, oError.errorMsg);
      }
    });
  }
}
// 开始预览
export function clickStartRealPlay(iStreamType) {
  console.log(g_iWndIndex, '第一个——————————————————————————————————————开始预览窗口编号');
  console.log(iStreamType, 'iStreamType开始预览');
  console.log(parseInt($("#channels").val(), 10), 'iChannelID');
  console.log(WebVideoCtrl.I_GetWindowStatus(g_iWndIndex), '第一个~~~~~~~~~~~1111111111111111111');
  // debugger;
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),


    szDeviceIdentify = $("#ip").val(),
    iRtspPort = parseInt($("#rtspport").val(), 10),

    iChannelID = parseInt($("#channels").val(), 10),
    bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
    szInfo = "";

  if ("undefined" === typeof iStreamType) {
    // iStreamType = parseInt($("#streamtype").val(), 10);
    iStreamType = 1;
    console.log(iStreamType, 'iStreamType=undefined');
    console.log(szDeviceIdentify, 'szDeviceIdentify');
  }

  if (null == szDeviceIdentify) {
    console.log('进来了sssssssssssssssss');
    return;
  }
  var startRealPlay = function () {
    console.log(szDeviceIdentify, g_iWndIndex, iStreamType, iChannelID, bZeroChannel, ' 开始预览需要的数据');
    WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
      iWndIndex: g_iWndIndex,
      iStreamType: iStreamType,
      iChannelID: iChannelID,
      bZeroChannel: bZeroChannel,
      success: function () {
        szInfo = "开始预览成功！";
        console.log(iStreamType, 'iStreamTypeiStreamTypeiStreamTypeiStreamTypeiStreamTypeiStreamType');
        console.log(szDeviceIdentify + " " + szInfo + "开始预览成功！");
        showOPInfo(szDeviceIdentify + " " + szInfo); //IP+端口预览成功！
      },
      error: function (oError) {
        showOPInfo(szDeviceIdentify + " 开始预览失败！", oError.errorCode, oError.errorMsg);
      }
    });
  };

  if (oWndInfo != null) { // 已经在播放了，先停止
    WebVideoCtrl.I_Stop({
      success: function () {
        startRealPlay();
      }
    });
  } else {
    startRealPlay();
  }
}
export function setTextOverlay() {
  var szDeviceIdentify = $("#ip").val();
  var szInfo = "";
  var that = this;
  var iChannelID = parseInt($("#channels").val(), 10);
  var szUrl = "ISAPI/System/Video/inputs/channels/" + iChannelID + "/overlays";
  WebVideoCtrl.I_GetTextOverlay(szUrl, szDeviceIdentify, {
    success: function (data) {
      $(data).find("TextOverlay").eq(0).find("displayText").eq(0).text("我tet");
      $(data).find("TextOverlay").eq(0).find("positionX").eq(0).text("20");
      $(data).find("TextOverlay").eq(0).find("positionY").eq(0).text("30");
      var xmldoc = toXMLStr(data);
      var newOptions = {
        type: "PUT",
        data: xmldoc,
        success: function () {
          szInfo = "绘制osd信息成功";
          showOPInfo(szDeviceIdentify + " " + szInfo);
        },
        error: function (oError) {
          showOPInfo(szDeviceIdentify + " 设置osd信息失败！", oError.errorCode, oError.errorMsg);
        }
      };

      WebVideoCtrl.I_SendHTTPRequest(szDeviceIdentify, szUrl, newOptions);
    },
    error: function (oError) {
      showOPInfo(szDeviceIdentify + " 设置osd信息失败！", oError.errorCode, oError.errorMsg);
    }
  });
}
// 停止预览
export function clickStopRealPlay() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
    szInfo = "";
  console.log(oWndInfo, 'oWndInfooWndInfooWndInfodiy第一个停止预览');
  if (oWndInfo != null) {
    WebVideoCtrl.I_Stop0({
      success: function () {
        szInfo = "停止预览成功！！！！！！！！！！！！";
        console.log(oWndInfo.szDeviceIdentify + " " + szInfo);
      },
      error: function (oError) {
        // showOPInfo(szDeviceIdentify + " 停止预览失败！", oError.errorCode, oError.errorMsg);
        console.log(szDeviceIdentify + " 停止预览失败！", oError.errorCode, oError.errorMsg);
      }
    });
  }
}
