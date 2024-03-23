<template >
    <div class="indedede">
        <!-- header部分 -->
        <el-row class="cDHeader">
            <el-col :span="4">
                <div class="grid-content  " style="height: 2vh;"></div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content  time">{{ nowTime }}</div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content  cDTitle">智慧档案馆环境安全数据可视化平台</div>
            </el-col>
            <el-col :span="5">
                <router-link to="spjk" class="grid-content  goHome"
                    style="text-decoration:none;color:aliceblue">视频监控</router-link>
                <!-- <div class="grid-content  goHome">返回首页</div> -->
            </el-col>
            <!-- 弹框配置功能(控制器,轮播图) -->
            <el-col :span="2">
                <div class="grid-content  ">
                    <el-button type="text" @click="centerDialogVisible = true"
                        style="font-size: 1vw;position: fixed;top: 1vh;right: 2.4vw;"><i
                            class="el-icon-setting"></i></el-button>
                    <el-dialog title="配置" :visible.sync="centerDialogVisible" width="30%" :modal-append-to-body="true"
                        :append-to-body="true" center>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="控制器" name="first">
                                <el-form ref="form" :model="form" label-width="200px">
                                    <el-form-item label="环控数据" label-width="100px">
                                        <el-select v-model="form.running" placeholder="系统状态,十二预警,空气质量检测使用的控制器">
                                            <el-option v-for="(item, index) in form.wholeController" :key="index"
                                                :value="item.ip + '/' + item.val" :label="item.name">{{ item.name
                                                }}</el-option>
                                            <!-- <el-option value="10.10.10.80" >10.10.101.1231</el-option> -->
                                        </el-select>
                                    </el-form-item>
                                    <!-- <el-form-item label="十二防预警" label-width="100px">
                      <el-select v-model="form.perceptions" placeholder="请选择十二防预警使用的控制器">
                        <el-option v-for="(item, index) in form.wholeController" :key="index"
                          :value="item.ip + '/' + item.val" :label="item.name">{{ item.name }}</el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="空气质量检测" label-width="100px">
                      <el-select v-model="form.air" placeholder="请选择空气质量检测使用的控制器">
                        <el-option v-for="(item, index) in form.wholeController" :key="index"
                          :value="item.ip + '/' + item.val" :label="item.name">{{ item.name }}</el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="空气设备序号" label-width="100px">
                      <el-input v-model="form.airText" placeholder="请选择空气质量检测在控制器中的序号"></el-input>
                    </el-form-item> -->
                                </el-form>
                                <div style="text-align: center;">
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="centerDialogVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="okk">确 定</el-button>
                                    </span>
                                </div>
                            </el-tab-pane>
                            <!-- <el-tab-pane label="轮播图" name="second">
                                <div style="text-align: center;">
                                    <el-upload accept="image/jpeg,image/gif,image/png" ref="uploadOne" class="upload-demo"
                                        drag :auto-upload='false' name="file" :limit="8" :on-exceed="handleExceed"
                                        :on-change="handleChange" action="" :on-preview="handlePreview"
                                        :http-request="handleRequest" :on-remove="handleRemove"
                                        :before-remove="beforeRemove" multiple :file-list="fileList">
                                        <i class="element-icons el-icon-upload"></i>
                                        <div class="el-upload__text">将图片拖到此处，<div> 或<em>点击上传</em></div>
                                        </div>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="true"
                                        :append-to-body="true">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                                <div style="text-align: center;">
                                    <span slot="footer" class="dialog-footer">
                                        <el-button type="primary" @click="submitUpload">保&nbsp;&nbsp;存</el-button>
                                        <el-button type="" @click="dialogVisible = false">取&nbsp;&nbsp;消</el-button>
                                    </span>
                                </div>
                            </el-tab-pane> -->
                        </el-tabs>
                    </el-dialog>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <!-- 左侧部分 -->
            <el-col :span="6">
                <!-- 档案分类饼状图 -->
                <dv-border-box-8 :dur="15">
                    <div class="grid-content  daflpiechart">
                        <div class="grid-content " style="height: 6vh;"></div>
                        <div class="grid-content  daflpiechartContent" id="daflpiechartContent">

                        </div>
                        <el-col :span="24">
                            <el-col :span="4" class="toolDiv"></el-col>
                            <el-col :span="7" class="toolDiv toolDiv-danganzongliang">{{ libraryNumber }}</el-col>
                            <el-col :span="5" class="toolDiv"></el-col>
                            <el-col :span="7" class="toolDiv toolDiv-danganzongliang">{{ borrowingNumber }}</el-col>
                        </el-col>
                    </div>
                </dv-border-box-8>
                <div class="grid-content " style="margin-top: 3vh;"></div>
                <div class="grid-content ">
                    <!-- 十二防感知状态 -->
                    <dv-border-box-8 :dur="15">

                        <el-row style="100%">
                            <el-col :span="23">
                                <div style="100%" class="grid-content  twelvePerceptions">
                                    <div class="one left-bottom">
                                        <div style="position: relative;" class="left-bottom-div">
                                            <img class="left-bottom-div-img" src="~@/assets/a08_dsj/fangshui.png" alt="">
                                            <img class="left-bottom-div-img" v-show="twelvePerceptions.fangshui"
                                                src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </div>
                                        <div style="position: relative;" class="left-bottom-div">
                                            <img class="left-bottom-div-img" src="~@/assets/a08_dsj/fanghuo.png" alt="">
                                            <img class="left-bottom-div-img" v-show="twelvePerceptions.fanghuo"
                                                src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </div>
                                        <div style="position: relative;" class="left-bottom-div">
                                            <img class="left-bottom-div-img" src="~@/assets/a08_dsj/fangdao.png" alt="">
                                            <img class="left-bottom-div-img" v-show="twelvePerceptions.fangdao"
                                                src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </div>
                                        <div style="position: relative;" class="left-bottom-div">
                                            <img class="left-bottom-div-img" src="~@/assets/a08_dsj/fanggaowen.png" alt="">
                                            <img class="left-bottom-div-img" v-show="twelvePerceptions.fanggaowen"
                                                src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </div>
                                    </div>
                                    <div class="two left-bottom">
                                        <div style="position: relative;" class="left-bottom-div">
                                            <img class="left-bottom-div-img" src="~@/assets/a08_dsj/fanggaoshi.png" alt="">
                                            <img class="left-bottom-div-img" v-show="twelvePerceptions.fanggaoshi"
                                                src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </div>
                                        <div style="position: relative;" class="left-bottom-div">
                                            <img class="left-bottom-div-img" src="~@/assets/a08_dsj/fangchen.png" alt="">
                                            <img class="left-bottom-div-img" v-show="twelvePerceptions.fangchen"
                                                src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </div>
                                        <div style="position: relative;" class="left-bottom-div">
                                            <img class="left-bottom-div-img" src="~@/assets/a08_dsj/fangfu.png" alt="">
                                            <img class="left-bottom-div-img" v-show="twelvePerceptions.fangfu"
                                                src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </div>
                                        <div style="position: relative;" class="left-bottom-div">
                                            <img class="left-bottom-div-img" src="~@/assets/a08_dsj/fangguang.png" alt="">
                                            <img class="left-bottom-div-img" v-show="twelvePerceptions.fangguang"
                                                src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </div>
                                    </div>
                                    <div class="there left-bottom">
                                        <div style="position: relative;" class="left-bottom-div">
                                            <img class="left-bottom-div-img" src="~@/assets/a08_dsj/fangzhen.png" alt="">
                                            <img class="left-bottom-div-img" v-show="twelvePerceptions.fangzhen"
                                                src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </div>
                                        <div style="position: relative;" class="left-bottom-div">
                                            <img class="left-bottom-div-img" src="~@/assets/a08_dsj/fanghai.png" alt="">
                                            <img class="left-bottom-div-img" v-show="twelvePerceptions.fanghai"
                                                src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </div>
                                        <div style="position: relative;" class="left-bottom-div">
                                            <img class="left-bottom-div-img" src="~@/assets/a08_dsj/wenduxiaxian.png"
                                                alt="">
                                            <img class="left-bottom-div-img" v-show="twelvePerceptions.wenduxiaxian"
                                                src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </div>
                                        <div style="position: relative;" class="left-bottom-div">
                                            <img class="left-bottom-div-img" src="~@/assets/a08_dsj/shiduxiaxian.png"
                                                alt="">
                                            <img class="left-bottom-div-img" v-show="twelvePerceptions.shiduxiaxian"
                                                src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </div>
                                    </div>
                                    <!-- <el-row class="one">
                                        <el-col :span="6" style="position: relative;">
                                            <img src="~@/assets/a08_dsj/fangshui.png" alt="">
                                            <img v-show="twelvePerceptions.fangshui" src="~@/assets/a08_dsj/yujing.png"
                                                alt="" style="position: absolute;left: 0;">
                                        </el-col>
                                        <el-col :span="6" style="position: relative;">
                                            <img src="~@/assets/a08_dsj/fanghuo.png" alt="">
                                            <img v-show="twelvePerceptions.fanghuo" src="~@/assets/a08_dsj/yujing.png"
                                                alt="" style="position: absolute;left: 0;">
                                        </el-col>
                                        <el-col :span="6" style="position: relative;">
                                            <img src="~@/assets/a08_dsj/fangdao.png" alt="">
                                            <img v-show="twelvePerceptions.fangdao" src="~@/assets/a08_dsj/yujing.png"
                                                alt="" style="position: absolute;left: 0;">
                                        </el-col>
                                        <el-col :span="6" style="position: relative;">
                                            <img src="~@/assets/a08_dsj/fanggaowen.png" alt="">
                                            <img v-show="twelvePerceptions.fanggaowen" src="~@/assets/a08_dsj/yujing.png"
                                                alt="" style="position: absolute;left: 0;">
                                        </el-col>
                                    </el-row>
                                    <el-row class="two">
                                        <el-col :span="6" style="position: relative;">
                                            <img src="~@/assets/a08_dsj/fanggaoshi.png" alt="">
                                            <img v-show="twelvePerceptions.fanggaoshi" src="~@/assets/a08_dsj/yujing.png"
                                                alt="" style="position: absolute;left: 0;">
                                        </el-col>
                                        <el-col :span="6" style="position: relative;">
                                            <img src="~@/assets/a08_dsj/fangchen.png" alt="">
                                            <img v-show="twelvePerceptions.fangchen" src="~@/assets/a08_dsj/yujing.png"
                                                alt="" style="position: absolute;left: 0;">
                                        </el-col>
                                        <el-col :span="6" style="position: relative;">
                                            <img src="~@/assets/a08_dsj/fangfu.png" alt="">
                                            <img v-show="twelvePerceptions.fangfu" src="~@/assets/a08_dsj/yujing.png" alt=""
                                                style="position: absolute;left: 0;">
                                        </el-col>
                                        <el-col :span="6" style="position: relative;">
                                            <img src="~@/assets/a08_dsj/fangguang.png" alt="">
                                            <img v-show="twelvePerceptions.fangguang" src="~@/assets/a08_dsj/yujing.png"
                                                alt="" style="position: absolute;left: 0;">
                                        </el-col>
                                    </el-row>
                                    <el-row class="there">
                                        <el-col :span="6" style="position: relative;">
                                            <img src="~@/assets/a08_dsj/fangzhen.png" alt="">
                                            <img v-show="twelvePerceptions.fangzhen" src="~@/assets/a08_dsj/yujing.png"
                                                alt="" style="position: absolute;left: 0;">
                                        </el-col>
                                        <el-col :span="6" style="position: relative;">
                                            <img src="~@/assets/a08_dsj/fanghai.png" alt="">
                                            <img v-show="twelvePerceptions.fanghai" src="~@/assets/a08_dsj/yujing.png"
                                                alt="" style="position: absolute;left: 0;">
                                        </el-col>
                                        <el-col :span="6" style="position: relative;">
                                            <img src="~@/assets/a08_dsj/wenduxiaxian.png" alt="">
                                            <img v-show="twelvePerceptions.wenduxiaxian" src="~@/assets/a08_dsj/yujing.png"
                                                alt="" style="position: absolute;left: 0;">
                                        </el-col>
                                        <el-col :span="6" style="position: relative;">
                                            <img src="~@/assets/a08_dsj/shiduxiaxian.png" alt="">
                                            <img v-show="twelvePerceptions.shiduxiaxian" src="~@/assets/a08_dsj/yujing.png"
                                                alt="" style="position: absolute;left: 0;">
                                        </el-col>
                                    </el-row> -->
                                </div>
                            </el-col>
                        </el-row>
                    </dv-border-box-8>

                </div>
            </el-col>
            <!-- 轮播图 -->
            <el-col :span="12" style="text-align: center;padding:0 1vw 0 1vw">
                <div class="grid-content  today">
                    <div class="grid-content " style="height: 3.5vh;">
                    </div>
                    <div class="grid-content " style="height: 8.5vh;">
                        <el-col :span="24" style="height: 8.5vh;">
                            <el-col :span="4" class="toolDiv"></el-col>
                            <el-col :span="4" class="toolDiv one">{{ todayReturn }}</el-col>
                            <el-col :span="2" class="toolDiv"></el-col>
                            <el-col :span="4" class="toolDiv two">{{ todayBorrowing }}</el-col>
                            <el-col :span="2" class="toolDiv"></el-col>
                            <el-col :span="4" class="toolDiv there">{{ todayWarehousing }}</el-col>
                        </el-col>
                    </div>
                </div>
                <div class="grid-content  carousel">
                    <!-- <el-carousel :interval="5000" arrow="always" :height="52.5 + 'vh'"> -->
                    <!-- <el-carousel-item v-for=" (item, key)  in  images " :key="key"> -->
                    <!-- <img src="~@/assets/a08_dsj/shiduxiaxian.png" alt="" style="width: 100%;height: 100%;"> -->
                    <!-- <img :src="item.img" alt="" style="width: 100%;height: 100%;"> -->
                    <!-- </el-carousel-item> -->
                    <!-- </el-carousel> -->
                    <el-carousel :interval="5000" arrow="always" :height="52.5 + 'vh'">
                        <el-carousel-item>
                            <img src="~@/assets/a08_dsj/lunbotu1.png" alt="" style="width: 100%;height: 100%;">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="~@/assets/a08_dsj/lunbotu2.png" alt="" style="width: 100%;height: 100%;">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="~@/assets/a08_dsj/lunbotu3.png" alt="" style="width: 100%;height: 100%;">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <el-col :span="12" style="text-align: center;">
                    <!-- 预警信息饼状图 -->
                    <dv-border-box-8 :dur="15">
                        <el-row class="numberAlarms">
                            <el-col :span="23">
                                <div class="grid-content  ">
                                    <div style="height:5vh;"></div>
                                    <div class="pieChart" id="numberAlarms">
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </dv-border-box-8>
                </el-col>
                <el-col :span="12" style="text-align: center;">
                    <!-- 一年的数据统计 -->
                    <dv-border-box-8 :dur="15">
                        <el-row class="archivalStatistics">
                            <el-col :span="23">
                                <div class="grid-content  ">
                                    <div style="height:5vh;"></div>
                                    <div class="pieChart" id="archivalStatistics">

                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </dv-border-box-8>
                </el-col>
            </el-col>
            <!-- 右侧 -->
            <el-col :span="6">
                <div class="grid-content ">
                    <!-- 空气质量检测数据 -->

                    <el-row>
                        <!-- <el-col :span="1">
                <div class="grid-content  tool"></div>
              </el-col> -->

                        <el-col :span="24">
                            <div class="grid-content  airAssessment">
                                <dv-border-box-8 :dur="15">
                                    <el-row>
                                        <el-col :span="12">
                                            <span
                                                style="width:4vw ;height:5vh;margin-top: 9.4vh;font-size: 2vw;margin-left: 5.5vw;color: aliceblue;display: inline-block;text-align: center;">
                                                {{ airAssessment.pm25 }}</span>
                                            <div
                                                style="width:3vw ;height: 2vh;margin-top: 3vh;font-size: 0.8vw;margin-left: 6vw;color:rgba(98, 121, 230);background-color: rgb(0, 247, 255);border-radius: 5px;text-align: center;line-height: 2vh;">
                                                {{ airAssessment.pm25State }}
                                            </div>
                                            <div
                                                style="color: aliceblue;padding-left: 3vw;font-size: 0.7vw;margin-top: 1vh;">
                                                温度:<span>{{
                                                    airAssessment.temp }}</span>°C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                湿度:<span>{{ airAssessment.hum }}</span>%RH
                                            </div>
                                        </el-col>
                                        <el-col :span="12" style="color: aliceblue;">
                                            <div
                                                style="width:3vw ;height: 2.65vh;margin: 0 auto;margin-top: 7.1vh;text-align: right;font-size: 1vw;">
                                                {{ airAssessment.pm1 }}</div>
                                            <div
                                                style="width:3vw ;height: 2.65vh;margin: 0 auto;text-align: right;font-size: 1vw;">
                                                {{ airAssessment.pm10 }}
                                            </div>
                                            <div
                                                style="width:3vw ;height: 2.65vh;margin: 0 auto;text-align: right;font-size: 1vw;">
                                                {{ airAssessment.so }}
                                            </div>
                                            <div
                                                style="width:3vw ;height: 2.65vh;margin: 0 auto;text-align: right;font-size: 1vw;">
                                                {{ airAssessment.co }}
                                            </div>
                                            <div
                                                style="width:3vw ;height: 2.65vh;margin: 0 auto;text-align: right;font-size: 1vw;">
                                                {{ airAssessment.hcho }}
                                            </div>
                                            <div
                                                style="width:3vw ;height: 2.65vh;margin: 0 auto;text-align: right;font-size: 1vw;">
                                                {{ airAssessment.tvoc }}
                                            </div>
                                        </el-col>
                                    </el-row>
                                </dv-border-box-8>
                            </div>
                        </el-col>

                    </el-row>
                    <!-- 系统运行状态 -->
                    <dv-border-box-8 :dur="15">
                        <el-row style="margin-top: 1vh;">
                            <!-- <el-col :span="1">
                  <div class="grid-content  tool"></div>
                </el-col> -->
                            <el-col :span="24">
                                <div class="grid-content  systemState">
                                    <div class="one left-bottom">
                                        <div class="left-bottom-div"><img class="left-bottom-div-img"
                                                :src="systemState.jiashi" alt=""></div>
                                        <div class="left-bottom-div"><img class="left-bottom-div-img"
                                                :src="systemState.zhileng" alt=""></div>
                                        <div class="left-bottom-div"><img class="left-bottom-div-img"
                                                :src="systemState.xinfeng" alt=""></div>
                                        <div class="left-bottom-div"><img class="left-bottom-div-img"
                                                :src="systemState.chushi" alt=""></div>
                                    </div>
                                    <div class="two left-bottom">
                                        <div class="left-bottom-div"><img class="left-bottom-div-img"
                                                :src="systemState.zhire" alt=""></div>
                                        <div class="left-bottom-div"><img class="left-bottom-div-img"
                                                :src="systemState.jinghua" alt=""></div>
                                        <div class="left-bottom-div"><img class="left-bottom-div-img"
                                                :src="systemState.weichenjinghua" alt=""></div>
                                        <div class="left-bottom-div"><img class="left-bottom-div-img"
                                                :src="systemState.denggunag" alt=""></div>
                                    </div>
                                    <div class="there left-bottom">
                                        <div class="left-bottom-div"><img class="left-bottom-div-img"
                                                :src="systemState.chuanglian" alt=""></div>
                                        <div class="left-bottom-div"><img class="left-bottom-div-img"
                                                :src="systemState.qitijinghua" alt=""></div>
                                        <div class="left-bottom-div"><img class="left-bottom-div-img"
                                                :src="systemState.zhinengpaishui" alt=""></div>
                                        <div class="left-bottom-div"><img class="left-bottom-div-img"
                                                :src="systemState.xiaofangpaoyan" alt=""></div>
                                    </div>
                                    <!-- <el-row class="one">
                                        <el-col :span="6"><img :src="systemState.jiashi" alt=""></el-col>
                                        <el-col :span="6"><img :src="systemState.zhileng" alt=""></el-col>
                                        <el-col :span="6"><img :src="systemState.xinfeng" alt=""></el-col>
                                        <el-col :span="6"><img :src="systemState.chushi" alt=""></el-col>
                                    </el-row>
                                    <el-row class="two">
                                        <el-col :span="6"><img :src="systemState.zhire" alt=""></el-col>
                                        <el-col :span="6"><img :src="systemState.jinghua" alt=""></el-col>
                                        <el-col :span="6"><img :src="systemState.weichenjinghua" alt=""></el-col>
                                        <el-col :span="6"><img :src="systemState.denggunag" alt=""></el-col>
                                    </el-row>
                                    <el-row class="there">
                                        <el-col :span="6"><img :src="systemState.chuanglian" alt=""></el-col>
                                        <el-col :span="6"><img :src="systemState.qitijinghua" alt=""></el-col>
                                        <el-col :span="6"><img :src="systemState.zhinengpaishui" alt=""></el-col>
                                        <el-col :span="6"><img :src="systemState.xiaofangpaoyan" alt=""></el-col>
                                    </el-row> -->
                                </div>
                            </el-col>
                        </el-row>
                    </dv-border-box-8>
                    <!-- 温湿度曲线图 -->
                    <dv-border-box-8 :dur="15">
                        <el-row style="margin-top: 1vh;">
                            <!-- <el-col :span="1">
                  <div class="grid-content  tool"></div>
                </el-col> -->
                            <el-col :span="24">
                                <div class="grid-content  temperatureHumidity">
                                    <div class="pieChart" id="temperatureHumidity"></div>
                                </div>
                            </el-col>
                        </el-row>
                    </dv-border-box-8>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import axios from "axios";
