<template>
  <div class="home">
    <div class="title">
      <div class="fanhuitupian">
        <div @click="back()"><img src="../../assets/返回.png" alt=""></div>
      </div>
      <div class="test" style="margin-left:26vw;"> 因朵智慧库房——全景预览</div>
      <div style="width:8vw;display:flex;align-item:center;margin-left:33vw" class="fanhuitupianone"
        @click="toFullOrExit">
        <div><img :src="fullImg" /></div>
        <div style="margin-top:0.1vw;margin-left:1vw;font-size: 1vw;">{{ qpname }}</div>
      </div>
    </div>
    <div v-show="SceneSelection" class="list">
      <div style="display:flex;justify-content: center; margin-right:5vw;">
        <div v-for="(item, index) in imagesList" :key="index" :class="className(index)">
          <div>
            {{ item.name }}
          </div>
          <img :src="require(`../../assets/yjj-${index}.jpg`)"
            @click="handelChangeViewers(require(`../../assets/yjj-${index}.jpg`), index)" />
        </div>
      </div>
    </div>
    <div class="SceneSelection" @click="SceneSelectionClick">
      <img style=" width:2vw;height:2vw;margin-left: .5vw;margin-top: .5vw;" :src="require(`../../assets/场景选择.png`)" />
      <p style="font-size:.3vw;color:white;">场景选择</p>
    </div>
    <div v-if="isVideoplayer" style="z-index:101;position: fixed; width: 40%;height:44%;left:30vw;top: 10vw;">
      <video-player style="width: 100%;box-shadow:5px 5px 8px #888888;" class="video-player vjs-custom-skin"
        ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)" @ready="playerReadied" @canplay="onPlayerCanplay($event)"></video-player>
    </div>
    <viewer ref="Viewer" style="height:93vh;" :init="init" @viewerClick="viewerClick" @marker="markerClick" />
  </div>
