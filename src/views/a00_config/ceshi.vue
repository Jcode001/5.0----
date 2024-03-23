<template>
    <div>
        <div id="app">
            ip:
            <el-input type="textarea"  :rows="1" placeholder="请输入IP" v-model="inputip"></el-input>
            端口:
            <el-input type="textarea"  :rows="1" placeholder="请输入prot" v-model="prot"></el-input>
            请求方法:
            <el-input type="textarea"  :rows="1" placeholder="请输入内容" v-model="fangfa"></el-input>
            JSON:
            <el-input type="textarea"  :rows="5" placeholder="请输入内容" v-model="jsonon"></el-input>

            <el-button type="primary" @click="get">get请求</el-button>
            <el-button type="success" @click="post">post请求</el-button><br>
            返回数据:<br>
            <el-input type="textarea"  :rows="5" placeholder="接口返回数据" v-model="fanhuishuju"></el-input>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {

        return {
            inputip: '192.168.1.10',
            fangfa: '/mjj/unlock',
            prot: '8086',
            urldizhi: '',
            jsonon: '{\"StoreNo\": \"1\",\"QuNo\": \"1\"}',
            fanhuishuju: '',
            ServeIp: '',
            ServePort: ''
        }
    },




    methods: {
        post() {
            this.ServeIp = localStorage.getItem('serip'),
                this.ServePort = localStorage.getItem('serport')


            var indata = {
                "cmd": "60003",
                "localip": "127.0.0.1",
                "hostname": this.inputip,
                "port": this.prot,
                "method": this.fangfa,
                "jsonin": this.jsonon,
                "RequestMethod": "POST"
            }
            //indata = JSON.stringify(indata)
            this.fanhuishuju = ''
            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(res => {
                console.log(res, 'resresresres');
                this.fanhuishuju=JSON.stringify(res.data.data);
            }).catch(error => {
                console.log(error);
            })



        },
        get() {
            this.ServeIp = localStorage.getItem('serip'),
                this.ServePort = localStorage.getItem('serport')
            var indata = {
                "cmd": 60001,
                "localip": "127.0.0.1",
                "hostname": this.inputip,
                "port": this.prot,
                "method": this.fangfa,
                "jsonin": this.jsonon,
                "RequestMethod": "GET"
            }
            indata = JSON.stringify(indata)
            this.fanhuishuju = ''
            axios.get('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(res => {
                console.log(res, 'resresresres');
                // this.fanhuishuju=res.data.data
            }).catch(error => {
                console.log(error);
            })

        }
    }
}
</script>

<style></style>