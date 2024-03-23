<template>
  <el-form label-width="120px">
    <el-form-item label="灯光模块选择">
      <el-select v-model="form.region" placeholder="请选择灯光模块">
        <el-option label="旧版" value="0"></el-option>
        <el-option label="新版" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item></el-form-item>
    <el-form-item>
      <el-button type="primary" @click="dgSubmit">确定</el-button>
      <el-button @click="dgclose">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
export default {

  data(){
      return{
        form:{
          region:'0'
        }
      }
  },

  mounted(){
    this.ServeIp=localStorage.getItem('serip'),
    this.ServePort=localStorage.getItem('serport')
    this.getModuleType()
  },
  methods:{
    getModuleType() {
      axios.get('http://' + this.ServeIp + ':' + this.ServePort + '/custom/get?key=moduleType').then(res => {
        console.log(res,'获取灯光模块');
        if (res.data.data.content == '1') {
          this.form.region = res.data.data.content
        } else {
          this.form.region = '0'
        }
      }).catch(error=>{
        console.log(error,'error');
      })
    },
    dgSubmit() {
      console.log('form',this.form.region)
      const arr={
        "name":"moduleType",
        "content":this.form.region
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/custom/add', arr).then(res => {
        console.log(res,'保存灯光模块');
        sessionStorage.setItem('dgTpye',this.form.region)
        this.$message.success('设置成功')
        this.$emit('closeDgSet')
      }).catch(error=>{
        console.log(error,'error');
      })
    },
    dgclose() {
      this.$emit('closeDgSet')
    }
  }
}
</script>

<style>

</style>