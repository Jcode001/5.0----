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
              <div class="shezhi"><img src="~@/assets/a08_dsj2/sz.png" alt=""></div>
              <div
                style="width:3vw;font-size:1.2vw;font-family:SourceHanSansSC-Regular,SourceHanSansSC;font-weight: 400;color: #D8F0FF;letter-spacing: 1px;text-shadow: 0px 0px 10px #0091FF, 0px 0px 4px #0091FF;">
                设置</div>
            </div>
            <!-- <div style="display:flex;width:9vw;margin-left:0.3vw">
              <div class="geren"><img src="~@/assets/a08_dsj2/grzx.png" alt=""></div>
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
              <img src="~@/assets/fh2.png" alt="">
            </div>
            <div class="leftcounteone" style="height:42%;width:100%;margin-top:-2vw">
              <dv-border-box-8 :dur="10" style="width:22.9vw;height:22.5vw;margin-left:0.5vw;margin-top:-0.6vw">
                <div style="margin:1vw;width:92%;height:92%;">
                  <!--  -->
                  <div class="kufangshuju" @click="Controllerconfiguration">
                    <span style="margin-left:9.2vw;color: #8dd6fa;">库房环境数据展示</span>
                  </div>
                  <!-- <div class="beijing"
                      style="width:5vw;height:4.1vw;margin-top:4.5vw;overflow: hidden;">
                      <div style="display:flex;justify-content:center;margin-top:0.7vw;height:1.8vw">
                        <img src="~@/assets/a08_dsj2/wd.png" alt="">
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
                          src="~@/assets/a08_dsj2/tp2.png" alt=""></div>
                      <div style="display:flex;justify-content:center;margin-top:-0.1vw;">

                        <div
                          style="margin-left:0.2vw;font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw">
                          {{ kqzhiliang}}RH</div>
                      </div>
                    </div> -->
                    <!-- <div class="beijing" style="width:6vw;height:4vw;margin-top:-4vw;margin-left:15.05vw;overflow:hidden">
                      <div style="display:flex;justify-content:center;margin-top: 0.5vw;height:1.8vw"><img
                          src="~@/assets/a08_dsj2/湿度.png" alt=""></div>
                      <div style="display:flex;justify-content:center;margin-top: 0.3vw;">
                        <div style="color:#FFFFFF;font-size:0.5vw;width:1.5vw">湿度</div>
                        <div
                          style="font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw;margin-left:0.1vw">
                          {{ shidu }}%RH</div>
                      </div>
                    </div> -->
      
                  <!--空气质量earchs图  -->
                  <div class="opopedasdsa" style="width:100%;height:19vw;position: absolute;" id="opope"> </div>
                  <div  style="margin:auto;width:47.33%;    position: absolute;top:11vw">
                    </div>
                  <div class="opopedasdsaone" style="width:100%;height:19vw;position: absolute;" id="opopeone"> </div>
                  <div  style="margin:auto;width:47.33%;position: absolute;left:13vw;top:11vw">
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
                        <img src="~@/assets/a08_dsj2/tvoc.png" alt="">
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
                          src="~@/assets/a08_dsj2/tp5.png" alt=""></div>
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
                        <img src="~@/assets/a08_dsj2/tp4.png" alt="">
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
                          src="~@/assets/a08_dsj2/tp2.png" alt=""></div>
                      <div style="display:flex;justify-content:center;margin-top:-0.1vw;">

                        <div
                          style="margin-left:0.2vw;font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw">
                         PM1 {{  pm1 }}RH</div>
                      </div>
                    </div>
                    <div class="beijing" style="width:6vw;height:4vw;overflow:hidden">
                      <div class="pmtupian" style="display:flex;justify-content:center;margin-top:0.5vw;overflow:hidden">
                        <img src="~@/assets/a08_dsj2/tp3.png" alt="">
                      </div>
                      <div style="display:flex;justify-content:center;margin-top:0vw;">
                        <!-- <div
                          style="color:#FFFFFF;font-size:0.8vw;width:2vw">湿度</div> -->
                        <div
                          style="font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw">
                        PM10  {{ pm10 }}

                        </div>
                        <div style="color:#2CF1ED;font-size:0.7vw;">
                          mg/m³
                        </div>
                      </div>
                    </div>
                    <div class="beijing" style="width:6vw;height:4vw;overflow:hidden">
                      <div class="dxshthio" style="display:flex;justify-content:center;margin-top:.4vw;"><img
                          src="~@/assets/a08_dsj2/tp6.png" alt=""></div>
                      <div style="display:flex;justify-content:center;margin-top: 0vw;">
                        <!-- <div
                          style="color:#FFFFFF;font-size:0.8vw;width:2vw">湿度</div> -->
                        <div
                          style="font-family:DINAlternate-Bold,DINAlternate;font-weight: bold;color:#2CF1ED;font-size:0.6vw">
                          SO₂  {{ so2 }}

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
                    <span @click="vrshitu"
                      style="margin-left:10.3vw;font-family: DingTalk-JinBuTi, DingTalk;font-weight: normal;color: #8dd6fa;">
                      设备工作状态</span>
                  </div>
                  <div style="height:95%;width:100%;">
                    <div style="width:100%;height:50%;display:flex;align-items: center">
                      <div style="width:2.5vw">
                        <div v-if="sbstatus == 0" class="gongzuozt" style="margin-left:0.6vw;"><img
                            src="~@/assets/a08_dsj2/jsq.png" alt=""></div>
                        <div v-else class="gongzuozt" style="margin-left:0.6vw;"><img src="~@/assets/a08_dsj2/jsh.png"
                            alt=""></div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:0.6vw;font-size:0.6vw">库房加湿</div>
                      </div>

                      <div style="margin-left: 3.6vw;width:2.5vw">
                        <div v-if="sbstatustwo == 0" class="gongzuozt" style="margin-left:0.4vw"><img
                            src="~@/assets/a08_dsj2/csq.png" alt=""></div>
                        <div v-else class="gongzuozt" style="margin-left:0.4vw"><img src="~@/assets/a08_dsj2/csh.png" alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:0.74vw;font-size:0.6vw">库房除湿</div>
                      </div>
                      <div style="margin-left: 3.4vw;width:2.5vw">
                        <div class="gongzuozt" v-if="sbstatusthree == 0" style="margin-left:0.4vw"><img
                            src="~@/assets/a08_dsj2/zlq.png" alt=""></div>
                        <div class="gongzuozt" v-else style="margin-left:0.4vw"><img src="~@/assets/a08_dsj2/zlh.png" alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:0.6vw;font-size:0.6vw">库房制冷</div>
                      </div>
                      <div style="margin-left: 3.4vw;width:2.5vw">
                        <div class="gongzuozt" v-if="sbstatusfour == 0" style="margin-left:0.3vw"><img
                            src="~@/assets/a08_dsj2/zrq.png" alt=""></div>
                        <div class="gongzuozt" v-else style="margin-left:0.3vw"><img src="~@/assets/a08_dsj2/zrh.png" alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:0.5vw;font-size:0.6vw">库房制热</div>
                      </div>





                    </div>
                    <div style="width:100%;height:50%;display:flex;align-items: center;">
                      <div style="margin-left:0.1vw;width:2.5vw">
                        <div class="gongzuozt" v-if="sbstatussix == 0" style="margin-left:0.3vw"><img
                            src="~@/assets/a08_dsj2/jhq.png" alt=""></div>
                        <div class="gongzuozt" v-else style="margin-left:0.3vw"><img src="~@/assets/a08_dsj2/jhh.png" alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:1.1vw;font-size:0.6vw">净化</div>
                      </div>
                      <div style="margin-left: 3vw;width:2.5vw">
                        <div class="gongzuozt" v-if="sbstatusseven == 0" style="margin-left:0.4vw"><img
                            src="~@/assets/a08_dsj2/wcq.png" alt=""></div>
                        <div class="gongzuozt" v-else style="margin-left:0.4vw"><img src="~@/assets/a08_dsj2/wch.png" alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:1vw;font-size:0.6vw">微尘净化</div>
                      </div>
                      <div style="margin-left: 3.3vw;width:2.5vw">
                        <div class="gongzuozt" v-if="sbstatuseight == 0" style="margin-left:0.7vw"><img
                            src="~@/assets/a08_dsj2/qtq.png" alt=""></div>
                        <div class="gongzuozt" v-else style="margin-left:0.58vw"><img src="~@/assets/a08_dsj2/qth.png"
                            alt="">
                        </div>
                        <div style="margin-top: 0.5vw;color:#fff;width:6vw;margin-left:1vw;font-size:0.6vw">气体净化</div>
                      </div>

                      <div style="margin-left: 3.6vw;width:2.5vw">
                        <div class="gongzuozt" v-if="sbstatusfive == 0" style="margin-left:0.4vw"><img
                            src="~@/assets/a08_dsj2/xfq.png" alt=""></div>
                        <div class="gongzuozt" v-else style="margin-left:0.4vw"><img src="~@/assets/a08_dsj2/xfh.png" alt="">
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
                      <span style="margin-left: -1vw;color: #8dd6fa;">12防预警感知</span> </span>
                  </div>
                  <dv-scroll-board :config="configs" style="width:21.5vw;height:13vw;margin-left:0.2vw;" />
                </div>
              </dv-border-box-1>
            </div>
          </div>
          <!-- 内容 -->
          <div class="counte">
            <div class="biaoti" style="width:27vw;height:4vw;" @click="personalCenter()">
              <div
                style="margin:auto;width:10vw;text-align:center;position: relative;font-family: SourceHanSansSC-Bold, SourceHanSansSC;font-size: 1vw;color: rgb(34, 205, 250);top:1vw;font-size: 1.3vw;">
                {{ this.kfname }}</div>
            </div>
            <div class="beijingtupian" style="wdith:100%;height:57%">
              <div style="transform: rotate(18deg);width:40vw;height:26vw;position: absolute;left:30vw;top:10vw;">
                <!-- <vue-draggable-resizable :w="100" :h="120" :x="250" :y="290" :parent="true" :min-width="50"
                  :min-height="50" :grid="[10, 10]">
                  <img src="~@/assets/a08_dsj2/wsdl.png" alt="">
                  <div style="color: #ffffff;">去酸室</div>
                </vue-draggable-resizable>
                <vue-draggable-resizable :w="100" :h="120" :x="350" :y="290" :parent="true" :min-width="50"
                  :min-height="50" :grid="[10, 10]">
                  <img src="~@/assets/a08_dsj2/wsdl.png" alt="">
                  <div style="color: #ffffff;">去酸室</div>
                </vue-draggable-resizable> -->
                <!-- <vue-draggable-resizable v-for="(item, index) in keyslist" :key="index" @dragstop="onDragstop"
                  @activated="onActivated(item, index)" :w="100" :h="120" :x="item.x" :y="item.y" :parent="true"
                  :min-width="50" :min-height="50" :grid="[10, 10]">
                  <img v-if="item.status == 0" src="~@/assets/a08_dsj2/wsdl.png" alt="">
                  <img v-if="item.status == 1" src="~@/assets/a08_dsj2/wsdh.png" alt="">
                  <img v-if="item.status == 2" src="~@/assets/a08_dsj2/wsdl.png" alt="">
                  <div style="color: #ffffff;">{{ item.name }}</div>
                </vue-draggable-resizable> -->
              </div>
              <img src="~@/assets/a08_dsj2/3D.png" alt="">
            </div>

            <div style="wdith:100%;height:100%;display:flex;margin-top:-0.2vw">
              <div class="leftcountethree" style="height:28.7%;width:48.2vw;margin-top:-0.2vw;margin-left:2vw">
                <dv-border-box-1 style="width:46.5vw;height:16.2vw;margin-top:-0.8vw;margin-left:0.6vw">
                  <div style="margin:1vw;width:91%;height:89%;">
                    <div>
                      <div
                        style="display:flex; margin-left:1.2vw;font-family: DingTalk-JinBuTi, DingTalk;font-weight: normal;color: #D0EDFB;">
                        <div class="newkufangshuju">
                          <div style="margin-left: 14.5vw;">视频监控1</div>
                          <!-- 监控窗口1 -->
                          <div style="overflow:hidden;width:44.5vw;height:50vh;position:absolute;left:1vw" id="divPlugin">
                          </div>
                        </div>


                        <div class="newkufangshuju">
                          <div style="margin-left: 15.5vw;">视频监控2</div>
                          <!-- 监控窗口2 -->
                          <div style="width:21.4vw;height:12vw;position:absolute;top:999999999999999vw" id="divPlugins">
                          </div>
                        </div>
                      </div>
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
                  <div class="danganfenlei" style="margin-top:2vw;margin-left:9vw;width:12vw;height:24vh;overflow-y: scroll;z-index:99999999999">
                    <!-- <div class="asdaniskd" style="width:100%;height:15vw" id="nebingtu"> </div> -->
                    <div
                    v-for="(item,index) in this.listdata " :key="index"
                      style="margin-top:1vw;display: flex;width: 12vw;height: 1.2vw;top: 5vw;right: 0vw;background: linear-gradient(270deg, rgba(30,64,99,0.14) 0%, #1F4163 100%);font-size: 0.85vw;align-items: center;">
                      <div v-if="item.itemStyle==undefined"  style="border-radius:50%;width:2.8vw;height:2.8vw"></div>
                      <div v-else   style=""> <div class="shabi" :style="{'backgroundColor':item.itemStyle.color}"></div> </div>
                      <div style="color: #FFFFFF;margin-left:0.5vw">{{item.name}}</div>
                      <div style="color: #17FFFF;margin-left:1vw;margin-top:0.3vw">{{ item.value }}</div>
                    </div>
                    <!-- <div
                      style="margin-top:0.8vw;display:flex;width: 12vw;height: 1.2vw;background: linear-gradient(270deg, rgba(30,64,99,0.14) 0%, #1F4163 100%);font-size: 0.85vw;align-items: center;">
                      <div style="border-radius:50%;background:#FFC100;width:0.8vw;height:0.8vw"></div>
                      <div style="color: #FFFFFF;margin-left:0.5vw">文书档案</div>
                      <div style="color: #FFC100;margin-left:1vw;margin-top:0.3vw">{{ wenshudangan }}</div>
                    </div>
                    <div
                      style="margin-top:0.8vw;display: flex;width: 12vw;height: 1.2vw;top:9vw;right: 0vw;background: linear-gradient(270deg, rgba(30,64,99,0.14) 0%, #1F4163 100%);font-size: 0.85vw;align-items: center;">
                      <div style="border-radius:50%;background:#F06529;width:0.8vw;height:0.8vw"></div>
                      <div style="color: #FFFFFF;margin-left:0.5vw">财务档案</div>
                      <div style="color: #F06529;margin-left:1vw;margin-top:0.3vw">{{ caiwudangan }}</div>
                    </div>
                    <div
                      style="margin-top:0.8vw;display: flex;width: 12vw;height: 1.2vw;top:9vw;right: 0vw;background: linear-gradient(270deg, rgba(30,64,99,0.14) 0%, #1F4163 100%);font-size: 0.85vw;align-items: center;">
                      <div style="border-radius:50%;background:#F06529;width:0.8vw;height:0.8vw"></div>
                      <div style="color: #FFFFFF;margin-left:0.5vw">历史案件档案</div>
                      <div style="color: #F06529;margin-left:1vw;margin-top:0.3vw">{{ caiwudangan }}</div>
                    </div>
                    <div
                      style="margin-top:0.8vw;display: flex;width: 12vw;height: 1.2vw;top:9vw;right: 0vw;background: linear-gradient(270deg, rgba(30,64,99,0.14) 0%, #1F4163 100%);font-size: 0.85vw;align-items: center;">
                      <div style="border-radius:50%;background:#F06529;width:0.8vw;height:0.8vw"></div>
                      <div style="color: #FFFFFF;margin-left:0.5vw">基建营房档案</div>
                      <div style="color: #F06529;margin-left:1vw;margin-top:0.3vw">{{ caiwudangan }}</div>
                    </div>
                    <div
                      style="margin-top:0.8vw;display: flex;width: 12vw;height: 1.2vw;top:9vw;right: 0vw;background: linear-gradient(270deg, rgba(30,64,99,0.14) 0%, #1F4163 100%);font-size: 0.85vw;align-items: center;">
                      <div style="border-radius:50%;background:#F06529;width:0.8vw;height:0.8vw"></div>
                      <div style="color: #FFFFFF;margin-left:0.5vw">牺牲病故干部档案</div>
                      <div style="color: #F06529;margin-left:1vw;margin-top:0.3vw">{{ caiwudangan }}</div>
                    </div>
                    <div
                      style="margin-top:0.8vw;display: flex;width: 12vw;height: 1.2vw;top:9vw;right: 0vw;background: linear-gradient(270deg, rgba(30,64,99,0.14) 0%, #1F4163 100%);font-size: 0.85vw;align-items: center;">
                      <div style="border-radius:50%;background:#F06529;width:0.8vw;height:0.8vw"></div>
                      <div style="color: #FFFFFF;margin-left:0.5vw">保卫业务档案</div>
                      <div style="color: #F06529;margin-left:1vw;margin-top:0.3vw">{{ caiwudangan }}</div>
                    </div>
                    <div
                      style="margin-top:0.8vw;display: flex;width: 12vw;height: 1.2vw;top:9vw;right: 0vw;background: linear-gradient(270deg, rgba(30,64,99,0.14) 0%, #1F4163 100%);font-size: 0.85vw;align-items: center;">
                      <div style="border-radius:50%;background:#F06529;width:0.8vw;height:0.8vw"></div>
                      <div style="color: #FFFFFF;margin-left:0.5vw">保卫业务档案</div>
                      <div style="color: #F06529;margin-left:1vw;margin-top:0.3vw">{{ caiwudangan }}</div>
                    </div> -->

                  </div>
                  <!-- 饼图 -->
                  <div>
                    <div class="asdaniskd" style="width:100%;height:15vw;position: relative;left: -15vw; top: -14vw;" id="nebingtu"> </div>
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
              <dv-border-box-8 :reverse="true" :dur="10"
                style="width:22.9vw;height:14vw;margin-left:0.5vw;margin-top:-0.8vw">
                <div style="margin:1vw;width:91%;height:89%;">
                  <div class="kufangshuju">
                    <span style="margin-left:11.2vw;color: #8dd6fa;">档案统计</span>
                  </div>
                  <div class=aofjyhsa style="width:105%;height:20vw;margin-left:1.4vw;" id="opnasd"></div>
                </div>
              </dv-border-box-8>
            </div>
            <!-- 档案预警、操作消息通知 -->
            <div class="leftcountethree" style="height:28.5%;margin-top:-0.4vw">
              <dv-border-box-1 style="width:23.5vw;height:15.7vw;margin-top:-0.8vw;margin-left:0.3vw">
                <div style="margin:1vw;width:91%;height:89%;">
                  <div class="kufangshuju">
                    <span
                      style="margin-left:11.2vw;font-family: DingTalk-JinBuTi, DingTalk;font-weight: normal;color: #D0EDFB;">
                      <span style="margin-left: -2vw;color: #8dd6fa;">档案出入库异常报警</span> </span>
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
            <el-input style="color:black;width:13vw;height:1vw;margin-left:0.8vw;" type="text" v-model="serveIp" name=""
              placeholder="请输入服务器Ip" clearable="">
            </el-input>
          </div>
        </div>
        <div style="height:2vw;line-height: 2vw;margin-left:8.8vw">
          服务器端口:
          <el-input style="color:black;width:13vw;height:1.5vw;margin-left:1vw" type="text" v-model="serverport" name=""
            placeholder="请输入服务器端口" clearable="">
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
          <el-input style="color:black;width:13vw;height:1vw;margin-left:0.8vw;" type="text" v-model="environment" name=""
            placeholder="请输入服务器Ip" clearable="">
          </el-input>
        </div>
        <div style="height:2vw;line-height: 2vw;margin-left:6.8vw">
          档案服务器端口:
          <el-input style="color:black;width:13vw;height:1.5vw;margin-left:1vw" type="text" v-model="environmentprot"
            name="" placeholder="请输入服务器端口" clearable="">
          </el-input>
        </div>

      </div>




      <div style="display:flex;margin-left:6.1vw;margin-top:2vw">
        <div style="display:flex">
          <div style="height:2vw;line-height: 2vw;">
            监控IP:
            <el-input style="color:black;width:13vw;height:1vw;margin-left:2vw;" type="text" v-model="monitorIp" name=""
              id="loginip" placeholder="请输入监控Ip" clearable="">
            </el-input>
          </div>
          <select style="display: none; width:6vw;height:2vw;margin-left:1vw" id="ip" class="sel"
            onchange="getChannelInfo();getDevicePort();"></select>
        </div>
        <div style="height:2vw;line-height: 2vw;margin-left:9.7vw">
          监控端口:
          <el-input style="color:black;width:13vw;height:1.5vw;margin-left:1.1vw" type="text" v-model="monitorPort"
            name="" placeholder="请输入监控端口" clearable="" id="port">
          </el-input>

        </div>

      </div>
      <div style="display:flex;margin-left:6vw;margin-top: 2vw;">
        <div style="height:2vw;line-height: 2vw;">
          用户名:
          <el-input style="color:black;width:13vw;height:1.5vw;margin-left:2vw" type="text" v-model="username" name=""
            id="username" placeholder="请输入用户名" clearable=""></el-input>

        </div>
        <div style="height:2vw;line-height: 2vw;margin-left:11.8vw;">
          密码:
          <el-input style="color:black;width:13vw;height:1.5vw;margin-left:1.2vw" type="password" v-model="userPassword"
            name="" id="password" placeholder="请输入密码" clearable=""></el-input>

        </div>
        <div style="margin-left:2vw;magin-top:-2vw;">
          <el-button style="" type="primary" @click="clickLogin()">连 接</el-button>

        </div>
      </div>
      <el-divider></el-divider>

      <div style="display:flex;margin-left:4.5vw;margin-top: 1vw;">
        <!-- <div style="height:2vw;line-height: 2vw;margin-left:2.5vw">
          码流类型：
        </div> -->
        <!-- <div>
          <select style="width:8vw;height:2vw;margin-left:1.1vw" id="streamtype" class="sel">
            <option value="1">主码流</option>
            <option value="2">子码流</option>
            <option value="3">第三码流</option>
            <option value="4">转码码流</option>
          </select>
        </div> -->

        <div style="display:flex;margin-left:1vw">
          <div style="height:2vw;line-height: 2vw;">视频监控1：</div>
          <select style="width:8vw;height:2vw;margin-left:1vw" id="channels" class="sel"></select>
        </div>
        <div style="display:flex;margin-left:4vw">
          <div style="height:2vw;line-height: 2vw;">视频监控2：</div>
          <select style="width:8vw;height:2vw;margin-left:1vw" id="channelss" class="sels"></select>
        </div>
        <el-button style="height:2.2vw;line-height:0.5vw;margin-left:3.8vw;margin-top:-0.1vw" type="primary"
          @click="clickStartRealPlay()">开始预览</el-button>
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
              <el-select style="margin-left:.4vw" v-model="valuefour" placeholder="请选择" @change="kufangchange">
                <el-option v-for="item in fangzilistone" :key="item.storeId" :label="item.warehouse.storeName"
                  :value="item.warehouse.storeName">
                </el-option>
              </el-select>
            </div>
          </div>
          <div style="height:2vw;line-height: 2vw;margin-left:9vw">
            控制器选择:
            <el-select style="margin-left:.4vw" v-model="valuethree" placeholder="请选择" @change="kzqchange">
              <el-option v-for="item in this.optionsthree" :key="item.aCId" :label="item.aCName" :value="item.aCName">
              </el-option>
            </el-select>
          </div>
        </div>

        <div style="display:flex;margin-top:4vw">
          <div style="height:2vw;line-height: 2vw;margin-left:0vw">
            设备类型：
            <el-select v-model="valueone" placeholder="请选择" @change='sbtype'>
              <el-option v-for="(item, index) in this.options" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="height:2vw;line-height: 2vw;margin-left:9vw">
            设备编号：
            <el-select style="margin-left:.4vw" v-model="valuetwo" placeholder="请选择" @change="sbbianhao">
              <el-option v-for="item in this.shebeibianhaolist" :key="item.key" :label="item.label" :value="item.value">
              </el-option>
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
import $ from 'jquery'
import apiPostGet from '@/utils1/apiPostGet.js'
// import videoMonitor from '@src/components/bigData/videoMonitor.vue'
import { dianjihrx } from '@/utils1/shezhi.js'
// import { asdbasd, clickLogin, clickLogout, clickStartRealPlay, clickStopRealPlay } from '@/utils1/jiankong.js'
// import { asdbasds, clickLogins, clickLogouts, clickStartRealPlays } from '@/utils1/jiankongs.js'
// import { getR, postLogin, GetSystemData, getRecordClassify } from '../utils/api.js'
import * as echarts from "echarts";
// import { Viewer } from 'photo-sphere-viewer'
// import MarkersPlugin from 'photo-sphere-viewer/dist/plugins/markers'
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
      listdata:[
        {
          name:'科技档案',
          value:30
        },
        {
          name:'文书档案',
          value:300
        },
        {
          name:'文书档案',
          value:560
        },
        {
          name:'测试档案',
          value:450
        },
        {
          name:'军事档案',
          value:120
        },
        {
          name:'人事档案',
          value:230
        },
        {
          name:'人事档案',
          value:230
        },
        {
          name:'人事档案',
          value:230
        },
        {
          name:'人事档案',
          value:230
        },
        {
          name:'人事档案',
          value:230
        }
      ],
      SYCD: 0,//使用长度
      DASL: 0,//使用总长度
      ZCD: '',//使用总 长度
      token: '',
      arrliststwoxxxx: [],
      sadTempldatalistlist: [],
      tempData: [],
      shebeibianhaolist: [],
      options: [
        {
          value: '空气质量云测仪',
          label: '空气质量云测仪'
        }, {
          value: '环境超限',
          label: '环境超限'
        },

      ],
      optionstwo: [],
      optionsthree: [],
      // optionsfour: [],
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
      sbstatusfour: 1,//库房制热
      sbstatussix: 0,//净化
      sbstatusseven: 0,//微尘净化
      sbstatuseight: 0,//气体净化
      sbstatusfive: 0,//气体新风
      value: 2,
      kufangpeizhi: false,
      dialogFormVisible: false,
      namevalue: '-1',//-1初始化，0连接失败，1连接成功2已经登录
      imgurl1: require('@/assets/a08_dsj2/yjjtwo.jpg'),
      imgurl2: require('@/assets/a08_dsj2/yjjone.jpg'),
      imgurl3: require('@/assets/a08_dsj2/yjj.jpg'),
      fcyj: require('@/assets/a08_dsj2/fcyj.png'),
      fdyj: require('@/assets/a08_dsj2/fdyj.png'),
      fdsdyj: require('@/assets/a08_dsj2/fdsdyj.png'),
      fdwyj: require('@/assets/a08_dsj2/fdwyj.png'),
      ffyj: require('@/assets/a08_dsj2/ffyj.png'),
      fgwyj: require('@/assets/a08_dsj2/fgwyj.png'),
      fgsdyj: require('@/assets/a08_dsj2/fgsyj.png'),
      fgyj: require('@/assets/a08_dsj2/fgyj.png'),
      fhyj: require('@/assets/a08_dsj2/fhyj.png'),
      fhuoyj: require('@/assets/a08_dsj2/fhhyj.png'),
      fsyj: require('@/assets/a08_dsj2/fsyj.png'),
      fzyj: require('@/assets/a08_dsj2/fzzyj.png'),
      config: {
        data: [
        ],
        columnWidth: [100],
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
      kfname: '档案库房',
      wendu: '13',//库房环境数据展示温度
      shidu: '12',//库房环境数据展示湿度
      hcho: '13',//库房环境数据展示甲醛
      tvoc: '13',//库房环境数据展示pm2.5
      pm1: '13',//库房环境数据展示pm1
      pm10: '13',//库房环境数据展示pm10
      co2: '13',//库房环境数据展示co2
      so2: '13',//库房环境数据展示so2
      kqzhiliang: '0',//库房环境数据展示空气质量
      kejidangan:'20',
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
      SD: "",       //  湿度状态     0=无报警：1=报警",
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
      xh: '10',
      yj: '33',
      ck: '2',
      rk: '22',
      nulllist: '',
      zhinengnment: '',
      bafangnment: '',
      pagetitle: '',
      sixtitle: '', //大数据表头                                                                                                                                                                                                                          
      // value: '2',//监控窗口分隔默认值
      serveIp: '172.16.21.60',//服务器IP
      serverport: '8056',//服务器端口
      monitorIp: '192.168.2.169',//监控IP
      monitorPort: '80',//监控端口
      username: 'admin',//用户名
      environmentprot: '',//友商端口号
      environment: '',//友商ip
      userPassword: '111...aaa',//密码
      sendurl: '',//档案服务地址
      // hkurl:'',//环控请求地址
      kzqIP: '',//控制器ip
      kfdz: '',//库房请求地址
      isBigTitle: false,//页面标题显示大小效果
      // shebeibianhaolist:[]
      yunceyihuanjinlist: [],
      type: '',
      arrlist: []

    }
  },
  created() {

  },
  computed: {
  },
  mounted() {
    if (localStorage.getItem('environment') != '' && localStorage.getItem('environmentprot') != '' && localStorage.getItem('haoma') != '' && localStorage.getItem('Kzqip') !== '' && localStorage.getItem('Kzq') !== 'null' && localStorage.getItem('shebeitype') !== 'undefined' && localStorage.getItem('shebeitype') !== 'undefined' && localStorage.getItem('kufangname') !== 'undefined') {
      this.valuethree = localStorage.getItem('Kzq')
      this.environment = localStorage.getItem('environment')
      this.environmentprot = localStorage.getItem('environmentprot')
      this.valueone = localStorage.getItem('shebeitype')
      this.valuetwo = localStorage.getItem('shebeibianhao')
      this.valuefour = localStorage.getItem('kufangname')
      this.haoma = localStorage.getItem('haoma')
      this.huanjin(localStorage.getItem('kzqip'))
      this.kzqzhuangtai(localStorage.getItem('kzqip'))

    }


    if (localStorage.getItem('environment') != '' && localStorage.getItem('environmentprot') != '' && localStorage.getItem('serveIp') != '' && localStorage.getItem('serveIp') != '') {
      this.serveIp = localStorage.getItem('serveIp')

      this.serverport = localStorage.getItem('serverport')
      setTimeout(() => {
        this.kufang()
        this.dangantoken()
      }, 1000)
      this.timer2 = setInterval(() => {
        this.kufang() //获取库房接口 
        this.dangantoken() //获取档案token
        // this.huanjin()

    

      }, 8000)
      this.init()
    }

    this.timer3 = setInterval(() => {   //获取库房数据后切割数组
      this.qiege()
    }, 2000)

    setTimeout(() => {
      if (this.valuefour != '') {
        this.optionsthree = []
        const axislistdata = this.fangzilistone.filter((item, index) => {
          return item.warehouse.storeName == this.valuefour
        })
        // console.log(arrlistsxx, 'arrlistsxxarrlistsxxarrlistsxxarrlistsxx');
        if(axislistdata[0]==undefined) return;
        this.optionsthree.push(...axislistdata[0].objectList)
      }
      this.arrliststwoxxxx = []
      this.fangzilistone.forEach((item, index) => {
        if(item.objectList==undefined) return;
        item.objectList.forEach((items, indexs) => {
          try {
            if (items.aCName == this.valuethree) {
              this.arrliststwoxxxx.push(items)
            }
            throw new Error('11');
          } catch { }
        });
      })
      var warehouseId = this.arrliststwoxxxx[0].storeId //库房id
      var controllerId = this.arrliststwoxxxx[0].aCId  //控制器id
      this.kzqIP = this.arrliststwoxxxx[0].hostName
      console.log(this.kzqIP, ' this.kzqIP this.kzqIP this.kzqIP');

      this.yunceyihuanjinlist = []
      axios.get(this.hkurl + '/settingDeviceShow/get?warehouseId=' + warehouseId + '&controllerId=' + controllerId).then(res => {
        console.log(res.data.data, '获取控制器类型加数量成功');
        this.yunceyihuanjinlist.push(...res.data.data);
      }
      ).catch(error => {
        console.log(error, '失败了');
      })

      if (this.valueone == '空气质量云测仪') {
        this.type = '12'
      }
      else if (this.valueone == '环境超限') {
        this.type = '13'
      } else {
        this.type = ''
      }


      setTimeout(() => {
        this.shebeibianhaolist = []
        console.log(this.yunceyihuanjinlist, 'this.yunceyihuanjinlistthis.yunceyihuanjinlist');
        console.log(this.type, 'typetypetypetypetypetypetypetype');
        // var arrlist=[]
        this.arrlist = this.yunceyihuanjinlist.filter((item, index) => {
          return item.deviceType == this.type
        })

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
        console.log(this.shebeibianhaolist, 'this.shebeibianhaolistthis.shebeibianhaolistthis.shebeibianhaolist');
      }, 2000)




    }, 2000)

    // asdbasd() //监控
    // asdbasds()//监控

    // this.viewUpdate()
    // this.$nextTick(() => {
    //   this.config = { data: this.data }
    //   this.ceceone()
    // });
    this.data = [];
    this.timer4 = setInterval(() => {
      if(this.valueone==undefined)return;
      if (this.valueone.length > 0) {
        this.huanjin(localStorage.getItem('kzqip'))
        this.kzqzhuangtai(localStorage.getItem('kzqip'))
        // this.setNowTimes()
      }
    }, 6000)

    this.timer5 = setInterval(() => {
      this.configs = { data: this.dataone }
      // if (this.valueone.length > 0) {
      this.cece()
      // }
    }, 1000)
    this.timer5 = setInterval(() => {
      this.config = { data: this.data }
      // if (this.valueone.length > 0) {
      this.ceceone()
      // }
    }, 1000)

    this.dataone = [];
    this.setNowTimes()
    this.toggleFullScreen()
    this.timer6 = setInterval(() => {
      this.$nextTick(() => {
        this.easrchs()
        this.easrchsone()
        this.setNowTimes()
      })
    }, 2000)

    this.timer7 = setInterval(() => {
      if(this.haoma==undefined)return;
      if (this.haoma.length > 0)
        this.hjshuaxin()
    }, 4000)

    this.nmbj() //饼图
  
    this.sdna() //柱状图
    this.timer8 = setInterval(() => {
      this.sdna()
      this.nmbj()
    }, 15000)

    // this.sadasdasdasd()


  },

  methods: {
    fanhuianniu() {
      window.history.go(-1)
    },
    //切割库房数组列表
    qiege() {

      this.fangzilistone = this.fangzilist.slice(0, 5)
      // console.log(this.fangzilistone, '00000000');
      this.fangzilisttwo = this.fangzilist.slice(5, 10)
      // console.log(this.fangzilisttwo, '555555555');
      this.fangzilistthree = this.fangzilist.slice(10, 15)
      // console.log(this.fangzilisttwo, '555555555');
      this.fangzilistfor = this.fangzilist.slice(15, 20)
      // console.log(this.fangzilisttwo, '555555555');
    },
    //库房选择
    kufangchange(val) {
      this.valuethree = ''
      this.valuetwo = ''
      this.valueone = ''
      this.optionsthree = []
      // console.log(val, 'kufangchangekufangchangekufangchangekufangchangekufangchange');
      let arrlistsxx = this.fangzilistone.filter((item, index) => {
        return item.warehouse.storeName == val
      })
      // console.log(arrlistsxx, 'arrlistsxxarrlistsxxarrlistsxxarrlistsxx');
      if(axislistdata[0].objectList==undefined) return;
      this.optionsthree.push(...arrlistsxx[0].objectList)
      // console.log(this.optionsthree, 'arrlists123123132131');
    },
    //控制器选择
    kzqchange(val) {

      this.valuetwo = ''
      this.shebeibianhaolist = []
      this.tempData = []
      // this.options = []
      this.valueone = ''
      this.sadTempldatalistlist = []
      this.Devicetypetrue = []

      this.arrliststwoxxxx = []
      this.fangzilistone.forEach((item, index) => {
        if(item.objectList==undefined) return;
        item.objectList.forEach((items, indexs) => {
          try {
            if (items.aCName == val) {
              this.arrliststwoxxxx.push(items)
            }
            throw new Error('11');
          } catch { }
        });
      })
      var warehouseId = this.arrliststwoxxxx[0].storeId //库房id
      var controllerId = this.arrliststwoxxxx[0].aCId  //控制器id
      this.kzqIP = this.arrliststwoxxxx[0].hostName
      console.log(this.kzqIP, ' this.kzqIP this.kzqIP this.kzqIP');

      this.yunceyihuanjinlist = []
      axios.get(this.hkurl + '/settingDeviceShow/get?warehouseId=' + warehouseId + '&controllerId=' + controllerId).then(res => {
        console.log(res.data.data, '获取控制器类型加数量成功');
        this.yunceyihuanjinlist.push(...res.data.data);
      }
      ).catch(error => {
        console.log(error, '失败了');
      }

      )
    },
    //设备类型选择
    sbtype(item) {
      this.shebeibianhaolist = []
      this.valuetwo = ''
      console.log(this.valueone, 'this.valueonethis.valueone');

      if (item == '空气质量云测仪') {
        this.type = '12'
      }
      else if (item == '环境超限') {
        this.type = '13'
      } else {
        this.type = ''
      }

      console.log(this.yunceyihuanjinlist, 'this.yunceyihuanjinlistthis.yunceyihuanjinlist');
      console.log(this.type, 'typetypetypetypetypetypetypetype');
      // var arrlist=[]
      this.arrlist = this.yunceyihuanjinlist.filter((item, index) => {
        return item.deviceType == this.type
      })
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
      console.log(this.shebeibianhaolist, 'this.shebeibianhaolistthis.shebeibianhaolist');
    },
    //设备编号选择
    sbbianhao(val) {
      this.haoma = val + "#"
      console.log(this.haoma, 'sdddddddddddddddddddddddddddddddddddddddddddddd');
      // var arrlist=''
      // this.shebeibianhaolist.forEach((item,index)=>{
      //   if(arr==item.value){

      //   }
      // })

    },
    //友商服务接口
    Friendservice() {

      // axios.get('http://' + this.environment + ':' + this.environmentprot + '/eps/control/main/rfidsb/indoorDatj')
      //   .then(success => {
      //     console.log(success.data.message, '档案成功了');
      //     this.xh = success.data.message.xh,
      //       this.yj = success.data.message.yj,
      //       this.ck = success.data.message.ck,
      //       this.rk = success.data.message.rk
      //   }).catch(error => error, 'error档案错误信息')

    },

    vrshitu() {
      this.$router.push('/supplierAllBack')
    },

    cece() { //左边轮播预警表
      this.dataone = []
      if (this.FS == '1') {
        this.dataone.push([])
    
        this.listlength = this.dataone.length
        console.log(this.listlength, 'listlengthlistlengthlistlength长度');
        console.log(this.dataone, ' this.dataone this.dataone this.dataone this.dataone this.dataone');
        this.dataone[this.listlength - 1].unshift("<div class='fsbj'><img src=" + this.fsyj + " alt=''></div>", "防水报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
      }
      if (this.FH == '1') {
        this.dataone.push([])
        this.listlength = this.dataone.length
        console.log(this.dataone, ' this.dataone 防火报警');
        this.dataone[this.listlength - 1].unshift("<div  class='fsbj' ><img src=" + this.fhyj + " alt=''></div>", "防害报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
      }
      if (this.FD == '1') {
        this.dataone.push([])
        this.listlength = this.dataone.length
        console.log(this.dataone, ' this.dataone 防盗取报警');
        console.log(this.listlength, ' this.dataone 防盗取报警长度');
        this.dataone[this.listlength - 1].unshift("<div class='fsbj' ><img src=" + this.fdyj + " alt=''></div>", "防盗取报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
      }
      setTimeout(() => {
        // console.log(this.SD, 'console.log(this.SD);  console.log(this.SD);  console.log(this.SD)');
        if (this.SD == '1') {//湿度大于上限即位高湿

          console.log(this.shidu, 'this.shiduthis.shidu');
          console.log(this.SDSX, 'this.SDSXSDSXSDSX');
          if (this.shidu >= this.SDSX) {

            this.dataone.push([])
            this.listlength = this.dataone.length
            this.dataone[this.listlength - 1].unshift("<div  class='fsbj'><img src=" + this.fgsdyj + " alt=''></div>", "高湿报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
          } 
          else if(this.shidu<=this.SDXX) {
            console.log('进入低湿度了');
            this.dataone.push([])
            this.listlength = this.dataone.length
            console.log(this.dataone, 'this.dataone this.dataone');
            this.dataone[this.listlength - 1].unshift("<div class='fsbj'><img src=" + this.fdsdyj + " alt=''></div>", "低湿报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
          }

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
        console.log(this.dataone, 'this.dataone this.dataone');
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
      if (this.FHai == '1') {
        this.dataone.push([])
        this.listlength = this.dataone.length
        this.dataone[this.listlength - 1].unshift("<div  class='fsbj' ><img src=" + this.fhuoyj + " alt=''></div>", "防火报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
      }
      setTimeout(() => {
        if (this.WD == '1') {
          // console.log(this.wendu, 'this.wendu');
          // console.log(this.WDSX, 'this.WDSX');
          if (this.wendu >= this.WDSX) {//温度大于上限即位高温

            this.dataone.push([])
            this.listlength = this.dataone.length
            this.dataone[this.listlength - 1].unshift("<div  class='fsbj'><img src=" + this.fgwyj + " alt=''></div>", "高温报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>");
          }
          else if(this.wendu <= this.WDXX) {//否则即位低温
            this.dataone.push([])
            this.listlength = this.dataone.length
            this.dataone[this.listlength - 1].unshift("<div  class='fsbj'><img src=" + this.fdwyj + " alt=''></div>", "低温报警", "<div class='fsbj'>" + this.nowDate + this.nowTime + "</div>")
          }
          else{}
        }
      }, 1000)
      if (this.FS == '0' && this.FH == '0' && this.FD == '0' && this.SD == '0' && this.FC == '0' && this.FF == '0' && this.FG == '0' && this.FZ == '0' && this.FHai == '0' && this.WD == '0') {
        this.dataone.push([])
        this.listlength = this.dataone.length
        console.log(this.listlength,'this.listlengththis.listlength111111111111111111111111');
        console.log('进来if了');
        this.dataone[this.listlength - 1].unshift("<div  class='fsbj' ></div>", "暂无预警感知记录", "<div class='fsbj'>" + this.nowDate + "</div>");
        console.log(this.dataone,'dataonedataone');
      }

    },
    ceceone() { //右边轮播预警表
      this.data = []
    console.log('进来了11111111111111111');
      // if (true) {
        this.data.push([])
        this.listlength = this.data.length
        this.data[this.listlength - 1].unshift("<div  class='fsbjone' >暂无档案出入库异常报警记录</div>","<div class='fsbjthree'>" + this.nowDate + "</div>");
      // }
      console.log(this.data,'this.datathis.datathis.data');

    },
    //读取
    savelist() {
      localStorage.setItem('kufangname', this.valuefour)
      localStorage.setItem('shebeibianhao', this.valuetwo)
      localStorage.setItem('shebeitype', this.valueone)
      localStorage.setItem('Kzq', this.valuethree)
      localStorage.setItem('kzqip', this.kzqIP)
      localStorage.setItem('haoma', this.haoma)
      this.kufangpeizhi = false
      this.hjshuaxin() //点击读取展示温湿度
      this.kzqzhuangtai() //点击读取展示该控制器下的设备总状态和报警
    },
    //环境数据展示温湿度
    hjshuaxin() {
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
        this.huanjinlist[0][12].forEach((item, index) => {
          if (item.deviceNo == this.haoma) {
            console.log(item.deviceNo, this.haoma, 'sssssssssssssssssssddddddddddddddddd');
            this.wendu = item.temp
            this.shidu = item.hum
            this.hcho = item.HCHO
            this.tvoc = item.TVOC
            this.pm1 = item.pm1
            this.pm10 = item.pm10
            this.co2 = item.CO2
            this.so2 = item.SO2
            this.kqzhiliang = item.pm2_5
            console.log(this.wendu, 'this.wenduthis.wenduthis.wenduthis.wendu');

            // this.sbstatus = item.JSZZT
            // this.sbstatusthree = item.ZLZZT
            // this.sbstatusfour = item.ZRZZT
            // this.sbstatussix = item.JHZZT
            // this.sbstatusseven = item.WCJHZZT
            // this.sbstatuseight = item.QTJHZZT
            // this.sbstatusfive = item.XFZZT
            //   // console.log(this.dataone,'console.log(this.dataone);console.log(this.dataone);');
            // //库房加湿
            //   this.sbstatustwo = item.CSZZT,//库房除湿
            //   this.sbstatusthree = item.ZLZZT,//库房制冷
            //   this.sbstatusfour = item.ZRZZT,//库房制热
            //   this.sbstatussix = item.JHZZT,//净化
            //   this.sbstatusseven = item.WCJHZZT,//微尘净化
            //   this.sbstatuseight = item.QTJHZZT,//气体净化
            //     this.sbstatusfive = item.XFZZT,//气体新风
            //     // console.log(data[7], '接口返回的的数据2');
            //     // console.log(data[7][0], '接口返回的的数据2');
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
          }

        })
      }

    },
    //通过控制器来获取该控制器下的设备总状态和报警
    kzqzhuangtai(kzqIP) {
      var x = { 'ip': kzqIP }
      //控制器ip
      var y = JSON.stringify(x)
      var ip1 = encodeURIComponent(y)
      // console.log(ip1, x, y, 'dsghsssdbdjshfsbhfj');
      axios.get(this.hkurl + '/getRfid?cmd=60001&localip=127.0.0.1&hostname=10.168.1.39&port=8066&method=UnmannedKFPTService%2FgetTotalRunState&jsonin=' + ip1)
        .then(res => {
          console.log(res.data.data.SRFCSZT[0], '通过控制器来获取该控制器下的设备总状态和报警成功了');
          console.log(res.data.data, 'res成功了1');
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
        }).catch((error => {
          this.FS = 0
          this.FD = 0
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
          console.log(error, '通过控制器来获取该控制器下的设备总状态和报警失败了')
        }))
    },
    //库房控制器配置
    Controllerconfiguration() {
      this.kufangpeizhi = true
    },
    //设置接口
    init() {
      var shezhidata =
        ['username', 'password', 'videoip', 'environment', 'environmentprot', 'videoport', 'logoname']
      // var senddata = '{}'
      this.hkurl = 'http://' + this.serveIp + ':' + this.serverport
      apiPostGet.apipost(this, this.hkurl + '/custom/getMulti', shezhidata);

    },
    // 设置页面返回数据
    viewUpdate(data) {
      this.nulllist = []
      // this.serveIp = data.serverip
      // this.serverport = data.serverport
      // let nulllist=[]
      data.forEach((item, index) => {
        this.nulllist.push(item.content)
        console.log(item, 'itemitemitemitemitemitemitemitemitemitem');
      })
      console.log(this.nulllist, 'nulllistnulllistnulllistnulllist');
      this.environment = this.nulllist[4]
      this.environmentprot = this.nulllist[5]
      this.username = this.nulllist[0]
      this.userPassword = this.nulllist[1]
      this.monitorIp = this.nulllist[2]
      this.monitorPort = this.nulllist[3]
      // this.pagetitle = this.nulllist[6]
      // monitorIp: '192.168.2.169',//监控IP
      // monitorPort: '80',//监控端口
      this.sixtitle = this.nulllist[6]
      this.pagetitle = this.nulllist[6]

      console.log(data, '接口返回的的数据');
      if (this.sixtitle.length > 9) {

        this.isBigTitle = true;
      } else {
        this.isBigTitle = false;
      }
    },

    //获取档案token
    dangantoken() {
      this.sendurl = 'http://' + this.environment + ':' + this.environmentprot
      console.log(this.sendurl, 'this.sendurlthis.sendurl');
      axios.post(this.sendurl + '/eps/control/main/rfidsb/doEmisLogin?loginCode=cjgly&password=888').then(res => {
        console.log(res, '档案token获取成功数据');

        console.log(res.data.token, 'cookiecookiecookie');
        this.token = res.data.token
      }).catch(error => {
        console.log(error, '档案token获取失败');
      })
      setTimeout(() => {
        //获取进度数据
        // axios.get(this.sendurl + '//eps/control/main/tjfx/queryForTjfxKfsjzb?token=' + this.token).then(res => {
        //   this.SYCD = 0;
        //   this.DASL = 0;
        //   res.data.forEach((item, index) => {
        //     this.SYCD += Number(item.SYCD);
        //     this.DASL += Number(item.DASL);
        //   })
        //   this.jindutiao = ((this.SYCD / this.DASL) * 100).toFixed(2)
        //   this.nsdz()
        //   console.log(res, '上架占比获取成功数据');
        // }).catch(error => {
        //   console.log(error, '上架占比获取失败');
        // })
        //获取档案档案类别数据
        axios.get(this.sendurl + '//eps/control/main/tjfx/queryForTjfxDalb?token=' + this.token).then(res => {
          console.log(res, '获取档案档案类别获取成功数据');
        }).catch(error => {
          console.log(error, '获取档案档案类别获取失败');
        })
        //获取档案档案类别数据

        // axios.get('http://epssoft.tpddns.cn:13082//eps/control/main/tjfx/queryForTjfxDalb?token='+this.token).then(res=>{
        // console.log(res,'获取档案档案类别获取成功数据');
        // }).catch(error=>{
        // console.log(error,'获取档案档案类别获取失败');
        // })



        //获取档案档案类别数据
        // axios.get(this.sendurl + '//eps/control/main/tjfx/queryForrckzjycxhtj').then(res => {
        //   console.log(res, '获取出入库成功数据');
        // }).catch(error => {
        //   console.log(error, '获取出入库数据获取失败');
        // })
      }, 1500)




    },

    //获取库房接口
    kufang() {
      // console.log('进入库房接口');
      this.kfdz = 'http://' + this.serveIp + ':' + this.serverport
      console.log(this.kfdz, '   this.kfdz, this.kfdz, this.kfdz,');
      // var ip = {
      //   ip:"172.16.17.59"   //控制器ip
      // }
      apiPostGet.kufang(this, this.kfdz + '/warehouse/detailList',);
    },



    // 获取库房数据
    kufangshuju(data) {
      this.fangzilist = []
      var arr = []//库房列表
      // var kzqiplist=[]//环控设备ip
      console.log(data, '库房接口返回的的数据1');
      data.forEach((item, index) => {
        arr.push(item)
      })
      this.fangzilist.push(...arr)
      this.kfname = this.fangzilist[0].warehouse.storeName;
    },
    // 环境数据接口
    huanjin(kzqIP) {
      console.log(kzqIP, 'this.kzqIPthis.kzqIPthis.kzqIP222222222')
      this.hkurl = 'http://' + this.serveIp + ':' + this.serverport
      console.log(this.hkurl, 'this.hkurlthis.hkurlthis.hkurl');
      var ipone = {
        'ip': kzqIP
      }
      //控制器ip
      var ipstring = JSON.stringify(ipone)
      var ip = encodeURIComponent(ipstring)
      console.log(ip, 'sssddddddddddddddddddddddddddddddddddddddddddd');
      apiPostGet.huanjin(this, this.hkurl + '/getRfid?cmd=60001&localip=127.0.0.1&hostname=10.168.1.39&port=8066&method=UnmannedKFPTService/getStatus&jsonin=' + ip);
    },
    // 返回的环境数据
    viewUpdates(data) {
      this.huanjinlist = []
      console.log(data, '环境接口返回的的数据1');
      this.huanjinlist.push(data)
      console.log(this.huanjinlist, 'this.huanjinlist this.huanjinlist this.huanjinlist');
      // if (data == undefined) {

      //   // console.log(this.dataone,'console.log(this.dataone);console.log(this.dataone);');
      //   this.sbstatus = '0'//库房加湿
      //   this.sbstatustwo = '0'//库房除湿
      //   this.sbstatusthree = '0'//库房制冷
      //   this.sbstatusfour = '0'//库房制热
      //   this.sbstatussix = '0'//净化
      //   this.sbstatusseven = '0'//微尘净化
      //   this.sbstatuseight = '0' //气体净化
      //   this.sbstatusfive = '0'//气体新风
      //   // console.log(data[7], '接口返回的的数据2');
      //   // console.log(data[7][0], '接口返回的的数据2');
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
      //   // console.log(this.dataone,'console.log(this.dataone);console.log(this.dataone);');
      //   this.sbstatus = item.JSZZT,//库房加湿
      //     this.sbstatustwo = item.CSZZT,//库房除湿
      //     this.sbstatusthree = item.ZLZZT,//库房制冷
      //     this.sbstatusfour = item.ZRZZT,//库房制热
      //     this.sbstatussix = item.JHZZT,//净化
      //     this.sbstatusseven = item.WCJHZZT,//微尘净化
      //     this.sbstatuseight = item.QTJHZZT,//气体净化
      //     this.sbstatusfive = item.XFZZT,//气体新风
      //     // console.log(data[7], '接口返回的的数据2');
      //     // console.log(data[7][0], '接口返回的的数据2');
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
      $("#yulanhou").html(-1)
    },
    //保存
    save() {
      var shezhidata = [
        { 'name': 'username', 'content': this.username },
        { 'name': 'password', 'content': this.userPassword },
        { 'name': 'videoip', 'content': this.monitorIp },
        { 'name': 'videoport', 'content': this.monitorPort },
        { 'name': 'environment', 'content': this.environment },
        { 'name': 'environmentprot', 'content': this.environmentprot },
        { 'name': 'logoname', 'content': this.pagetitle },
      ]
      this.hkurl = 'http://' + this.serveIp + ':' + this.serverport
      console.log(this.hkurl, 'this.hkurlthis.hkurlthis.hkurl');
      axios.post(this.hkurl + '/custom/addMulti', shezhidata).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          localStorage.setItem('serveIp', this.serveIp)
          localStorage.setItem('serverport', this.serverport)
          localStorage.setItem('environment', this.environment)
          localStorage.setItem('environmentprot', this.environmentprot)

          this.dangantoken()
          this.init()
          this.kufang()
          // this.huanjin()
          this.dialogFormVisible = false

        }
      }).catch(error => {
        this.$message({
          message: '保存失败',
          type: 'error'
        });
        this.init()
        console.log(error, '保存失败');
        this.dialogFormVisible = false
      })
    },
    //监控设置连接
    clickLogin() { // 登录
      console.log($("#yulanhou").html(), '$("#yulanhou").html()$("#yulanhou").html()');
      if (this.monitorIp && this.monitorPort && this.username && this.userPassword) {
        // 先退出登录
        clickLogout()
        clickLogouts()

        //调jq 登录
        clickLogin()
        clickLogins()


        const loading = this.$loading({
          lock: true,
          text: '加载中……',
          customClass: 'loadingclass',          // **遮罩层新增类名，如果需要修改loading的样式**
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
          console.log($("#yulanhou").html(), 'namevalue');

          if ($("#yulanhou").html() == 1) {
            // alert('sssssssssssss')
            this.$message({
              message: '连接成功',
              type: 'success'
            });
          } else {
            this.$message.error('连接失败');
          }
        }, 3000);
      } else {
        this.$message({
          message: '请填写正确的信息',
          type: 'warning'
        })
      }


    },
    clickStartRealPlay() {//开始预览
      clickStopRealPlay();//停止
      // setTimeout(() => {
      //   clickStopRealPlays();//停止第二个

      // }, 200);
      setTimeout(() => {
        clickStartRealPlay();//开始预览第一个
      }, 300);
      setTimeout(() => {
        clickStartRealPlays()//
      }, 200);
    },
    handleClose() {
      this.dialogFormVisible = false
    },
    //设置的点击事件
    setting() {
      this.dialogFormVisible = true
      this.init()

    },
    personalCenter() {
      this.$router.push({ path: '/vrndex', })
      setTimeout(() => {
        this.$router.go(0)
      }, 200)


    },
    //关闭
    dianjihrx() {
      dianjihrx()
      $("#yulanhou").html(-1)
      // b()
    },

    toggleFullScreen() {
      const doc = window.document;
      const docEl = doc.documentElement;

      const requestFullScreen = docEl.requestFullScreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      const exitFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
      // console.log(requestFullScreen, '222222222');
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
        console.log('dasdas');

      } else {
      }




    },
    handleResize() {
      this.fullWidth = document.documentElement.clientWidth
      this.fullHeight = document.documentElement.clientHeight
    },
    easrchs() {
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
        console.log('>>>>>>>>>>>优');

      } else if (dataArr > 20 && dataArr <= 50) {  ////////良好 
        this.xianshi3 = false
        this.xianshi1 = false
        this.xianshi2 = true
        this.xianshi4 = false
        console.log('>>>>>>>>>>>良好');


      } else if (dataArr > 50 && dataArr <= 70) {////////轻度污染
        this.xianshi2 = false
        this.xianshi1 = false
        this.xianshi3 = true
        this.xianshi4 = false
        console.log('>>>>>>>>>>>轻度污染');
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
        console.log('>>>>>>>>>>>优');

      } else if (dataArr > 20 && dataArr <= 50) {  ////////良好 
        this.xianshi3 = false
        this.xianshi1 = false
        this.xianshi2 = true
        this.xianshi4 = false
        console.log('>>>>>>>>>>>良好');


      } else if (dataArr > 50 && dataArr <= 70) {////////轻度污染
        this.xianshi2 = false
        this.xianshi1 = false
        this.xianshi3 = true
        this.xianshi4 = false
        console.log('>>>>>>>>>>>轻度污染');
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
    nmbj() {
      console.log('ssssssssssssssssdddddddddddddddddddddddddddddddddd');
          const myChart = echarts.init(document.getElementById("nebingtu"));

      let hoveredIndex = '';
      var colorstyle =[ 
        '#6495ED',
        '#EEE8AA',
        '#0000FF',
        '#00FF7F',
        '#FFFF00',
        '#FF0000',
        '#00CED1',
        '#FF8C00',
        '#FFA500',
        '#800000'
      ]
      colorstyle.forEach((itemxxx,indexxx)=>{
        console.log(indexxx,'indexxx');
        console.log(this.listdata[indexxx],'this.listdata[indexxx]');
          this.listdata[indexxx].itemStyle={'color':itemxxx};
      })
     
      console.log(this.listdata,'this.listdatathis.listdata');

      var optionData=[];
      optionData.push(...this.listdata);

      // console.log(option,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!');

      setTimeout(()=>{
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
        console.log(series);
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
      option.title.text = option.series[0].name + ' ' + option.series[0].pieData.value
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
    },1000)
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
    sdna() {
      const myChart = echarts.init(document.getElementById("opnasd"));
      console.log(data, 'datadatadatadatadatadatadatadatadatadata');
      var dangandata = [
        {
          name: "入库",
          value: this.rk
        },
        {
          name: "出库",
          value: this.ck
        },
        {
          name: "已移交",
          value: this.yj
        },
        {
          name: "销毁",
          value: this.xh
        }
      ];
      var data
      data = dangandata
      console.log(data, 'datadatadatadatadatadatadatadatadatadata');
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
        // console.log(xAxisData, 'xAxisData');
        // console.log(seriesData1, 'seriesData1');
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
                  fontSize: 18,
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
            //   console.log(value,index,'value,index');
            // },
          }
        },
        series: [{
          name: '柱顶部',
          type: 'pictorialBar',
          symbolSize: [29, 10],
          symbolOffset: [0, -4],
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
        }, {
          name: '柱底部',
          type: 'pictorialBar',
          symbolSize: [26, 10],
          symbolOffset: [0, 5],
          z: 12,
          itemStyle: {
            normal: {
              color: function (params) {
                return barTopColor[params.dataIndex];
              }
            }
          },
          data: seriesData1
        }, {//柱子中间内容
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

    if (this.timer || this.timer2 || this.timer3 || this.timer4 || this.timer5 || this.timer6 || this.timer7 || this.timer8)
      clearInterval(this.timer)
    clearInterval(this.timer1)
    clearInterval(this.timer2)
    clearInterval(this.timer3)
    clearInterval(this.timer4)
    clearInterval(this.timer5)
    clearInterval(this.timer6)
    clearInterval(this.timer7)
    clearInterval(this.timer8)

  },


}
</script>



<style lang="less" scoped>
.hearder {
  background: url(~@/assets/a08_dsj2/XXXX.png) no-repeat;
  background-size: 100% 100%;
}

.leftcounteone {
  overflow: hidden;
  background: url(~@/assets/a08_dsj2/dk.png) no-repeat;
  background-size: 100% 100%;
}

.leftcountetwo {
  overflow: hidden;
  background-image: url(~@/assets/a08_dsj2/dk.png);
  background-size: 100% 100%;
}

.leftcountethree {
  overflow: hidden;
  background-image: url(~@/assets/a08_dsj2/dk.png);
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
    background-image: url(~@/assets/a08_dsj2/bj.png);
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

  background: url('~@/assets/a08_dsj2/bz28.png');
  background-size: 100% 100%;
}

.beijingtupian img {
  margin-left: 5%;
  height: 94%;
  width: 85%;
}

.management {

  display: flex;
  justify-content: center;
  align-items: center;
  background: url(~@/assets/a08_dsj2/bz2.png) no-repeat;
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
  background: url(~@/assets/a08_dsj2/bz2.png) no-repeat;
  background-size: 100%, auto;
  margin-top: 2vw;
  width: 11vw;
  height: 3vw;
}

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(~@/assets/a08_dsj2/sy.png) no-repeat;
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
  background-image: url(~@/assets/a08_dsj2/bt1.png);
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
  margin-left: -6.5vw;
  background-image: url(~@/assets/a08_dsj2/bt1.png);
  background-size: 120% 122%;
  width: 120%;
  height: 1.5vw;
  font-family: DingTalk-JinBuTi, DingTalk;
  font-weight: normal;
  color: #D0EDFB;
  font-size: 1vw;
  z-index: 999999;
}

/deep/.opopedasdsa canvas {
  position: absolute;
  left: -2.5vw !important;
    top: 0.5vw !important;
    width: 15vw !important;
    height: 4.5rem !important;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  padding: 0px;
  margin: 0px;
  border-width: 0px;


}

.opopedasdsa {
  position: relative;
  top: 1vw;
  // background: url('~@/assets/a08_dsj2/bz13.png') no-repeat;
  // background-size: 100% 50%;

}
/deep/.opopedasdsaone canvas {
  position: absolute;
  left: 9.5vw !important;
    top: 0.7vw !important;
    width: 15vw !important;
    height: 4.5rem !important;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  padding: 0px;
  margin: 0px;
  border-width: 0px;


}

.opopedasdsaone {
  position: relative;
  top: 1vw;
  // background: url('~@/assets/a08_dsj2/bz13.png') no-repeat;
  // background-size: 100% 50%;

}


/deep/.asdaniskd canvas {
  position: absolute;
  left: 6vw !important;
    top:18vw !important;
  width: 25vw !important;
  height: 6rem !important;

}

.beijing {
  background-image: url('~@/assets/a08_dsj2/bz7.png');
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
  height: 4vw;
  background-image: url(~@/assets/a08_dsj2/ztbt.png);
  background-size: 100% 100%;
}

.lefttou {
  margin-left: 4vw;
  margin-top: 1vw;
  background: url(~@/assets/a08_dsj2/zjt.png) no-repeat;
  background-size: 100% 11%;
}

.righttou {
  margin-top: 1vw;
  background: url(~@/assets/a08_dsj2/yjt.png) no-repeat;
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
  background-image: url(~@/assets/a08_dsj2/nrk.png);
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
  font-size: 0.7vw !important;
  z-index: 999899;
}

/deep/.fsbj {
  width: 2.5vw;
  height: 2.4vw;
  margin-left: -0.4vw;
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
.danganfenlei{
  position:absolute;
  z-index: 9999999999 !important;
}
.shabi{
  border-radius:50%;
  width:.8vw;
  height:.8vw
}
</style>
