<template>
  <div @click="toggleFullScreen">

    <!-- <div style="width:5.4vw;height:2.2vw;  position: absolute;right:9.6vw;top:0.6vw;background:red" ></div> -->
    <!-- //外层盒子需要动态绑定宽高属性 -->
    <div class="register" :style="{ width: fullWidth + 'px', height: fullHeight + 'px' }">
      <!-- //内层盒子用于添加背景图片
    //可以不用绑定动态宽高
    //如果不绑定动态宽高，则需要css样式设置其宽高为100%，甚至可以设置超过100% -->
      <div class="img_box" :style="{ width: fullWidth + 'px' }">
        <!-- 头部 -->
        <div class="hearder" style="height:5vw;display:flex;width:100%;align-items: center;">
          <div style="display:flex;width: 26vw;margin-left:1.5vw">
          </div>
          <div style="display:flex;">
            <div style="transform: rotate(180deg);">
              <dv-decoration-2 style="width:5vw;height:.5vh;margin-top:2vw;transform:rotate(360deg);margin-right: 6vw;" />
            </div>
            <div :class="isBigTitle ? 'Big' : 'Little'">
              {{ sixtitle }}
              <dv-decoration-5 class="dv-decoration-5" style="width:18vw;height:2vh;margin-left:2.1vw" :dur='10' />
            </div>
            <dv-decoration-2 style="width:5vw;height:.5vh;margin-left:0.6vw" />
          </div>
          <!-- 个人中心和设置 -->
          <div style="width:14vw;height:2vw;display:flex; margin-left:16vw;margin-top: -1vw;">
            <div style="display:flex;position: absolute;right:2vw" @click="setting()">
              <div class="shezhi"><img src="../../assets/syimg/设置.png" alt=""></div>
              <div
                style="width:3vw;font-size:1.2vw;font-family:SourceHanSansSC-Regular,SourceHanSansSC;font-weight: 400;color: #D8F0FF;letter-spacing: 1px;text-shadow: 0px 0px 10px #0091FF, 0px 0px 4px #0091FF;">
                设置</div>
            </div>
            <!-- <div style="display:flex;width:9vw;margin-left:0.3vw">
              <div class="geren"><img src="../assets/syimg/个人中心.png" alt=""></div>
              <div
                style="width:5.4vw;margin-left:2.3vw;font-size:1.2vw;font-family:SourceHanSansSC-Regular,SourceHanSansSC;font-weight: 400;color: #D8F0FF;letter-spacing: 1px;text-shadow: 0px 0px 10px #0091FF, 0px 0px 4px #0091FF;">
                个人中心</div>
            </div> -->

          </div>

        </div>
        <!-- 内容区域 -->
        <div style="display:flex;height:100%">
          <!-- 左边 -->
          <div class="leftcounte">
            <div @click="fanhuianniu()" class="fanhuianniu">
              <img src="../../assets/返回(2).png" alt="">
            </div>
            <div class="leftcounteone" style="height:41%;width:100%;margin-top:-1.3vw">
              <dv-border-box-8 :dur="10" style="width:22.9vw;height:22.1vw;margin-left:0.5vw;margin-top:-0.6vw">
                <div style="margin:1vw;width:92%;height:92%;">
                  <!--  -->
                  <div class="kufangshuju" @click="Controllerconfiguration">
                    <span style="margin-left:9.2vw;color: #8dd6fa;">库房环境数据展示</span>
                  </div>
                  <!-- <div class="beijing"
                      style="width:5vw;height:4.1vw;margin-top:4.5vw;overflow: hidden;">
                      <div style="display:flex;justify-content:center;margin-top:0.7vw;height:1.8vw">
                        <img src="../assets/syimg/温度.png" alt="">
                      </div>
                      <div style="display:flex;justify-content:center;margin-top: 0.2vw;">
                        <span style="color:#FFFFFF;font-size:0.5vw;width:1.5vw">温度</span><span
                          style="margin-left:0.2vw;font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw;width:1.7vw">{{
                            wendu }}℃</span>
                      </div>
                    </div> -->
                  <!-- <div class="beijing" style="width:5vw;height:4vw;margin-top:-4vw;margin-left:7.5vw;overflow:hidden">
                      <div class="pmtupian"
                        style="display:flex;justify-content:center;margin-top: 0.3vw;overflow:hidden;height:2.5vw"><img
                          src="../assets/syimg/图片2.png" alt=""></div>
                      <div style="display:flex;justify-content:center;margin-top:-0.1vw;">

                        <div
                          style="margin-left:0.2vw;font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw">
                          {{ kqzhiliang}}RH</div>
                      </div>
                    </div> -->
                  <!-- <div class="beijing" style="width:6vw;height:4vw;margin-top:-4vw;margin-left:15.05vw;overflow:hidden">
                      <div style="display:flex;justify-content:center;margin-top: 0.5vw;height:1.8vw"><img
                          src="../assets/syimg/湿度.png" alt=""></div>
                      <div style="display:flex;justify-content:center;margin-top: 0.3vw;">
                        <div style="color:#FFFFFF;font-size:0.5vw;width:1.5vw">湿度</div>
                        <div
                          style="font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw;margin-left:0.1vw">
                          {{ shidu }}%RH</div>
                      </div>
                    </div> -->

                  <!--空气质量earchs图  -->
                  <div class="opopedasdsa" style="width:100%;height:19vw;position: absolute;" id="opope"> </div>
                  <div style="margin:auto;width:47.33%;    position: absolute;top:11vw">
                  </div>
                  <div class="opopedasdsaone" style="width:100%;height:19vw;position: absolute;" id="opopeone"> </div>
                  <div style="margin:auto;width:47.33%;position: absolute;left:13vw;top:11vw">
                  </div>
                  <!-- 污染图标更换 -->
                  <!-- <div class="youliang">
                    <div v-show="xianshi1" style="margin:auto;width:47.33%;"><van-button round type="info"
                        style="width:6vw;margin-left:2vw;height:2.2vw;background:rgb(23, 199, 23);font-size:0.9vw">优</van-button>
                    </div>
                    <div v-show="xianshi2" style="margin:auto;width:47.33%;"><van-button round type="info"
                        style="width:6vw;margin-left:2vw;height:2.2vw;background:#07c44fd6;font-size:0.9vw">良好</van-button>
                    </div>
                    <div v-show="xianshi3" style="margin:auto;width:47.33%;"><van-button round type="info"
                        style="width:6vw;margin-left:2vw;height:2.2vw;background:orange;font-size:0.9vw">轻度污染</van-button>
                    </div>
                    <div v-show="xianshi4" style="margin:auto;width:47.33%;"><van-button round type="info"
                        style="width:6vw;margin-left:2vw;height:2.2vw;background:red;font-size:0.9vw">严重污染</van-button>
                    </div>
                  </div> -->
                  <!-- 温度第一行三个 -->
                  <div style="display:flex;margin-top:11.3vw;justify-content: space-between;">

                    <div class="beijing" style="width:7vw;height:4vw;overflow:hidden">
                      <div class="pmtupian" style="display:flex;justify-content:center;margin-top:-0.2vw;">
                        <img src="../../assets/syimg/tvoc.png" alt="">
                      </div>
                      <div style="display:flex;justify-content:center;margin-top: 0.6vw;margin-left:-0.3vw">
                        <!-- <div style="color:#FFFFFF;font-size:0.8vw;width:2vw;margin-top:0.1vw">PM2.5</div> -->
                        <div
                          style="display:flex;font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw;margin-left:0.1vw">
                          TVOC {{ tvoc }}
                          <div style="color:#2CF1ED;font-size:0.6vw;">
                            mg/m³
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="beijing" style="width:6vw;height:4vw;overflow:hidden">
                      <div class="dxshthio" style="display:flex;justify-content:center;margin-top: 0.1vw;"><img
                          src="../../assets/syimg/图片5.png" alt=""></div>
                      <div style="display:flex;justify-content:center;margin-top: 0.3vw;">
                        <!-- <div
                          style="color:#FFFFFF;font-size:0.8vw;width:2vw">湿度</div> -->
                        <div
                          style="font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw">
                          CO₂ {{ co2 }}

                        </div>
                        <div style="color:#2CF1ED;font-size:0.7vw;">
                          mg/m³
                        </div>
                      </div>
                    </div>
                    <div class="beijing" style="width:6vw;height:3.9vw;overflow:hidden">
                      <div class="dxshthio" style="display:flex;justify-content:center;margin-top: 0.4vw;overflow:hidden">
                        <img src="../../assets/syimg/图片4.png" alt="">
                      </div>
                      <div style="display:flex;justify-content:center;margin-top: 0vw;align-items: center;">
                        <div
                          style="margin-left:0.2vw;font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw">
                          <div style="">PM2.5 {{ kqzhiliang }}</div>
                        </div>
                        <div style="color:#2CF1ED;font-size:0.7vw;">
                          mg/m³
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 温度第二行 -->
                  <div style="display:flex;justify-content: space-between;">

                    <div class="beijing" style="width:7vw;height:4vw;overflow:hidden">
                      <div class="pmtupian"
                        style="display:flex;justify-content:center;margin-top: 0.3vw;overflow:hidden;height:2.5vw"><img
                          src="../../assets/syimg/图片2.png" alt=""></div>
                      <div style="display:flex;justify-content:center;margin-top:-0.1vw;">

                        <div
                          style="margin-left:0.2vw;font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw">
                          PM1 {{ pm1 }}RH</div>
                      </div>
                    </div>
                    <div class="beijing" style="width:6vw;height:4vw;overflow:hidden">
                      <div class="pmtupian" style="display:flex;justify-content:center;margin-top:0.5vw;overflow:hidden">
                        <img src="../../assets/syimg/图片3.png" alt="">
                      </div>
                      <div style="display:flex;justify-content:center;margin-top:0vw;">
                        <!-- <div
                          style="color:#FFFFFF;font-size:0.8vw;width:2vw">湿度</div> -->
                        <div
                          style="font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw">
                          PM10 {{ pm10 }}

                        </div>
                        <div style="color:#2CF1ED;font-size:0.7vw;">
                          mg/m³
                        </div>
                      </div>
                    </div>
                    <div class="beijing" style="width:6vw;height:4vw;overflow:hidden">
                      <div class="dxshthio" style="display:flex;justify-content:center;margin-top:.4vw;"><img
                          src="../../assets/syimg/图片6.png" alt=""></div>
                      <div style="display:flex;justify-content:center;margin-top: 0vw;">
                        <!-- <div
                          style="color:#FFFFFF;font-size:0.8vw;width:2vw">湿度</div> -->
                        <div
                          style="font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw">
                          SO₂ {{ so2 }}

                        </div>
                        <div style="color:#2CF1ED;font-size:0.7vw;">
                          mg/m³
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </dv-border-box-8>
            </div>

            <!-- 设备工作状态 -->
            <div class="leftcountetwo" style="height:26%;margin-top:-0.55vw;">
              <dv-border-box-1 style="width:23.5vw;height:14.3vw;margin-top:-0.8vw;margin-left:0.3vw">
                <div style="margin:1vw;width:91%;height:89%;">
                  <div class="kufangshuju">
                    <span
                      style="margin-left:10.3vw;font-family: DingTalk-JinBuTi, DingTalk;font-weight: normal;color: #8dd6fa;">
                      设备工作状态</span>
                  </div>
                  <div style="height:95%;width:100%;">
                    <div style="width:100%;height:50%;display:flex;align-items: center">
                      <div style="width:2.5vw">
                        <div v-if="sbstatus == 0" class="gongzuozt" style="margin-left:0.6vw;"><img
                            src="../../assets/syimg/加湿前.png" alt=""></div>
                        <div v-else class="gongzuozt" style="margin-left:0.6vw;"><img src="../../assets/syimg/加湿后.png"
                            alt=""></div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:0.6vw;font-size:0.6vw">库房加湿</div>
                      </div>

                      <div style="margin-left: 3.6vw;width:2.5vw">
                        <div v-if="sbstatustwo == 0" class="gongzuozt" style="margin-left:0.4vw"><img
                            src="../../assets/syimg/除湿前.png" alt=""></div>
                        <div v-else class="gongzuozt" style="margin-left:0.4vw"><img src="../../assets/syimg/除湿后.png" alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:0.74vw;font-size:0.6vw">库房除湿</div>
                      </div>
                      <div style="margin-left: 3.4vw;width:2.5vw">
                        <div class="gongzuozt" v-if="sbstatusthree == 0" style="margin-left:0.4vw"><img
                            src="../../assets/syimg/制冷前.png" alt=""></div>
                        <div class="gongzuozt" v-else style="margin-left:0.4vw"><img src="../../assets/syimg/制冷后.png" alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:0.6vw;font-size:0.6vw">库房制冷</div>
                      </div>
                      <div style="margin-left: 3.4vw;width:2.5vw">
                        <div class="gongzuozt" v-if="sbstatusfour == 0" style="margin-left:0.3vw"><img
                            src="../../assets/syimg/制热前.png" alt=""></div>
                        <div class="gongzuozt" v-else style="margin-left:0.3vw"><img src="../../assets/syimg/制热后.png" alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:0.5vw;font-size:0.6vw">库房制热</div>
                      </div>





                    </div>
                    <div style="width:100%;height:50%;display:flex;align-items: center;">
                      <div style="margin-left:0.1vw;width:2.5vw">
                        <div class="gongzuozt" v-if="sbstatussix == 0" style="margin-left:0.3vw"><img
                            src="../../assets/syimg/进化前.png" alt=""></div>
                        <div class="gongzuozt" v-else style="margin-left:0.3vw"><img src="../../assets/syimg/进化后.png" alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:1.1vw;font-size:0.6vw">净化</div>
                      </div>
                      <div style="margin-left: 3vw;width:2.5vw">
                        <div class="gongzuozt" v-if="sbstatusseven == 0" style="margin-left:0.4vw"><img
                            src="../../assets/syimg/微尘前.png" alt=""></div>
                        <div class="gongzuozt" v-else style="margin-left:0.4vw"><img src="../../assets/syimg/微尘后.png" alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:1vw;font-size:0.6vw">微尘净化</div>
                      </div>
                      <div style="margin-left: 3.3vw;width:2.5vw">
                        <div class="gongzuozt" v-if="sbstatuseight == 0" style="margin-left:0.7vw"><img
                            src="../../assets/syimg/气体前.png" alt=""></div>
                        <div class="gongzuozt" v-else style="margin-left:0.58vw"><img src="../../assets/syimg/气体后.png"
                            alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:1vw;font-size:0.6vw">气体净化</div>
                      </div>

                      <div style="margin-left: 3.6vw;width:2.5vw">
                        <div class="gongzuozt" v-if="sbstatusfive == 0" style="margin-left:0.4vw"><img
                            src="../../assets/syimg/新风前.png" alt=""></div>
                        <div class="gongzuozt" v-else style="margin-left:0.4vw"><img src="../../assets/syimg/新风后.png" alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:1.3vw;font-size:0.6vw">新风</div>
                      </div>
                    </div>
                  </div>
                </div>
              </dv-border-box-1>
            </div>

            <!--  12防预警感知 -->
            <div id="button" class="leftcountethree" style="height:29.7%;margin-top:-0.2vw">
              <dv-border-box-1 style="width:23.5vw;height:16.3vw;margin-top:-0.8vw;margin-left:0.3vw">
                <div style="margin:1vw;width:91%;height:89%;">
                  <div class="kufangshuju">
                    <span
                      style="margin-left:11.2vw;font-family: DingTalk-JinBuTi, DingTalk;font-weight: normal;color: #D0EDFB;">
                      <span style="margin-left: -1vw;color: #8dd6fa;">十二防预警感知</span> </span>
                  </div>
                  <dv-scroll-board :config="configs" style="width:21.5vw;height:13vw;margin-left:0.2vw;" />
                </div>
              </dv-border-box-1>
            </div>
          </div>
          <!-- 内容 -->
          <div class="counte">
            <div class="biaoti">
              <div
                style="margin:auto;width:14vw;text-align:center;position: relative;font-family: SourceHanSansSC-Bold, SourceHanSansSC;font-size: 1.6vw;color: rgb(34, 205, 250);top:0.8vw;">
                {{ this.kfname }}</div>
            </div>
            <div class="beijingtupian" style="wdith:100%;height:57%;margin-left:1vw;margin-top:-1vw;">
              <img style="width: 100%;height:100%;margin-left:-0.2%" src="../../assets/syimg/编组-28.gif" alt="">
              <!-- <div style="transform: rotate(18deg);width:40vw;height:26vw;position: absolute;left:30vw;top:10vw;"> -->
              <!-- <vue-draggable-resizable :w="100" :h="120" :x="250" :y="290" :parent="true" :min-width="50"
                  :min-height="50" :grid="[10, 10]">
                  <img src="../assets/syimg/温湿度-绿.png" alt="">
                  <div style="color: #ffffff;">去酸室</div>
                </vue-draggable-resizable>
                <vue-draggable-resizable :w="100" :h="120" :x="350" :y="290" :parent="true" :min-width="50"
                  :min-height="50" :grid="[10, 10]">
                  <img src="../assets/syimg/温湿度-绿.png" alt="">
                  <div style="color: #ffffff;">去酸室</div>
                </vue-draggable-resizable> -->
              <!-- <vue-draggable-resizable v-for="(item, index) in keyslist" :key="index" @dragstop="onDragstop"
                  @activated="onActivated(item, index)" :w="100" :h="120" :x="item.x" :y="item.y" :parent="true"
                  :min-width="50" :min-height="50" :grid="[10, 10]">
                  <img v-if="item.status == 0" src="../assets/syimg/温湿度-绿.png" alt="">
                  <img v-if="item.status == 1" src="../assets/syimg/温湿度-黄.png" alt="">
                  <img v-if="item.status == 2" src="../assets/syimg/温湿度-绿.png" alt="">
                  <div style="color: #ffffff;">{{ item.name }}</div>
                </vue-draggable-resizable>
              </div> -->
              <!-- <img src="../assets/c.jpg" alt=""> -->
              <!-- <img src="../assets/new.png" alt="" style="margin-left: 7.5%; margin-top: -42vw; width: 87%; height: 129%;" > -->
              <el-carousel @change="changePandT" style=" height: 55vh;position: relative; top: -34vw;" ref="toggle"
                :interval="6000" height="100%">
                <el-carousel-item v-for="(item, index) in lunbolist" :key="index">
                  <div v-if="item.id == '3'" class="lunbotupian" style="color:white;height:30vw;margin-top: 3.5vw;">
                    <img :src="item.url" alt="">
                  </div>
                  <div v-else class="lunbotupian" style="color:white;height:30vw;">
                    <img :src="item.url" alt="">
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>

            <div style="wdith:100%;height:100%;display:flex;margin-top:-0.2vw">
              <div class="leftcountethree" style="display:flex; height:28.7%;width:100%;margin-top:0.3vw;">
                <dv-border-box-1 style="width:25vw;height:15.8vw;margin-left:1vw;margin-top:0.1vw">
                  <div style="margin:1vw;width:91%;height:89%;">
                    <div
                      style="margin-left:0.6vw; font-family: DingTalk-JinBuTi, DingTalk;font-weight: normal;color: #D0EDFB;">
                      <div class="newkufangshuju" style="margin-bottom:0.2vw;">
                        <div style="text-align:center;margin-top:-0.1vw;color: #8dd6fa;">视频监控1</div>
                      </div>
                      <!-- <video muted   id="myVideo" style="height:22.3vh;margin-left:-0.4vw" width="104%" controls
                        controlslist="nodownload noremoteplayback noplaybackrate" disablePictureInPicture="true"
                        disableRemotePlayback="true">
                        <source id="source" src="s" type="video/mp4" />
                      </video> -->
                      <div>
                        <iframe :key="key" id="asdasdasd" :src="iframeUrl" :allowtransparency="true" ref="myIframe"
                          allow="fullscreen" mozallowfullscreen="true" oallowfullscreen="true" scroll="no"
                          style="margin:0;padding:0;overflow:hidden;display:block;height:22vh;margin-left:-0.4vw"
                          width="100%"></iframe>
                      </div>


                    </div>
                  </div>
                </dv-border-box-1>
                <dv-border-box-1 style="width:25vw;height:15.8vw;margin-left:0vw;margin-top:0.1vw">
                  <div style="margin:1vw;width:91%;height:89%;">
                    <div
                      style="margin-left:0.6vw; font-family: DingTalk-JinBuTi, DingTalk;font-weight: normal;color: #D0EDFB;">
                      <div class="newkufangshuju" style="margin-bottom:0.2vw;">
                        <div style="text-align:center;margin-top:-0.1vw;color: #8dd6fa;">视频监控2</div>
                      </div>

                      <!-- <div style="background-color:transparent"> -->
                      <iframe :key="keytwo" :src="iframeUrltwo" allowtransparency="true" id="myIframetwo" ref="iframe"
                        allow="fullscreen" mozallowfullscreen="true" oallowfullscreen="true" scroll="no"
                        style="margin:0;padding:0;overflow:hidden;display:block;height:22vh;margin-left:-0.4vw"
                        width="100%"></iframe>
                      <!-- </div> -->
                      <!-- <video muted id="myVideotwo" style="height:22.3vh;margin-left:-0.8vw" width="104%" controls
                        controlslist="nodownload noremoteplayback noplaybackrate" disablePictureInPicture="true"
                        disableRemotePlayback="true">
                        <source id="sourcetwo" src="s" type="video/mp4" />
                      </video> -->
                    </div>
                  </div>
                </dv-border-box-1>

              </div>

            </div>
          </div>
          <!-- 右边 -->
          <div class="leftcounte">
            <!-- 档案门类数据统计 -->
            <div class="leftcounteone" style="height:42%;width:100%;margin-top:-1.3vw">
              <dv-border-box-8 :reverse="true" :dur="10"
                style="width:22.9vw;height:22.6vw;margin-left:0.5vw;margin-top:-0.6vw">
                <div style="margin:1vw;width:92%;height:92%;">
                  <div class="kufangshuju">
                    <div style="margin-left:9.8vw;color: #8dd6fa;width:12vw">档案门类数据统计</div>
                  </div>
                  <div class="danganfenlei" style="margin-top:2vw;margin-left:9vw;z-index:99999999999">
                    <!-- <div class="asdaniskd" style="width:100%;height:15vw" id="nebingtu"> </div> -->
                    <div v-for="(item, index) in this.listdata " :key="index"
                      style="margin-top:1vw;width: 12vw;height:3vw;top: 5vw;right: 0vw;font-size: 0.85vw;align-items: center;">
                      <div style="display:flex;align-items: center;">



                        <div v-if="item.itemStyle == undefined" class="shabe" :style="{ 'backgroundColor': item.color }">
                        </div>
                        <div v-else-if="item.itemStyle != undefined" class="shabe"
                          :style="{ 'backgroundColor': item.itemStyle.color }"></div>

                        <div style="color: #FFFFFF;margin-left:0.5vw">{{ item.name }}</div>
                      </div>
                      <div style="display:flex;">
                        <div style="width:6vw; color: #17FFFF;margin-top:0.3vw">案卷:{{ item.valueone }}</div>
                        <div style="width:6vw; color: #17FFFF;margin-top:0.3vw">文件:{{ item.value }}</div>
                      </div>

                    </div>


                  </div>
                  <!-- 饼图 -->
                  <div>
                    <div class="asdaniskd" style="width:100%;height:15vw;position: relative;left: -15vw; top: -14vw;"
                      id="nebingtu"> </div>
                  </div>
                  <!-- 进度条 -->
                  <!-- <div style="color:#D0EDFB;font-size:1vw;position:absolute;top:15.8vw;left:2vw">库房容量实用率：</div>
                  <div style="display:flex;align-items:center;position:relative;top:-3.5%;left:-1vw">

                    <div class="toigdfgd" style="width:100%;height:5vw" id="sfdbsjef"></div>
                    <div style="font-size:1vw;position:absolute;color:#17FFFF;width:5vw;height:1vw;top:2.8vw;
    right: -2.1vw;">
                      {{ this.jindutiao }}%</div>
                  </div> -->


                </div>
              </dv-border-box-8>
            </div>
            <!-- 档案统计 -->
            <div class="leftcountetwo" style="height:26%;margin-top:-0.5vw">
              <dv-border-box-1 style="width:23.5vw;height:14.3vw;margin-top:-0.8vw;margin-left:0.3vw">
                <!-- <dv-border-box-8 :reverse="true" :dur="10" -->
                <!-- style="width:22.9vw;height:14vw;margin-left:0.5vw;margin-top:-0.8vw"> -->
                <div style="margin:1vw;width:91%;height:89%;">
                  <div class="kufangshuju">
                    <span style="margin-left:11.2vw;color: #8dd6fa;">档案统计</span>
                  </div>
                  <div class=aofjyhsa style="width:105%;height:20vw;margin-left:1.4vw;" id="opnasd"></div>
                </div>
              </dv-border-box-1>
              <!-- </dv-border-box-8> -->
            </div>
            <!-- 档案预警、操作消息通知 -->
            <div class="leftcountethree" style="height:28.5%;margin-top:-0.4vw">
              <dv-border-box-1 style="width:23.5vw;height:15.7vw;margin-top:-0.8vw;margin-left:0.3vw">
                <div class="youxiajiao" style="margin:1vw;width:91%;height:89%;">
                  <div class="kufangshuju">
                    <span
                      style="margin-left:11.2vw;font-family: DingTalk-JinBuTi, DingTalk;font-weight: normal;color: #D0EDFB;">
                      <span style="margin-left: -1.5vw;color: #8dd6fa;">档案出库异常报警</span> </span>
                  </div>
                  <dv-scroll-board :config="config" style="width:21.5vw;height:13vw;margin-left:0.2vw" />
                </div>
              </dv-border-box-1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-else id="viewer"></div> -->

    <!-- 设置页面 -->
    <el-dialog @close="handleClose" style="margin-top:-3vh" title="参数配置" width="80%" :visible.sync="dialogFormVisible"
      :center='true'>

      <div style="display:flex;margin-left:6vw;margin-top:-1.1vw">
        <div style="display:flex">
          <div style="height:2vw;line-height: 2vw;">
            服务器IP:
            <el-input style="color:black;width:13vw;height:1vw;margin-left:0.8vw;" type="text" v-model="environment"
              name="" placeholder="请输入服务器Ip" clearable="">
            </el-input>
          </div>
        </div>
        <div style="height:2vw;line-height: 2vw;margin-left:8.8vw">
          服务器端口:
          <el-input style="color:black;width:13vw;height:1.5vw;margin-left:1vw" type="text" v-model="environmentprot"
            name="" placeholder="请输入服务器端口" clearable="">
          </el-input>
        </div>
        <div style="height:2vw;line-height: 2vw;margin-left:4.2vw">
          名称:
          <el-input style="color:black;width:13vw;height:1.5vw;margin-left:1vw" type="text" v-model="pagetitle" name=""
            placeholder="请输入名称" clearable="">
          </el-input>
        </div>
      </div>
      <div style="display:flex;margin-top:2vw;margin-left:4vw;">
        <div style="height:2vw;line-height: 2vw;">
          档案服务器IP:
          <el-input style="color:black;width:13vw;height:1vw;margin-left:0.8vw;" type="text" v-model="archiveip" name=""
            placeholder="请输入服务器Ip" clearable="">
          </el-input>
        </div>
        <div style="height:2vw;line-height: 2vw;margin-left:6.8vw">
          档案服务器端口:
          <el-input style="color:black;width:13vw;height:1.5vw;margin-left:1vw" type="text" v-model="archiveport" name=""
            placeholder="请输入服务器端口" clearable="">
          </el-input>
        </div>

      </div>




      <div style="display:flex;margin-left:6.1vw;margin-top:2vw">
        <div style="display:flex">
          <div style="width:26vw;height:2vw;line-height: 2vw;margin-left:-0.8vw">
            设备编号1:
            <el-input style="color:black;width:16vw;height:1vw;margin-left:1vw;" type="text" v-model="monitorIp" name=""
              id="loginip" placeholder="请输入监控Ip" clearable="">
            </el-input>
          </div>
          <div style="width:23vw;height:2vw;line-height: 2vw;margin-left:2vw">
            通道编号1:
            <el-input style="color:black;width:16vw;height:1vw;margin-left:1.6vw;" type="text" v-model="monitorIptwo"
              name="" id="loginiptwo" placeholder="请输入监控Ip" clearable="">
            </el-input>
          </div>
          <select style="display: none; width:6vw;height:2vw;margin-left:1vw" id="ip" class="sel"
            onchange="getChannelInfo();getDevicePort();"></select>
          <select style="display: none; width:6vw;height:2vw;margin-left:1vw" id="iptwo" class="sel"
            onchange="getChannelInfo();getDevicePort();"></select>
          <!-- <select style="display: none; width:6vw;height:2vw;margin-left:1vw" id="iptwo" class="sel"
            onchange="getChannelInfo();getDevicePort();"></select> -->
        </div>


      </div>
      <div style="display:flex;margin-left:5.3vw;margin-top: 2vw;">
        <div style="height:2vw;line-height: 2vw;">
          设备编号2:
          <el-input style="color:black;width:16vw;height:1.5vw;margin-left:0.9vw" type="text" v-model="username" name=""
            id="username" placeholder="请输入用户名" clearable=""></el-input>
        </div>
        <div style="height:2vw;line-height: 2vw;margin-left:6vw;">
          通道编号2:
          <el-input style="color:black;width:16vw;height:1.5vw;margin-left:1.2vw" type="text" v-model="userPassword"
            name="" id="password" placeholder="请输入密码" clearable=""></el-input>

        </div>

      </div>
      <div style="display:flex">
        <div style="height:2vw;line-height: 2vw;margin-left:5.7vw;margin-top:2vw">
          监控端口:
          <el-input style="color:black;width:12vw;height:1.5vw;margin-left:1.1vw" type="text" v-model="monitorPort"
            name="" placeholder="请输入监控端口" clearable="" id="port">
          </el-input>
        </div>
        <div style="height:2vw;line-height: 2vw;margin-left:11.7vw;margin-top:2vw">
          监控Ip:
          <el-input style="color:black;width:10vw;height:1.5vw;margin-left:1.1vw" type="text" v-model="videip3" name=""
            placeholder="请输入监控IP" clearable="" id="port">
          </el-input>
        </div>
        <div style="margin-left:2vw;margin-top:2vw;">
          <el-button style="" type="primary" @click="shezhiclickLogin()">连接</el-button>

        </div>
      </div>
      <div>
        <div id="yulanhou" :value="namevalue" style="color: #110202;display:none">
          {{ namevalue }}
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
    </el-dialog>
    <!-- 库房控制器设置页面 -->
    <el-dialog @close="handleClose" style="margin-top:-3vh" title="库房控制器配置" width="63%" :visible.sync="kufangpeizhi"
      :center='true'>
      <div style="margin-left:6vw;margin-top:-1.1vw">
        <div style="display:flex">
          <div style="display:flex">
            <div style="height:2vw;line-height: 2vw;">
              库房名称:
              <el-select ref="optionRef" style="margin-left:.4vw" v-model="valuefour" placeholder="请选择"
                @change="kufangchange">
                <el-option v-for="item in fangzilistone" :key="item.warehouse.storeId" :label="item.warehouse.storeName"
                  :value="item.warehouse.storeId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div style="height:2vw;line-height: 2vw;margin-left:9vw">
            控制器选择:
            <el-select ref="kzqselct" style="margin-left:.4vw" v-model="valuethree" placeholder="请选择" @change="kzqchange">
              <el-option v-for="item in this.optionsthree" :key="item.aCId" :label="item.acname" :value="item.aCId">
              </el-option>
            </el-select>
          </div>
        </div>

        <div style="display:flex;margin-top:4vw">
          <div style="height:2vw;line-height: 2vw;margin-left:0vw">
            设备类型：
            <el-select ref="sbselcttwo" v-model="valueone" placeholder="请选择" @change='sbtype'>
              <el-option v-for="(item, index) in this.options" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="height:2vw;line-height: 2vw;margin-left:9vw">
            设备编号：
            <el-select ref="bianhaoselcttwo" style="margin-left:.4vw;" v-model="valuetwo" placeholder="请选择"
              @change="sbbianhao">
              <div style="height:5.2rem;z-index:99999">
                <el-option v-for="item in this.shebeibianhaolist" :key="item.key" :label="item.label" :value="item.value">
                </el-option>
              </div>

            </el-select>
          </div>
        </div>

      </div>


      <!-- 取消保存按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="savelist()">读取</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import moment from "moment";