import * as echarts from 'echarts'
import $ from "jquery"

export default {

    data() {
        return {
            timer: "", //定时器
            nowTime: "2023/10/14 11:38:41 星期六",//时间
            timerRefresh: "",
            timerRefreshChart: "",
            isShow: true,
            ///十二感知
            twelvePerceptions: {
                fangshui: "",
                fanghuo: "",
                fangdao: "",
                fanggaowen: "",
                fanggaoshi: "",
                fangchen: "",
                fangfu: "",
                fangguang: "",
                fangzhen: "",
                fanghai: "",
                wenduxiaxian: "",
                shiduxiaxian: "",
            },
            ////系统状态
            systemState: {
                jiashiobj: {
                    on: require("@/assets/a08_dsj/jiashi1.png"),
                    off: require("@/assets/a08_dsj/jiashi.png"),
                },
                jiashi: require("@/assets/a08_dsj/jiashi.png"),
                zhilengobj: {
                    on: require("@/assets/a08_dsj/zhileng1.png"),
                    off: require("@/assets/a08_dsj/zhileng.png"),
                },
                zhileng: require("@/assets/a08_dsj/zhileng.png"),
                xinfengobj: {
                    on: require("@/assets/a08_dsj/xinfeng1.png"),
                    off: require("@/assets/a08_dsj/xinfeng.png"),
                },
                xinfeng: require("@/assets/a08_dsj/xinfeng.png"),
                chushiobj: {
                    on: require("@/assets/a08_dsj/chushi1.png"),
                    off: require("@/assets/a08_dsj/chushi.png"),
                },
                chushi: require("@/assets/a08_dsj/chushi.png"),
                zhireobj: {
                    on: require("@/assets/a08_dsj/zhire1.png"),
                    off: require("@/assets/a08_dsj/zhire.png"),
                },
                zhire: require("@/assets/a08_dsj/zhire.png"),
                jinghuaobj: {
                    on: require("@/assets/a08_dsj/jinghua1.png"),
                    off: require("@/assets/a08_dsj/jinghua.png"),
                },
                jinghua: require("@/assets/a08_dsj/jinghua.png"),
                weichenjinghuaobj: {
                    on: require("@/assets/a08_dsj/weichenjinghua1.png"),
                    off: require("@/assets/a08_dsj/weichenjinghua.png"),
                },
                weichenjinghua: require("@/assets/a08_dsj/weichenjinghua.png"),
                denggunagobj: {
                    on: require("@/assets/a08_dsj/dengguang1.png"),
                    off: require("@/assets/a08_dsj/denggunag.png"),
                },
                denggunag: require("@/assets/a08_dsj/denggunag.png"),
                chuanglianobj: {
                    on: require("@/assets/a08_dsj/chuanglian1.png"),
                    off: require("@/assets/a08_dsj/chuanglian.png"),
                },
                chuanglian: require("@/assets/a08_dsj/chuanglian.png"),
                qitijinghuaobj: {
                    on: require("@/assets/a08_dsj/qitijinghuaOn.png"),
                    off: require("@/assets/a08_dsj/qitijinghua.png"),
                },
                qitijinghua: require("@/assets/a08_dsj/qitijinghua.png"),
                zhinengpaishuiobj: {
                    on: require("@/assets/a08_dsj/zhinengfangshui1.png"),
                    off: require("@/assets/a08_dsj/zhinengpaishui.png"),
                },
                zhinengpaishui: require("@/assets/a08_dsj/zhinengpaishui.png"),
                xiaofangpaoyanobj: {
                    on: require("@/assets/a08_dsj/xiaofangyangan1.png"),
                    off: require("@/assets/a08_dsj/xiaofangpaoyan.png"),
                },
                xiaofangpaoyan: require("@/assets/a08_dsj/xiaofangpaoyan.png"),
            },
            ////空气质量检测
            airAssessment: {
                pm25: "60",
                pm1: "22",
                pm10: "23",
                so: "12",
                co: "123",
                hcho: "32",
                tvoc: "12",
                hum: "60",
                temp: "25",
                pm25State: "优"
            },
            /////轮播图
            images: [
            ],
            ///弹框
            centerDialogVisible: false,
            activeName: 'first',
            form: {
                running: "",
                perceptions: "",
                air: "",
                airText: "",
                ////for循环
                wholeController: [],
            },
            /////轮播图
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            fileList: [],
            carouselImages1: [],
            ////温湿度
            // tempHumTimeData: {}
            temperature: [24, 25, 24, 26, 27, 23, 25],
            temperature1: [],
            humidity: [],
            humidity1: [],
            //////浏览器存储lo
            tool: '192.168.1.45',
            ///////档案
            todayReturn: "",///今日归还
            todayBorrowing: "",///今日借阅
            todayWarehousing: "",///今日入库
            libraryNumber: "",///已上架数量
            borrowingNumber: "",///待归还
            filesMltj: [],/////档案分类饼状图
            //////一年曲线柱状
            aYear: [],///时间轴
            warehousingArr: [],//入库
            reborrowArr: [],//再接
            moreSerious: "0",
            serious: "0",
        }
    },
    computed: {
        computedTime: function () {
            var date = new Date();
            return date.toLocaleTimeString();
        },
        ServeIp() {
            return this.$store.state.user.ServeIp;
        },
        ServePort() {
            return this.$store.state.user.ServePort;
        },

    },
    watch: {
        'carouselImages1'(newPosts) {
            this.carouselImage()
        },
        // 'tempHumTimeData'(newPosts) {
        //   this.curve()
        // },

    },
    mounted() {
        this.overallStatus();
        this.getTime();
        this.cake();
        this.curve();
        this.rotationChart();
        this.obtainController();
        this.files();
        setTimeout(() => {
            this.filesClassification();
            this.aYearFiles();
        }, 30000);
        this.refresh()
    },
    methods: {
        //////获取档案部分信息
        files() {
            this.filesMltj = [];
            this.aYear = [];
            this.reborrowArr = [];
            this.warehousingArr = [];
            axios.get("http://" + this.ServeIp + ":" + this.ServePort + "/GetMainArchData").then(
                success => {
                    for (let index = 0; index < success.data.data.mltj.length; index++) {
                        this.filesMltj.push({
                            name: success.data.data.mltj[index].mlname,
                            value: success.data.data.mltj[index].cn,
                        })
                    }
                    this.todayReturn = success.data.data.jttj[0].ghcn;///今日归还
                    this.todayBorrowing = success.data.data.jttj[0].ckcn;//今日借阅
                    this.todayWarehousing = success.data.data.jttj[0].rkcn;//今日入库
                    // zksl: 在库数量==已上架数量
                    // cksl: 出库数量==待归还
                    this.libraryNumber = success.data.data.zltj[0].zksl //已上架数量
                    this.borrowingNumber = success.data.data.zltj[0].cksl //待归还
                    for (let i = 0; i < 12; i++) {
                        this.aYear.push(success.data.data.bndjytj_hgl[i].month);///时间轴
                        this.reborrowArr.push(success.data.data.bndjytj_hgl[i].cn);//再接
                        this.warehousingArr.push(success.data.data.bndrktj_hgl[i].cn);//入库
                    }
                },
                error => {
                    console.log(error, '获取库房列表接口--返回失败的数据');
                })
        },
        ////////获取档案分类
        filesClassification() {
            if (document.getElementById("daflpiechartContent") == null) {
                return
            }
            echarts.dispose(document.getElementById("daflpiechartContent"))
            const myChart = echarts.init(document.getElementById("daflpiechartContent"));
            let datas = this.filesMltj;
            var option = {
                backgroundColor: '',
                color: ["#F09615", "#93DB70", "#00FF00", "#03b915", "#F56463", "#FF2400"],
                title: { // 圆环标题
                    text: '', // 主标题
                    textStyle: { // 主标题样式
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 30
                    },
                    left: '24%', // 定位到适合的位置
                    top: '46%', // 定位到适合的位置
                    subtext: ``, // 副标题
                    subtextStyle: { // 副标题样式
                        color: '#fff',
                        fontSize: 26,
                        fontWeight: 'bold'
                    },
                    textAlign: 'center' // 主、副标题水平居中显示
                },
                legend: {
                    itemHeight: 10,
                    itemWidth: 10,
                    icon: "rect",
                    orient: "vertical",
                    top: "center",
                    right: "5%",
                    textStyle: {
                        align: "left",
                        color: "#",
                        verticalAlign: "middle",
                        rich: {
                            name: {
                                width: 120,
                                fontSize: 22,
                            },
                            value: {
                                width: 40,
                                align: "right",
                                fontFamily: "Medium",
                                fontSize: 22,
                            },
                            rate: {
                                width: 0,
                                align: "right",
                                fontSize: 26,
                            },
                        },
                    },
                    data: datas,
                    formatter: (name) => {
                        if (datas.length) {
                            const item = datas.filter((item) => item.name === name)[0];
                            return `{name|${name}}{value| ${item.value}} {rate| }`;
                        }
                    },
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{d}%",
                },
                series: [
                    {
                        name: "",
                        type: "pie",
                        radius: ["30%", "80%"],
                        center: ["35%", "50%"],
                        roseType: "radius",
                        label: {
                            formatter: "{d}%",
                        },
                        labelLine: {
                            length: 1,
                            length2: 20,
                        },
                        data: datas,
                    },
                ],
            };
            myChart.setOption(option);
        },
        /////一年中的再接和出库
        aYearFiles() {
            if (document.getElementById("archivalStatistics") == null) {
                return
            }
            echarts.dispose(document.getElementById("archivalStatistics"))
            const myChart = echarts.init(document.getElementById("archivalStatistics"));
            var option = {
                backgroundColor: '',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    textStyle: {
                        fontSize: 28,
                    },
                    backgroundColor: "rgba(255,255,255,1)",
                    extraCssText: "box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.3);",
                },
                grid: {
                    top: '15%',
                    left: '3%',
                    right: '3%',
                    bottom: '5%',
                    containLabel: true,
                },
                legend: {
                    show: true,
                    x: 'center',
                    itemGap: 30,
                    itemWidth: 20,
                    data: [
                        {
                            name: '入库统计',
                            icon: 'react',
                            textStyle: {
                                fontSize: 22,
                                color: '#ECF7FF'
                            },
                            itemStyle: {
                                color: '#09BFF1'
                            }
                        },
                        {
                            name: '在借统计',
                            textStyle: {
                                fontSize: 22,
                                color: '#ECF7FF'
                            },
                            itemStyle: {
                                fontSize: 22,
                                color: '#F9DF2B'
                            }
                        }
                    ],
                },
                xAxis: [{
                    data: this.aYear,//时间轴
                    axisLabel: {
                        color: "#A1BADF",
                        fontSize: 22,
                        interval: 'auto', // x轴间距
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(152, 212, 255, .1)',
                        }
                    }
                }],
                yAxis: [
                    {
                        type: 'value',
                        name: "单位/个",
                        nameGap: '30',
                        axisLabel: {
                            show: true,
                            fontSize: 22,
                            color: "#A1BADF",
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(152, 212, 255, .1)',
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(152, 212, 255, .1)',
                            }
                        },
                        name: '(单位/个)',
                        nameTextStyle: {
                            color: "#A1BADF",
                            fontWeight: 400,
                            fontSize: 12,
                        },
                    },
                ],
                series: [{
                    name: '入库统计',
                    yAxisIndex: 0,
                    type: 'bar',
                    barWidth: 10,
                    data: this.warehousingArr,
                    showBackground: true,
                    backgroundStyle: {
                        color: "rgba(12, 72, 167, 0.3)"
                    },
                    label: {
                        show: false,
                        position: "top",
                        color: "#00A8FF",

                    },
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: -0.2,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#0599FF'
                                    },
                                    {
                                        offset: 1,
                                        color: '#77E9FF'
                                    }
                                ]
                            },
                            barBorderRadius: [2, 2, 0, 0]
                        }
                    }
                },
                {
                    name: '在借统计',
                    type: 'line',
                    data: this.reborrowArr,
                    showSymbol: true,
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        color: '#F9DF2B'
                    },
                    itemStyle: {
                        color: '#F9DF2B'
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: -0.2,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(255, 230, 0, 0.54)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(255, 230, 0, 0)'
                                }
                            ]
                        }
                    }
                }, {
                    type: "pictorialBar",
                    symbol: "react",
                    symbolSize: [20, 8],
                    symbolOffset: [0, -15],
                    z: 12,
                    itemStyle: {
                        color: "#6FE3FF",
                    },
                    // data: getSymbolData(yData)
                }]
            };

            myChart.setOption(option);
        },
        /////北京时间
        getTime() {
            this.timer = setInterval(() => {
                let timeDate = new Date();
                let year = timeDate.getFullYear();
                let mounth = timeDate.getMonth() + 1;
                let day = timeDate.getDate();
                let hours = timeDate.getHours();
                hours = hours >= 10 ? hours : "0" + hours;
                let minutes = timeDate.getMinutes();
                minutes = minutes >= 10 ? minutes : "0" + minutes;
                let seconds = timeDate.getSeconds();
                seconds = seconds >= 10 ? seconds : "0" + seconds;
                let week = timeDate.getDay();
                let weekArr = [
                    "星期日",
                    "星期一",
                    "星期二",
                    "星期三",
                    "星期四",
                    "星期五",
                    "星期六",
                ];

                this.nowTime = `${year}/${mounth}/${day} ${hours}:${minutes}:${seconds} ${weekArr[week]}`
            }, 1000);
        },
        //////每60秒调取一次环境数据
        refresh() {
            this.timerRefresh = setInterval(() => {
                this.overallStatus();
                this.files();
                this.cake();
                this.curve();
                setTimeout(() => {
                    this.filesClassification();
                    this.aYearFiles();
                }, 30000);
                // this.filesClassification();
                // this.aYearFiles();
            }, 60000);
        },
        ///////每6小时刷新一次预警和温湿度
        refreshChart() {
            this.timerRefreshChart = setInterval(() => {

            }, 21600000);
        },
        /////预警饼状图
        cake() {
            this.moreSerious = "0";
            this.serious = "0";
            axios.get("http://" + this.ServeIp + ":" + this.ServePort + "/bigData/getAlarmCount").then(
                success => {
                    if (success.data.data?.moreSeriousAlarm == undefined) {
                        this.moreSerious = "0"
                        console.log("我进入预警状态------------------------------");
                    } else {
                        this.moreSerious = success.data.data.moreSeriousAlarm
                        console.log("我进入预警状态+++++++++++++", this.moreSerious);
                    }
                    if (success.data.data?.seriousnessAlarm == undefined) {
                        this.serious = "0"
                    } else {
                        this.serious = success.data.data.seriousnessAlarm
                    }
                    setTimeout(() => {
                        if (document.getElementById("numberAlarms") == null) {
                            return
                        }
                        echarts.dispose(document.getElementById("numberAlarms"))
                        const myChart = echarts.init(document.getElementById("numberAlarms"));
                        let data = [
                            { value: this.serious, name: '严重' },
                            { value: this.moreSerious, name: '较重' },
                        ]
                        console.log(this.serious, this.moreSerious);
                        var option = {
                            tooltip: {
                                show: true,
                            },
                            textStyle: { // 主标题样式
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 30
                            },
                            legend: {
                                type: 'scroll',
                                top: 'middle',
                                right: '20%',
                                icon: 'rect',
                                itemWidth: 10,
                                itemHeight: 10,
                                pageIconColor: '#00EBFF',
                                pageIconInactiveColor: 'rgba(0, 235, 255, 0.4)',
                                pageTextStyle: {
                                    color: '#FFF',
                                },
                                textStyle: {
                                    color: '#333',
                                    //图例样式修改
                                    rich: {
                                        name: {
                                            width: 60,
                                            fontSize: 22,
                                            fontWeight: 500,
                                            align: 'left',
                                        },
                                        value: {
                                            width: 20,
                                            //  color: '#FFF',
                                            fontSize: 22,
                                            fontWeight: 500,
                                            align: 'left',
                                        },
                                        rate: {
                                            width: 30,
                                            align: 'left',
                                            fontSize: 22,
                                            //  color: '#FFF',
                                        },
                                    },
                                },
                                //自定义legend图例
                                formatter: function (name) {
                                    let total = 0
                                    let target
                                    for (let i = 0; i < data.length; i++) {
                                        total += data[i].value
                                        if (data[i].name === name) {
                                            target = data[i].value
                                        }
                                    }
                                    var arr = [
                                        '{name|' + name + '}',
                                        '{value|' + target + '}',
                                        // '{rate|' + ((target / total) * 100).toFixed(2) + '%}'
                                    ]
                                    return arr.join('  ')
                                },
                                orient: 'vertical',
                                data: ['严重', '较重',],
                            },
                            color: ['#0d53d5', '#f9a809', '#4dfaf7'],
                            series: {
                                name: '',
                                type: 'pie',
                                hoverAnimation: false,
                                center: ['35%', '50%'],
                                radius: ['35%', '50%'],
                                data: data,
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                labelLine: {
                                    normal: {
                                        show: false,
                                    },
                                },
                            },
                        };

                        myChart.setOption(option);
                    }, 3000);
                },
                error => {
                    console.log(error, '获取库房列表接口--返回失败的数据');
                })

        },
        /////曲线图
        // //曲线时间
        // tempHumTime() {
        //   this.tempHumTimeData = {}
        //   axios.get("http://" + this.ServeIp + ":" + this.ServePort + "/bigData/getBigDataSetting", {}).then(
        //     success => {
        //       this.tempHumTimeData = {
        //         "ip": success.data.data.airIp,
        //         "deviceNo": success.data.data.number
        //       }
        //     },
        //     error => {
        //       console.log(error, '获取库房列表接口--返回失败的数据');
        //     })
        // },
        curve() {
            // if (this.tempHumTimeData == undefined || this.tempHumTimeData == null) {
            //   return
            // }
            ///////获取近七天日期
            const arr = []
            for (let i = 0; i < 7; i++) {
                const startDate = new Date();
                startDate.setTime(startDate.getTime() - i * 24 * 60 * 60 * 1000);
                const month = startDate.getMonth() + 1 + "-" + startDate.getDate();
                arr.unshift(month)
            }
            ////////温湿度数组
            let indata = {
                "ip": this.tool,
                "deviceNo": 1
            }
            let temperature = [];
            let humidity = [];
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/bigData/getHumiture", indata).then(
                success => {
                    for (let i = 0; i < 7; i++) {
                        if (success.data.data[i]?.temp == undefined) {
                            temperature.unshift(0)
                        } else {
                            temperature.unshift(Number(success.data.data[i].temp))
                        }
                        if (success.data.data[i]?.hum == undefined) {
                            humidity.unshift(0)
                        } else {
                            humidity.unshift(Number(success.data.data[i].hum))
                        }
                    }
                    setTimeout(() => {
                        if (document.getElementById("temperatureHumidity") == null) {
                            return
                        }
                        echarts.dispose(document.getElementById("temperatureHumidity"))
                        const myChart = echarts.init(document.getElementById("temperatureHumidity"));
                        // const labels = arr;
                        var option = {
                            backgroundColor: '',
                            title: {
                                text: "",
                                top: 10,
                                left: 15,
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 26,
                                    fontWeight: 'normal'
                                }
                            },
                            tooltip: {
                                trigger: 'axis',
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                top: 60,
                                containLabel: true
                            },
                            legend: {
                                icon: 'rect',
                                right: "4%",
                                top: 13,
                                itemWidth: 20,
                                itemHeight: 10,
                                data: ['温度', '湿度'],
                                textStyle: {
                                    color: '#fff'
                                },
                            },
                            xAxis: {
                                type: 'category',
                                data: arr,
                                axisLabel: {          //坐标轴字体颜色
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 22,
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: "#fff",
                                        fontSize: 22,
                                    }
                                },
                                axisTick: {       //y轴刻度线
                                    show: true
                                },
                                splitLine: {    //网格
                                    show: false,
                                },
                                boundaryGap: false,
                            },
                            yAxis: {
                                type: 'value',
                                axisLabel: {        //坐标轴字体颜色
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 22,
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#fff',
                                        type: "dashed",
                                        fontSize: 22,
                                    }
                                },
                                axisTick: {       //y轴刻度线
                                    show: true
                                },
                                splitLine: {    //网格
                                    show: false,
                                    lineStyle: {
                                        color: '#fff',
                                        type: "dashed"
                                    }
                                }
                            },

                            series: [{
                                name: '温度',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 8,
                                itemStyle: {
                                    color: "rgb(187, 155, 92)",
                                    borderColor: "#fff",
                                    borderWidth: 2,
                                    shadowColor: 'rgba(0, 0, 0, .3)',
                                },
                                lineStyle: {
                                    normal: {
                                        color: "rgb(187, 155, 92)",
                                        shadowColor: 'rgba(187, 155, 92, .4)',
                                        shadowBlur: 8,
                                        shadowOffsetY: 10,
                                        shadowOffsetX: 0,
                                    },
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(187, 155, 92, .4)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(187, 155, 92, 0)'
                                        }]),
                                    }
                                },
                                data: temperature,

                                // data: [24, 25, 24, 26, 27, 23, 25],
                            }, {
                                name: '湿度',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 8,
                                itemStyle: {
                                    color: "rgb(55, 200, 143)",
                                    borderColor: "#fff",
                                    borderWidth: 1,
                                },
                                lineStyle: {
                                    normal: {
                                        color: "rgb(55, 200, 143)",
                                        shadowColor: 'rgba(55, 200, 143, .4)',
                                        shadowBlur: 8,
                                        shadowOffsetY: 10,
                                        shadowOffsetX: 0,
                                    },
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(55, 200, 143, .4)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(55, 200, 143, 0)'
                                        }]),
                                    }
                                },
                                data: humidity,
                                // data: [55, 57, 56, 55, 54, 55, 55],
                            }]
                        };
                        myChart.setOption(option);
                    }, 3000);
                },
                error => {
                    console.log(error, '获取库房列表接口--返回失败的数据');
                })

            // let temperature1 = temperature.map(Number).reverse()
            // let humidity1 = humidity.map(Number).reverse()
            // console.log(temperature, humidity,this.temperature,arr);


        },
        /////获取控制器总状态
        overallStatus() {
            this.tool = localStorage.getItem('ip')
            console.log(localStorage.getItem('running'));
            if (localStorage.getItem('running') == 'null' || localStorage.getItem('running') == undefined) {
                this.form.running = ''
            } else {
                this.form.running = localStorage.getItem('running')
            }
            const jsonData = {
                "ip": this.tool,
            }
            let inData = {
                "cmd": 60001,
                "localip": "127.0.0.1",
                "hostname": "10.168.1.39",
                "port": "8066",
                "method": "UnmannedKFPTService/getTotalRunState",
                "jsonin": { "ip": this.tool }
            }
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/KFPTService/getRfid", inData).then(
                // axios.post('http://127.0.0.1:8006/UnmannedKFPTService/getTotalRunState', jsonData).then(
                success => {
                    console.log(success.data)
                    if (success.data.flag == '1') {
                        success.data.data.SRFCSZT[0].FS == 0 ? this.twelvePerceptions.fangshui = false : this.twelvePerceptions.fangshui = true
                        success.data.data.SRFCSZT[0].FH == 0 ? this.twelvePerceptions.fanghuo = false : this.twelvePerceptions.fanghuo = true
                        success.data.data.SRFCSZT[0].FD == 0 ? this.twelvePerceptions.fangdao = false : this.twelvePerceptions.fangdao = true
                        success.data.data.SRFCSZT[0].WD == 1 ? this.twelvePerceptions.fanggaowen = true : this.twelvePerceptions.fanggaowen = false
                        success.data.data.SRFCSZT[0].SD == 1 ? this.twelvePerceptions.fanggaoshi = true : this.twelvePerceptions.fanggaoshi = false
                        success.data.data.SRFCSZT[0].FC == 0 ? this.twelvePerceptions.fangchen = false : this.twelvePerceptions.fangchen = true
                        success.data.data.SRFCSZT[0].FF == 0 ? this.twelvePerceptions.fangfu = false : this.twelvePerceptions.fangfu = true
                        success.data.data.SRFCSZT[0].FG == 0 ? this.twelvePerceptions.fangguang = false : this.twelvePerceptions.fangguang = true
                        success.data.data.SRFCSZT[0].FZ == 0 ? this.twelvePerceptions.fangzhen = false : this.twelvePerceptions.fangzhen = true
                        success.data.data.SRFCSZT[0].FHai == 0 ? this.twelvePerceptions.fanghai = false : this.twelvePerceptions.fanghai = true
                        success.data.data.SRFCSZT[0].WD == 2 ? this.twelvePerceptions.wenduxiaxian = true : this.twelvePerceptions.wenduxiaxian = false
                        success.data.data.SRFCSZT[0].SD == 2 ? this.twelvePerceptions.shiduxiaxian = true : this.twelvePerceptions.shiduxiaxian = false
                        success.data.data.HKYXZT[0].JSZZT == 1 ? this.systemState.jiashi = this.systemState.jiashiobj.on : this.systemState.jiashi = this.systemState.jiashiobj.off;
                        success.data.data.HKYXZT[0].ZLZZT == 1 ? this.systemState.zhileng = this.systemState.zhilengobj.on : this.systemState.zhileng = this.systemState.zhilengobj.off;
                        success.data.data.HKYXZT[0].XFZZT == 1 ? this.systemState.xinfeng = this.systemState.xinfengobj.on : this.systemState.xinfeng = this.systemState.xinfengobj.off;
                        success.data.data.HKYXZT[0].CSZZT == 1 ? this.systemState.chushi = this.systemState.chushiobj.on : this.systemState.chushi = this.systemState.chushiobj.off;
                        success.data.data.HKYXZT[0].ZRZZT == 1 ? this.systemState.zhire = this.systemState.zhireobj.on : this.systemState.zhire = this.systemState.zhireobj.off;
                        success.data.data.HKYXZT[0].JHZZT == 1 ? this.systemState.jinghua = this.systemState.jinghuaobj.on : this.systemState.jinghua = this.systemState.jinghuaobj.off;
                        success.data.data.HKYXZT[0].WCJHZZT == 1 ? this.systemState.weichenjinghua = this.systemState.weichenjinghuaobj.on : this.systemState.weichenjinghua = this.systemState.weichenjinghuaobj.off;
                        success.data.data.HKYXZT[0].DKZZT == 1 ? this.systemState.denggunag = this.systemState.denggunagobj.on : this.systemState.denggunag = this.systemState.denggunagobj.off;
                        success.data.data.HKYXZT[0].CLZZT == 1 ? this.systemState.chuanglian = this.systemState.chuanglianobj.on : this.systemState.chuanglian = this.systemState.chuanglianobj.off;
                        success.data.data.HKYXZT[0].QTJHZZT == 1 ? this.systemState.qitijinghua = this.systemState.qitijinghuaobj.on : this.systemState.qitijinghua = this.systemState.qitijinghuaobj.off;
                        success.data.data.HKYXZT[0].ZNPSZZT == 1 ? this.systemState.zhinengpaishui = this.systemState.zhinengpaishuiobj.on : this.systemState.zhinengpaishui = this.systemState.zhinengpaishuiobj.off;
                        success.data.data.HKYXZT[0].XFPYZZT == 1 ? this.systemState.xiaofangpaoyan = this.systemState.xiaofangpaoyanobj.on : this.systemState.xiaofangpaoyan = this.systemState.xiaofangpaoyanobj.off;
                        this.airAssessment.pm25 = success.data.data.HKYXZT[0].pm2_5
                        this.airAssessment.pm1 = success.data.data.HKYXZT[0].pm1
                        this.airAssessment.pm10 = success.data.data.HKYXZT[0].pm10
                        this.airAssessment.so = success.data.data.HKYXZT[0].SO2
                        this.airAssessment.co = success.data.data.HKYXZT[0].CO2
                        this.airAssessment.hcho = success.data.data.HKYXZT[0].HCHO
                        this.airAssessment.tvoc = success.data.data.HKYXZT[0].TVOC
                        this.airAssessment.hum = success.data.data.HKYXZT[0].Hum
                        this.airAssessment.temp = success.data.data.HKYXZT[0].Temp
                        if (success.data.data.HKYXZT[0].pm2_5 >= 0 && success.data.data.HKYXZT[0].pm2_5 < 35) {
                            this.airAssessment.pm25State = "优"
                        } else if (success.data.data.HKYXZT[0].pm2_5 > 35 && success.data.data.HKYXZT[0].pm2_5 < 75) {
                            this.airAssessment.pm25State = "良好"
                        } else if (success.data.data.HKYXZT[0].pm2_5 > 75 && success.data.data.HKYXZT[0].pm2_5 < 115) {
                            this.airAssessment.pm25State = "轻度"
                        } else if (success.data.data.HKYXZT[0].pm2_5 > 115 && success.data.data.HKYXZT[0].pm2_5 < 150) {
                            this.airAssessment.pm25State = "重度"
                        }
                    }
                    else {
                        this.$message.error(success.data.msg);
                    }
                },
                error => {
                    console.log(error, '获取库房列表接口--返回失败的数据');
                })
        },
        /////轮播图
        rotationChart() {
            const indata = [
                "carouselImage"
            ]
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/custom/getMulti", indata).then(
                success => {
                    if (success.data.code == 200) {
                        for (const inde in success.data.data[0].content.split("-")) {
                            this.images.push(
                                {
                                    // img: "https://www.baidu.com/img/flexible/logo/pc/result.png",
                                    img: "http://" + this.ServeIp + ":" + this.ServePort + "/image/get?fileName=" + success.data.data[0].content.split("-")[inde] + "",
                                }
                            )
                        }
                    }
                },
                error => {

                }
            )
        },
        /////弹框中的标签页
        handleClick(tab, event) {
            console.log(tab, event);
        },
        ////获取全部的控制器ip并以此为条件配置十二防,系统运行状态,空气的数据获取
        obtainController() {
            const inData = {
                acLx: 0,
                StoreId: 0,
            }
            // console.log(ip1, x, y, 'dsghsssdbdjshfsbhfj');
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetACSDataByStoreId", inData).then(
                success => {
                    const arr = [];
                    for (let index = 0; index < success.data.data.length; index++) {
                        arr[index] =
                        {
                            "val": success.data.data[index].aclx,
                            "acid": success.data.data[index].acid,
                            "name": success.data.data[index].acname,
                            "ip": success.data.data[index].hostname,
                        }
                    }
                    this.form.wholeController = arr
                },
                error => {
                    // console.log(error, '获取库房列表接口--返回失败的数据');
                })
        },
        //////控制器提交
        okk() {
            // console.log(this.form.running,'this.form.running11111111111111111111')
            localStorage.setItem('ip', this.form.running.split("/")[0])
            // console.log(this.form.running,'this.form.running222222222222222222222')
            localStorage.setItem('running', this.form.running)
            this.open2();
            this.overallStatus();
            this.curve();

            // console.log(this.form.running);
            // let areaIp = "";
            // let preventIp = "";
            // let unmannedIp = "";
            // this.form.running.split("/")[1] == 1 ? unmannedIp = this.form.running.split("/")[0] : this.form.running.split("/")[1] == 2 ? preventIp = this.form.running.split("/")[0] : areaIp = this.form.running.split("/")[0];
            // this.form.perceptions.split("/")[1] == 1 ? unmannedIp = this.form.perceptions.split("/")[0] : this.form.perceptions.split("/")[1] == 2 ? preventIp = this.form.perceptions.split("/")[0] : areaIp = this.form.perceptions.split("/")[0];
            // const inData = {
            //   "areaIp": areaIp,
            //   "preventIp": preventIp,
            //   "unmannedIp": unmannedIp,
            //   "airIp": this.form.air.split("/")[1],/////云测
            //   "number": this.form.airText,//////云测序号
            //   "systemRunStateDatasource": this.form.running.split("/")[1],//系统123
            //   "twelvePreventDatasource": this.form.perceptions.split("/")[1],//十二123
            // }
            // console.log(inData);
            // axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/bigData/updateSetting", inData).then(
            //   success => {
            //     if (success.data.code == 200) {
            //       this.open2();
            //     }
            //   },
            //   error => {
            //     // console.log(error, '获取库房列表接口--返回失败的数据');
            //   })
        },
        /////成功弹窗消息
        open2() {
            this.$message({
                message: '配置成功',
                type: 'success'
            });
        },
        open4() {
            this.$message.error('错了哦，这是一条错误消息');
        },
        ////获取轮播图并显示
        handleRemove(file, fileList) {
            this.fileList = [];
            this.fileList = fileList
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },
        submitUpload() { //轮播图保存按钮
            const formData = new FormData()
            for (let i = 0; i < this.fileList.length; i++) {
                formData.append('files', this.fileList[i].raw)
            }
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/bigData/uploadCarouselImage", formData).then(
                success => {
                    this.carouselImages1 = success.data.data
                },
                error => {
                    // console.log(error, '获取库房列表接口--返回失败的数据');
                })

        },
        handleChange(file, fileList) {
            this.fileList = fileList
        },
        handlePreview() {
            console.log("handlePreview");
        },
        beforeRemove(file) {
            // console.log(file.raw);
        },
        handleExceed() { },
        handleRequest(params) {
            try {
                this.loading = true
                let file = params.file
                const data = new FormData()
                data.append('file', file)
                data.append('type', 4)
                // 文件上传接口
                console.log(data);
                addEditEquipment.upload(data).then((res) => {
                    this.loading = false
                    this.imageUrl = res.fileUrl
                })
            } catch (error) {
                console.log('文件上传失败' + JSON.stringify(error))
            } finally {
                this.loading = false
            }
        },
        carouselImage() {//同步获取轮播图上传返回来的数据,存到数据库,并进行提示和刷新轮播图图片
            const indata = [{
                name: "carouselImage",
                content: this.carouselImages1
            }]
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + '/custom/addMulti', indata).then(
                success => {
                    if (success.data.code = 200) {
                        this.fileList = []
                        this.images = []
                        this.open2();
                        this.rotationChart()
                    } else {
                        this.open4()
                    }
                },
                error => {
                    // console.log(error, '获取库房列表接口--返回失败的数据');
                })
        }
    }

};
</script>
<style lang="less">
/* 轮播图 */
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

