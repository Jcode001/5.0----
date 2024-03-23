<template>
  <div>
    <el-dialog :visible.sync="visible" @close="onClose"  center title="档案盘点结果"  width="80%">
        <div>
            <el-button type="primary" @click="daochu()">导出</el-button>
            <el-button type="success" @click="showinfo()">查看详细信息</el-button>
            <el-input
           
          style=" border-radius: 5.5px; border: 0.8px solid #8A8A8A;width: 10vw; margin-left: 1vw; margin-right: 0.2vw"
          v-model.trim="inputlist"
          onkeyup="this.value=this.value.replace(/[, ]/g,'')"
          placeholder="请输入搜索项"
           clearable></el-input>
          <el-button  @click="putongsearch()" style="height:1.65vw;width:4vw;" type="primary" icon="el-icon-search" >
          <div style="color:#fff;margin-top:-0.6vw;margin-left:0.5vw; font-size:0.65vw;">查询</div>

        </el-button>

        </div>
      <div style="height: 55vh;">

        <el-table id="jieguo" border height="500" :data="fileboxforloanList" @selection-change="pandiandanxuan">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column property="no" label="序号"></el-table-column>
        <el-table-column property="MJJName" label="原始地址"></el-table-column>
        <el-table-column property="ZKCount" label="在库数"></el-table-column>
        <el-table-column property="DSCount" label="丢失数"></el-table-column>
        <el-table-column property="CJCount" label="错架教"></el-table-column>
      </el-table>
      <div v-if="pandianjieguoshow"  style="float: right;">
        <el-pagination @size-change="handleSize" @current-change="handleCurrent"
          :current-page="pIndex" :page-sizes="[10, 50, 100]" :page-size="pSize"
          layout="total, sizes, prev, pager, next, jumper" :total="count">
        </el-pagination>
      </div>
      <div v-else style="float: right;">
        <el-pagination @size-change="handleSizeone" @current-change="handleCurrentone"
          :current-page="pIndexone" :page-sizes="[10, 50, 100]" :page-size="pSizeone"
          layout="total, sizes, prev, pager, next, jumper" :total="countone">
        </el-pagination>
      </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="visibleone"   center title="档案盘点详细结果"  width="80%">
        <div>
            <!-- <el-input
          style="border-radius: 5.5px; border: 0.8px solid #8A8A8A;width: 10vw;margin-right: 0.2vw"
          v-model="inputlisttwo" clearable placeholder="请输入搜索项"></el-input> -->
          <!-- <el-button style="height:1.65vw;width:4vw;" type="primary" icon="el-icon-search" >
          <div style="color:#fff;margin-top:-0.6vw;margin-left:0.5vw; font-size:0.65vw;" @click="searchxiangxiinfo()">查询</div>

        </el-button> -->

        </div>
      <div style="height: 55vh;">

        <el-table border height="500" :data="fileboxforloanListshow" @selection-change="danxuanguihuankuangone">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column property="no" label="序号"></el-table-column>
        <el-table-column property="PName" label="盘点计划名称"></el-table-column>
        <el-table-column property="DACode" label="条码号"></el-table-column>
        <el-table-column property="Info" label="信息"></el-table-column>
        <el-table-column property="Number" label="编号"></el-table-column>
        <el-table-column property="MLName" label="门类"></el-table-column>
        <el-table-column property="status" label="盘点结果"></el-table-column>
        <el-table-column property="Address" label="盘点地址"></el-table-column>
        <el-table-column property="username" label="盘点人"></el-table-column>
        <el-table-column property="PDTime" label="盘点时间"></el-table-column>
      </el-table>
      <!-- <div style="float: right;"> -->
        <!-- <el-pagination @size-change="handleSizetwo" @current-change="handleCurrenttwo"
          :current-page="pIndextwo" :page-sizes="[10, 50, 100]" :page-size="pSizetwo"
          layout="total, sizes, prev, pager, next, jumper" :total="counttwo">
        </el-pagination> -->
      <!-- </div> -->
      </div>
    
    </el-dialog>
  </div>
</template>

