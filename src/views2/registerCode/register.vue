﻿<template>
    <div style="width:98%;height:98vh">
        <el-form style="width:40%;height:50%;margin: auto;text-align: center;">
            <h1>输入注册码</h1>
            <el-form-item label="机器码为：" :label-width="formLabelWidth">
                <el-input v-model="machineCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="输入获取的注册码：" :label-width="formLabelWidth">
                <el-input v-model="code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="toRegister()">注册!</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from "axios";
import $ from "jquery"
export default {
    data() {
        return {
            formLabelWidth:"150px",
            machineCode:"",
            code:""
        }
    },
    computed: {
        routes() {
            // return this.$router.options.routes
            return this.$route.path;
        },
        ServeIp() {
            return this.$store.state.user.ServeIp
        },
        ServePort() {
            return this.$store.state.user.ServePort
        }
    },
    mounted() {
     this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        this.init();
      });
    },
    methods: {
        init() {
                let myurl='http://' + this.ServeIp + ":" + this.ServePort + "/user/getMachineCode"
                console.log(myurl, 'myurl');
                axios.get(myurl).then(
                success => {
                    console.log(success);
                    if (success.data.code == 200) {
                            console.log(success.data.data, 'result.data');
                            this.machineCode=success.data.data;
                            this.machineCode="123123123"
                        } else {
                            alert(success.data.message);
                        }
                },
                error => {
                    alert(error);
                })
                // $.ajax({
                //     type: "get",
                //     url: myurl,
                //     success: function (result) {
                //         if (result.code == 200) {
                //             console.log(result.data, 'result.data');
                //             this.machineCode=result.data;
                //             this.machineCode="123123123"
                //         } else {
                //             alert(result.message);
                //         }
                //     }
                // });
        },
        toRegister() {
            let machineCode = this.machineCode;
            let code = this.code;
            if (machineCode == "") {
                alert("机器码为空!")
                return false;
            } else if (code == "") {
                alert("请输入注册码")
                return false;
            }
            let myurl='http://' + this.ServeIp + ":" + this.ServePort + "/user/register"
            console.log(myurl, 'myurl');
            $.ajax({
                type: "GET",
                url: myurl,
                data: {
                    "machineCode": machineCode,
                    "code": code
                },
                success: function (data) {
                    if (data.code == 200) {
                        window.location.href = "/user/toLogin";
                    } else {
                        alert(data.message);
                    }
                }
            });
        }
    }
}
</script>
<style >
html,body{
    overflow: hidden;
}
</style>