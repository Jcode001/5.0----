<template>
    <div style="width:100%;height:100vh">
        <el-button @click="btn1()">区域控制器运行状态</el-button>
        <el-button @click="btn2()">区域控制器运行总状态</el-button>
        <el-button @click="btn3()">八防控制器运行状态</el-button>
        <div>{{msg}}</div>
    </div>
</template>
<script>
import axios from "axios";
import $ from "jquery"
export default {
    data() {
        return {
            msg:  '',
        };
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
    methods: {
        getdata(indata)
        {
            let myurl='http://' + this.ServeIp + ":" + this.ServePort + "/getRfid"
            console.log(myurl, 'myurl');
            $.ajax({
                type: "GET",
                url: myurl,
                data: indata,
                success: function(Obj,status){
                    if(Obj.code==666)
                    {
                        console.log(Obj.message, '获取环境接口-成功');
                        alert(Obj.message);
                        return;
                    }
                    console.log(Obj, '获取环境接口-成功');
                    var data=JSON.stringify(Obj)
                    this.msg=data
                },
                error:function(msg){
                    alert(msg.status);//状态码
                }
            })

            // axios.get('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
            // success => {
            //     console.log(success, '获取环境接口-成功');
            //     console.log(success.data.data, '11111111');
            //     var data=JSON.stringify(success.data.data)
            //     this.msg=data
            // },
            // error => {
            //     console.log(error, '获取环境接口--返回失败的数据');
            // })
        },
        btn1() {
            this.msg="";
            var indata={
                "cmd":60001,
                "localip":"127.0.0.1",
                "hostname":"10.168.1.39",
                "port":"8066",
                        "method":"KFPTService/getStatus",
                        "jsonin":"{\"ip\":\"10.168.1.4\"}"
            }
            this.getdata(indata,'msg');
        },
        btn2() {
            this.msg="";
            var indata={
                "cmd":60001,
                "localip":"127.0.0.1",
                "hostname":"10.168.1.39",
                "port":"8066",
                        "method":"KFPTService/getTotalRunState",
                        "jsonin":"{\"ip\":\"10.168.1.4\"}"
            }
            this.getdata(indata,'msg');
        },
        btn3() {
            this.msg="";
            var indata={
                "cmd":60001,
                "localip":"127.0.0.1",
                "hostname":"10.168.1.39",
                "port":"8066",
                        "method":"KFPTService/prevent/getStatus",
                        "jsonin":"{\"ip\":\"10.168.1.5\"}"
            }
            this.getdata(indata,'msg');
        }
    }
}
</script>