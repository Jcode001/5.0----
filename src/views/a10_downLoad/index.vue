<template >
    <div>
        <div class="header">
            <h2 contenteditable="true">安装包管理</h2>
        </div>
        <div style="width:3vw;height:26vw"></div>
        <el-button type="success" @click="download('PDC.apk')">点击下载盘点车</el-button>
        <div style="margin-top:1vw;">
            <el-button type="success" @click="download('SCJ.apk')">点击下载手持机</el-button>
        </div>
        <div style="margin-top:1vw;">
            <el-button type="success" @click="download('TDM.apk')">点击下载通道门</el-button>
        </div>
        <div style="margin-top:1vw;">
            <el-button type="success" @click="download('YYHC.apk')">点击下载语音合成</el-button>
        </div>
        <div style="margin-top:1vw;">
            <el-button type="success" @click="download('YYYQ.apk')">点击下载语音引擎</el-button>
        </div>
        <div style="margin-top:1vw;">
            <el-button type="primary" @click="download('demo.apk')">通用APK包下载</el-button>
        </div>
        <div style="margin-top:1vw;">
            <el-button type="warning" @click="download('Demo_V0.15.0.0_.zip')">Demo_V0.15.0.0_.zip</el-button>
        </div>
        <div>
        </div>
        <!-- <div class="container">
            <div class="card">
                <div class="img-box">
                    <img style="height:13vw;width:7vw;margin-left:3.5vw;" src="../../assets/downLoad/PDC.png" alt="">
                </div>
                <div class="text-box">
                    <h2>RFID智能净化盘点车</h2>
                    <p>大屏触控，避免误触，无需使用放大镜查看盘点内容；净由源起，移动引起的灰尘，被直接在底部净化；
                        宽口式读取，提高盘点效率，读取精准率>99.9%；通过RFID技术，实现档案实物电子化标识。</p>
                    <el-button type="success" @click="download('PDC.apk')">点击下载</el-button>
                </div>
            </div>
            <div class="card">
                <div class="img-box">
                    <img src="../../assets/downLoad/SCJ.png" alt="">
                </div>
                <div class="text-box">
                    <h2>RFID智能手持机</h2>
                    <p>实现档案不移动、不打开的情况，实现快速盘点；实现定位到盒、定位到层、无序摆放、有序管理；
                        与密集架互联互通，实现档案快速、精准查找与定位；简化档案借阅流程，实现借阅归还无接触消毒净化。</p>

                    <el-button type="success" @click="download('SCJ.apk')">点击下载</el-button>
                </div>
            </div>
            <div class="card">
                <div class="img-box">
                    <img src="../../assets/downLoad/TDM.png" alt="">
                </div>
                <div class="text-box">
                    <h2>智能通道门</h2>
                    <p>RFID通道门采用超高频RFID射频技术，实现与RFID标签进行快速、批量识别。智能安全门禁外型简洁大气，质量稳定、性能可靠，支持多标签读取
                        ，采用红外触发读取模式，支持进出人数统计，集成声光报警为一体。</p>
                    <el-button type="success" @click="download('TDM.apk')">点击下载</el-button>
                </div>
            </div>
            <div class="card">
                <div class="img-box">
                    <img src="../../assets/downLoad/YYHC.png" alt="">
                </div>
                <div class="text-box">
                    <h2>语音合成.apk</h2>
                    <p>盘点车、工作站等RFID软件实现语音提示功能；</p>
                    <el-button type="success" @click="download('YYHC.apk')">点击下载</el-button>
                </div>
            </div>
            <div class="card">
                <div class="img-box">
                    <img src="../../assets/downLoad/YYHC.png" alt="">
                </div>
                <div class="text-box">
                    <h2>语音引擎.apk</h2>
                    <p>盘点车、工作站等RFID软件实现语音提示功能；</p>
                    <el-button type="success" @click="download('YYYQ.apk')">点击下载</el-button>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {}
    },
    methods: {
        download(name) {
        var fileName = name;
        console.log(fileName, 'fileNamefileName');
        const fileUrl = '/' + fileName; // 文件的URL地址
        console.log(fileUrl, 'fileUrl');
        axios.get(fileUrl, { responseType: 'blob' })
            .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            })
            .catch(error => {
            console.error(error,'eroor');
            this.$message.error("请检查安装包是否存在public文件夹下")
            });
        },
    }
}
</script>
<style>
.header{
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-reflect: below 1px linear-gradient(transparent,rgba(0,0,0,0.2));
    height:2vw;
    margin-top: 1vw;
}
.header h2{
    color: rgb(0, 0, 0);
    font-size: 2vw;
    letter-spacing: 15px;
    text-transform: uppercase;
    text-align: center;
    line-height: 4.5vw;
    outline: none;
    --c:rgb(49, 76, 75);
    text-shadow: 0 0 10px var(--c),
    0 0 20px var(--c),
    0 0 40px var(--c),
    0 0 80px var(--c),
    0 0 160px var(--c);
    animation: animate1 5s linear infinite;
}
@keyframes animate1 {
    to{
        /* 色相旋转滤镜（设置度数可改变颜色） */
        filter: hue-rotate(360deg);
    }
}
.container {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            /* 允许换行 */
            flex-wrap: wrap;
        }
        .container .card {
            position: relative;
            max-width: 300px;
            height: 215px;
            background-color: #fff;
            margin: 0 15px;
            padding: 0 5px;
            border-radius: 5px;
            /* 阴影 */
            box-shadow: 0 5px 200px rgba(0, 0, 0, 0.5);
            /* 动画过渡 */
            transition: 0.3s ease-in-out;
        }

        .container .card:hover {
            height: 25vw;
        }

        .container .card .img-box {
            position: relative;
            width: 260px;
            height: 260px;
            border-radius: 5px;
            /* 溢出隐藏 */
            overflow: hidden;
            top: -60px;
            left: 20px;
            /* 阴影 */
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 1;
        }

        .container .card .img-box img {
            width: 100%;
        }

        .container .card .text-box {
            position: relative;
            margin-top: -140px;
            padding: 10px 15px;
            text-align: center;
            color: #111;
            /* 设置元素不可见 */
            visibility: hidden;
            /* 不透明度 */
            opacity: 0;
            transition: 0.3s ease-in-out;
        }

        .container .card .text-box p {
            text-align: left;
            line-height: 25px;
            margin-top: 10px;
            font-size: 15px;
            color: #555;
        }

        .container .card:hover .text-box {
            /* 鼠标移入，设置元素可见 */
            visibility: visible;
            opacity: 1;
            margin-top: -40px;
            /* 动画延迟0.2秒 */
            transition-delay: 0.2s;
        }

        
</style>