<template>
    <div>
        <el-header style="text-align: left; border-radius:12px 12px 0 0;">
          <img style="vertical-align:middle;" src="~@/assets/a06_znmj/home.png" />
          <span
            style="vertical-align:middle;width:90%;color:#fff;text-align:left;font-size:1vw;line-height: 100%;padding-left: 10px;">库房列表</span>
        </el-header>
        <!-- <div style="width:100%;background:rgb(42,103,205);text-align:center;color: #fff;font-size:1vw;">库房列表</div> -->
        <div>
            <!-- <el-tree :data="KFList" :props="defaultProps"
                style="background:#fff;color:#000; width:8vw;margin-top:1vw;" highlight-current
                @node-click="handleNodeClick">
            </el-tree> -->
            <el-main style="border: 1px solid rgb(103, 146, 240);height:37vw;background-color: #fff; overflow-y: auto;"  class="hjjkk">
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
                       <span style="width:2vw;">{{ items.label }}  </span>
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
        </el-main>
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
  created() {

  },
  mounted(){

   setTimeout(()=>{this.init()},1000)  
  },
  methods: {
    	init(){
			var tempdata={
				"acLx":'1,3'
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetStoresACSForLeftMenuAsc',tempdata).then(
                success => {
                    console.log(success, '获取库房列表接口-成功');
                    // let Obj=success.data;
					this.KFList = []
          let arr=success.data.data
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
                    console.log(error, '获取库房列表接口bbbbbbbbbbbbbb--返回失败的数据');
                })
		},
    handleNodeClick(data) {
			let StoreId=data.id;
			let StoreName=data.label;
			let level=data.level;
			let no=data.no;
      sessionStorage.setItem("ACId",data.id)
			sessionStorage.setItem("StoreId",data.StoreId);
			console.log(data, "点击了data111111111111bbbbbbbbbbbbbbb");
			if(level==2){
				bus.$emit("hjjkmenu", data);
			}
        },
  },
};
</script>

<style scoped lang="less"> 




/deep/.hjjkk .el-menu {
  height: 100% !important;
  background-color: white;
  color: black;
  // min-height: calc(100% - 0px);
  z-index: 0;
}

/deep/.hjjkk .el-menu-item {
    width: 9vw;
  background-color: white;
  color: black;
  //   font-size: 10px;
}
.hjjkk .el-submenu__title:hover {
  background-color: white;
  color: black;
}
.hjjkk .el-menu-item:hover {
  background-color: white;
  color: black;
}
.hjjkk .el-footer {
  background-color: white;
  color: black;
  line-height: 60px;
  text-align: center;
  z-index: 0;
}
.hjjkk i {
  background-color: white;
  color: black;
}
/deep/.hjjkk .el-submenu__title {

    padding-left: 4px;
    background-color: white !important;
    color: black;
}
/deep/.hjjkk .el-submenu__title i {
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