import $ from 'jquery'
import apiPostGet from '../../utils/apiPostGet.js'
// import videoMonitor from '../../src/components/videoMonitor.vue'
import { dianjihrx } from '../../utils/shezhi.js'
// import { asdbasd, clickLogin, clickLogout, clickStartRealPlay, clickStopRealPlay } from '../utils/jiankong.js'
// import { asdbasds, clickLogins, clickLogouts, clickStartRealPlays } from '../utils/jiankongs.js'
// import { getR, postLogin, GetSystemData, getRecordClassify } from '../utils/api.js'
import * as echarts from "echarts";
import { Viewer } from 'photo-sphere-viewer'
import MarkersPlugin from 'photo-sphere-viewer/dist/plugins/markers'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
import 'photo-sphere-viewer/dist/plugins/markers.css';

import "echarts-gl";
// import axios from '../utils/request'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    // videoMonitor,
  },
  data() {
    return {
      key: new Date().getTime(),
      keytwo: new Date().getTime(),
      iframeUrl: '',
      iframeUrltwo: '',
      newid: 0,
      isFullFlag: false,
      isFullScreen: false,
      isPlaying: false,
      jiankongip: '',
      jiankognduankou: '',
      newipurl: '',
      newipurltwo: '',
      listdata: [



        // {
        //   name: '文书档案',
        //   value: 300
        // },
        // {
        //   name: '文书档案',
        //   value: 5060
        // },
        // {
        //   name: '测试档案',
        //   value: 0
        // },
        // {
        //   name: '军事档案',
        //   value: 120
        // }
   
      ],
      SYCD: 0,//使用长度
      DASL: 0,//使用总长度
      ZCD: '',//使用总 长度
      token: '',
      arrliststwoxxxx: [],
      sadTempldatalistlist: [],
      tempData: [],
      shebeibianhaolist: [

      ],
      options: [
        {
          value: '1',
          label: '空气质量云测仪'
        }, {
          value: '2',
          label: '环境超限'
        },

      ],

      optionstwo: [],
      optionsthree: [],
      // optionsfour: [],
      warehouseId: '',
      controtterId: '',
      deviceType: '',
      deviceNumber: '',
      valueone: '',
      valuetwo: '',
      valuethree: '',
      valuefour: '',
      nowWeek: '',
      nowDate: '',
      nowTime: '',
      sbstatus: 0,//库房加湿
      sbstatustwo: 0,//库房除湿
      sbstatusthree: 0,//库房制冷
      sbstatusfour: 0,//库房制热
      sbstatussix: 0,//净化
      sbstatusseven: 0,//微尘净化
      sbstatuseight: 0,//气体净化
      sbstatusfive: 0,//气体新风
      value: 2,
      kufangpeizhi: false,
      dialogFormVisible: false,
      namevalue: '-1',//-1初始化，0连接失败，1连接成功2已经登录
      imgurl1: require('../../assets/syimg/yjjtwo.jpg'),
      imgurl2: require('../../assets/syimg/yjjone.jpg'),
      imgurl3: require('../../assets/syimg/yjj.jpg'),
      fcyj: require('../../assets/syimg/防尘预警.png'),
      fdyj: require('../../assets/syimg/防盗预警.png'),
      fdsdyj: require('../../assets/syimg/防低湿度预警.png'),
      fdwyj: require('../../assets/syimg/防低温预警.png'),
      ffyj: require('../../assets/syimg/防腐预警.png'),
      fgwyj: require('../../assets/syimg/防高温预警.png'),
      fgsdyj: require('../../assets/syimg/防高湿预警.png'),
      fgyj: require('../../assets/syimg/防光预警.png'),
      fhyj: require('../../assets/syimg/防害预警.png'),
      fhuoyj: require('../../assets/syimg/防火预警.png'),
      fsyj: require('../../assets/syimg/防水预警.png'),
      fzyj: require('../../assets/syimg/防震预警.png'),
      config: {
        data: [
          // this.dataone[this.listlength - 1].unshift("<div  class='fsbj' ></div>", "暂无预警感知记录", "<div class='fsbj'>" + this.nowDate + "</div>");
          // ['空档案','报警记录'],
          // ["<div  style='margin-left: 2vw;display: flex;align-items: center;justify-content: center;'>" + '暂无出库异常情况'+"</div>","<div class='fsbj'>" + this.nowDate + "</div>"],
        ],
        columnWidth: [150],
        hoverPause: true,
        carousel: 'single',
        oddRowBGC: '#red',
        evenRowBGC: ''
      },
      configs: {
        dataone: [

        ],
        columnWidth: [50],
        hoverPause: true,
        // headerBGC:'#00BAFF',
        // carousel: 'single',
        // oddRowBGC: '#red',
        evenRowBGC: ''
        // evenRowBGC: '#0c93d6a9'

      },



      keyslist: [
        {
          status: 0,
          name: '',
          x: 150,
          y: 20
        },
        {
          status: 1,
          name: '',
          x: 200,
          y: 180
        },
        {
          status: 2,
          name: '',
          x: 250,
          y: 140
        }
      ],

      ixx: 0,//i=0表示库房1-5（默认），以此类推，i=3，表示库房16-20;
      // x: 0,
      falag: '0',
      activewas: -1,//默认索引
      jindutiao: 0,//进度条数据
      changdu: 0,//动态长度
      kfname: '综合库房平面图',
      wendu: '13',//库房环境数据展示温度
      shidu: '12',//库房环境数据展示湿度
      hcho: '13',//库房环境数据展示甲醛
      tvoc: '13',//库房环境数据展示pm2.5
      pm1: '13',//库房环境数据展示pm1
      pm10: '13',//库房环境数据展示pm10
      co2: '13',//库房环境数据展示co2
      so2: '13',//库房环境数据展示so2
      kqzhiliang: '0',//库房环境数据展示空气质量
      kejidangan: '20',
      wenshudangan: '20',
      caiwudangan: '20',

      // shengxiangdnagan: '20',
      showone: true, //数组1显示状态 表示前1-5个
      showtwo: false, //数组2显示状态 表示5-10
      showthree: false, //数组3显示状态 表示10-15
      showfour: false,  //数组4显示状态 表示15-20
      fangzilist: [],
      fangzilistone: [],//数组1 表示前1-5个
      fangzilisttwo: [],//数组2 表示前1-5个
      fangzilistthree: [],//数组3 表示前1-5个
      fangzilistfor: [],//数组4 表示前1-5个
      xianshi4: false,   //重度污染
      xianshi3: false,  //轻度污染图标
      xianshi2: false, //良好显示图标
      xianshi1: false, //优显示图标
      fullWidth: document.documentElement.clientWidth,
      fullHeight: document.documentElement.clientHeight,
      FS: "0",         //防水状态     0=无报警：1=报警",
      FH: "0",         //防火状态     0=无报警：1=报警",
      FD: "0",         //防盗状态     0=无报警：1=报警",
      WD: "0",		// 温度状态     0=无报警：1=报警",
      SD: "0",       //  湿度状态     0=无报警：1=报警",
      FC: "0",       //  防尘状态     0=无报警：1=报警",
      FF: "0",//防腐状态     0=无报警：1=报警",
      FG: "0",       //  防光状态     0=无报警：1=报警",
      FZ: "0",//防震状态     0=无报警：1=报警",
      FHai: "0",      //  防害状态     0=无报警：1=报警",
      WDSX: "0",  //温度上限
      WDXX: "0",
      SDSX: '0',
      SDXX: '0',
      haoma: '',
      timer3:null,
      timer4:null,
      timer5:null,
      timer6:null,
      timer7:null,
      timer8:null,
      timer:null,
      // dangandata: [
      //   //   {
      //   //   name: "档案总量",
      //   //   value: 1200000
      //   // },
      //   {
      //     name: "入库",
      //     value: 135
      //   },
      //   {
      //     name: "出库",
      //     value: 956
      //   },
      //   {
      //     name: "已移交",
      //     value: 500
      //   },
      //   {
      //     name: "销毁",
      //     value: 1206
      //   }
      // ],
      xh: '',
      yj: '',
      ck: '',
      rk: '',
      nulllist: '',
      zhinengnment: '',
      bafangnment: '',
      pagetitle: '',
      sixtitle: '', //大数据表头                                                                                                                                                                                                                          
      // value: '2',//监控窗口分隔默认值
      monitorIptwo: 'x11020000001320000132',//通道编号1
      monitorIp: 'xx11020000001110000168',//设备编号1

      monitorPort: '18080',//监控端口
      videip3: '172.16.17.33',//监控ip
      username: '11020000001110000168',//设备编号2
      environmentprot: '',//服务端口号
      environment: '',//服务ip
      archiveip: '', //档案服务ip
      archiveport: '',//档案服务端口
      userPassword: '11020000001320000131',//通道门编号2
      sendurl: '',//档案服务地址
      // hkurl:'',//环控请求地址
      kzqIP: '',//控制器ip
      kfdz: '',//库房请求地址
      isBigTitle: false,//页面标题显示大小效果
      // shebeibianhaolist:[]
      yunceyihuanjinlist: [],
      type: '',
      arrlist: [],
      lunbolist: [
        //11111
        { id: '1', url: require('../../assets/kftp/one.png') },
        { id: '3', url: require('../../assets/kftp/two.png') },
        { id: '2', url: require('../../assets/kftp/there.png') },
        { id: '4', url: require('../../assets/kftp/four.png') },
        // { id: '3', url: require('../assets/syimg/swiper1.png') }
      ],

    }
  },
  created() {

  },
  computed: {
  },
  mounted() {

    // document.addEventListener('fullscreenchange', this.fullscreenchange)
    // 监听页面全屏


    // console.log(localStorage.getItem('environment'), 'localStorage.getItem(');
    this.setNowTimes()
    // setInterval(()=>{    this.init()},2000)

    // this.shezhiclickLogin()
    // if (localStorage.getItem('archiveport') != undefined && localStorage.getItem('archiveip') != undefined && localStorage.getItem('environment') != undefined && localStorage.getItem('environmentprot') != undefined && localStorage.getItem('haoma') != undefined && localStorage.getItem('Kzqip') !== undefined && localStorage.getItem('Kzq') !== undefined && localStorage.getItem('shebeitype') !== undefined && localStorage.getItem('shebeitype') !== undefined && localStorage.getItem('kufangname') !== undefined) {

    // this.valuethree = localStorage.getItem('Kzq')
    this.environment = localStorage.getItem('environment')
    this.environmentprot = localStorage.getItem('environmentprot')
    // this.archiveip = localStorage.getItem('archiveip')
    // this.archiveport = localStorage.getItem('archiveport')
    // this.valueone = localStorage.getItem('shebeitype')
    // this.valuetwo = localStorage.getItem('shebeibianhao')
    // this.valuefour = localStorage.getItem('kufangname')
    this.haoma = this.deviceNumber + '#'
    // this.huanjin(localStorage.getItem('kzqip'))
    // this.kzqzhuangtai(localStorage.getItem('kzqip'))
    // }
    this.init()
    setTimeout(() => {
      this.kufang()

    }, 3000)


    setTimeout(() => {
      this.qiege()
    }, 4000)
    this.timer3 = setInterval(() => {   //获取库房数据后切割数组
      this.kufang() //获取库房接口 
    }, 10000)







    //从本地读取设备数据
    // setTimeout(() => {
    //   if (this.valuefour != '') {
    //     this.optionsthree = []
    //     const axislistdata = this.fangzilistone.filter((item, index) => {
    //       return item.warehouse.storeName == this.valuefour
    //     })
    //     if (axislistdata[0] == undefined) {
    //       return
    //     } else {
    //       this.optionsthree.push(...axislistdata[0].objectList)
    //     }
    //   }
    //   this.arrliststwoxxxx = []
    //   this.fangzilistone.forEach((item, index) => {
    //     item.objectList.forEach((items, indexs) => {
    //       try {
    //         if (items.aCName == this.valuethree) {
    //           this.arrliststwoxxxx.push(items)
    //         }
    //         throw new Error('11');
    //       } catch { }
    //     });
    //   })

    //   var warehouseId = this.arrliststwoxxxx[0].storeId //库房id
    //   var controllerId = this.arrliststwoxxxx[0].aCId  //控制器id
    //   this.kzqIP = this.arrliststwoxxxx[0].hostName
    //   this.yunceyihuanjinlist = []
    //   axios.get(this.hkurl + '/settingDeviceShow/get?warehouseId=' + warehouseId + '&controllerId=' + controllerId).then(res => {
    //     this.yunceyihuanjinlist.push(...res.data.data);
    //   }
    //   ).catch(error => {
    //   })
    //   if (this.valueone == '空气质量云测仪') {
    //     this.type = '12'
    //   }
    //   else if (this.valueone == '环境超限') {
    //     this.type = '13'
    //   } else {
    //     this.type = ''
    //   }
    //   setTimeout(() => {
    //     this.shebeibianhaolist = []
    //     this.arrlist = this.yunceyihuanjinlist.filter((item, index) => {
    //       return item.deviceType == this.type
    //     })

    //     this.arrlist.forEach((item, index) => {
    //       if (item.customName == ' ') {
    //         this.shebeibianhaolist.push(
    //           {
    //             label: item.deviceSerialNumber,
    //             value: item.deviceSerialNumber
    //           }
    //         )
    //       } else {
    //         this.shebeibianhaolist.push(
    //           {
    //             label: item.customName,
    //             value: item.deviceSerialNumber,
    //           }
    //         )
    //       }
    //     })
    //   }, 2000)
    // }, 2000)

    setTimeout(() => {
      this.configs = { data: this.dataone }
      this.cece()
      this.ceceone()
    }, 5000)

    this.timer4 = setInterval(() => {
      if (this.valueone == undefined) {
        return

      }
      else if (this.valueone.length > 0) {
        this.huanjin(this.kzqIP)
        this.kzqzhuangtai(this.kzqIP)
        // this.setNowTimes()
      }
      else {

      }
    }, 10000)
    // this.timer5 = setInterval(() => {
 
    // }, 10000)

    this.timer5 = setInterval(() => {
      this.configs = { data: this.dataone }
      this.cece()
      this.config = { data: this.data }
      this.ceceone()
      this.DATJ();//获取右侧档案统计
    }, 10000)

    setTimeout(() => {
      this.easrchs()
      this.easrchsone()
    }, 10000)

    this.gundongrongqi()
    this.toggleFullScreen()
    this.timer6 = setInterval(() => {
      this.$nextTick(() => {
        this.easrchs()
        this.easrchsone()
        this.setNowTimes()
      })
    }, 20000)


    this.timer7 = setInterval(() => {

      if (this.valuetwo == undefined) {
        return
      }
      else if (this.valuetwo != 0) {
        this.hjshuaxin()
      }
      else {
      }
    }, 8000)

 
    setTimeout(()=>{
      this.DATJ();//获取右侧档案统计
     
    },5000)  //柱状图
    setTimeout(()=>{
      this.zhuzhuangtu()
     
    },8000)  //柱状图
    this.timer8 = setInterval(() => {
      this.zhuzhuangtu()
    }, 15000) //柱状图

    // this.sadasdasdasd()
    setTimeout(() => { this.DAMLDataTJ() }, 4000)
    setInterval(() => { this.DAMLDataTJ() }, 28000)
    setTimeout(() => { this.bingtu() }, 6000)
    setInterval(() => { this.bingtu() }, 285000)
    // setInterval(()=>{this.bingtu()},91000)


    setTimeout(() => {
      this.fangzilistone.forEach((item, index) => {

        try {
          if (item.warehouse.storeId == this.warehouseId) {
            this.valuefour = item.warehouse.storeName
          }
          throw new Error('11');
        } catch (error) {

        }
      })

      this.fangzilistone.forEach((item, index) => {
        item.objectList.forEach((itemxx) => {
          try {
            if (itemxx.aCId == this.controllerId) {
              this.optionsthree = item.objectList
              this.kzqIP = itemxx.hostName
              console.log('进来了');
              this.valuethree = itemxx.acname
            }
            throw new Error('11');
          } catch (error) {
          }
        })
      })

    }, 4000)

    setTimeout(() => {
      this.options.forEach((item, index) => {
        try {
          if (item.value == this.controllerId) {
            console.log('进来了');
            this.valueone = item.label
          }
          throw new Error('11');
        } catch (error) {

        }
      })
      this.valuetwo = this.deviceNumber

      this.haoma = this.deviceNumber + '#'

    }, 4000)
  },

  methods: {
    // clickFun() {
    //       //设置后就是id==con_lf_top_div 的容器全屏
    //       let case1 = document.getElementById("iframeId");
    //   if (this.fullscreen) {
    //     if (    this.newid==0&&document.exitFullscreen) {
    //       document.exitFullscreen();
    //       console.log(this.newid,'this.newidthis.newidthis.newid');
    //     } else if (document.webkitCancelFullScreen) {
    //       document.webkitCancelFullScreen();
    //       console.log(this.newid,'this.newidthis.newidthis.newid1');
    //     } else if (document.mozCancelFullScreen) {
    //       document.mozCancelFullScreen();
    //       console.log(this.newid,'this.newidthis.newidthis.newid2');
    //     } else if (document.msExitFullscreen) {
    //       document.msExitFullscreen();
    //       console.log(this.newid,'this.newidthis.newidthis.newid3');
    //     }
    //   } else {
    //     if (case1.requestFullscreen) {
    //       this.newid=0
    //       console.log(this.newid,'this.newidthis.newidthis.newid4');
    //       case1.requestFullscreen();
    //     } else if (case1.webkitRequestFullScreen) {
    //       case1.webkitRequestFullScreen();
    //       console.log(this.newid,'this.newidthis.newidthis.newid5');
    //     } else if (case1.mozRequestFullScreen) {
    //       case1.mozRequestFullScreen();
    //       console.log(this.newid,'this.newidthis.newidthis.newid6');
    //     } else if (case1.msRequestFullscreen) {
    //       // IE11
    //       console.log(this.newid,'this.newidthis.newidthis.newid7');
    //       case1.msRequestFullscreen();
    //     }
    //   }

    // },

    // Screen(event){
    //  // 判断是否已经处于全屏状态，如果是则执行缩屏操作  
    //  if (document.fullscreenElement) {  
    //     document.exitFullscreen();  
    //   } else {  
    //     // 否则执行全屏播放操作  
    //     event.target.requestFullscreen();  
    //   }  

    // },
    // fullscreenchange(e) {
    //   if (document.fullscreenElement == null) {
    //     this.isFullScreen = false
    //   }
    // },
    // fullScreen() {
    //   if (this.isFullScreen) {
    //     document.webkitCancelFullScreen()
    //   } else {
    //     this.$refs.iframe.requestFullscreen()
    //   }
    //   this.isFullScreen = !this.isFullScreen
    // },

    gundongrongqi() {
      // 获取滚动容器的元素
      let container = document.querySelector(".danganfenlei");
      // 设置滚动条到底部
      container.scrollTop = container.scrollHeight;
      // 定时更新滚动条位置
      let scrollInterval = setInterval(function () {
        // 判断滚动条是否在底部
        if (container.scrollTop + container.clientHeight === container.scrollHeight) {
          // 到达底部时，重新滚动到顶部
          //  setTimeout(()=>{
          container.scrollTop = 0
          // },200) 
          //         container.scrollTop({  
          //   top: 0,  
          //   behavior: 'smooth'  
          // });
        } else {
          // 否则，每隔一段时间滚动一定距离
          container.scrollTop += 1; // 可根据需要调整滚动的距离
        }
      }, 47); // 可根据需要调整滚动的间隔时间
    },


    fanhuianniu() {
      window.history.go(-1)
    },
    //切割库房数组列表
    qiege() {

      this.fangzilistone = this.fangzilist.slice(0, 5)
      console.log(this.fangzilistone, '222222222222');



      this.fangzilisttwo = this.fangzilist.slice(5, 10)

      this.fangzilistthree = this.fangzilist.slice(10, 15)

      this.fangzilistfor = this.fangzilist.slice(15, 20)

    },
    //库房选择
    kufangchange() {
      this.valuethree = ''
      this.valuetwo = ''
      this.valueone = ''
      this.optionsthree = []
      // change 改变后获取值，要在nextTick中。
      this.$nextTick(() => {
        this.warehouseId = this.$refs.optionRef.selected.value


        let arrlistsxx = this.fangzilistone.filter((item, index) => {
          return item.warehouse.storeName == this.$refs.optionRef.selected.label
        })
        this.optionsthree.push(...arrlistsxx[0].objectList)
      })






    },
    //控制器选择
    kzqchange() {

      this.valuetwo = ''
      this.shebeibianhaolist = []
      this.tempData = []
      // this.options = []
      this.valueone = ''
      this.sadTempldatalistlist = []
      this.Devicetypetrue = []

      this.arrliststwoxxxx = []
      this.$nextTick(() => {
        this.controtterId = this.$refs.kzqselct.selected.value
        this.fangzilistone.forEach((item, index) => {
          item.objectList.forEach((items, indexs) => {
            try {
              if (items.acname == this.$refs.kzqselct.selected.label) {
                this.arrliststwoxxxx.push(items)
              }
              throw new Error('11');
            } catch { }
          });
        })
        console.log(this.arrliststwoxxxx, '11this.arrliststwoxxxxthis.arrliststwoxxxx');
        var warehouseId = this.arrliststwoxxxx[0].storeId //库房id
        var controllerId = this.arrliststwoxxxx[0].aCId  //控制器id
        this.kzqIP = this.arrliststwoxxxx[0].hostName
        //console.log(this.kzqIP, ' this.kzqIP this.kzqIP this.kzqIP');

        this.yunceyihuanjinlist = []
        axios.get(this.hkurl + '/settingDeviceShow/get?warehouseId=' + warehouseId + '&controllerId=' + controllerId).then(res => {
          //console.log(res.data.data, '获取控制器类型加数量成功');
          this.yunceyihuanjinlist.push(...res.data.data);
        }
        ).catch(error => {
          //console.log(error, '失败了');
        }

        )
      })


    },
    //设备类型选择
    sbtype() {
      this.shebeibianhaolist = []
      this.valuetwo = ''
      // this.haoma=''
      this.$nextTick(() => {
        console.log(this.valueone, 'sssssssssssssss22222222222222222222222222222');
        this.deviceType = this.$refs.sbselcttwo.selected.value
        console.log(this.$refs.sbselcttwo.selected.label, 'this.valueonethis.valueone');

        if (this.$refs.sbselcttwo.selected.label == '空气质量云测仪') {
          this.type = '12'
        }
        else if (this.$refs.sbselcttwo.selected.label == '环境超限') {
          this.type = '13'
        } else {
          this.type = ''
        }

        this.arrlist = this.yunceyihuanjinlist.filter((item, index) => {
          return item.deviceType == this.type
        })
        console.log(this.yunceyihuanjinlist, 'this.yunceyihuanjinlist');
        console.log(this.arrlist, 'arrlistarrlistarrlist');

        this.arrlist.forEach((item, index) => {
          if (item.customName == ' ') {
            this.shebeibianhaolist.push(
              {
                label: item.deviceSerialNumber,
                value: item.deviceSerialNumber
              }
            )
          } else {
            this.shebeibianhaolist.push(
              {
                label: item.customName,
                value: item.deviceSerialNumber,
              }
            )
          }
        })
      })



    },
    //设备编号选择
    sbbianhao(val) {
      console.log(val, '111111111111111');
      this.deviceNumber = val
      this.haoma = val + "#"
      // //console.log(this.haoma, 'sdddddddddddddddddddddddddddddddddddddddddddddd');


    },
    //友商服务接口
    Friendservice() {

    },
    cece() { //左边轮播预警表
      console.log('左侧');
      this.dataone = []
      if (this.FS == '0' && this.FH == '0' && this.FD == '0' && this.SD == '0' && this.FC == '0' && this.FF == '0' && this.FG == '0' && this.FZ == '0' && this.FHai == '0' && this.WD == '0') {
        this.dataone.push([])
        this.listlength = this.dataone.length


        this.dataone[this.listlength - 1].unshift("<div  class='fsbj' ></div>", "<div class='zanwuyujing'>暂无预警感知记录</div>", "<div class='fsbj'>" + this.nowDate + "</div>");

      }
      else {
        if (this.FS == '1') {
          this.dataone.push([])
          this.listlength = this.dataone.length
          // //console.log(this.listlength, 'listlengthlistlengthlistlength长度');
          // //console.log(this.dataone, ' this.dataone this.dataone this.dataone this.dataone this.dataone');
          this.dataone[this.listlength - 1].unshift("<div class='fsbj'><img src=" + this.fsyj + " alt=''></div>", "防水报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
        }
        if (this.FHai == '1') {
          this.dataone.push([])
          this.listlength = this.dataone.length
          // //console.log(this.dataone, ' this.dataone 防火报警');
          this.dataone[this.listlength - 1].unshift("<div  class='fsbj' ><img src=" + this.fhyj + " alt=''></div>", "防害报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
        }
        if (this.FD == '1') {
          this.dataone.push([])
          this.listlength = this.dataone.length
          // //console.log(this.dataone, ' this.dataone 防盗取报警');
          // //console.log(this.listlength, ' this.dataone 防盗取报警长度');
          this.dataone[this.listlength - 1].unshift("<div class='fsbj' ><img src=" + this.fdyj + " alt=''></div>", "防盗报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
        }
        setTimeout(() => {
          // //console.log(this.SD, '//console.log(this.SD);  //console.log(this.SD);  //console.log(this.SD)');
          if (this.SD == '1') {//湿度大于上限即位高湿

            this.dataone.push([])
            this.listlength = this.dataone.length
            this.dataone[this.listlength - 1].unshift("<div  class='fsbj'><img src=" + this.fgsdyj + " alt=''></div>", "高湿报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
            // //console.log(this.shidu, 'this.shiduthis.shidu');
            // //console.log(this.SDSX, 'this.SDSXSDSXSDSX');
          }
          else if (this.SD == '2') {
            //console.log('进入低湿度了');
            this.dataone.push([])
            this.listlength = this.dataone.length
            // //console.log(this.dataone, 'this.dataone this.dataone');
            this.dataone[this.listlength - 1].unshift("<div class='fsbj'><img src=" + this.fdsdyj + " alt=''></div>", "低湿报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
          }
          else {

          }


        }, 1000)
        if (this.FC == '1') {
          this.dataone.push([])
          this.listlength = this.dataone.length
          this.dataone[this.listlength - 1].unshift("<div  class='fsbj' ><img src=" + this.fcyj + " alt=''></div>", "防尘报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
        }
        if (this.FF == '1') {
          this.dataone.push([])
          this.listlength = this.dataone.length
          // //console.log(this.dataone, 'this.dataone this.dataone');
          this.dataone[this.listlength - 1].unshift("<div  class='fsbj' ><img src=" + this.ffyj + " alt=''></div>", "防腐报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
        }
        if (this.FG == '1') {
          this.dataone.push([])
          this.listlength = this.dataone.length
          this.dataone[this.listlength - 1].unshift("<div  class='fsbj' ><img src=" + this.fgyj + " alt=''></div>", "防光报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
        }
        if (this.FZ == '1') {
          this.dataone.push([])
          this.listlength = this.dataone.length
          this.dataone[this.listlength - 1].unshift("<div  class='fsbj' ><img src=" + this.fzyj + " alt=''></div>", "防震报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
        }
        if (this.FH == '1') {
          this.dataone.push([])
          this.listlength = this.dataone.length
          this.dataone[this.listlength - 1].unshift("<div  class='fsbj' ><img src=" + this.fhuoyj + " alt=''></div>", "防火报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
        }
        setTimeout(() => {
          if (this.WD == '1') {
            this.dataone.push([])
            this.listlength = this.dataone.length
            this.dataone[this.listlength - 1].unshift("<div  class='fsbj'><img src=" + this.fgwyj + " alt=''></div>", "高温报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
          }
          else if (this.WD == '2') {//否则即位低温
            this.dataone.push([])
            this.listlength = this.dataone.length
            this.dataone[this.listlength - 1].unshift("<div  class='fsbj'><img src=" + this.fdwyj + " alt=''></div>", "低温报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>")
          }
          else { }

        }, 1000)
      }



    },
    ceceone() { //右边轮播预警表

      this.data = []
      console.log('清空1');
      // if (true) {
      // this.data.push(["<div  style='display: flex;align-items: center;justify-content: center;'>" + 'ZC5-Y-WS-W-2015-209-209-209'+"</div>","<div  style='margin-left:3vw;display: flex;align-items: center;justify-content: center;'>" + '10:26:21'+"</div>"]);
      this.listlength = this.data.length;
      // yjj
      var datalist = {
        'IsConfirm':0,
        'pIndex':1,
        'pSize':200
      }
      axios.post(this.sendurl + '/GetDoorList', datalist).then(res => {
        // //console.log(res, '获取报警信息获取报警信息获取报警信息');
        console.log(res.data.data, '接口获取的数据11111111111');
        var tempdata = res.data.data.table;

        if (tempdata.length == 0) {
          this.data = []
          console.log('清空2');
          this.data.push(["<div style='margin-left:1.3vw; line-height: 47px;display: flex;align-items: center;justify-content: center;class='fsbj'>暂无出库异常情况</div>", "<div class='fsbjtwo'>" + this.nowDate + "</div>"]);
          return
        } else {
          this.data = []
          console.log('清空3');
          console.log(tempdata, '接口获取的数据2');
          tempdata.forEach((item, index) => {
            var aaa  = moment(item.RecordTime).format('YYYY-MM-DD HH:mm')
            let alist = []
            alist.push(["<div  style='margin-left:1.3vw; display: flex;align-items: center;justify-content: center;'>" + item.Number + "</div>", "<div class='fsbjtwo'>" + aaa + "</div>"])
            this.data = alist
            console.log(this.data, '滚动的数组');
          });
        }






      }).catch((error => {
        this.data = []
        this.data.push(["<div style='margin-left:1.3vw; display: flex;align-items: center;justify-content: center;class='fsbj'>暂无出库异常情况</div>", "<div class='fsbjtwo'>" + this.nowDate + "</div>"]);

      }))
    },
    // yjj 获取档案门类数据统计--中的数据
    DAMLDataTJ() {

      axios.get(this.sendurl + '/getArchiveClassifyAndCount').then(res => {
        console.log(res, '获取右侧档案门类数据统计--中的数据');
        this.listdata = [];
        var tempDAMLDataTJ_Data = res.data;

        tempDAMLDataTJ_Data.forEach(element => {

            this.listdata.push({
              name: element.mlname,
              value: Number(element.DAHCount) ,
              valueone: Number(element.DACount)

            })
        


        });
        console.log( this.listdata,'this.listdatathis.listdata');
        var colorstyle = [
          '#6495ED',
          '#EEE8AA',
          '#0000FF',
          '#00FF7F',
          '#FFFF00',
          '#FF0000',
          '#00CED1',
          '#FF8C00',
          '#FFA500',
          '#800000',
          '#D8BFD8',
          '#FFDAB9',
          '#FF4500',
          '#008080',
          '#D2B48C',
          '#A9A9A9',
          '#9400D3',
          '#3D59AB',
          '#FF7F50',
          '#8B4513',
          '#308014',
          '#F0E68C',
          '#F5F5F5'
        ]



        for (let i = 0; i < this.listdata.length; i++) {
          this.listdata[i].itemStyle = { 'color': colorstyle[i] };
        }

      }).catch((error => {
        // console.log(error, '获取右侧档案门类数据统计--失败了')
      }))
    },
    DATJ() {
      axios.get(this.sendurl + '/getDAHTotalAndDAInfos').then(res => {
        console.log(res, '获取右侧档案统计--中的数据');
        // var DATJs = res.data[0]
        var DATJs=res.data
        console.log(DATJs.zksl, '在库获取右侧档案统计--中的数据');
        this.rk = DATJs.zksl;
        this.yj = DATJs.zsl_hgl;
        this.ck = DATJs.cksl;
        this.xh = DATJs.yqsl;
      }).catch((error => {
        // console.log(error, '获取右侧档案统计--失败了')
      }))
    },

    // yjj
    //读取
    savelist() {


      var shezhidata = [
        { 'name': 'username', 'content': this.username },
        { 'name': 'password', 'content': this.userPassword },
        { 'name': 'videoip', 'content': this.monitorIp },
        { 'name': 'videoip2', 'content': this.monitorIptwo },
        { 'name': 'videoport', 'content': this.monitorPort },
        { 'name': 'environment', 'content': this.environment },
        { 'name': 'environmentprot', 'content': this.environmentprot },
        { 'name': 'archiveip', 'content': this.archiveip },
        { 'name': 'archiveport', 'content': this.archiveport },
        { 'name': 'logoname', 'content': this.pagetitle },
        { 'name': 'videoip3', 'content': this.videip3 },

        { 'name': 'warehouseId', 'content': this.warehouseId },
        { 'name': 'controllerId', 'content': this.controtterId },
        { 'name': 'deviceType', 'content': this.deviceType },
        { 'name': 'deviceNumber', 'content': this.deviceNumber },
      ]
      this.hkurl = 'http://' + this.environment + ':' + this.environmentprot

      axios.post(this.hkurl + '/custom/addMulti', shezhidata).then(res => {
        this.init()


        this.environment = this.nulllist[4]
        this.environmentprot = this.nulllist[5]
        this.archiveport = this.nulllist[8]




      }).catch(error => {



      })








      // localStorage.setItem('kufangname', this.valuefour)
      // localStorage.setItem('shebeibianhao', this.valuetwo)
      // localStorage.setItem('shebeitype', this.valueone)
      // localStorage.setItem('Kzq', this.valuethree)
      // localStorage.setItem('kzqip', this.kzqIP)
      // localStorage.setItem('haoma', this.haoma)
      this.kufangpeizhi = false
      this.kzqzhuangtai(this.kzqIP)
    },
    //环境数据展示温湿度
    hjshuaxin() {
      console.log(this.valueone, this.haoma, this.huanjinlist, 'this.huanjinlist');

      if (this.valueone != '环境超限' && this.valueone != '空气质量云测仪') {
        console.log('进入1');
        if (this.huanjinlist == undefined) {
          this.wendu = 0
          this.shidu = 0
          this.hcho = 0
          this.tvoc = 0
          this.pm1 = 0
          this.pm10 = 0
          this.co2 = 0
          this.so2 = 0
          this.kqzhiliang = 0
          return
        }
        if (this.huanjinlist[0] == undefined) {
          this.wendu = 0
          this.shidu = 0
          this.hcho = 0
          this.tvoc = 0
          this.pm1 = 0
          this.pm10 = 0
          this.co2 = 0
          this.so2 = 0
          this.kqzhiliang = 0
        }
        else if (this.$refs.sbselcttwo.selected.label == '环境超限') {
          this.huanjinlist[0][13].forEach((item, index) => {
            if (item.deviceNo == this.haoma) {
              this.wendu = item.temp
              this.shidu = item.hum
              this.hcho = item.HCHO
              this.tvoc = item.TVOC
              this.pm1 = item.pm1
              this.pm10 = item.pm10
              this.co2 = item.CO2
              this.so2 = item.SO2
              this.kqzhiliang = item.pm2_5
            }
          })
        }
        else if (this.$refs.sbselcttwo.selected.label == '空气质量云测仪') {
          console.log(this.haoma, '1111111111111111111111111111111111111');
          this.huanjinlist[0][12].forEach((item, index) => {
            if (item.deviceNo == this.haoma) {
              console.log('进入环境数据');
              this.wendu = item.temp
              this.shidu = item.hum
              this.hcho = item.HCHO
              this.tvoc = item.TVOC
              this.pm1 = item.pm1
              this.pm10 = item.pm10
              this.co2 = item.CO2
              this.so2 = item.SO2
              this.kqzhiliang = item.pm2_5
            }

          })
        }
      } else {
        console.log('进入2');
        if (this.huanjinlist == undefined) {
          this.wendu = 0
          this.shidu = 0
          this.hcho = 0
          this.tvoc = 0
          this.pm1 = 0
          this.pm10 = 0
          this.co2 = 0
          this.so2 = 0
          this.kqzhiliang = 0
          return
        }
        if (this.huanjinlist[0] == undefined) {
          this.wendu = 0
          this.shidu = 0
          this.hcho = 0
          this.tvoc = 0
          this.pm1 = 0
          this.pm10 = 0
          this.co2 = 0
          this.so2 = 0
          this.kqzhiliang = 0
        }
        else if (this.valueone == '环境超限') {
          this.huanjinlist[0][13].forEach((item, index) => {
            if (item.deviceNo == this.haoma) {
              this.wendu = item.temp
              this.shidu = item.hum
              this.hcho = item.HCHO
              this.tvoc = item.TVOC
              this.pm1 = item.pm1
              this.pm10 = item.pm10
              this.co2 = item.CO2
              this.so2 = item.SO2
              this.kqzhiliang = item.pm2_5
            }
          })
        }
        else if (this.valueone == '空气质量云测仪') {
          console.log(this.haoma, '1111111111111111111111111111111111111');
          this.huanjinlist[0][12].forEach((item, index) => {
            if (item.deviceNo == this.haoma) {
              console.log('进入环境数据');
              this.wendu = item.temp
              this.shidu = item.hum
              this.hcho = item.HCHO
              this.tvoc = item.TVOC
              this.pm1 = item.pm1
              this.pm10 = item.pm10
              this.co2 = item.CO2
              this.so2 = item.SO2
              this.kqzhiliang = item.pm2_5
            }

          })
        }
      }




    },
    //通过控制器来获取该控制器下的设备总状态和报警
    kzqzhuangtai(kzqIP) {
      var x = { 'ip': kzqIP }
      //控制器ip
      var y = JSON.stringify(x)
      var ip1 = encodeURIComponent(y)

      axios.get(this.hkurl + '/getRfid?cmd=60001&localip=127.0.0.1&hostname=10.168.1.39&port=8066&method=UnmannedKFPTService%2FgetTotalRunState&jsonin=' + ip1)
        .then(res => {
          // console.log(res.data.data.SRFCSZT[0], '通过控制器来获取该控制器下的设备总状态和报警成功了');

          this.sbstatus = res.data.data.HKYXZT[0].JSZZT,//库房加湿
            this.sbstatustwo = res.data.data.HKYXZT[0].CSZZT,//库房除湿
            this.sbstatusthree = res.data.data.HKYXZT[0].ZLZZT,//库房制冷
            this.sbstatusfour = res.data.data.HKYXZT[0].ZRZZT,//库房制热
            this.sbstatussix = res.data.data.HKYXZT[0].JHZZT,//净化
            this.sbstatusseven = res.data.data.HKYXZT[0].WCJHZZT,//微尘净化
            this.sbstatuseight = res.data.data.HKYXZT[0].QTJHZZT,//气体净化
            this.sbstatusfive = res.data.data.HKYXZT[0].XFZZT//气体新风
          this.FS = res.data.data.SRFCSZT[0].FS       //防水状态     0=无报警：1=报警",
          this.FD = res.data.data.SRFCSZT[0].FD        //防盗状态     0=无报警：1=报警",
          this.WD = res.data.data.SRFCSZT[0].WD       //  湿度状态     0=无报警：1=报警",
          this.SD = res.data.data.SRFCSZT[0].SD       //  湿度状态     0=无报警：1=报警",
          this.WDSX = res.data.data.SRFCSZT[0].WDSX    //温度上限
          this.WDXX = res.data.data.SRFCSZT[0].WDXX //温度下限
          this.SDSX = res.data.data.SRFCSZT[0].SDSX //温度上限
          this.SDXX = res.data.data.SRFCSZT[0].SDXX//湿度下限
          this.FC = res.data.data.SRFCSZT[0].FC        //  防尘状态     0=无报警：1=报警",
          this.FF = res.data.data.SRFCSZT[0].FF //防腐状态     0=无报警：1=报警",
          this.FG = res.data.data.SRFCSZT[0].FG       //防水状态     0=无报警：1=报警",
          this.FZ = res.data.data.SRFCSZT[0].FZ       //防震状态     0=无报警：1=报警",
          this.FHai = res.data.data.SRFCSZT[0].FHai  //防震状态     0=无报警：1=报警",
          this.FH = res.data.data.SRFCSZT[0].FH  //防震状态     0=无报警：1=报警",
        }).catch((error => {
          this.FS = 0
          this.FD = 0
          this.FH = 0
          this.WD = 0
          this.SD = 0
          this.WDSX = 0
          this.WDXX = 0
          this.SDSX = 0
          this.SDXX = 0
          this.FC = 0
          this.FF = 0
          this.FG = 0
          this.FHai = 0
          this.sbstatus = 0
          this.sbstatustwo = 0
          this.sbstatusthree = 0
          this.sbstatusfour = 0
          this.sbstatussix = 0
          this.sbstatusseven = 0
          this.sbstatuseight = 0
          this.sbstatusfive = 0
          //console.log(error, '通过控制器来获取该控制器下的设备总状态和报警失败了')
        }))
    },
    //库房控制器配置
    Controllerconfiguration() {
      this.kufangpeizhi = true











    },
    //设置接口
    init() {
      var shezhidata =
        ['username', 'password', 'videoip', 'videoip2', 'environment', 'environmentprot', 'videoport', 'logoname', 'archiveport', 'archiveip', 'videoip3', 'warehouseId', 'controllerId', 'deviceType', 'deviceNumber']
      // var senddata = '{}'
      this.hkurl = 'http://' + this.environment + ':' + this.environmentprot
      apiPostGet.apipost(this, this.hkurl + '/custom/getMulti', shezhidata);

    },
    // 设置页面返回数据
    viewUpdate(data) {
      this.nulllist = []
      // this.environment = data.serverip
      // this.environmentprot = data.environmentprot
      // let nulllist=[]
      data.forEach((item, index) => {
        this.nulllist.push(item)

      })
      console.log(this.nulllist, 'nulllistnulllistnulllistnulllist');
      this.environment = this.nulllist[4]
      this.environmentprot = this.nulllist[5]
      this.archiveport = this.nulllist[8]
      this.archiveip = this.nulllist[9]
      this.username = this.nulllist[0]
      this.userPassword = this.nulllist[1]
      this.monitorIp = this.nulllist[2]
      this.monitorIptwo = this.nulllist[3]
      this.monitorPort = this.nulllist[6]
      // this.pagetitle = this.nulllist[6]
      // monitorIp: '192.168.2.169',//监控IP
      // monitorPort: '80',//监控端口
      this.sixtitle = this.nulllist[7]
      this.pagetitle = this.nulllist[7]
      this.videip3 = this.nulllist[10]

      this.warehouseId = this.nulllist[11]


      this.controllerId = this.nulllist[12]


      this.deviceType = this.nulllist[13]
      if(this.deviceType=="2"){
        this.valueone='环境超限'
      }
      else if(this.deviceType=="1"){
        this.valueone='空气质量云测仪'
      }

      this.deviceNumber = this.nulllist[14]

      this.valuetwo = this.deviceNumber
      this.sendurl = 'http://' + this.archiveip + ':' + this.archiveport


      //console.log(data, '设置接口返回的的数据');
      if (this.sixtitle.length > 9) {

        this.isBigTitle = true;
      } else {
        this.isBigTitle = false;
      }
    },

    //获取库房接口
    kufang() {
      this.kfdz = 'http://' + this.environment + ':' + this.environmentprot
      apiPostGet.kufang(this, this.kfdz + '/warehouse/detailList',);
    },

    changePandT(e) {
      console.log(e, 'eeeeeeeeeeeeeee');
      // if (e == 0) {
      //   this.kfname = '档案库房平面图'
      // }
      // else if (e == 1) {
      //   this.kfname = '十一层馆区平面图'
      // } else {
      //   this.kfname = '十二层馆区平面图'
      // }
      this.kfname="综合库房平面图"
    },

    // 获取库房数据
    kufangshuju(data) {
      this.fangzilist = []
      var arr = []//库房列表
      //console.log(data, '库房接口返回的的数据1');
      data.forEach((item, index) => {
        arr.push(item)
      })
      this.fangzilist.push(...arr)

      // this.kfname = this.fangzilist[0].warehouse.storeName;
    },
    // 环境数据接口
    huanjin(kzqIP) {
      //console.log(kzqIP, 'this.kzqIPthis.kzqIPthis.kzqIP222222222')
      this.hkurl = 'http://' + this.environment + ':' + this.environmentprot
      //console.log(this.hkurl, '环境数据接口地址');
      var ipone = {
        'ip': kzqIP
      }
      //控制器ip
      var ipstring = JSON.stringify(ipone)
      var ip = encodeURIComponent(ipstring)
      //console.log(ip, '控制器ip控制器ip控制器ip');
      apiPostGet.huanjin(this, this.hkurl + '/getRfid?cmd=60001&localip=127.0.0.1&hostname=10.168.1.39&port=8066&method=UnmannedKFPTService/getStatus&jsonin=' + ip);
    },
    // 返回的环境数据
    viewUpdates(data) {
      this.huanjinlist = []
      //console.log(data, '返回的环境数据');
      this.huanjinlist.push(data)

      // if (data == undefined) {

      //   // //console.log(this.dataone,'//console.log(this.dataone);//console.log(this.dataone);');
      //   this.sbstatus = '0'//库房加湿
      //   this.sbstatustwo = '0'//库房除湿
      //   this.sbstatusthree = '0'//库房制冷
      //   this.sbstatusfour = '0'//库房制热
      //   this.sbstatussix = '0'//净化
      //   this.sbstatusseven = '0'//微尘净化
      //   this.sbstatuseight = '0' //气体净化
      //   this.sbstatusfive = '0'//气体新风
      //   // //console.log(data[7], '接口返回的的数据2');
      //   // //console.log(data[7][0], '接口返回的的数据2');
      //   this.wendu = '22'
      //   this.shidu = '22'
      //   this.hcho = '22'
      //   this.tvoc = '22'
      //   this.pm1 = '22'
      //   this.pm10 = '22'
      //   this.co2 = '22'
      //   this.so2 = '22'
      //   this.kqzhiliang = '22'

      //   this.FS = 0      //防水状态     0=无报警：1=报警",
      //   this.FD = 0        //防盗状态     0=无报警：1=报警",
      //   this.WD = 0     //  湿度状态     0=无报警：1=报警",
      //   this.SD = 0      //  湿度状态     0=无报警：1=报警",
      //   this.WDSX = 0    //温度上限
      //   this.WDXX = 0//温度下限
      //   this.SDSX = 0  //温度上限
      //   this.SDXX = 0//湿度下限
      //   this.FC = 0       //  防尘状态     0=无报警：1=报警",
      //   this.FF = 0 //防腐状态     0=无报警：1=报警",
      //   this.FG = 0      //防水状态     0=无报警：1=报警",
      //   this.FZ = 0      //防震状态     0=无报警：1=报警",
      //   this.FHai = 0  //防震状态     0=无报警：1=报警",
      // } else {
      //   // //console.log(this.dataone,'//console.log(this.dataone);//console.log(this.dataone);');
      //   this.sbstatus = item.JSZZT,//库房加湿
      //     this.sbstatustwo = item.CSZZT,//库房除湿
      //     this.sbstatusthree = item.ZLZZT,//库房制冷
      //     this.sbstatusfour = item.ZRZZT,//库房制热
      //     this.sbstatussix = item.JHZZT,//净化
      //     this.sbstatusseven = item.WCJHZZT,//微尘净化
      //     this.sbstatuseight = item.QTJHZZT,//气体净化
      //     this.sbstatusfive = item.XFZZT,//气体新风
      //     // //console.log(data[7], '接口返回的的数据2');
      //     // //console.log(data[7][0], '接口返回的的数据2');
      //     this.wendu = item.Temp
      //   this.shidu = item.Hum
      //   this.hcho = item.HCHO
      //   this.tvoc = item.TVOC
      //   this.pm1 = item.pm1
      //   this.pm10 = item.pm10
      //   this.co2 = item.CO2
      //   this.so2 = item.SO2
      //   this.kqzhiliang = item.pm2_5

      //   this.FS = data.SRFCSZT[0].FS       //防水状态     0=无报警：1=报警",
      //   this.FD = data.SRFCSZT[0].FD        //防盗状态     0=无报警：1=报警",
      //   this.WD = data.SRFCSZT[0].WD       //  湿度状态     0=无报警：1=报警",
      //   this.SD = data.SRFCSZT[0].SD       //  湿度状态     0=无报警：1=报警",
      //   this.WDSX = data.SRFCSZT[0].WDSX    //温度上限
      //   this.WDXX = data.SRFCSZT[0].WDXX //温度下限
      //   this.SDSX = data.SRFCSZT[0].SDSX //温度上限
      //   this.SDXX = data.SRFCSZT[0].SDXX//湿度下限
      //   this.FC = data.SRFCSZT[0].FC        //  防尘状态     0=无报警：1=报警",
      //   this.FF = data.SRFCSZT[0].FF //防腐状态     0=无报警：1=报警",
      //   this.FG = data.SRFCSZT[0].FG       //防水状态     0=无报警：1=报警",
      //   this.FZ = data.SRFCSZT[0].FZ       //防震状态     0=无报警：1=报警",
      //   this.FHai = data.SRFCSZT[0].FHai  //防震状态     0=无报警：1=报警",

      // }

    },
    setNowTimes() {
      //获取当前时间
      let myDate = new Date()
      let wk = myDate.getDay()
      let yy = String(myDate.getFullYear())
      let mm = String((myDate.getMonth() + 1))
      let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
      let min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
      let sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
      let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      let week = weeks[wk]
      this.nowDate = mm + '月' + dd + '日'
      this.nowTime = hou + ':' + min
      this.nowWeek = week
      this.nowDmd = yy + '-' + mm + '-' + (dd - 3)
      this.nowDmdtwo = yy + '-' + mm + '-' + (dd - 2)
      this.nowDmdthree = yy + '-' + mm + '-' + (dd - 1)
      this.nowDmdfour = yy + '-' + mm + '-' + dd


    },
    cancel() {// 取消
      this.dialogFormVisible = false
      this.kufangpeizhi = false
      // $("#yulanhou").html(-1)
    },
    //保存
    save() {
      //  localStorage.setItem('monitorIptwo',this.monitorIptwo)   
      //  localStorage.setItem('monitorIp',this.monitorIp)   
      //  localStorage.setItem('userPassword',this.userPassword)   
      //  localStorage.setItem('username',this.username)   

      var shezhidata = [
        { 'name': 'username', 'content': this.username },
        { 'name': 'password', 'content': this.userPassword },
        { 'name': 'videoip', 'content': this.monitorIp },
        { 'name': 'videoip2', 'content': this.monitorIptwo },
        { 'name': 'videoport', 'content': this.monitorPort },
        { 'name': 'environment', 'content': this.environment },
        { 'name': 'environmentprot', 'content': this.environmentprot },
        { 'name': 'archiveip', 'content': this.archiveip },
        { 'name': 'archiveport', 'content': this.archiveport },
        { 'name': 'logoname', 'content': this.pagetitle },
        { 'name': 'videoip3', 'content': this.videip3 },
      ]
      this.hkurl = 'http://' + this.environment + ':' + this.environmentprot

      axios.post(this.hkurl + '/custom/addMulti', shezhidata).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          localStorage.setItem('environment', this.environment)
          localStorage.setItem('environmentprot', this.environmentprot)
          // localStorage.setItem('archiveip', this.archiveip)
          // localStorage.setItem('archiveport', this.archiveport)



          this.init()
          this.kufang()
          this.dialogFormVisible = false

        }
      }).catch(error => {
        this.$message({
          message: '保存失败',
          type: 'error'
        });
        this.init()
        //console.log(error, '保存失败');
        this.dialogFormVisible = false
      })
    },
    //设置点击监控连接
    shezhiclickLogin() {
      this.key = new Date().getTime()
      this.keytwo = new Date().getTime()
      this.ifamSrc = document.getElementById("asdasdasd");
      var url = "http://" + this.videip3 + ":" + this.monitorPort + "/#/play/wasm/ws%3A%2F%2F" + this.videip3 + "%3A81%2Frtp%2F" + this.monitorIp + "_" + this.monitorIptwo + ".live.flv"
      var urltwo = "http://" + this.videip3 + ":" + this.monitorPort + "/#/play/wasm/ws%3A%2F%2F" + this.videip3 + "%3A81%2Frtp%2F" + this.username + "_" + this.userPassword + ".live.flv"

      this.iframeUrl = url
      this.iframeUrltwo = urltwo

      console.log(this.iframeUrl, '22222222222');
      console.log(this.iframeUrltwo, '111111111111');






      // iframetwo.play();
      //     console.log( iframe.src, '监控1');
      // console.log(iframetwo.src, '监控2');
    },








    // shezhiclickLogin() {
    //   this.newipurl = 'http://' + this.videip3 + ':' + this.monitorPort + '/rtp/' + this.monitorIp + '_' + this.monitorIptwo + '.live.mp4'
    //   this.newipurltwo = 'http://' + this.videip3 + ':' + this.monitorPort + '/rtp/' + this.username + '_' + this.userPassword + '.live.mp4'
    //   var video = document.getElementById("myVideo");
    //   var source  = document.getElementById("source");
    //   var videotwo = document.getElementById("myVideotwo");
    //   var sourcetwo  = document.getElementById("sourcetwo");
    //   var newSrc // 更换为新的音频文件路径  
    //   var newSrctwo // 更换为新的音频文件路径  
    //   newSrc=this.newipurl
    //   newSrctwo=this.newipurltwo
    //   source.src = newSrc;  
    //   sourcetwo.src = newSrctwo;  
    //   video.load(); // 重新加载音频文件  
    //   video.play(); // 播放新的音频文件  
    //   videotwo.load(); // 重新加载音频文件  
    //   videotwo.play(); // 播放新的音频文件  

    //   console.log(this.newipurl, '监控1');
    //   console.log(this.newipurltwo, '监控2');
    // },

    // jiankongchushihua() {
    //   this.newipurl = 
    //   this.newipurltwo = 
    //   var video = document.getElementById("myVideo");
    //   var source  = document.getElementById("source");
    //   var videotwo = document.getElementById("myVideotwo");
    //   var sourcetwo  = document.getElementById("sourcetwo");
    //   var newSrc // 更换为新的音频文件路径  
    //   var newSrctwo // 更换为新的音频文件路径  
    //   newSrc=this.newipurl
    //   newSrctwo=this.newipurltwo
    //   source.src = newSrc;  
    //   sourcetwo.src = newSrctwo;  
    //   video.load(); // 重新加载音频文件  
    //   video.play(); // 播放新的音频文件  
    //   videotwo.load(); // 重新加载音频文件  
    //   videotwo.play(); // 播放新的音频文件  

    //   console.log(this.newipurl, '监控1');
    //   console.log(this.newipurltwo, '监控2');
    // },
    //监控设置连接


    // shezhiclickLogin() { // 登录

    // if (this.monitorIp || this.monitorIptwo && this.monitorPort && this.username && this.userPassword) {
    //   // 先退出登录
    //   clickLogout()
    //   clickLogouts()

    //   //调jq 登录
    //   clickLogin()
    //   clickLogins()


    //   const loading = this.$loading({
    //     lock: true,
    //     text: '加载中……',
    //     customClass: 'loadingclass',          // **遮罩层新增类名，如果需要修改loading的样式**
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   });
    //   setTimeout(() => {
    //     loading.close();
    //     //console.log($("#yulanhou").html(), 'namevalue');

    //     if ($("#yulanhou").html() == 1) {
    //       // alert('sssssssssssss')
    //       this.$message({
    //         message: '连接成功',
    //         type: 'success'
    //       });
    //     } else {
    //       this.$message.error('连接失败');
    //     }
    //   }, 3000);
    // } else {
    //   this.$message({
    //     message: '请填写正确的信息',
    //     type: 'warning'
    //   })
    // }


    // },
    // clickStartRealPlay() {//开始预览
    //   clickStopRealPlay();//停止
    //   // setTimeout(() => {
    //   //   clickStopRealPlays();//停止第二个

    //   // }, 200);
    //   setTimeout(() => {
    //     clickStartRealPlay();//开始预览第一个
    //   }, 300);
    //   setTimeout(() => {
    //     clickStartRealPlays()//
    //   }, 200);
    // },
    handleClose() {
      this.dialogFormVisible = false
    },
    //设置的点击事件
    setting() {
      this.init()
      this.dialogFormVisible = true
      // setTimeout(() => {
      //   this.shezhiclickLogin()
      //   setTimeout(() => {
      //     this.clickStartRealPlay()
      //   }, 3500)
      // }, 2000)



    },

    //关闭
    // dianjihrx() {
    //   dianjihrx()
    //   $("#yulanhou").html(-1)
    //   // b()
    // },

    toggleFullScreen() {
      const doc = window.document;
      const docEl = doc.documentElement;

      const requestFullScreen = docEl.requestFullScreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      const exitFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
        this.newid = 1

      } else {
      }




    },
    handleResize() {
      this.fullWidth = document.documentElement.clientWidth
      this.fullHeight = document.documentElement.clientHeight
    },
    easrchs() {
      if (document.getElementById("opope") == null) {
        return
      }
      echarts.dispose(document.getElementById("opope"))
      const myChart = echarts.init(document.getElementById("opope"));
      var dataArr = this.wendu;

      var colorSet = {
        color: '#468EFD'
      };
      var text;
      if (dataArr >= 0 && dataArr <= 20) {   //优秀
        this.xianshi4 = false
        this.xianshi1 = true
        this.xianshi2 = false
        this.xianshi3 = false
        // //console.log('>>>>>>>>>>>优');

      } else if (dataArr > 20 && dataArr <= 50) {  ////////良好 
        this.xianshi3 = false
        this.xianshi1 = false
        this.xianshi2 = true
        this.xianshi4 = false
        // //console.log('>>>>>>>>>>>良好');


      } else if (dataArr > 50 && dataArr <= 70) {////////轻度污染
        this.xianshi2 = false
        this.xianshi1 = false
        this.xianshi3 = true
        this.xianshi4 = false
        // //console.log('>>>>>>>>>>>轻度污染');
      }
      else {////////重度污染 
        this.xianshi1 = false
        this.xianshi2 = false
        this.xianshi3 = false
        this.xianshi4 = true
      }
      var option = {

        title: {
          show: true,
          text: '温度℃',
          x: '49%',
          y: '55%',
          z: 8,
          textAlign: 'center',
          textStyle: {
            color: '  #fff ',
            fontSize: 19,
          },

        },
        series: [
          {
            name: "内部进度条",
            type: "gauge",
            // center: ['20%', '50%'],
            radius: '60%',

            splitNumber: 10,
            axisLine: {
              lineStyle: {
                color: [
                  [dataArr / 100, colorSet.color],
                  [1, "#111F42"]
                ],
                width: 14
              }
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,

            },
            splitLine: {
              show: false,
            },


            pointer: {
              show: false,
            },
          },
          {
            name: '外部刻度',
            type: 'gauge',
            //  center: ['20%', '50%'],
            radius: '70%',
            min: 0, //最小刻度
            max: 100, //最大刻度
            splitNumber: 10, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [
                  [1, 'rgba(0,0,0,0)']
                ]
              }
            },
            //仪表盘轴线
            axisLabel: {
              show: true,
              color: '#fff',
              distance: 25,
              formatter: function (v) {
                switch (v + '') {
                  case '0':
                    return '0';
                  case '10':
                    return '10';
                  case '20':
                    return '20';
                  case '30':
                    return '30';
                  case '40':
                    return '40';
                  case '50':
                    return '50';
                  case '60':
                    return '60';
                  case '70':
                    return '70';
                  case '80':
                    return '80';
                  case '90':
                    return '90';
                  case '100':
                    return '100';
                }
              }
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 7,
              lineStyle: {
                color: colorSet.color, //用颜色渐变函数不起作用
                width: 1,
              },
              length: -8
            }, //刻度样式
            splitLine: {
              show: true,
              length: -20,
              lineStyle: {
                color: colorSet.color, //用颜色渐变函数不起作用
              }
            }, //分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          /*内部*/
          {
            type: 'pie',
            radius: ['0', '35%'],
            center: ['50%', '50%'],
            z: 8,
            hoverAnimation: false,
            data: [{
              name: '污染程度',
              value: dataArr,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: '#4FADFD'
                  }, {
                    offset: 1,
                    color: '#28E8FA'
                  }])
                }

              },
              label: {
                normal: {
                  rich: {
                    a: {
                      color: '#468EFD',
                      align: 'center',
                      fontSize: 50,
                      fontWeight: "bold"
                    },
                  },
                  formatter: function (params) {
                    return "{a|" + params.value + "}";
                  },
                  position: 'center',
                  show: true
                }
              },
              labelLine: {
                show: false
              }
            }],
          },
          /*外一层*/
          {
            type: "pie",
            radius: "40%",
            startAngle: 220,
            endAngle: -40,
            hoverAnimation: false,
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [{
              value: 1
            }],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: "rgba(69, 161, 255,0.8)"
                  }, {
                    offset: 1,
                    color: "rgba(69, 161, 255,0.5)"
                  }]
                }
              }
            }
          },
          //外二层圈
          {
            type: "pie",
            radius: "45%",
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            z: 0,
            hoverAnimation: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [{
              "value": 1
            }],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: "rgba(69, 161, 255,0.5)"
                  }, {
                    offset: 1,
                    color: "rgba(69, 161, 255,0.3)"
                  }]
                }
              }
            }
          },
          //最外层圈
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            z: 0,
            hoverAnimation: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            data: [{
              value: 1
            }],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: "rgba(69, 161, 255,0.3)"
                  },
                  {
                    offset: 1,
                    color: "rgba(69, 161, 255,0)"
                  }
                  ]
                }
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    easrchsone() {
      if (document.getElementById("opopeone") == null) {
        return
      }
      echarts.dispose(document.getElementById("opopeone"))
      const myChart = echarts.init(document.getElementById("opopeone"));
      var dataArr = this.shidu;

      var colorSet = {
        color: '#468EFD'
      };
      var text;
      if (dataArr >= 0 && dataArr <= 20) {   //优秀
        this.xianshi4 = false
        this.xianshi1 = true
        this.xianshi2 = false
        this.xianshi3 = false


      } else if (dataArr > 20 && dataArr <= 50) {  ////////良好 
        this.xianshi3 = false
        this.xianshi1 = false
        this.xianshi2 = true
        this.xianshi4 = false



      } else if (dataArr > 50 && dataArr <= 70) {////////轻度污染
        this.xianshi2 = false
        this.xianshi1 = false
        this.xianshi3 = true
        this.xianshi4 = false

      }
      else {////////重度污染 
        this.xianshi1 = false
        this.xianshi2 = false
        this.xianshi3 = false
        this.xianshi4 = true
      }
      var option = {

        title: {
          show: true,
          text: '湿度%RH',
          x: '49%',
          y: '55%',
          z: 8,
          textAlign: 'center',
          textStyle: {
            color: '  #fff ',
            fontSize: 19,
          },

        },
        series: [
          {
            name: "内部进度条",
            type: "gauge",
            // center: ['20%', '50%'],
            radius: '60%',

            splitNumber: 10,
            axisLine: {
              lineStyle: {
                color: [
                  [dataArr / 100, colorSet.color],
                  [1, "#111F42"]
                ],
                width: 14
              }
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,

            },
            splitLine: {
              show: false,
            },


            pointer: {
              show: false,
            },
          },
          {
            name: '外部刻度',
            type: 'gauge',
            //  center: ['20%', '50%'],
            radius: '70%',
            min: 0, //最小刻度
            max: 100, //最大刻度
            splitNumber: 10, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [
                  [1, 'rgba(0,0,0,0)']
                ]
              }
            },
            //仪表盘轴线
            axisLabel: {
              show: true,
              color: '#fff',
              distance: 25,
              formatter: function (v) {
                switch (v + '') {
                  case '0':
                    return '0';
                  case '10':
                    return '10';
                  case '20':
                    return '20';
                  case '30':
                    return '30';
                  case '40':
                    return '40';
                  case '50':
                    return '50';
                  case '60':
                    return '60';
                  case '70':
                    return '70';
                  case '80':
                    return '80';
                  case '90':
                    return '90';
                  case '100':
                    return '100';
                }
              }
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 7,
              lineStyle: {
                color: colorSet.color, //用颜色渐变函数不起作用
                width: 1,
              },
              length: -8
            }, //刻度样式
            splitLine: {
              show: true,
              length: -20,
              lineStyle: {
                color: colorSet.color, //用颜色渐变函数不起作用
              }
            }, //分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          /*内部*/
          {
            type: 'pie',
            radius: ['0', '35%'],
            center: ['50%', '50%'],
            z: 8,
            hoverAnimation: false,
            data: [{
              name: '污染程度',
              value: dataArr,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: '#4FADFD'
                  }, {
                    offset: 1,
                    color: '#28E8FA'
                  }])
                }

              },
              label: {
                normal: {
                  rich: {
                    a: {
                      color: '#468EFD',
                      align: 'center',
                      fontSize: 50,
                      fontWeight: "bold"
                    },
                  },
                  formatter: function (params) {
                    return "{a|" + params.value + "}";
                  },
                  position: 'center',
                  show: true
                }
              },
              labelLine: {
                show: false
              }
            }],
          },
          /*外一层*/
          {
            type: "pie",
            radius: "40%",
            startAngle: 220,
            endAngle: -40,
            hoverAnimation: false,
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [{
              value: 1
            }],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: "rgba(69, 161, 255,0.8)"
                  }, {
                    offset: 1,
                    color: "rgba(69, 161, 255,0.5)"
                  }]
                }
              }
            }
          },
          //外二层圈
          {
            type: "pie",
            radius: "45%",
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            z: 0,
            hoverAnimation: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [{
              "value": 1
            }],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: "rgba(69, 161, 255,0.5)"
                  }, {
                    offset: 1,
                    color: "rgba(69, 161, 255,0.3)"
                  }]
                }
              }
            }
          },
          //最外层圈
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            z: 0,
            hoverAnimation: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            data: [{
              value: 1
            }],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: "rgba(69, 161, 255,0.3)"
                  },
                  {
                    offset: 1,
                    color: "rgba(69, 161, 255,0)"
                  }
                  ]
                }
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    bingtu() {

      console.log('饼图刷新');



      if (document.getElementById("nebingtu") == null) {
        return
      }
      echarts.dispose(document.getElementById("nebingtu"))

      const myChart = echarts.init(document.getElementById("nebingtu"));
      let hoveredIndex = '';
      var colorstyle = [
        '#6495ED',
        '#EEE8AA',
        '#0000FF',
        '#00FF7F',
        '#FFFF00',
        '#FF0000',
        '#00CED1',
        '#FF8C00',
        '#FFA500',
        '#800000',
        '#D8BFD8',
        '#FFDAB9',
        '#FF4500',
        '#008080',
        '#D2B48C',
        '#A9A9A9',
        '#9400D3',
        '#3D59AB',
        '#FF7F50',
        '#8B4513',
        '#308014',
        '#F0E68C',
        '#F5F5F5'

      ]

      for (let i = 0; i < this.listdata.length; i++) {
        this.listdata[i].itemStyle = { 'color': colorstyle[i] };
      }
      var optionData = [];
      optionData.push(...this.listdata);
      console.log(optionData, 'optionDataoptionData');
      setTimeout(() => {


        var option = getPie3D(optionData, 0.59);// 可做为调整内环大小

        // 生成扇形的曲面参数方程
        function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
          // 计算
          const midRatio = (startRatio + endRatio) / 2;

          const startRadian = startRatio * Math.PI * 2;
          const endRadian = endRatio * Math.PI * 2;
          const midRadian = midRatio * Math.PI * 2;

          // 如果只有一个扇形，则不实现选中效果。
          if (startRatio === 0 && endRatio === 1) {
            // eslint-disable-next-line no-param-reassign
            isSelected = false;
          }

          // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
          // eslint-disable-next-line no-param-reassign
          k = typeof k !== 'undefined' ? k : 1 / 3;

          // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
          const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
          const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

          // 计算高亮效果的放大比例（未高亮，则比例为 1）
          const hoverRate = isHovered ? 1.05 : 1;  // 可以做为调整外环大小

          // 返回曲面参数方程
          return {
            u: {
              min: -Math.PI,
              max: Math.PI * 3,
              step: Math.PI / 32,
            },

            v: {
              min: 0,
              max: Math.PI * 2,
              step: Math.PI / 20,
            },

            x(u, v) {
              if (u < startRadian) {
                return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
              }
              if (u > endRadian) {
                return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
              }
              return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            y(u, v) {
              if (u < startRadian) {
                return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
              }
              if (u > endRadian) {
                return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
              }
              return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            z(u, v) {
              if (u < -Math.PI * 0.5) {
                return Math.sin(u);
              }
              if (u > Math.PI * 2.5) {
                return Math.sin(u) * h * 0.1;
              }
              // 当前图形的高度是Z根据h（每个value的值决定的）
              return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
            },
          };
        }
        // 生成模拟 3D 饼图的配置项
        function getPie3D(pieData, internalDiameterRatio) {
          const series = [];
          // 总和
          let sumValue = 0;
          let startValue = 0;
          let endValue = 0;
          const legendData = [];
          const k =
            typeof internalDiameterRatio !== 'undefined'
              ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
              : 1 / 3;

          // 为每一个饼图数据，生成一个 series-surface 配置
          for (let i = 0; i < pieData.length; i += 1) {
            sumValue += pieData[i].value;

            const seriesItem = {
              name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
              type: 'surface',
              parametric: true,
              wireframe: {
                show: false,
              },
              pieData: pieData[i],
              pieStatus: {
                selected: false,
                hovered: false,
                k,
              },
            };

            if (typeof pieData[i].itemStyle !== 'undefined') {
              const { itemStyle } = pieData[i];

              // eslint-disable-next-line no-unused-expressions
              typeof pieData[i].itemStyle.color !== 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
              // eslint-disable-next-line no-unused-expressions
              typeof pieData[i].itemStyle.opacity !== 'undefined'
                ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                : null;

              seriesItem.itemStyle = itemStyle;
            }
            series.push(seriesItem);
          }
          // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
          // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
          //console.log(series);
          for (let i = 0; i < series.length; i += 1) {
            endValue = startValue + series[i].pieData.value;

            series[i].pieData.startRatio = startValue / sumValue;
            series[i].pieData.endRatio = endValue / sumValue;
            series[i].parametricEquation = getParametricEquation(
              series[i].pieData.startRatio,
              series[i].pieData.endRatio,
              false,
              false,
              k,
              // 我这里做了一个处理，使除了第一个之外的值都是10
              series[i].pieData.value === series[0].pieData.value ? 35 : 10
            );

            startValue = endValue;

            legendData.push(series[i].name);
          }

          // 准备待返回的配置项，把准备好的 legendData、series 传入。
          const option = {
            legend: {
              show: false,
            },
            title: {
              show: false,
              text: '年审核问题分布情况',
              x: 'center',
              top: 170,
              textStyle: {
                color: '#fff',
                fontSize: 19,
              }
            },
            // animation: false,
            tooltip: {
              formatter: (params) => {
                if (params.seriesName !== 'mouseoutSeries') {
                  return `${params.seriesName
                    }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color
                    };"></span>${option.series[params.seriesIndex].pieData.value}`;
                }
                return '';
              },
            },
            xAxis3D: {
              min: -1,
              max: 1,
            },
            yAxis3D: {
              min: -1,
              max: 1,
            },
            zAxis3D: {
              min: -1,
              max: 1,
            },
            grid3D: {
              show: false,
              boxHeight: 5,
              top: '-20%',
              viewControl: {
                // 3d效果可以放大、旋转等，请自己去查看官方配置
                alpha: 20,
                // beta: 30,
                rotateSensitivity: 1,
                zoomSensitivity: 0,
                panSensitivity: 0,
                // autoRotate: true,
                distance: 300,
              },
              // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
              postEffect: {
                // 配置这项会出现锯齿，请自己去查看官方配置有办法解决
                enable: false,
                bloom: {
                  enable: true,
                  bloomIntensity: 0.1,
                },
                SSAO: {
                  enable: true,
                  quality: 'medium',
                  radius: 2,
                },
                // temporalSuperSampling: {
                //   enable: true,
                // },
              },
            },
            series,
          };
          return option;
        }
        //  修正取消高亮失败的 bug
        // 监听 mouseover，近似实现高亮（放大）效果
        // option.title.text = option.series[0].name + ' ' + option.series[0].pieData.value
        // function handleOver(params) {
        //   // 准备重新渲染扇形所需的参数
        //   let isSelected;
        //   let isHovered;
        //   let startRatio;
        //   let endRatio;
        //   var k;
        //   let i;

        //   // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        //   if (hoveredIndex === params.seriesIndex) {
        //     return;

        //     // 否则进行高亮及必要的取消高亮操作
        //   } else {
        //     // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
        //     if (hoveredIndex !== '') {
        //       // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
        //       isSelected = option.series[hoveredIndex].pieStatus.selected;
        //       isHovered = false;
        //       startRatio = option.series[hoveredIndex].pieData.startRatio;
        //       endRatio = option.series[hoveredIndex].pieData.endRatio;
        //       k = option.series[hoveredIndex].pieStatus.k;
        //       i = option.series[hoveredIndex].pieData.value === option.series[0].pieData.value ? 35 : 10;
        //       // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
        //       option.series[hoveredIndex].parametricEquation = getParametricEquation(
        //         startRatio,
        //         endRatio,
        //         isSelected,
        //         isHovered,
        //         k,
        //         i
        //       );
        //       option.series[hoveredIndex].pieStatus.hovered = isHovered;

        //       // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
        //       hoveredIndex = '';
        //     }

        //     // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
        //     if (params.seriesName !== 'mouseoutSeries') {
        //       option.title.text = ' ' + option.series[seriesIndex].name + ' ' + option.series[params.seriesIndex].pieData.value
        //       // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
        //       isSelected = option.series[params.seriesIndex].pieStatus.selected;
        //       isHovered = true;
        //       startRatio = option.series[params.seriesIndex].pieData.startRatio;
        //       endRatio = option.series[params.seriesIndex].pieData.endRatio;
        //       k = option.series[params.seriesIndex].pieStatus.k;

        //       // 对当前点击的扇形，执行高亮操作（对 option 更新）
        //       option.series[params.seriesIndex].parametricEquation = getParametricEquation(
        //         startRatio,
        //         endRatio,
        //         isSelected,
        //         isHovered,
        //         k,
        //         option.series[params.seriesIndex].pieData.value + 5
        //       );
        //       option.series[params.seriesIndex].pieStatus.hovered = isHovered;

        //       // 记录上次高亮的扇形对应的系列号 seriesIndex
        //       hoveredIndex = params.seriesIndex;
        //     }

        //     // 使用更新后的 option，渲染图表
        //     myChart.setOption(option);
        //   }
        // }
        // myChart.on('mouseover', function (params) {
        //   handleOver(params)
        // });

        function handleOut() {
          if (hoveredIndex !== '') {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            var isSelected = option.series[hoveredIndex].pieStatus.selected;
            var isHovered = false;
            var k = option.series[hoveredIndex].pieStatus.k;
            var startRatio = option.series[hoveredIndex].pieData.startRatio;
            var endRatio = option.series[hoveredIndex].pieData.endRatio;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            var i = option.series[hoveredIndex].pieData.value === option.series[0].pieData.value ? 35 : 10;
            option.series[hoveredIndex].parametricEquation = getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              i
            );
            option.series[hoveredIndex].pieStatus.hovered = isHovered;

            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = '';
          }

          // 使用更新后的 option，渲染图表
          myChart.setOption(option);
        }
        // 修正取消高亮失败的 bug
        myChart.on('globalout', function () {
          handleOut()
        });
        let seriesIndex = 0
        setInterval(() => {
          // handleOver({ seriesIndex: seriesIndex })
          seriesIndex++
          if (seriesIndex === option.series.length) {
            seriesIndex = 0
          }
        }, 1000)

        myChart.setOption(option);
      }, 1000)
    },

    // nsdz() {


    //   const myChart = echarts.init(document.getElementById("sfdbsjef"));
    //   let positionLeft = 1,
    //     max = 100 + 2 * positionLeft,
    //     value = this.jindutiao

    //   var option = {
    //     // backgroundColor: 'black', //背景必须与symbal颜色一样
    //     "xAxis": {
    //       type: 'value',
    //       "max": max,
    //       "splitLine": {
    //         "show": false
    //       },
    //       "axisLine": {
    //         "show": false
    //       },
    //       "axisLabel": {
    //         "show": false
    //       },
    //       "axisTick": {
    //         "show": false
    //       }
    //     },
    //     "yAxis": {
    //       "type": "category",
    //       "inverse": false,
    //       "data": [],
    //       "axisLine": {
    //         "show": false
    //       },
    //       "axisTick": {
    //         "show": false
    //       },
    //       "axisLabel": {
    //         "show": false
    //       }
    //     },
    //     "series": [

    //       { //间距
    //         type: 'bar',
    //         barWidth: 50,
    //         stack: 'b',
    //         legendHoverLink: false,
    //         itemStyle: {
    //           normal: {
    //             color: 'rgba(0,0,0,0)'
    //           }
    //         },

    //         data: [positionLeft]
    //       },


    //       { //内
    //         type: 'bar',
    //         barWidth: 50,
    //         stack: 'b',
    //         label: {
    //           normal: {
    //             show: false,
    //             position: 'right',
    //             textStyle: {
    //               color: '#fff'
    //             },
    //             formatter: function (e) {
    //               return (e.value / (max - 2 * positionLeft) * 100).toFixed(2) + "%"
    //             }
    //           }
    //         },
    //         legendHoverLink: false,
    //         silent: true,
    //         itemStyle: {
    //           normal: {
    //             barBorderRadius: 30,
    //             color: new echarts.graphic.LinearGradient(
    //               0, 0, 1, 0, [{
    //                 offset: 0,
    //                 color: '#74c6ea'
    //               },
    //               {
    //                 offset: 1,
    //                 color: '#96ead2'
    //               }
    //             ]
    //             )
    //           }
    //         },

    //         data: [value]
    //       },
    //       { //框
    //         type: 'bar',
    //         barWidth: 50,
    //         barGap: '-80%',
    //         label: {
    //           normal: {
    //             show: false,

    //             position: 'right',
    //             textStyle: {
    //               color: '#000'
    //             }
    //           }
    //         },
    //         itemStyle: {
    //           normal: {
    //             barBorderRadius: 30,
    //             color: 'rgba(0,0,0,0)', //底色
    //             borderWidth: 2,
    //             borderColor: 'grey'
    //           }
    //         },
    //         data: [max],
    //         z: 1,
    //       }
    //     ]
    //   };
    //   myChart.setOption(option);
    // },
    zhuzhuangtu() {
      if (document.getElementById("opnasd") == null) {
        return
      }
      echarts.dispose(document.getElementById("opnasd"))
      const myChart = echarts.init(document.getElementById("opnasd"));

      var dangandata = [
        {
          name: "档案盒",
          value: this.yj
        },
        {
          name: "在库",
          value: this.rk
        },
        {
          name: "出库",
          value: this.ck
        },
   
        {
          name: "逾期",
          value: this.xh
        }
      ];
      var data
      data = dangandata
      //console.log(data, 'datadatadatadatadatadatadatadatadatadata');
      var xAxisData = [];
      var seriesData1 = [];
      var sum = 0;
      var barTopColor = ["rgba(0, 168, 255, 0.7)",
        "rgba(240, 208, 60, 0.8)",
        "rgba(0,229,255, 0.7)",
        "rgba(0,255,182, 0.7)",
        "rgba(110, 168, 255, 0.7)",
        "rgba(240, 208, 60, 0.8)",
        "rgba(0,229,255, 0.7)",
        "rgba(0,255,182, 0.7)"
      ];
      var barBottomColor = ["rgba(0, 168, 255, 0.7)",
        "rgba(240, 208, 60, 0.8)",
        "rgba(0,229,255, 0.7)",
        "rgba(0,255,182, 0.7)"];
      var barCenterColor = ["rgba(0, 102, 171, 0.42)",
        "rgba(240, 208, 60, 0.42)",
        "rgba(0, 165, 201, 0.42)",
        "rgba(0,255,182, 0.42)",
        "rgba(110, 102, 171, 0.42)",
        "rgba(240, 208, 60, 0.42)",
        "rgba(0, 165, 201, 0.42)",
        "rgba(0,255,182, 0.42)",];
      var barSideColor = ["rgba(0, 168, 255,0.8)",
        "rgba(240, 208, 60, 0.9)",
        "rgba(0, 229, 255, 0.9)",
        "rgba(0,255,182)",
        "rgba(110, 168, 155,0.8)",
        "rgba(240, 208, 60, 0.9)",
        "rgba(0, 229, 255, 0.9)",
        "rgba(0,255,182)"];
      data.forEach(item => {
        xAxisData.push(item.name);
        seriesData1.push(item.value);
        sum += item.value;
        // //console.log(xAxisData, 'xAxisData');
        // //console.log(seriesData1, 'seriesData1');
      });
      var option = {

        title: {
          top: 10,
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 20
          }
        },
        grid: {
          top: '15%',
          bottom: '20%',
          left: '15%'
        },
        xAxis: {
          // name:'蛋蛋',
          // nameTextStyle:{
          //   color:'#666',
          // },
          data: xAxisData,
          splitNumber: 15,    // 坐标轴的分割段数（预估值）
          axisTick: {
            show: false,
            length: 25,// 坐标轴刻度的长度
            lineStyle: {
              color: '#FFF',     // 刻度线的颜色
              width: 10,    // 坐标轴刻度线宽
              type: 'solid',    // 坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
            },
          },
          axisLine: {
            show: true,
            symbol: ['none', 'arrow'],// 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
            symbolSize: [10, 15],// 轴线两端箭头大小，数值一表示宽度，数值二表示高度
            lineStyle: {
              color: '#fff'  // 更改轴线颜色为白色
            }
          },
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 0,//倾斜
            margin: 5,
            align: 'center',
            formatter: function (params, index) {
              // return '{a|' + (seriesData1[index] / sum * 100).toFixed(2) + '%}' + '\n' + '{b|' + params + '}';
              return '{b|' + params + '}';
            },
            textStyle: {
              fontSize: 14,
              color: function (params) {//柱子顶部的颜色
                return barTopColor[params.dataIndex];
              },
              rich: {
                a: {
                  height: 20,
                  fontSize: 16,
                  color: '#ffffff'
                },
                b: {
                  height: 20,
                  fontSize: 16, //底部文字大小
                  color: '#ffffff'
                }
              }
            },
          },

        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisTick: {//刻度
            show: true
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            show: true,
            lineStyle: {
              color: '#fff'  // 更改Y轴线颜色为白色
            }
          },
          axisLabel: {
            show: true,

            // interval:100,
            // margin-eft:100,
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold'
            // formatter:(value,index)=>{
            //   //console.log(value,index,'value,index');
            // },
          }
        },
        series: [{
          name: '柱顶部',
          type: 'pictorialBar',
          symbolSize: [29, 10],
          symbolOffset: [0, -6.6],
          z: 14,
          itemStyle: {
            normal: {
              color: function (params) {//柱子顶部的颜色
                return barTopColor[params.dataIndex];
              }
            }
          },
          label: {//柱子上方文字的
            show: true,
            position: 'top',
            fontSize: 16,
            color: '#fff',
          },

          symbolPosition: 'end',
          data: seriesData1,
        },
        // {
        //   name: '柱底部',
        //   type: 'pictorialBar',
        //   symbolSize: [26, 10],
        //   symbolOffset: [0, 0],//底部柱子宽度
        //   z: 12,
        //   itemStyle: {
        //     normal: {
        //       color: function (params) {
        //         return barTopColor[params.dataIndex];
        //       }
        //     }
        //   },
        //   data: seriesData1
        // },
        {//柱子中间内容
          type: 'bar',
          itemStyle: {
            normal: {
              // color: {
              //     type: 'linear',
              //     x: 0,
              //     y: 0,
              //     x2: 1,
              //     y2: 0,
              //     colorStops: [{
              //         offset: 0, color:function(params) {
              //                     return barSideColor[params.dataIndex];
              //                 } // 0% 处的颜色
              //     },
              //     {
              //         offset: 0.35, color: function(params) {
              //                     return barCenterColor[params.dataIndex];
              //                 } // 35% 处的颜色
              //     },
              //     {
              //         offset: 0.65, color: function(params) {
              //                     return barCenterColor[params.dataIndex];
              //                 } // 65% 处的颜色
              //     },
              //     {
              //         offset: 1, color: function(params) {
              //                     return barSideColor[params.dataIndex];
              //                 } // 100% 处的颜色
              //     }],
              //     global: false // 缺省为 false
              // },
              color: function (params) {
                return new echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [{
                    offset: 0,
                    color: barSideColor[params.dataIndex]
                  },
                  {
                    offset: 0.25,
                    color: barCenterColor[params.dataIndex]
                  },
                  {
                    offset: 0.75,
                    color: barCenterColor[params.dataIndex]
                  },
                  {
                    offset: 1,
                    color: barSideColor[params.dataIndex]
                  }
                  ]
                );
              },
              opacity: 0.8
            }
          },
          z: 16,
          silent: true,
          barWidth: 30,//柱子的宽度
          barGap: '-100%', // Make series be overlap
          data: seriesData1
        }]
      };


      myChart.setOption(option);
    },
    onActivated(item, index) {
      if (item.status == 0) {
        // alert(1)
      }
      else if (item.status == 1) {
        // alert(2)
      } else {
        // alert(3)
      }
    },
    onDragstop(x, y) {

      this.x = x
      this.y = y
      //调接口把新的位置发送给后端
    }
  },

  created() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },

  // 页面关闭时清除定时器
  beforeDestroy() {
  console.log('页面销毁了');
    // document.removeEventListener('fullscreenchange', this.fullscreenchange)

  clearInterval(this.timer)

clearInterval(this.timer3)
this.timer3=null
clearInterval(this.timer4)
this.timer4=null
clearInterval(this.timer5)
this.timer5=null
 clearInterval(this.timer6)
 this.timer6=null
clearInterval(this.timer7)
this.timer7=null
clearInterval(this.timer8)
this.timer8=null

  },


}
</script>