// 今天入库
.today {
    height: 12vh;
    color: #00f9fe;

    .toolDiv {
        height: 8.5vh;
        // line-height: 8.5vh;
        // font-size: 2.5vh;
        line-height: 4.5vh;
        font-size: 1.2vh;
    }

    .one {
        background-image: url('~@/assets/a08_dsj/ones.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .two {
        background-image: url('~@/assets/a08_dsj/twos.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .there {
        background-image: url('~@/assets/a08_dsj/theres.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}


.carousel {
    margin-top: 0vh;
}

ul {
    list-style: none;
}

/*大数据全局样式 */
.indedede {
    z-index: 1;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-image: url('~@/assets/a08_dsj/bg.png');
    background-repeat: no-repeat;
    background-size: 100%;
}

/* 隐藏公共组件左侧菜单栏 */
.admin {
    display: none;
}

/* 大数据的头部样式 */
.cDHeader {
    height: 6vh;
    color: #fff;

    .time {
        font-size: 0.7vw;
        text-align: right;
        position: relative;
        top: 1.6vh;
        right: 1.2vh;
    }

    .cDTitle {
        font-size: 2vw;
        text-align: center;
        position: relative;
        top: 0.5vh;
    }

    .goHome {
        font-size: 0.7vw;
        position: relative;
        top: 1.3vh;
        left: 1.8vw;
    }
}

/* 档案分类饼状图 */
.daflpiechart {
    width: 96%;
    height: 44vh;
    background-image: url('~@/assets/a08_dsj/daflpiechart.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0 0 0 0.8vw;

    .daflpiechartContent {
        height: 20.5vh;

    }

    .toolDiv {
        text-align: center;
        height: 17.5vh;
        line-height: 17.5vh;
        color: #fff;
    }


}

/* 十二防 */
.twelvePerceptions {
    width: 100%;
    height: 47vh;
    background-image: url('~@/assets/a08_dsj/twelve.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0 0 0 0.8vw;

    .one {
        padding-top: 10vh;
    }

    .two {
        padding-top: 1vh;
    }

    .there {
        padding-top: 1vh;
    }
}

/* 预警 */
.numberAlarms {
    width: 100%;
    height: 27vh;
    background-image: url('~@/assets/a08_dsj/yujingcishu.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 2vh;
    padding: 0 0 0 0.8vw;

    .pieChart {
        width: 100%;
        height: 21vh;
        // background-color: #00f9fe;
    }
}

.tool {
    width: 100%;
    height: 24vh;
    padding: 0 0 0 0.8vw;
}

// 档案统计柱状曲线图
.archivalStatistics {
    width: 100%;
    height: 27vh;
    background-image: url('~@/assets/a08_dsj/archivalStatistics.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 2vh;
    padding: 0 0 0 0.8vw;

    .pieChart {
        width: 100%;
        height: 21vh;
        // background-color: #00f9fe;
    }
}

/* 云测 */
.airAssessment {
    width: 100%;
    height: 24vh;
    background-image: url('~@/assets/a08_dsj/yunceyi1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* margin: 0 0 0 0.8vw; */


}

/* 系统状态 */
.systemState {
    width: 100%;
    height: 34vh;
    background-image: url('~@/assets/a08_dsj/xitongyunxingzhuangtai.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* margin: 0 0 0 0.8vw; */
    /* margin-top: 1vh; */
    padding-top: 6.5vh;

    .one {
        /* padding-top: 6.5vh; */
        text-align: center;
        height: 11vh;
    }

    .two {
        padding-top: 0.1vh;
        text-align: center;
        height: 11vh;
    }

    .there {
        padding-top: 0.1vh;
        text-align: center;
        height: 11vh;
    }
}

/* 温湿度 */
.temperatureHumidity {
    width: 100%;
    height: 27vh;
    background-image: url('~@/assets/a08_dsj/wenshiduquxian.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* margin: 0 0 0 0.8vw; */
    /* margin-top: 1vh; */

    .pieChart {
        width: 100%;
        height: 23vh;
        padding-top: 4vh;
    }

}


.left-bottom {
    display: flex;
    justify-content: space-evenly;

    .left-bottom-div {
        width: 22%;

        .left-bottom-div-img {
            width: 100%;
        }
    }
}

.toolDiv-danganzongliang {
    font-size: 1.3vw;
}</style>
  