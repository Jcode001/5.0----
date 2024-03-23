<template>
    <div>
        <el-header style="text-align: left; border-radius:12px 12px 0 0;">
          <img style="vertical-align:middle;" src="~@/assets/a06_znmj/home.png" />
          <span
            style="vertical-align:middle;width:90%;color:#fff;text-align:left;font-size:1vw;line-height: 100%;padding-left: 10px;">库房列表</span>
        </el-header>
        <!-- <div style="width:100%;background:rgb(42,103,205);text-align:center;color: #fff;font-size:1vw;">库房列表</div> -->
        <div style="border: 1px solid rgb(103, 146, 240);height:37vw;background-color: #fff; overflow-y: auto;"  class="shierfang">
            <!-- <el-tree :data="KFList" :props="defaultProps"
                style="background:#fff;color:#000; width:8vw;margin-top:1vw;" highlight-current
                @node-click="handleNodeClick">
            </el-tree> -->

            <el-menu
                :default-active="activeIndex"
                >
                <template v-for="(item) in KFList">
                    <el-submenu v-if="item.children" :key="item.id" :index="(item.id+1).toString()">
                    <template slot="title">
                        <i class="el-icon-office-building"></i>
                        <el-tooltip placement="top">
                        <div slot="content"> {{ item.label }}</div>
                       <span >{{ item.label }}  </span>
                     </el-tooltip>
                    </template>
                    <el-menu-item
                        v-for="(items, key) in item.children"
                        :key="key"
                        @click="handleNodeClick(items)"
                    >
                         <i class="el-icon-monitor"></i>
                         <el-tooltip placement="top">
                        <div slot="content"> {{ items.label }}</div>
                       <span >{{ items.label }}  </span>
                    </el-tooltip>
                    </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :key="item.id">
                        <i class="el-icon-office-building"></i>
                        <el-tooltip placement="top">
                        <div slot="content"> {{ item.label }}</div>
                       <span >{{ item.label }}  </span>
                    </el-tooltip>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import bus from '@/utils/bus'
export default {
  data() {
    return {
        activeIndex:"0",
        KFList: [
            {
                label: '数据加载中。。。',
                children: []
            }
        ],
         defaultProps: {
                children: "children",
                label: "label",
            },
    };
  },
  watch: {
  
  },
    computed: {
        ServeIp() {
            return this.$store.state.user.ServeIp
        },
        ServePort() {
            return this.$store.state.user.ServePort
        }
    },
  // created() {
  //   this.init()
  // },
mounted(){

setTimeout(()=>{this.init()},500)  
},
  methods: {
    	init(){
			var tempdata={
				"acLx":'2,3'
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetStoresACSForLeftMenuAsc',tempdata).then(
                success => {
                    console.log(success, '获取库房列表接口-成功');
                    // let Obj=success.data;
					this.KFList = [];
          let arr= success.data.data

					this.KFList.push(...arr)
					// for(let i=0;i<Obj.data.length;i++)
					// {
					// 	let item={};
					// 	item.id=Obj.data[i].StoreId;
					// 	item.no=i;
					// 	item.label=Obj.data[i].StoreName;
					// 	item.level=1;
					// 	item.children=[];
					// 	this.KFList.push(item);
					// }
					console.log(this.KFList);
                },
                error => {
                    console.log(error, '获取库房列表接口--返回失败的数据');
                })
		},
    handleNodeClick(data) {
			let StoreId=data.id;
			let StoreName=data.label;
			let level=data.level;
			let no=data.no;
			console.log(data, "点击了data11112222222222222222222222");
      sessionStorage.setItem("ACId",data.id)
			sessionStorage.setItem("StoreId",data.StoreId);
			if(level==2){
				bus.$emit("bfgzmenu", data);
			}
        },
  },
};
</script>

<style lang="less" scoped> 
.mainviewthree {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("~@/assets/a07_zndg/qykzq/pic.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 30px;
  /* 
    overflow: hidden;
    
    background-repeat: no-repeat;
    min-height: calc(100vh - 7vh);  */
}
/deep/.shierfang .el-menu {
  height: 100% !important;
  background-color: white;
  color: black;
  // min-height: calc(100% - 0px);
  z-index: 0;
}

/deep/.shierfang .el-menu-item {
    width: 9vw;
  background-color: white;
  color: black;
  //   font-size: 10px;
}
.shierfang .el-submenu__title:hover {
  background-color: white;
  color: black;
}
.shierfang .el-menu-item:hover {
  background-color: white;
  color: black;
}
.shierfang .el-footer {
  background-color: white;
  color: black;
  line-height: 60px;
  text-align: center;
  z-index: 0;
}
.shierfang i {
  background-color: white;
  color: black;
}
/deep/.shierfang .el-submenu__title {

    padding-left: 4px;
    background-color: white !important;
    color: black;
}
/deep/.shierfang .el-submenu__title i {
    background-color: white !important;
    color: black  !important;;
}
.myfooter {
  background-color: white;
  color: black;
}
/deep/.Turnoffwithoneclick:active {
    transform: scale(0.9)!important;
}
/deep/.Openoneclick:active {
    transform: scale(0.9)!important;
}
/deep/.lamphole:active {
    transform: scale(0.9)!important;

}
li{
  white-space:nowrap;
overflow: hidden;
text-overflow:ellipsis; 
    }
</style>