<script>
import bus from '../../utils/bus'
import axios from "axios";
export default {
    props: {
    visible: {
      type: Boolean,
    
    },
  },

data(){
    return{
      countone:0,
      pSizeone:10,
      pIndexone:1,
      pandianjieguoshow:true,
      pandianid:[],
      counttwo:0,
      pSizetwo:10,
      pIndextwo:2,
      pandaininfor:[],
        count:0,
        pIndex:1,
        pSize:10,
        visibleone:false,
        inputlist:'',
        inputlisttwo:'',
        fileboxforloanList:[],
        fileboxforloanListshow:[]
    }
},


mounted(){
  this.ServeIp=localStorage.getItem('serip'),
  this.ServePort=localStorage.getItem('serport')
  bus.$on('pandianid',(pandianid)=>{
  this.pandianid=pandianid
  console.log(this.pandianid,'111111111111111');
  this.pandianjieguo()
  })

  



},
methods:{
  daochu(){
    let table = document.querySelector('#jieguo').cloneNode(true);
      // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
      // table.removeChild(table.querySelector(".el-table__fixed-right"));
      // table.removeChild(table.querySelector(".el-table__fixed"));
      let wb = XLSX.utils.table_to_book(table, { raw: true }); //mytable为表格的id名
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          '盘点结果表格数据' + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
  },
  pandianjieguo(){
    this.pandianjieguoshow=true
    const arr={
      "pid":this.pandianid[0].no,
      "Fiter":'',
      'pIndex':this.pIndex,
      'pSize':this.pSize
    }
    console.log(arr,'arr');
    axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDPRetList', arr).then(res => {
      console.log(res,'获取到盘点结果数据');
      this.fileboxforloanList=[]
   
      if(res.data.code!=200){
      this.$message.error(res.data.message)
      return
     }

      this.fileboxforloanList=res.data.data.table
     this.count=res.data.data.Count

    
    }).catch(error=>{
      
    })
  },
  showinfo(){
    if(this.pandaininfor.length!=1){
     this.$message.error('请选择一条数据')
      return
    }
  this.visibleone=true
   const arr={
      "pid":this.pandianid[0].no,
      "StoreId":this.pandaininfor[0].storeid,
      "QuNo":this.pandaininfor[0].quno,
      "ColNo":this.pandaininfor[0].colno,
      "LeNo":this.pandaininfor[0].leno,
      "DivNo" :this.pandaininfor[0].divno,
      "ZyNo":this.pandaininfor[0].zyno,
    }

    axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDPRetDetail', arr).then(res => {
      console.log(res,'获取到详细结果数据');
      this.fileboxforloanListshow=[]
   
      if(res.data.code!=200){
      this.$message.error(res.data.message)
      return
     }

      this.fileboxforloanListshow=res.data.data.table
     this.counttwo=res.data.data.Count

    
    }).catch(error=>{
      
    })
    },
    handleSizetwo(val){
      console.log(val,'每页数量');
    },
    handleCurrenttwo(val){
      console.log(val,'跳转页数');
    },
    handleSize(val){
      this.pSize=val
      this.pandianjieguo()
        console.log(val,'每页数量');
    },
    handleCurrentone(val){
    this.pIndexone=val
 this.putongsearch()
    },
    handleSizeone(val){
     this.pSizeone=val
     this.putongsearch()
    },

    handleCurrent(val){
      this.pIndex=val
        console.log(val,'跳转页数');
        this.pandianjieguo()
    },
    onClose() {
      this.$emit('closessssss');
    },
    putongsearch(){


if(this.inputlist!=''){
  this.pandianjieguoshow=false
      const arr={
      "pid":this.pandianid[0].no,
      "Fiter":this.inputlist,
      'pIndex':this.pIndexone,
      'pSize':this.pSizeone
    }
    axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDPRetList', arr).then(res => {
      console.log(res,'获取到查询结果数据');
      this.fileboxforloanList=[]
   
      if(res.data.code!=200){
      this.$message.error(res.data.message)
      return
     }

      this.fileboxforloanList=res.data.data.table
     this.countone=res.data.data.Count

    
    }).catch(error=>{
            console.log(error)
    })
}else{
  this.pandianjieguoshow=true
  const arr={
      "pid":this.pandianid[0].no,
      "Fiter":'',
      'pIndex':1,
      'pSize':this.pSize
    }
    axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDPRetList', arr).then(res => {
      console.log(res,'获取到查询结果数据');
      this.fileboxforloanList=[]
   
      if(res.data.code!=200){
      this.$message.error(res.data.message)
      return
     }

      this.fileboxforloanList=res.data.data.table
     this.count=res.data.data.Count

    
    }).catch(error=>{
      console.log(error)
    })
}



 
    },
    searchxiangxiinfo(){

    },
    pandiandanxuan(val){
      this.pandaininfor=val
        console.log(val,'档案盘点结果档案盘点结果档案盘点结果');
    },
    danxuanguihuankuangone(val){
      console.log(val,'档案盘点结果档案盘点结果档案盘点结果');
    }
}
}
</script>

<style>

</style>