<style lang="less" scoped>
.hearder {
  background: url(../../assets/syimg/XXXX绿色智慧档案馆.png) no-repeat;
  background-size: 100% 100%;
}

.leftcounteone {
  overflow: hidden;
  background: url(../../assets/syimg/底框.png) no-repeat;
  background-size: 100% 100%;
}

.leftcountetwo {
  overflow: hidden;
  background-image: url(../../assets/syimg/底框.png);
  background-size: 100% 100%;
}

.leftcountethree {
  overflow: hidden;
  background-image: url(../../assets/syimg/底框.png);
  background-size: 100% 100%;
}

.register {
  //固定外层盒子，不受其他盒子影响
  //放在最底层
  position: fixed;
  top: 0;
  left: 0;

  z-index: -1;

  .img_box {
    //这里外层盒子已经固定定位了，其实可以不加定位
    background-image: url(../../assets/syimg/背景.png);
    background-size: cover;
    background-repeat: no-repeat;
    //保证盒子始终在窗口中心
    background-position: center center;
    //避免窗口周围留白
    width: 100%;
    height: 100%;
  }
}


.Big {
  width: 22vw;
  // background: red;
  font-family: PangMenZhengDao;
  color: #8dd6fa;
  font-size: 1.4vw;
  margin-left: 0.6vw;
  margin-top: -1vh;
  text-align: center;
  // background: red;
}

