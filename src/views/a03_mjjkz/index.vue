<template>
  <div class="Densebody">
    <div class="header">
      <div @click="LeftMove()"><img src="../../assets/a03_mjjkz/bt_zuoyi_0.png" alt=""></div>
      <div @click="Lock()"><img src="../../assets/a03_mjjkz/bt_jiesuo_0.png" alt=""></div>
      <div @click="StopMove()"><img src="../../assets/a03_mjjkz/bt_tingzhi_0.png" alt=""></div>
      <div @click="Reset()"><img src="../../assets/a03_mjjkz/bt_bijia_0.png" alt=""></div>
      <div @click="Ventilate()"><img src="../../assets/a03_mjjkz/bt_tongfeng_0.png" alt=""></div>
      <div @click="RightMove()"><img src="../../assets/a03_mjjkz/bt_youyi_0.png" alt=""></div>
    </div>
    <div class="densemain">
      <div>
        <div style="display:flex;align-items: center;margin-left:3vw; margin-top:1vw;">
          <img src="../../assets/a03_mjjkz/ico_kongxina.png" alt="">
          <div style="font-size:1vw;line-height:3vw;height:3vw;display: inline;">空闲</div>
        </div>
      </div>
      <div class="densemains">

        <div v-for="(item, index) in zoneInfoList.ColCn" :key="index">
          <div v-if="zoneInfoList.GDLNo == item">
            <div style="display: flex;align-items: center;justify-content: center;">固定列</div>
            <img src="../../assets/a03_mjjkz/mjj_gdl.png" alt="">
          </div>
          <div v-else @click="columnClick(item, index)">
            <div style="display: flex;align-items: center;justify-content: center;">第0{{ item }}列</div>
            <img v-if="columnClickStatus[index]" src="@/assets/a03_mjjkz/mjj_ydl.png" alt="">
            <img v-else :class="classObject" src="@/assets/a03_mjjkz/mjj_ydl1.png" alt="">
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
      zoneInfoList: {//根据区Id获取区信息
        ColCn: 6,
        GDLNo: 1,
        SelcetColNo: 0,
        hostname: "",
        httpport: 8060,
        quno: 0,
        storeno:0
      },
      columnClickStatus: [//是否点击了密集架的状态变化
        true, true, true, true, true, true, true, true,
      ],
    }
  },
  created() {
  },
  mounted() {
         bus.$off('ebVideoCtrlWebVideoCtrl');
    console.log(')))))))))))))))))))))))))))');
    bus.$on('ebVideoCtrlWebVideoCtrl', (id, label) => {
      console.log(id, label, '消息通信ebVideoCtrlWebVideoCtrlebVideoCtrlWebVideoCtrl');
      console.log('111111111111111');
      var tempData = {
        quId: id
      };
      console.log(tempData, 'tempDatatempDatatempDatatempData');
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetMJJByQuId', tempData).then(//根据区id获取区信息
        success => {
          console.log(success, '根据区id获取区信息-成功');
          if (success.data.code == 200) {
            console.log(success.data.data, '根据区id获取区信息');
            this.zoneInfoList = success.data.data;
            this.columnClickStatus = [];
            this.zoneInfoList.GDLNo = success.data.data.gdlno;
            this.zoneInfoList.ColCn = success.data.data.colcn;
            this.zoneInfoList.hostname = success.data.data.hostname;
            this.zoneInfoList.httpport = success.data.data.httpport;
            this.zoneInfoList.quno = success.data.data.quno;
            this.zoneInfoList.storeno = success.data.data.storeno;

            console.log(success.data.data.colcn, 'success.data.data.length');
            for (let i = 0; i < success.data.data.colcn; i++) {
              this.columnClickStatus.push(true);
            }
            console.log(this.columnClickStatus, '  this.columnClickStatus');
          }
        },
        error => {
          console.log(error, '根据区id获取区信息--返回失败的数据');
        })
    })

  },
  computed: {
    ServeIp() {
      return this.$store.state.user.ServeIp;
    },
    ServePort() {
      return this.$store.state.user.ServePort;
    },
    classObject() {
      return {
        class_a: this.isMove,
        class_b: !this.isMove,
      }
    }
  },
  methods: {
    columnClick(item, index) {//密集架列的点击事件
      console.log(item, 'item,index');
      this.zoneInfoList.SelcetColNo = item;
      this.columnClickStatus = [];
      for (let i = 0; i < this.zoneInfoList.ColCn; i++) {
        this.columnClickStatus.push(true);
      }
      this.columnClickStatus[index] = !this.columnClickStatus[index];
    },
    LeftMove() {//左移
      console.log(this.zoneInfoList.SelcetColNo, 'this.zoneInfoList.SelcetColNo');
      if ((this.zoneInfoList.SelcetColNo == 0) || (this.zoneInfoList.SelcetColNo > this.zoneInfoList.ColCn)) {
        this.$message.warning("请选择要移动的列");
        return;
      }
      if (this.zoneInfoList.SelcetColNo == this.zoneInfoList.GDLNo) {
        this.$message.warning("固定列右侧列不能左移");
        return;
      }
      let data = {
        "cmd": 40006,
        "localip": "",
        "mjjip": this.zoneInfoList.hostname,
        "mjjport": this.zoneInfoList.httpport,
        "quNo": this.zoneInfoList.quno,
        "ColumnNo": this.zoneInfoList.SelcetColNo,
        'StoreNo':this.zoneInfoList.storeno
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/getRfid', data).then(//左移接口
        success => {
          if (success.data.code == 666) {
            this.$notify.success({
              title: '错误提示',
              message: success.data.message,
              offset: 100,
              duration: 2000
            });
            return;
          }
          console.log(success, '左移-成功');
          this.$notify.success({
            title: '左移',
            message: '左移成功！',
            offset: 100,
            duration: 2000
          });
        },
        error => {
          console.log(error, '左移--返回失败的数据');
        })
      // var i = 0;
      // try {
      //   this.columnClickStatus.forEach((item, index) => {
      //     console.log(item, 'itemitemitem');
      //     if (!item) {
      //       if (index == 0) {
      //         this.$message.warning("固定列右侧列不能左移");
      //         throw new Error("固定列右侧列不能左移")
      //       }



      //       throw new Error('中断循环')
      //     } else {
      //       i++;
      //       if (i == this.columnClickStatus.length) {

      //       }
      //     }
      //   });
      // } catch (error) {
      //   console.log('退出循环error');
      // }
    },
    Lock() {//解锁
      let data = {
        "cmd": 40008,
        "localip": "",
        "mjjip": this.zoneInfoList.hostname,
        "mjjport": this.zoneInfoList.httpport,
        "quNo": this.zoneInfoList.quno,
        'StoreNo':this.zoneInfoList.storeno
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/getRfid', data).then(//左移接口
        success => {
          if (success.data.code == 666) {
            this.$notify.success({
              title: '错误提示',
              message: success.data.message,
              offset: 100,
              duration: 2000
            });
            return;
          }
          console.log(success, '解锁-成功');
          this.$notify.success({
            title: '解锁',
            message: '解锁成功！',
            offset: 100,
            duration: 2000
          });
        },
        error => {
          console.log(error, '解锁--返回失败的数据');
        })
    },
    StopMove() {//停止
      let data = {
        "cmd": 40009,
        "localip": "",
        "mjjip": this.zoneInfoList.hostname,
        "mjjport": this.zoneInfoList.httpport,
        "quNo": this.zoneInfoList.quno,
        'StoreNo':this.zoneInfoList.storeno
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/getRfid', data).then(//左移接口
        success => {
          if (success.data.code == 666) {
            this.$notify.success({
              title: '错误提示',
              message: success.data.message,
              offset: 100,
              duration: 2000
            });
            return;
          }
          console.log(success, '停止接口-成功');
          this.$notify.info({
            title: '停止',
            message: '正在停止……',
            offset: 100,
            duration: 2000
          });
        },
        error => {
          console.log(error, '停止接口--返回失败的数据');
        })
    },
    Reset() {//闭架
      let data = {
        "cmd": 40011,
        "localip": "",
        "mjjip": this.zoneInfoList.hostname,
        "mjjport": this.zoneInfoList.httpport,
        "quNo": this.zoneInfoList.quno,
        'StoreNo':this.zoneInfoList.storeno
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/getRfid', data).then(//左移接口
        success => {
          if (success.data.code == 666) {
            this.$notify.success({
              title: '错误提示',
              message: success.data.message,
              offset: 100,
              duration: 2000
            });
            return;
          }
          console.log(success, '闭架接口-成功');
          this.$notify.info({
            title: '闭架',
            message: '闭架……',
            offset: 100,
            duration: 2000
          });
        },
        error => {
          console.log(error, '闭架接口--返回失败的数据');
        })
    },
    Ventilate() {//通风
      let data = {
        "cmd": 40010,
        "localip": "",
        "mjjip": this.zoneInfoList.hostname,
        "mjjport": this.zoneInfoList.httpport,
        "quNo": this.zoneInfoList.quno,
        'StoreNo':this.zoneInfoList.storeno
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/getRfid', data).then(//左移接口
        success => {
          if (success.data.code == 666) {
            this.$notify.success({
              title: '错误提示',
              message: success.data.message,
              offset: 100,
              duration: 2000
            });
            return;
          }
          console.log(success, '通风接口-成功');
          this.$notify.info({
            title: '通风',
            message: '通风……',
            offset: 100,
            duration: 2000
          });
        },
        error => {
          console.log(error, '通风接口--返回失败的数据');
        })
    },
    RightMove() {//右移
      console.log(this.zoneInfoList.SelcetColNo, 'this.zoneInfoList.SelcetColNo');
      if ((this.zoneInfoList.SelcetColNo == 0) || (this.zoneInfoList.SelcetColNo > this.zoneInfoList.ColCn)) {
        this.$message.warning("请选择要移动的列");
        return;
      }
      if (this.zoneInfoList.SelcetColNo == this.zoneInfoList.GDLNo) {
        this.$message.warning("固定列右侧列不能左移");
        return;
      }
      let data = {
        "cmd": 40007,
        "localip": "",
        "mjjip": this.zoneInfoList.hostname,
        "mjjport": this.zoneInfoList.httpport,
        "quNo": this.zoneInfoList.quno,
        "ColumnNo": this.zoneInfoList.SelcetColNo,
        'StoreNo':this.zoneInfoList.storeno
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/getRfid', data).then(//左移接口
        success => {
          if (success.data.code == 666) {
            this.$notify.success({
              title: '错误提示',
              message: success.data.message,
              offset: 100,
              duration: 2000
            });
            return;
          }
          console.log(success, '右移接口-成功');
          this.$notify.info({
            title: '第' + this.zoneInfoList.SelcetColNo + '列-右移',
            message: '正在右移……',
            offset: 100,
            duration: 2000
          });
        },
        error => {
          console.log(error, '右移接口--返回失败的数据');
        })
    },
  },
};
</script>

<style lang="scss">
body {
  background: #f5f5f5;
}

.Densebody {
  width: 95%;
  height: 95%;

  .header {
    width: 90%;
    height: 12vh;
    background: #ffffff;
    margin: 1.25rem 1.25rem;
    padding: 0 4.0625rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img:active {
      transform: scale(0.97, 0.97); //增加图片点击动画
    }
  }

  .densemain {
    width: 98%;
    height: 61vh;
    background: #ffffff;
    margin: 1.25rem 1.25rem 0;

  }

  .densemains {
    overflow-y: scroll;
    display: flex;
    justify-self: center;
    // justify-content: center;
    align-items: center;
    // text-align: center;
    margin-top: 2.5vh;
    height: 54vh;

    img {
      width: 5vw;
      height: 100%;
    }
  }


}
</style>