<template >
    <div>
        <div style="margin-top:10px">
            <el-link type="primary" @click="downloadDoc">通道门</el-link>
        </div>
        <div style="margin-top:10px">
            <el-link type="primary" @click="downloadDoc1">盘点车</el-link>
        </div>
        <div style="margin-top:10px">
            <el-link type="primary" @click="downloadDoc2">手持机</el-link>
        </div>
        <div style="margin-top:10px">
            <el-link type="primary" @click="downloadDoc3">银河麒麟V10-77版飞腾CPU 打印服务V2.0.3</el-link>
        </div>
    </div>
</template>
<script>
import {
    RouterLink
}

    from 'vue-router';

import {
    mapGetters
}

    from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import axios from "axios";
import * as echarts from 'echarts'
import $ from "jquery"

export default {

    data() {
        return {}
    },

    methods: {
        // 导出模板
        downloadDoc() {
            // 创建一个<a></a>标签
            const a = document.createElement('a');
            a.href = './documents/z-app-debug.apk.zip';
            a.download = 'z-app-debug.apk.zip';

            // 障眼法藏起来a标签
            a.style.display = 'none';
            // 将a标签追加到文档对象中
            document.body.appendChild(a);
            // 模拟点击了<a>标签,会触发<a>标签的href的读取,浏览器就会自动下载了
            a.click();
            // 一次性的,用完就删除a标签
            a.remove();

        },
        downloadDoc1() {
            // 创建一个<a></a>标签
            const a = document.createElement('a');
            a.href = './documents/z-PDC（12-05）.apk.zip';
            a.download = 'z-PDC（12-05）.apk.zip';

            // 障眼法藏起来a标签
            a.style.display = 'none';
            // 将a标签追加到文档对象中
            document.body.appendChild(a);
            // 模拟点击了<a>标签,会触发<a>标签的href的读取,浏览器就会自动下载了
            a.click();
            // 一次性的,用完就删除a标签
            a.remove();

        },
        downloadDoc2() {
            // 创建一个<a></a>标签
            const a = document.createElement('a');
            a.href = './documents/z-SCJ_HGL2023051101.zip';
            a.download = 'z-SCJ_HGL2023051101.zip';

            // 障眼法藏起来a标签
            a.style.display = 'none';
            // 将a标签追加到文档对象中
            document.body.appendChild(a);
            // 模拟点击了<a>标签,会触发<a>标签的href的读取,浏览器就会自动下载了
            a.click();
            // 一次性的,用完就删除a标签
            a.remove();

        },
        downloadDoc3() {
            // 创建一个<a></a>标签
            const a = document.createElement('a');
            a.href = './documents/银河麒麟V10-77版飞腾CPU 打印服务V2.0.3(1).zip';
            a.download = '银河麒麟V10-77版飞腾CPU 打印服务V2.0.3(1).zip';

            // 障眼法藏起来a标签
            a.style.display = 'none';
            // 将a标签追加到文档对象中
            document.body.appendChild(a);
            // 模拟点击了<a>标签,会触发<a>标签的href的读取,浏览器就会自动下载了
            a.click();
            // 一次性的,用完就删除a标签
            a.remove();

        },

    }
}
</script>
<style></style>