.Little {
  width: 22vw;
  // background: red;
  font-family: PangMenZhengDao;
  color: #8dd6fa;
  font-size: 1.8vw;
  margin-left: 0.6vw;
  margin-top: -2vh;
  text-align: center;
}

.beijingtupian {


  margin-left: -3vw;
  // margin-top: -3vw;
  // background: #000;

  background: url('../../assets/syimg/编组 28.png');
  background-size: 100% 100%;

}

.beijingtupian img {
  margin-left: 7.5%;
  margin-top: 1vw;
  width: 85%;
}

.management {

  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../../assets/syimg/编组2.png) no-repeat;
  background-size: 100%, auto;
  margin-top: 2vw;
  width: 11vw;
  height: 3vw;
  // background: red
}

.dv-decoration-5 {
  color: #000;
  //  stroke: red !important;
  z-index: 999999;
}

/deep/polyline {
  stroke: rgb(75, 203, 249);
}

.Warehousement {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../../assets/syimg/编组2.png) no-repeat;
  background-size: 100%, auto;
  margin-top: 2vw;
  width: 11vw;
  height: 3vw;
}

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../../assets/syimg/首页.png) no-repeat;
  background-size: 100%, auto;
  margin-top: 2vw;
  width: 11vw;
  height: 3vw;
}