</template>
<script >
import viewer from '../a09_kfdh/Viewer.vue'
const synth = window.speechSynthesis;// 启用文本
const msg = new SpeechSynthesisUtterance();// 表示一次发音请求。其中包含了将由语音服务朗读的内容，以及如何朗读它（例如：语种、音高、音量）。
export default {
  name: 'home',
  components: {
    viewer
  },
  data() {
    return {
      // imgurl:require(''),
      isVideoplayer: false,//是否展示视频播放
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //url地址
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          playToggle: true,//播放暂停按钮
          currentTimeDisplay: true,//当前播放时间
          progressControl: true,//播放进度条
          timeDivider: true,//'/'分隔符
          durationDisplay: true,//总时间
          remainingTimeDisplay: false,//当前播放时间
          playbackRateMenuButton: true,//播放速率，当前只有html5模式下才支持设置播放速率
          fullscreenToggle: true  //全屏按钮
        }
      },


      fullImg: require('@/assets/全屏.png'),
      qpname: '进入全屏',
      Viewer: 'Viewer',
      init: {
        imgurl: require('../../assets/yjj-0.jpg'), // 全景图
        navbar: false, // 是否显示底部操作栏
        caption: '',// 底部title
        marker: [
          {
            // 自定义样式的标记
            id: "text",
            longitude: 10,
            latitude: 0,
            // html: "HTML <b>marker</b> &hearts;", // 显示内容
            html:
              "<div class='textWrap' ><div id='text1'>HTML</div> <b>marker</b> &hearts;</div>", // 显示内容
            anchor: "bottom right",
            scale: [0.5, 1.5],
            style: {
              // maxWidth: "100px",
              color: "red",
              fontSize: "20px",
              fontFamily: "Helvetica, sans-serif",
              textAlign: "center"
            },
            tooltip: {
              content: "An HTML marker",
              position: "right"
            }
          },


          {
            id: '1',
            image: require('../../assets/leftArrows.png'),
            width: 55,
            height: 55,
            longitude: 100,
            latitude: 100,
            anchor: 'bottom center',
            className: 'markers',
            tooltip: '点击进入库房'
          },
          {
            id: '2',
            image: require('../../assets/rightArrows.png'),
            width: 55,
            height: 55,
            longitude: 0.85,
            latitude: -.34,
            // anchor: 'bottom center',
            anchor: 'center right',
            className: 'markers',
            tooltip: '点击进入档案阅览区'
          },
          {
            id: 'circle',
            tooltip: '门禁<b>简介</b>',
            content: '<p id="a">      门禁软件是门禁系统的管理软件，它负责管理整个门禁系统的用户、权限和状态等信息，并实现对门禁设备的远程控制和监控。</p>',
            circle: 20,
            svgStyle: {
              fill: 'rgba(255,255,0,0.3)',
              stroke: 'green',
              strokeWidth: '1px'
            },
            latitude: -0.45881575176774536,
            longitude: 1.1988261172964068,
            anchor: 'center right'
          },
          {
            id: 'circles',
            tooltip: '左边门禁简介',
            content: '<p id="a">      左边门禁简介测试内容</p>',
            image: require('../../assets/手指.gif'),
            width: 60,
            height: 60,
            // circle: 20,
            // svgStyle: {
            //     fill: 'green',
            //     stroke: 'green',
            //     strokeWidth: '1px'
            // },
            latitude: -0.43447746900733897,
            longitude: 5.231178895997125,
            anchor: 'center right'
          }
        ],
        marker1: [//借阅区标记点
          {
            id: 'backHall',
            image: require('../../assets/箭头.gif'),
            width: 75,
            height: 75,
            latitude: -0.5092021466067163,
            longitude: 3.411196449215802,
            anchor: 'bottom center',
            className: 'markers',
            tooltip: '返回大厅'
          },
        ],
        marker2: [//库房标记点
          {
            id: 'backHalls',
            image: require('../../assets/leftArrows.png'),
            width: 55,
            height: 55,
            longitude: -1,
            latitude: -.4,
            anchor: 'bottom center',
            className: 'markers',
            tooltip: '返回大厅'
          },
          {
            id: 'PDC',
            image: require('../../assets/手指.gif'),
            width: 55,
            height: 55,
            latitude: 0.027850858953771818,
            longitude: 0.33094496381145727,
            anchor: 'bottom center',
            className: 'markers',
            tooltip: '盘点车介绍'
          },
        ],
        marker4: [//办公室--标记点
          {
            id: 'four-one',
            image: require('../../assets/手指.gif'),
            width: 55,
            height: 55,
            latitude: -0.21507167328599586,
            longitude: 1.197209433925992,
            anchor: 'bottom center',
            className: 'markers',
            tooltip: '视频演示'
          },
        ],
      },
      imagesList: [
        {
          id: 1,
          name: "大厅",
        },
        {
          id: 2,
          name: "档案阅览区",
        },
        {
          id: 3,
          name: '库房',
        },
        {
          id: 4,
          name: '办公室',
        }
      ],
      SceneSelection: true,
      interval1: null,
      Timeout1: null,//清除定时器的延时器
      currentlySelected: 1,//当前选中的图片
    }
  },
  mounted() {
  },
  destroyed() {
    this.Timeout1 = null;
    clearTimeout(this.Timeout1)
  },
  methods: {
    requestFullScreen() {//全屏
      let de = document.documentElement
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      }
    },
    exitFullscreen() {//退出全屏
      let de = document
      if (de.exitFullscreen) {
        de.exitFullscreen()
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen()
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen()
      }
    },
    toFullOrExit() {//全屏/退出全屏
      this.isFull = !this.isFull
      if (this.isFull) {
        this.fullImg = require('@/assets/缩屏.png')

        this.qpname = '退出全屏'
        this.requestFullScreen()
      } else {
        this.fullImg = require('@/assets/全屏.png')
        this.exitFullscreen()
        this.qpname = '进入全屏'
      }
    },
    back() {
      this.$router.push('/home')
    },
    Speak(text) {// 语音播报的函数
      msg.text = text // 文字内容: 测试内容
      msg.lang = 'zh-CN' // 使用的语言:中文
      msg.volume = 2 // 声音音量：1
      msg.rate = 0.7 // 语速：1
      msg.pitch = 20 // 音高：1
      synth.speak(msg) // 播放
    },
    handleStop(e) {// 语音停止
      msg.text = e;
      msg.lang = "zh-CN";
      synth.cancel(msg); // 取消该次语音播放
    },
    viewerClick(data) {
      console.log(data, '点击非标记位置')
      this.handleStop();

      if (this.isVideoplayer) {
        this.$refs.videoPlayer.player.pause() // 暂停
        this.$refs.videoPlayer.player.reset() // 重置播放器
        this.$refs.videoPlayer.player.controls(false); // 播放控件是否显示
        this.isVideoplayer = false;
        this.$message.closeAll();
      }


    },

    verbatimShow(text) {//逐字显示 语音播报内容
      var i = 0;
      // document.getElementById("a").innerHTML = '';
      this.interval1 = setInterval(() => {
        var shower = text.substr(10, i);
        if (document.getElementById("a") == null) {
          return;
        }
        document.getElementById("a").innerHTML = shower;
        i++;
        if (i + 1 >= text.length) {
          clearInterval(this.interval1);
        }
      }, 300);
      this.Timeout1 = setTimeout(() => {
        clearInterval(this.interval1);
      }, (text.length - 10) * 300);
    },
    markerClick(data) {
      console.log(data, '点击标记位置');
      this.handleStop();

      if (data.id == 'circle') {
        this.Speak(this.init.marker[3].tooltip);
        this.Speak(this.init.marker[3].content);
        this.verbatimShow(this.init.marker[3].content);
      }
      else if (data.id == 'circles') {
        this.Speak(this.init.marker[4].tooltip)
        this.Speak(this.init.marker[4].content)
        this.verbatimShow(this.init.marker[4].content);
      }
      else if (data.id == 'four-one') {//视频演示
        this.isVideoplayer = true;
        this.$message({
          showClose: true,
          duration: 0,
          offset: 40,
          message: '提示：点击视频空白区域可关闭视频！'
        });
        // this.$refs.videoPlayer.player.controls(true); // 播放控件是否显示
      }
      else if (data.id == 2) {
        this.currentlySelected = 2;
        this.$refs.Viewer.handelChangeViewer(require(`../../assets/yjj-1.jpg`), this.init.marker1)
      }
      else if (data.id == 'backHall') {
        this.currentlySelected = 1;
        this.$refs.Viewer.handelChangeViewer(require(`../../assets/yjj-0.jpg`), this.init.marker)
      }
      else if (data.id == 'backHalls') {
        this.currentlySelected = 1;
        this.$refs.Viewer.handelChangeViewer(require(`../../assets/yjj-0.jpg`), this.init.marker)
      }
      else if (data.id == '1') {
        this.currentlySelected = 3;
        this.$refs.Viewer.handelChangeViewer(require(`../../assets/yjj-2.jpg`), this.init.marker2)
      }

      else {
        return;
      }

    },
    className(index) {
      if (index == this.currentlySelected - 1) {
        return "currentlySelected"
      } else {
        return "defaultSelected"
      }

    },
    // // 切换全景图 imgUrl: 全景图   marker：标记点
    handelChangeViewers(imgUrl, index, marker) {
      if (index == 0) {
        this.currentlySelected = 1;
        this.$refs.Viewer.handelChangeViewer(require(`../../assets/yjj-0.jpg`), this.init.marker)
      }
      else if (index == 1) {
        this.currentlySelected = 2;
        this.$refs.Viewer.handelChangeViewer(require(`../../assets/yjj-1.jpg`), this.init.marker1)
      }
      else if (index == 2) {
        this.currentlySelected = 3;
        this.$refs.Viewer.handelChangeViewer(require(`../../assets/yjj-2.jpg`), this.init.marker2)
      }
      else {
        this.currentlySelected = 4;
        this.$refs.Viewer.handelChangeViewer(require(`../../assets/yjj-3.jpg`), this.init.marker4)
      }
    },
    // 场景选择
    SceneSelectionClick() {
      this.SceneSelection = !this.SceneSelection;
    },

    onPlayerPlay(player) {
      console.log(player, '开始播放');
    },
    onPlayerPause(player) {
      console.log(player, '已暂停');
    },
    playerReadied() {
      console.log('准备好了');
    },
    onPlayerCanplay() {
      console.log('可以播放');
    }
  },
}

