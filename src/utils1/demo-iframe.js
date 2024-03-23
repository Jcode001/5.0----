import $ from 'jquery'
import WebVideoCtrl from './webVideoCtrl_demo.js'
// import WebVideoCtrl from '../../public/static/codebase/webVideoCtrl_demo.js'

var g_aIframe = $("iframe");
var iLoadedCount = 0;

$(function () {
  console.log('I_CheckPluginInstallI_CheckPluginInstallI_CheckPluginInstallI_CheckPluginInstall');
  debugger;
  var iRet = WebVideoCtrl.I_CheckPluginInstall();
  if (-1 == iRet) {
    alert("11111111111.22222222222222");
    return;
  }


  $(window).unload(function () {
    $.each(g_aIframe, function (i, oIframe) {
      getWebVideoCtrl(oIframe).I_Stop();
    });
  });
});




export function iframeLoaded() {

  console.log('进入到iframeLoadediframeLoadediframeLoaded方法');
  iLoadedCount++;

  if (4 === iLoadedCount) {
    var oLiveView = {
      iProtocol: 1, // protocol 1��http, 2:https
      szIP: "192.168.2.168", // protocol ip
      szPort: "80", // protocol port
      szUsername: "admin", // device username
      szPassword: "111...aaa", // device password
      iStreamType: 2, // stream 1��main stream  2��sub-stream  3��third stream  4��transcode stream
      iChannelID: 1, // channel no
      bZeroChannel: false // zero channel
    };

    $.each(g_aIframe, function (i, oIframe) {
      // alert(i)
      console.log(i, oIframe, 'i, oIframe');
      var oWebVideoCtrl = getWebVideoCtrl(oIframe);
      // ��¼�豸
      oWebVideoCtrl.I_Login(oLiveView.szIP, oLiveView.iProtocol, oLiveView.szPort, oLiveView
        .szUsername, oLiveView.szPassword, {
          success: function (xmlDoc) {
            // alert(i,'1111111111')
            // ��ʼԤ��
            var szDeviceIdentify = oLiveView.szIP + "_" + oLiveView.szPort;
            setTimeout(function () {
              // alert(i,"21")
              oWebVideoCtrl.I_StartRealPlay(oLiveView.szIP, {
                iStreamType: oLiveView.iStreamType,
                // iChannelID: oLiveView.iChannelID,

                iChannelID: (i + 1) * 3,
                // iChannelID: 3,
                bZeroChannel: oLiveView.bZeroChannel
              });
            }, 1000);
          },
          error: function (error) {
            alert(error)
            console.log(error, 'eroorrr');
          }
        });
    });
  }
}

function getWebVideoCtrl(oIframe) {
  return oIframe.contentWindow.WebVideoCtrl;
}