.geren {
  margin-top: -0.5vw;
  position: absolute;
  width: 2.5vw;
  height: 2.5vw;
}

.geren img {
  width: 100%;
  height: 105%;
}

.shezhi {
  margin-top: -0.7vw;
  width: 2.8vw;
  height: 2.8vw;
}

.shezhi img {
  width: 100%;
  height: 105%;
}

.leftcounte {
  height: 100%;
  width: 24vw;

  margin-top: -0.7vw;
  // background: red;
}

.counte {
  height: 100%;
  width: 52vw;
  // margin-top: 1vw;
  // background: rgb(19, 12, 12);
}

.rightcounte {

  height: 100%;
  width: 24vw;
  // margin-top: 1vw;
  background: red;
}

.kufangshuju {

  margin-left: -2.5vw;
  background-image: url(../../assets/syimg/标题-1.png);
  background-size: 120% 122%;
  width: 100%;
  padding-top: 0.2vw;
  height: 2vw;
  font-family: DingTalk-JinBuTi, DingTalk;
  font-weight: normal;
  color: #D0EDFB;
  font-size: 1vw;

}

.newkufangshuju {
  // margin-left: -6.5vw;
  background-image: url(../../assets/syimg/标题-1.png);
  background-size: 92% 122%;
  width: 100%;
  height: 100%;
  font-family: DingTalk-JinBuTi, DingTalk;
  font-weight: normal;
  color: #D0EDFB;
  font-size: 1vw;
  z-index: 999999;
}