</script>
<style lang="scss" scoped>
.fanhuitupian {
  width: 2vw;
  height: 2vw;
  margin-left: 1vw;
}

.fanhuitupian img {
  width: 100%;
  height: 90%;
}

.fanhuitupianone {
  width: 2vw;
  height: 2vw;
}

.fanhuitupianone img {
  width: 90%;
  height: 90%;
}

.title {
  display: flex;
  align-items: center;
  width: 100%;
  height: 6vh;
  position: fixed;
  top: 2;
  text-align: center;
  z-index: 100;
  font-size: 1.2vw;
  // background-color: rgb(111, 186, 201);
}

.list {
  position: fixed;
  bottom: 4.1vw;
  width: 100%;
  height: 9vw;
  white-space: nowrap;

  z-index: 100;
  overflow-y: scroll;
  background-color: rgba(170, 170, 170, .6);

  img {
    width: 7vw;
    height: 6vw;
    margin-right: 1.6vw;
    border-radius: .6vw;
    border: 1px solid beige;
    box-sizing: border-box;
  }
}

.currentlySelected {
  color: rgb(246, 182, 76);
  width: 10vw;
  text-align: center;
  margin-top: 1vw;
  margin-left: 1vw;

  img {
    width: 10vw;
    height: 6vw;
    margin-right: 2.6vw;
    border-radius: .6vw;
    border: 2px solid rgb(246, 182, 76);
    box-sizing: border-box;
  }
}

.defaultSelected {
  color: rgb(255, 255, 255);
  width: 10vw;
  text-align: center;
  margin-top: 1vw;
  margin-left: 1vw;


}

.defaultSelected img {
  width: 10vw;
  height: 6vw;
  margin-right: 1.6vw;
  border-radius: .6vw;
  border: 1px solid beige;
  box-sizing: border-box;
}

.SceneSelection {
  position: fixed;
  bottom: 1.1vw;
  left: 14.5vw;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  display: inline;
  z-index: 101;
  background-color: rgb(216, 216, 216);
}


.psv-panel {
  ///deep/
  right: -10vw;
}

.psv-panel--open {
  ///deep/
  right: 33vw;
  top: 10vw;
  height: 50%;
}

.psv-panel-close-button {
  ///deep/
  left: 33.8vw
}

.psv-panel--open .psv-panel-resizer {
  ///deep/
  display: none;
}

.psv-panel-content {
  ///deep/
  padding-top: 3vw;
  text-indent: 2em;
}

::-webkit-scrollbar {
  width: 6px; //滚动条宽度
  height: 5px; //滚动条的高度

}

// 滚动条的滑块
::-webkit-scrollbar-thumb {
  background-color: #ececec; //设置滚动条的颜色
  border-radius: 3px; // 设置滚动条的圆角
}

// 修改表格(el-table)的滚动条
.el-table__body-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

// 滚动条的滑块
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ececec;
  border-radius: 3px;
}
</style>