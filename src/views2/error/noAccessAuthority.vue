﻿<template>
    <div style="width:98%;height:98vh">
        <h2>抱歉,您没有该权限</h2>
        <a href="javascript:history.back(-1)"><h3>返回</h3></a>
    </div>
</template>
<script>
import axios from "axios";
import $ from "jquery"
export default {
    data() {
        return {
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
    },
    methods: {
    }
}
</script>
<style >
html,body{
    overflow: hidden;
}
</style>