// .lunbotupian img :last-child{
//   margin-top: 20vw;
// }
/deep/.opopedasdsa canvas {
  position: absolute;
  left: -3vw !important;
  top: 0.5vw !important;
  width: 15vw !important;
  height: 14.5rem !important;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  padding: 0px;
  margin: 0px;
  border-width: 0px;


}

.opopedasdsa {
  position: relative;
  top: 1vw;
  // background: url('../assets/syimg/编组 13.png') no-repeat;
  // background-size: 100% 50%;

}

/deep/.opopedasdsaone canvas {
  position: absolute;
  left: 9vw !important;
  top: 0.7vw !important;
  width: 15vw !important;
  height: 14.5rem !important;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  padding: 0px;
  margin: 0px;
  border-width: 0px;


}

.opopedasdsaone {
  position: relative;
  top: 1vw;
  // background: url('../assets/syimg/编组 13.png') no-repeat;
  // background-size: 100% 50%;

}


/deep/.asdaniskd canvas {
  position: absolute;
  left: 6vw !important;
  top: 18vw !important;
  width: 25vw !important;
  height: 16rem !important;

}

.beijing {
  background-image: url('../../assets/syimg/编组 7.png');
  background-size: 100% 100%;
}

.youliang {
  position: absolute;
  top: 11.5vw;
  left: 4.9vw;
}




