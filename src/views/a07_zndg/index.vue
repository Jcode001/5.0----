<template>
  <div class="app-container" style="background:rgb(245, 245, 245);">
    <div>
      <div style="height:13vh;  overflow: hidden;background:rgb(255, 255, 255);">
        <div style="display:flex;  align-items: center; height: 10vh;width:85vw;margin:0.7vw">
          <div @click="left()"><img src="../../assets/btn_door_left.png" alt=""></div>
          <div style="width:91%;">
            <div style="width:100%;display:flex;">
              <div style="margin-left: 4.6vw;" class="DG" v-for="(item, index) in list" :key='index'>
                <img src="../../assets/ico_light_on.png" alt="">
                <div style="width: 6vw;margin-top:0.5vw;display: flex;align-items: center;">{{ item.label }}</div>
              </div>
            </div>
          </div>
          <div @click="right()"><img src="../../assets/btn_door_right.png" alt=""></div>
        </div>
      </div>
      <div class="kufangtupian"><img src="../../assets/3D.png" alt=""></div>
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
          label: '灯光控制器1'
        },
        {
          label: '灯光控制器2'
        },
        {
          label: '灯光控制器3'
        },
        {
          label: '灯光控制器4'
        },
        {
          label: '灯光控制器5'
        },
        {
          label: '灯光控制器6'
        },
        {
          label: '灯光控制器7'
        },
        {
          label: '灯光控制器 '
        }
      ]
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
          console.log(success, '根据控制器ip获取灯光状态-成功');

        },
        error => {
          console.log(error, '根据控制器ip获取灯光状态--返回失败的数据');
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
    left() { }
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  // height: 100%;
}
</style>