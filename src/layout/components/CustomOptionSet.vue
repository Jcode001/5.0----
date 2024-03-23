<template>
    <div style="margin-left:1.1vw;">
        <div style="display:flex;"  v-show="isCustomOptionSet" :class="isCustomOptionSet ? 'newisCollapse' : ''">
          <div style="width:12vw;" >
            <div style="display:flex;">
            <el-select style="width:10vw;height:1.4vw;" v-model="valuetwo" placeholder="请选择" @change="xialaone1()">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <div v-show="settinging" @click="setting()" style="margin-left:.3vw;border: 1px solid #ccc;width: 1.6vw;height: 1.6vw;border-radius:.2vw;">
              <div class="shezhianniu"><img src="../../assets/ZDYsetting.png" alt=""></div>
            </div>
            </div>

            <div style="">
              <el-tree  ref="tree" highlight-current accordion :class="classOne ? 'newclassDaH' : 'oldclassDaH'"  style="width:11.4vw;"
                :data="treeData" :current-node-key="currentNodeKey"
                :props="defaultProps" @node-click="handleNodeClick" @node-expand='handleNodeExpand'>
                  <span class="tree-text" v-if="node.label.length <= 10" slot-scope="{node}"> {{ node.label }}</span>
                  <el-tooltip v-else effect="dark" :content="node.label" placement="top">
                    <span class="tree-text"> {{ node.label }}</span>
                  </el-tooltip>
              </el-tree>
            </div>
          </div>
        

      </div>

      <el-dialog center title="自定义分组设置" :visible.sync="dialogVisiblesetting" width="80%" @close="dialogClose()">
        <div>
          <div>
            <div class="box_cm">
              <div class="box_cm_list">
                <el-table :data="tableData" height="45vh" border ref="tableLeft" :row-key="getRowKey">
                  <el-table-column :label="`未选著录项（`+this.tableData.length+`）`">
                    <el-table-column type="selection" :reserve-selection="true"></el-table-column>
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column align="center" show-overflow-tooltip v-for="(item, index) in tableLabel" :key="index"
                      :label="item.label" :min-width="item.width ? item.width : 118">
                      <template slot-scope="scope">
                        <div>{{ scope.row[item.prop] }}</div>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </div>
              <div class="box_cm_list_cm">
                <div>
                  <el-button @click="Left()" :disabled="selectedTableData.length==0" type="primary" icon="el-icon-back"></el-button>
                </div>
                <div>
                  <el-button @click="Right()" :disabled="tableData.length==0" type="primary" icon="el-icon-right"></el-button>
                </div>
              </div>
              <div class="box_cm_list">
                <el-table :data="selectedTableData" height="45vh" border ref="tableRight" @selection-change="handleSelectedStaffChange" :row-key="getRowKey">
                  <el-table-column :label="`已选著录项（`+this.selectedTableData.length+`）`">
                    <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
                    <!-- <el-table-column type="index" label="序号"></el-table-column> -->
                    <el-table-column align="center" show-overflow-tooltip v-for="(item,index) in tableLabelRihgt" :key="index"
                      :label="item.label" :min-width="item.width ? item.width : 118">
                      <template slot-scope="scope">
                        <div>{{ scope.row[item.prop] }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="140">
                      <template slot-scope="scope">
                        <el-button v-show="scope.$index!=0" type="text" @click="moveUp(scope.$index, scope.row)">上移</el-button>
                        <el-button v-show="scope.$index!=selectedTableData.length-1" type="text" @click="moveDown(scope.$index, scope.row)">下移</el-button>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisiblesetting = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisiblesetting = false">确 定</el-button>
        </span> -->
      </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "CustomOptionSet",
    props: ["tableName","isCustomOptionSet","MlId","classOne"],
    data() {
      return {
        dialogVisiblesetting: false,
        isCollaps:true,
        settinging: true,
        treeData:[

      ],
        currentNodeKey:'1',//当前选中的节点
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        Cur_selectedData: [],
        selectedTableData: [
        {
          index: 1,
          name:'DH',
          describe:'档号',
        },
        {
          index: 2,
          name:'BGQX',
          describe:'保管期限',
        },
        {
          index: 3,
          name:'BZDW',
          describe:'编制单位',
        },
        {
          index: 4,
          name:'LBH',
          describe:'类别号',
        },
        {
          index: 5,
          name:'QZH',
          describe:'全宗号',
        },
        {
          index: 6,
          name:'WJH',
          describe:'文件号',
        },
        ],//右边表格数据
        tableData: [
        {
          index: 1,
          name:'AJH',
          describe:'案卷号',
        },
        {
          index: 2,
          name:'AJTM',
          describe:'案卷题名',
        },
        {
          index: 3,
          name:'JNWJS',
          describe:'卷内文件数',
        },
        {
          index: 4,
          name:'MLH',
          describe:'目录号',
        },
        {
          index: 5,
          name:'ND',
          describe:'年度',
        },
        {
          index: 6,
          name:'DZWJH',
          describe:'电子文件号',
        },
        {
          index: 7,
          name:'FZ',
          describe:'分类号',
        },
        {
          index: 8,
          name:'GH',
          describe:'馆号',
        },
        {
          index: 9,
          name:'JH',
          describe:'卷号',
        },
        {
          index: 10,
          name:'QWH',
          describe:'全文号',
        },
        {
          index: 11,
          name:'SFZH',
          describe:'身份证号',
        },
        {
          index: 12,
          name:'SWH',
          describe:'缩微号',
        },
        {
          index: 13,
          name:'TM',
          describe:'题名',
        },
        {
          index: 14,
          name:'WB',
          describe:'文本',
        },
        {
          index: 15,
          name:'WJBH',
          describe:'文件编号',
        },
        {
          index: 16,
          name:'WZ',
          describe:'文种',
        },
        {
          index: 17,
          name:'ZJH',
          describe:'子件号',
        },
        {
          index: 18,
          name:'ZRZ',
          describe:'责任者',
        },
        ],//左边表格数据
        tableLabel: [ //对应table表格字段，名称，宽度
          // {
          //   prop: "xsort",
          //   label: "序号",
          //   width: 40,
          // },
          {
            prop: "name",
            label: "名称",
            width: 60,
          },
          {
            prop: "describe",
            label: "描述",
            width: 80,
          },
        ],
        tableLabelRihgt: [ //对应table表格字段，名称，宽度
          {
            prop: "xsort",
            label: "序号",
            width: 40,
          },
          {
            prop: "name",
            label: "名称",
            width: 60,
          },
          {
            prop: "describe",
            label: "描述",
            width: 80,
          },
        ],
        valuetwo: '自定义分组',
        options: [{
            value: '自定义分组',
            label: '自定义分组'
          }
          // , {
          //   value: '选项2',
          //   label: '双皮奶'
          // }, {
          //   value: '选项3',
          //   label: '蚵仔煎'
          // }, {
          //   value: '选项4',
          //   label: '龙须面'
          // }, {
          //   value: '选项5',
          //   label: '北京烤鸭'
          // }
        ],
      };
    },
    watch: {
        classOne: {
            handler(newVal, oldVal) {
                console.log(newVal, "newVal导航导航导航");
                console.log(oldVal, "oldVal---导航");
                if(newVal){

                }
            },
          deep:true,
        },
    },
    computed: {
      ServeIp() {
        return this.$store.state.user.ServeIp;
      },
      ServePort() {
        return this.$store.state.user.ServePort;
      },
    },
    created () {
      console.log('进入到自定义分组设置页面');
      console.log(this.tableName,this.isCustomOptionSet,this.MlId,this.classOne,'tableName,isCustomOptionSet,MlId classOne');
      if(this.tableName==''){
        this.dialogVisiblesetting=false;
        this.$message.error("请选择档案分类");
        return;
      }
      if(!this.isCustomOptionSet){
        this.dialogVisiblesetting=false;
        return;
      }
      this.initSelected();
      this.init();
      // setTimeout(() => {
      //   this.getZDYGroupNode();
      // }, 1000);

    },
    mounted () {
      
    },
    methods: {
      init(){
        var getAllTableData={
          "Table_name":this.tableName,
        }
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetZLXData_hgl", getAllTableData).then(//（盒）获取所有著录项列表
          (success) => {
            console.log(success.data.data,'（盒）获取所有著录项列表--接口返回的数据');
              var res=success.data.data;
              this.tableData=[];
              res.forEach((items,index)=> {

                this.tableData.push({
                    index: index,
                    name:items.xname,
                    describe:items.xbyname,
                    "table_name":items.table_name,
                    "xlx": items.xlx,
                    "maxlength": items.maxlength,
                    "datatype": items.datatype,
                    "isnotnull": items.isnotnull,
                    "configid": items.configid,
                    "itemarray": items.itemarray,
                    "listindex": items.listindex,
                    "signid": items.signid,
                    "halign": items.halign,
                    "xsort": items.xsort,
                    "sysflag": items.sysflag,
                    "gjxname": items.gjxname,
                    "rfidgjx": items.rfidgjx,
                    "rfidjyx": items.rfidjyx,
                    "colwidth": items.colwidth,
                    "sorttype": items.sorttype
                })

              });
            var tempTableData=[];
            var tempIndex=[];
            tempTableData.push(...this.tableData);
            tempTableData.map((item,index) => {
              this.selectedTableData.map(item1 => {
                if(item.name===item1.name){
                  tempIndex.push(index);
                }
              });
            });
            tempIndex.forEach((element,index1) => {
                this.tableData.splice(element-index1,1);
            });
          },
          (err) => {
            console.log(err);
          }
        );
      },
      initSelected(){
        var getTableData={
          "Table_name":this.tableName,
        }
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetZDYGroupData_hgl", getTableData).then(//获取（盒）已选著录项列表
          (success) => {
            console.log(success.data.data,'获取（盒）已选著录项列表--接口返回的数据');
            var res=success.data.data;
            this.selectedTableData=[];
            this.treeData=[];
            if(res.length==0){
              console.log('当前已选的著录项为空');
              return;
            }

            res.forEach((items,index)=> {
              // this.treeData.push({
              //   id: index,
              //   name:items.xname,
              //   label: items.xbyname,
              //   children:[],
              // })
              this.selectedTableData.push({
                  index: index,
                  name:items.xname,
                  describe:items.xbyname,
                  "table_name":items.table_name,
                  "xlx": items.xlx,
                  "maxlength": items.maxlength,
                  "datatype": items.datatype,
                  "isnotnull": items.isnotnull,
                  "configid": items.configid,
                  "itemarray": items.itemarray,
                  "listindex": items.listindex,
                  "signid": items.signid,
                  "halign": items.halign,
                  "xsort": items.xsort,
                  "sysflag": items.sysflag,
                  "gjxname": items.gjxname,
                  "rfidgjx": items.rfidgjx,
                  "rfidjyx": items.rfidjyx,
                  "colwidth": items.colwidth,
                  "sorttype": items.sorttype
              })
            });
            this.getZDYGroupNode();
                // console.log(this.selectedTableData,'1111111111111111');
                // var disposeTreeData=[];
                // disposeTreeData.push(...this.selectedTableData);
                // disposeTreeData.forEach( async item => {
                //   console.log(item.name,item.xsort,'item.nameitem.xsort,');
                //   await this.getZDYGroupNode(item.name,item.xsort,item.sorttype);
                // });
          },
          (err) => {
            console.log(err);
          }
        );
      },
      getZDYGroupNode(){
        // console.log(name,xsort,sorttype,'name,xsort,sorttype');
        if(this.selectedTableData.length==0){
          console.log('当前已选的著录项为空');
          return;
        }
        var tempXname=this.selectedTableData[0].name;
        var getZDYGroupNodeData={
          "Table_name":this.tableName,
          "xname":tempXname,
          "sorttype":this.selectedTableData[0].sorttype,
          "filter":""
        }
        console.log(getZDYGroupNodeData,'getZDYGroupNodeDatagetZDYGroupNodeDatagetZDYGroupNodeData');
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetZDYGroupNode_hgl", getZDYGroupNodeData).then(//（盒）获取自定义项的树型结构
          (success) => {
            console.log(success.data.data,'（盒）获取自定义项的树型结构--接口返回的数据');
            var res=success.data.data;
            if(res==null){return;}
            this.treeData=[];
            res.forEach((items,index) => {
              const values=Object.values(items);
              // console.log(values,'valuesvaluesvaluesvaluesvalues');
              this.treeData.push({
                id: index,
                name:values[0],
                xname:tempXname,
                label: values[0]+'('+items.count+')',
                children:[{}],
              })
            });
            console.log(this.treeData,'this.treeData');


          },
          (err) => {
            console.log(err);
          }
        );
      },
      handleSelectedStaffChange(rows) {//右边表格数据变化事件
        console.log(rows,'右边表格数据发生了变化');
        this.Cur_selectedData = [];
        if (rows) {
          rows.forEach((row) => {
            if (row) {
              this.Cur_selectedData.push(row);
            }
          });
        }
      },
      Right() {//左到右
        console.log('左表格选中的数据', this.$refs.tableLeft.selection);
        if (this.$refs.tableLeft.selection.length === 0) {
          this.$message.error('请选择左侧未选著录项');
          return;
        }
        if(this.selectedTableData.length==5){
          this.$message.error("最多选择五个著录项！请移除已选著录项后再右移");
          return;
        }
        if(this.$refs.tableLeft.selection.length>5){
          this.$message.error("最多选择五个著录项！请移除未选著录项后再右移");
          return;
        }
        if(this.$refs.tableLeft.selection.length +this.selectedTableData.length>5){
          this.$message.error("最多只能有五个著录项！");
          return;
        }

        var selectList = this.$refs.tableLeft.selection;//左边表格选中的数据
        this.selectedTableData.push(...this.$refs.tableLeft.selection);
        selectList.forEach((item) => {
          console.log(item,'itemss');
          let index = this.tableData.findIndex((_item) => _item.index === item.index);
          if (index !== undefined) {
            this.tableData.splice(index, 1);
            var rightData={
              "Table_name":this.tableName,
              "xbyname":item.describe
            }
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/AddZDYGroupData_hgl", rightData).then(//添加（盒）已选著录项列表
              (success) => {
              console.log(success,'添加（盒）已选著录项列表');
              this.initSelected();
              },
              (err) => {
                console.log(err);
              }
            );

          }
        });
        this.$refs.tableLeft.clearSelection();
        this.$refs.tableRight.clearSelection();
      },
      Left() {//右到左
        console.log('左移');
        console.log('左表格数据', this.$refs.tableRight.selection);
        if (this.$refs.tableRight.selection.length === 0) {
          this.$message.error('请选择右侧已选著录项');
          return;
        }
        var selectList = this.$refs.tableRight.selection;//左边表格选中的数据
        this.tableData.push(...this.$refs.tableRight.selection);
        selectList.forEach((item) => {
          let index = this.selectedTableData.findIndex((_item) => _item.index === item.index);
          if (index !== undefined) {
            this.selectedTableData.splice(index, 1);
            var rightData={
              "Table_name":this.tableName,
              "xbyname":item.describe
            }
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/DelZDYGroupData_hgl", rightData).then(//删除（盒）已选著录项列表 
              (success) => {
              console.log(success,'删除（盒）已选著录项列表 ');
              },
              (err) => {
                console.log(err);
              }
            );
          }
        });
        this.$refs.tableRight.clearSelection();
        this.$refs.tableLeft.clearSelection();
      },
      moveUp(index,row) {//上移
        if (index <= 0) {
            this.$message.error('已经是第一条，不可上移');
            return;
        }
        // console.log(this.selectedTableData,'this.selectedTableData111111111111');

        console.log(index,row,'index,row11111111111111');
        console.log(row.describe,'当前要操作的行');
        var tempDescribeData='';
        var tempXsortData1='';
        var tempXsortData=[];


        this.selectedTableData.forEach((item,indexs) => {
          // console.log(item,index,'item,index');
          console.log(item.describe,'describe');
          console.log(item.xsort,'xsort');
          tempXsortData.push(item.xsort)
          tempDescribeData=tempDescribeData+item.describe+',';
        });
        console.log(tempXsortData,'tempXsortData');
        let x = this.selectedTableData[index-1].xsort, y = row.xsort;
        console.log(x,y,'xyxyxyxyxyxyyxyxyxyx');
        tempXsortData[index-1]=row.xsort;
        tempXsortData[index]=this.selectedTableData[index-1].xsort;
        // tempXsortData.splice(x - 1, 1, ...tempXsortData.splice(y - 1, 1, tempXsortData[x - 1]));
        console.log(tempXsortData,'tempXsortData处理之后的');
        console.log(tempDescribeData,'tempDescribeData');
        tempXsortData.forEach(item => {
          console.log(item,'itemitemitemitemitemitemitemitemitemitemitemitem');
          tempXsortData1=tempXsortData1+item+',';
        });

        // let upDate = this.selectedTableData[index - 1];
        // this.selectedTableData.splice(index - 1, 1);
        // this.selectedTableData.splice(index, 0, upDate);
        var updateZDYGroupData={
            "Table_name":this.tableName,
            "xbynames":tempDescribeData.substr(0,tempDescribeData.length-1),
            "xsorts":tempXsortData1.substr(0,tempXsortData1.length-1)
        }
        console.log(updateZDYGroupData,'updateZDYGroupData上移需要传递的数据');
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/updateZDYGroupxsort1_hgl", updateZDYGroupData).then(//上移
          (res) => {
            console.log(res,'上移上移上移上移');
            this.initSelected();
          },
          (err) => {
            console.log(err);
          }
        );
        
      },
      moveDown(index,row) {//下移
        if ((index + 1) === this.selectedTableData.length) {
          this.$message.error('已经是最后一条，不可下移');
        } else {
          // let downDate = this.selectedTableData[index + 1];
          // this.selectedTableData.splice(index + 1, 1);
          // this.selectedTableData.splice(index, 0, downDate);
        }

        console.log(index,row,'index,row11111111111111');
        console.log(row.describe,'当前要操作的行');
        var tempDescribeData='';
        var tempXsortData1='';
        var tempXsortData=[];


        this.selectedTableData.forEach((item,indexs) => {
          // console.log(item,index,'item,index');
          console.log(item.describe,'describe');
          console.log(item.xsort,'xsort');
          tempXsortData.push(item.xsort)
          tempDescribeData=tempDescribeData+item.describe+',';
        });
        console.log(tempXsortData,'tempXsortData');
        let x = this.selectedTableData[index+1].xsort, y = row.xsort;
        console.log(x,y,'xyxyxyxyxyxyyxyxyxyx');
        tempXsortData[index]=this.selectedTableData[index+1].xsort;
        tempXsortData[index+1]=row.xsort;
        // tempXsortData.splice(x - 1, 1, ...tempXsortData.splice(y - 1, 1, tempXsortData[x - 1]));
        console.log(tempXsortData,'tempXsortData处理之后的');
        console.log(tempDescribeData,'tempDescribeData');
        tempXsortData.forEach(item => {
          console.log(item,'itemitemitemitemitemitemitemitemitemitemitemitem');
          tempXsortData1=tempXsortData1+item+',';
        });

        // let upDate = this.selectedTableData[index - 1];
        // this.selectedTableData.splice(index - 1, 1);
        // this.selectedTableData.splice(index, 0, upDate);
        var updateZDYGroupData={
            "Table_name":this.tableName,
            "xbynames":tempDescribeData.substr(0,tempDescribeData.length-1),
            "xsorts":tempXsortData1.substr(0,tempXsortData1.length-1)
        }
        console.log(updateZDYGroupData,'updateZDYGroupData下下下移需要传递的数据');
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/updateZDYGroupxsort1_hgl", updateZDYGroupData).then(//下下下移
          (res) => {
            console.log(res,'下下下移');
            this.initSelected();
          },
          (err) => {
            console.log(err);
          }
        );
        
      },
      getRowKey(row){
        return;
      },
      dialogClose(){
        console.log('关闭弹框的点击事件');
        this.initSelected();
        this.getZDYGroupNode();

      },
      xialaone1(val) {
        console.log(val, 'sssssssssssssssssssss');
        if (val == '自定义分组') {
          this.settinging = true
        } else {
          this.settinging = false
        }
      },
      setting() {//档案盒的自定义项设置按钮
        console.log('设置按钮点击');
        this.dialogVisiblesetting=true;
        this.init();
        this.initSelected();
        // this.refreshSon=new Date().getTime();
      },
      handleNodeExpand(a,b,c){
        // console.log(a,b,c,'abcabcabcabcabcabcabc');
      },
      handleNodeClick(data,node,object) {
        console.log(data,'点击了树型结构当中的东西');
        console.log(node.level,'node.level');
        if(data==undefined){
          return;
        }
        if(node.level==1){//第一一一一一一一一一一一级
          var GetDAData={
              "MLIdList":this.MlId,
              "Table_name":this.tableName,
              "filter_hgl":data.xname+"='"+data.name+"'",
              "pIndex":1,
              "pSize":10,
          }
          console.log(GetDAData,'GetDADataGetDAData');
          this.$emit('change',GetDAData);

          if(this.selectedTableData.length==1){
            console.log('当前已选著录项只有一个');
            data.children=[];
            return;
          }
          var datas={
              "Table_name":this.tableName,
              "xname":this.selectedTableData[1].name,
              "sorttype":this.selectedTableData[1].sorttype,
              "filter":data.xname+"='"+data.name+"'"
          }
          console.log(datas,'传递的参数');
          axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetZDYGroupNode_hgl", datas).then(//（盒）获取(二级)自定义项的树型结构
            (success) => {
              var res=success.data.data;
              console.log(res,'（盒）获取(二级)自定义项的树型结构');
              data.children=[];
              res.forEach((items,index) => {
                const values1=Object.values(items);
                console.log(values1,'valuesvaluesvaluesvaluesvalues');
                data.children.push({
                  id: index,
                  name:values1[0],
                  xname:this.selectedTableData[1].name,
                  label: values1[0]+'('+items.count+')',
                  children:[{}],
                })
              });
            },
            (err) => {
              console.log(err);
            }
          );

        }else if(node.level==2){//第二二二二二二二二二二二二二级
          console.log(node.parent.data,'node');
          var tempsParentData=node.parent.data;

          var GetDAData={
              "MLIdList":this.MlId,
              "Table_name":this.tableName,
              "filter_hgl":tempsParentData.xname+"='"+tempsParentData.name+"' and "+data.xname+"='"+data.name+"'",
              "pIndex":1,
              "pSize":10,
          }
          this.$emit('change',GetDAData);
          if(this.selectedTableData.length==2){
            console.log('当前已选著录项有两个');
            data.children=[];
            return;
          }
          var datas={
              "Table_name":this.tableName,
              "xname":this.selectedTableData[2].name,
              "sorttype":this.selectedTableData[2].sorttype,
              "filter":tempsParentData.xname+"='"+tempsParentData.name+"' and "+data.xname+"='"+data.name+"'"
          }
          console.log(datas,'获取(三级)传递的参数');
          axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetZDYGroupNode_hgl", datas).then(//（盒）获取(三级)自定义项的树型结构
            (success) => {
              var res=success.data.data;
              console.log(res,'（盒）获取(三级)自定义项的树型结构');
              data.children=[];
              res.forEach((items,index) => {
                const values1=Object.values(items);
                console.log(values1,'valuesvaluesvaluesvaluesvalues');
                data.children.push({
                  id: index,
                  name:values1[0],
                  xname:this.selectedTableData[2].name,
                  label: values1[0]+'('+items.count+')',
                  children:[{}],
                })
              });
            },
            (err) => {
              console.log(err);
            }
          );


        }else if(node.level==3){//第三三三三三三三三三三三三三级
          console.log(node.parent.data,'node');
          console.log(node.parent.parent.data,'node.parent.data');
          console.log(this.selectedTableData,'this.selectedTableData[3].name');
          var tempsParentData1=node.parent.parent.data;
          var tempsParentData=node.parent.data;

          var GetDAData={
              "MLIdList":this.MlId,
              "Table_name":this.tableName,
              "filter_hgl":tempsParentData1.xname+"='"+tempsParentData1.name+"' and "+tempsParentData.xname+"='"+tempsParentData.name+"' and "+data.xname+"='"+data.name+"'",
              "pIndex":1,
              "pSize":10,
          }
          this.$emit('change',GetDAData);

          if(this.selectedTableData.length==3){
            console.log('当前已选著录项有三个');
            data.children=[];
            return;
          }

          var datas={
                "Table_name":this.tableName,
                "xname":this.selectedTableData[3].name,
                "sorttype":this.selectedTableData[3].sorttype,
                "filter":tempsParentData1.xname+"='"+tempsParentData1.name+"' and "+tempsParentData.xname+"='"+tempsParentData.name+"' and "+data.xname+"='"+data.name+"'"
            }
            console.log(datas,'获取(四级)传递的参数');
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetZDYGroupNode_hgl", datas).then(//（盒）获取(三级)自定义项的树型结构
              (success) => {
                console.log(success,'success');
                var res=success.data.data;
                data.children=[];
                if(res==null){
                  console.log('四级--返回的数据为空');
                  return;
                }
                console.log(res,'（盒）获取(四级)自定义项的树型结构');
                res.forEach((items,index) => {
                  const values1=Object.values(items);
                  console.log(values1,'valuesvaluesvaluesvaluesvalues');
                  data.children.push({
                    id: index,
                    name:values1[0],
                    xname:this.selectedTableData[3].name,
                    label: values1[0]+'('+items.count+')',
                    children:[{}],
                  })
                });
              },
              (err) => {
                console.log(err);
              }
            );
        }else if(node.level==4){//第四四四四四四四四四四四四四级
          console.log(node.parent.data,'node');
          console.log(node.parent.parent.data,'node.parent.data');
          console.log(this.selectedTableData,'this.selectedTableData[3].name');
          var tempsParentData2=node.parent.parent.parent.data;
          var tempsParentData1=node.parent.parent.data;
          var tempsParentData=node.parent.data;

          var GetDAData={
              "MLIdList":this.MlId,
              "Table_name":this.tableName,
              "filter_hgl":tempsParentData2.xname+"='"+tempsParentData2.name+"' and "+tempsParentData1.xname+"='"+tempsParentData1.name+"' and "+tempsParentData.xname+"='"+tempsParentData.name+"' and "+data.xname+"='"+data.name+"'",
              "pIndex":1,
              "pSize":10,
          }
          this.$emit('change',GetDAData);

          if(this.selectedTableData.length==4){
            console.log('当前已选著录项有四个');
            data.children=[];
            return;
          }

          var datas={
                "Table_name":this.tableName,
                "xname":this.selectedTableData[4].name,
                "sorttype":this.selectedTableData[4].sorttype,
                "filter":tempsParentData2.xname+"='"+tempsParentData2.name+"' and "+tempsParentData1.xname+"='"+tempsParentData1.name+"' and "+tempsParentData.xname+"='"+tempsParentData.name+"' and "+data.xname+"='"+data.name+"'"
            }
            console.log(datas,'获取(五级)传递的参数');
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetZDYGroupNode_hgl", datas).then(//（盒）获取(五级)自定义项的树型结构
              (success) => {
                console.log(success,'success');
                var res=success.data.data;
                data.children=[];
                if(res==null){
                  console.log('五级--返回的数据为空');
                  return;
                }
                console.log(res,'（盒）获取(五级)自定义项的树型结构');
                res.forEach((items,index) => {
                  const values1=Object.values(items);
                  console.log(values1,'valuesvaluesvaluesvaluesvalues');
                  data.children.push({
                    id: index,
                    name:values1[0],
                    xname:this.selectedTableData[4].name,
                    label: values1[0]+'('+items.count+')',
                    children:[{}],
                  })
                });
              },
              (err) => {
                console.log(err);
              }
            );
        }else if(node.level==5){//第五五五五五五五五五五五五级
          console.log(node.parent.data,'node');
          console.log(node.parent.parent.data,'node.parent.data');
          console.log(this.selectedTableData,'this.selectedTableData[3].name');
          var tempsParentData3=node.parent.parent.parent.parent.data;
          var tempsParentData2=node.parent.parent.parent.data;
          var tempsParentData1=node.parent.parent.data;
          var tempsParentData=node.parent.data;

          var GetDAData={
              "MLIdList":this.MlId,
              "Table_name":this.tableName,
              "filter_hgl":tempsParentData3.xname+"='"+tempsParentData3.name+"' and "+tempsParentData2.xname+"='"+tempsParentData2.name+"' and "+tempsParentData1.xname+"='"+tempsParentData1.name+"' and "+tempsParentData.xname+"='"+tempsParentData.name+"' and "+data.xname+"='"+data.name+"'",
              "pIndex":1,
              "pSize":10,
          }
          this.$emit('change',GetDAData);

          if(this.selectedTableData.length==5){
            console.log('当前已选著录项有五个');
            data.children=[];
            return;
          }

          var datas={
                "Table_name":this.tableName,
                "xname":this.selectedTableData[5].name,
                "sorttype":this.selectedTableData[5].sorttype,
                "filter":tempsParentData3.xname+"='"+tempsParentData3.name+"' and "+tempsParentData2.xname+"='"+tempsParentData2.name+"' and "+tempsParentData1.xname+"='"+tempsParentData1.name+"' and "+tempsParentData.xname+"='"+tempsParentData.name+"' and "+data.xname+"='"+data.name+"'"
            }
            console.log(datas,'获取(六级)传递的参数');
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetZDYGroupNode_hgl", datas).then(//（盒）获取(六级)自定义项的树型结构
              (success) => {
                console.log(success,'success');
                var res=success.data.data;
                data.children=[];
                if(res==null){
                  console.log('六级--返回的数据为空');
                  return;
                }
                console.log(res,'（盒）获取(六级)自定义项的树型结构');
                res.forEach((items,index) => {
                  const values1=Object.values(items);
                  console.log(values1,'valuesvaluesvaluesvaluesvalues');
                  data.children.push({
                    id: index,
                    name:values1[0],
                    xname:this.selectedTableData[5].name,
                    label: values1[0]+'('+items.count+')',
                    children:[{}],
                  })
                });
              },
              (err) => {
                console.log(err);
              }
            );
        }


      },

    },
};
</script>
<style scoped>
.box_cm {
  display: flex;
    height: 45vh;
}

.box_cm .box_cm_list {
  width: 48%;
}

.box_cm .box_cm_list_cm {
  width: 6%;
  height: 50vh;
  text-align: center;
  padding-top: 14vh;
}

.box_cm .box_cm_list_cm div {
  line-height: 5vh;
}

.newisCollapse {
  /* position: relative; */
  /* display: flex; */
  height: 97.5%;
  /* background-color: red; */
  border-radius: .5vw;
  border: 2px solid #ccc;


}
.oldclassDaH{
  height:25vh;
  width: 110%;
  background:#fff;
  overflow-y: scroll;
}
.newclassDaH{
  height:58vh;
  width: 112%;
  background:#fff;
  overflow-y: scroll;
}
.el-tree{
  font-size: .7vw;
}
.tree-text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  width: 100%;
}

</style>