.biaoti {
  margin: auto;
  width: 27vw;
  height: 3vw;
  margin-bottom: 1vw;
  background-image: url(../../assets/syimg/展厅标题.png);
  background-size: 103% 123%;
}

.lefttou {
  margin-left: 4vw;
  margin-top: 1vw;
  background: url(../../assets/syimg/左箭头.png) no-repeat;
  background-size: 100% 11%;
}

.righttou {
  margin-top: 1vw;
  background: url(../../assets/syimg/右箭头.png) no-repeat;
  background-size: 100% 11%;
  margin-left: 3vw;
}

.fangzi {
  display: flex;
  align-items: center;
  justify-content: center;

}

.fangzis {
  margin-left: 1vw;
  width: 5vw;
  height: 5vw;
  background-image: url(../../assets/syimg/内容框.png);
  background-size: 100% 100%;
}

.fangzi img {
  margin-left: 0.5vw;
  width: 80%;
  height: 80%;
}

.huadong {
  // background: red;
  width: 59%;
  display: flex;
  align-items: center;
  height: 10%;
  margin-top: 1vw;
  margin-left: 2vw;

}

/deep/.toigdfgd canvas {
  position: absolute;
  top: 2vw !important;
  width: 18vw !important;
  height: 3vw !important;
  left: 0.1vw !important;
  // top: -3vw !important;

}

