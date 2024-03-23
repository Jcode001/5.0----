<template>
    <div class="container">
    </div>
    </template>
    <script>
    import { mapGetters } from "vuex";
    import axios from "axios";
    import $ from 'jquery';
    import bus from '@/utils/bus'
    export default {
        components:{
        },
        data() {
            return{
                jsessionid:"",
            }
        },
        mounted(){
           
            let indata=
            {
                "pwd": "123456",
                "yhm": "admin"
            }
            axios.post('http://127.0.0.1:4444/user/login',indata).then(
					success => {
                        // console.log(success);
                        console.log(success.data);
                        this.jsessionid=success.data;
					},
					error => {
						console.log(error, '返回失败的数据');
					})
                
            setTimeout(() => {
                indata=
                {
                    "jsessionid": this.jsessionid,
                }
                axios.get('http://127.0.0.1:7777/user/getCurrentUser',indata).then(
					success => {
                        // console.log(success);
                        console.log(success.data);
					},
					error => {
						console.log(error, '返回失败的数据');
					});
            },1000);
           
        },
    }
    </script>
    <style scoped lang="scss">
    </style>
    