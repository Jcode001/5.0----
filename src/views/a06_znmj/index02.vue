<template>
  <div class="app-container" style="background:rgb(245, 245, 245);">
    <div>
      <div style="height:13vh;  overflow: hidden;background:rgb(255, 255, 255);">
        <div style="display:flex;  align-items: center; height: 10vh;width:85vw;margin:0.7vw">
          <div @click="left()"><img src="../../assets/btn_door_left.png" alt=""></div>
          <div style="width:91%;">
            <div style="width:100%;display:flex;">
              <div style="margin-left: 4.4vw;" class="DG" v-for="(item, index) in list" :key='index'>
                <img src="../../assets/a06_znmj/ico_door_close.png" alt="">
                <div style="margin-top:0.3vw;justify-content: center;display: flex;align-items: center;">{{
                  item.label }}</div>
              </div>
            </div>
          </div>
          <div @click="right()"><img src="../../assets/btn_door_right.png" alt=""></div>
        </div>
      </div>
      <div style="display:flex;">
        <div class="kufangtupian" style="width:65%;"><img src="../../assets/3D.png" alt=""></div>
        <div style="width:34%; margin-top: 2vh;margin-left: 1vw;">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;height: 90%;"
            header-row-class-name="table_header_class" max-height="550" border=""
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="42" align="center">
            </el-table-column>
            <el-table-column prop="action" label="动作" width="60" align="center">
            </el-table-column>
            <el-table-column prop="startTime" label="执行时间" width="100" align="center">
            </el-table-column>
            <el-table-column prop="describe" label="描述" width="60" align="center">
            </el-table-column>
            <el-table-column prop="way" label="方式" width="60" align="center">
            </el-table-column>
            <el-table-column prop="personnel" label="人员" show-overflow-tooltip align="center">
            </el-table-column>
          </el-table>
          <div style="margin-top:1vw;display: flex;justify-content: center;">
            <el-button @click="recordExport()" round type="success">记录导出</el-button>
            <el-button @click="lookMore()" type="primary">查看更多</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bus from '../../utils/bus'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      ixx: 0,
      KFDGF: 0,
      list: [
        {
          label: '海康1'
        },
        {
          label: '海康2'
        },
        {
          label: '海康3'
        },
        {
          label: '海康4'
        },
        {
          label: '海康5'
        },
        {
          label: '海康6'
        },
        {
          label: '海康7'
        },
        {
          label: '海康8'
        }
      ],
      tableData: [
        {
          action: '动作1',
          startTime: '2023-09-28',
          describe: '描述1',
          way: '方式1',
          personnel: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          action: '动作1',
          startTime: '2023-09-28',
          describe: '描述1',
          way: '方式1',
          personnel: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          action: '动作1',
          startTime: '2023-09-28',
          describe: '描述1',
          way: '方式1',
          personnel: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          action: '动作1',
          startTime: '2023-09-28',
          describe: '描述1',
          way: '方式1',
          personnel: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          action: '动作1',
          startTime: '2023-09-28',
          describe: '描述1',
          way: '方式1',
          personnel: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          action: '动作1',
          startTime: '2023-09-28',
          describe: '描述1',
          way: '方式1',
          personnel: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          action: '动作1',
          startTime: '2023-09-28',
          describe: '描述1',
          way: '方式1',
          personnel: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          action: '动作1',
          startTime: '2023-09-28',
          describe: '描述1',
          way: '方式1',
          personnel: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          action: '动作1',
          startTime: '2023-09-28',
          describe: '描述1',
          way: '方式1',
          personnel: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          action: '动作1',
          startTime: '2023-09-28',
          describe: '描述1',
          way: '方式1',
          personnel: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          action: '动作1',
          startTime: '2023-09-28',
          describe: '描述1',
          way: '方式1',
          personnel: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          action: '动作1',
          startTime: '2023-09-28',
          describe: '描述1',
          way: '方式1',
          personnel: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
      ],
      multipleSelection: []
    }
  },
  created() {
  },
  mounted() {
    console.log(')))))))))))))))))))))))))))');
    bus.$on('KFDG', (HostName) => {
      console.log(HostName, '消息通信ebVideoCtrlWebVideoCtrlebVideoCtrlWebVideoCtrl');
      console.log('111111111111111');
      // var tempData = {
      //   quId: id
      // };
      // console.log(tempData, 'tempDatatempDatatempDatatempData');
      axios.get('http://' + this.ServeIp + ':' + this.ServePort + '/KFPTService?Op=GetLightStatus&Ip=' + HostName).then(//根据区id获取区信息
        success => {
          console.log(success, '根据控制器ip获取门禁状态-成功');

        },
        error => {
          console.log(error, '根据控制器ip获取门禁状态--返回失败的数据');
        })
    })
    this.right()
  },
  computed: {
    ServeIp() {
      return this.$store.state.user.ServeIp;
    },
    ServePort() {
      return this.$store.state.user.ServePort;
    },
  },
  methods: {
    right() {
      this.ixx++
      console.log(this.ixx, 'this.ixxthis.ixx');
      console.log(this.list.length, 'this.list.length');
      // if(this.list.length>8){
      //   this.list=[]
      //   this.list.push()
      // }
    },
    left() {

    },
    recordExport() {//记录导出
      this.$message.success("正在导出")
    },
    lookMore() {//查看更多
      this.$message.success("查看更多")
    },
    handleSelectionChange(val) {//选中表格的事件
      this.multipleSelection = val;
    }
  },
};
</script>

<style lang="scss">
.DG {
  margin-top: -2vw;
  ;
  width: 4vw;
  height: 4vw;
}

.DG img {
  width: 100%;
  height: 100%;
}

.kufangtupian {
  height: 72vh;
  margin-top: 2vh;
  background: #ffffff;
}

.kufangtupian img {
  margin-left: 5vw;
  margin-top: 2vw;
  width: 80%;
}

.table_header_class {
  background-color: #000 !important;
}
</style>