/deep/.aofjyhsa canvas {
  position: absolute;
  left: -2.8vw !important;
  top: -1.4vw !important;
  height: 15vw !important;
}

/deep/.vdr {
  border: none;
}

// .plugin {
//   width: 500px;
//   height: 300px;
// }
.pmtupian {
  height: 55%;
}

.dyhtupian {
  height: 38%;
}

.dxshthio {
  height: 55%;
}

.gongzuozt img {
  height: 2.8vw;
  margin-left: 0.5vw;
}

.gongzuozt {
  height: 3.5vw;
  // margin-top: -0.5vw;
  // background: red;
}

/deep/.ceil {
  // margin-left: -1.5vw;
  width: 6.5vw !important;
  font-size: 0.7vw !important;

}

/deep/.youxiajiao .ceil {
  // margin-left: -1.5vw;
  display: flex;
  word-break: break-all !important;
  width: 10.5vw !important;
  font-size: 0.7vw !important;
  white-space: normal !important;

}

/deep/.fsbj {
  width: 3vw;
  height: 2.4vw;
  // margin-left: -0.4vw;
  // background:red
}

/deep/.fsbjtwo {
  width: 7.5vw;
  height: 2.4vw;
  line-height: 2.58vw !important;
  margin-left: 2.6vw;
  // background:red
}

/deep/.fsbjone {
  position: absolute;
  left: 6vw;
  width: 4.5vw;
  height: 2.4vw;
  // margin-left: 3.4vw;
  // background:red
}

/deep/.fsbjthree {

  width: 4.5vw;
  height: 2.4vw;
  margin-left: 4.4vw;
  // background:red
}

/deep/.row-item {

  // line-height: 20px !important;
  background: rgba(14, 33, 74) !important;
}

/deep/ .youxiajiao .row-item {
  // display: inline !important;
  // height: 0px !important   ;
  line-height: 12px !important;
  background: rgba(14, 33, 74) !important;
}

/deep/.fsbj img {
  width: 100%;
  height: 100%
}

.fanhuianniu {
  width: 2vw;
  position: absolute;
  left: 1vw;
  top: 0.8vw;
}

.fanhuianniu img {
  width: 100%;
  height: 100%;
}

.danganfenlei {
  width: 12vw;
  height: 29vh;
  overflow-y: scroll;
  position: absolute;
  /* 设置过渡效果的持续时间为0.5秒 */
  transition: scroll-position 0.2s;
  /* 指定缓动函数为ease-in-out */
  transition-timing-function: ease-in-out;

  z-index: 9999999999 !important;
}

/deep/#asdasdasd body {
  z-index: 9999999999 !important;
  background-color: transparent !important;
}

.shabe {
  border-radius: 50%;
  width: .8vw;
  height: .8vw
}

.zanwuyujing {
  padding-left: 1vw !important;
}

/* 隐藏滚动条 */
//::-webkit-scrollbar {
 // display: none;
//}

/* 确保内容可以滚动 */
::-webkit-scrollbar-track {
  display: none;
}

/* 确保滚动条轨道可见 */
::-webkit-scrollbar-thumb {
  background: transparent;
}

iframe {
  background-color: transparent;
}
</style>
