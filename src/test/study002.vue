<template>
<div class="container">
    <el-dialog width="60%" title="高级搜索" :visible.sync="muitisearchVisible" append-to-body>
        <el-form>
            <el-form-item>
                <el-descriptions title="搜索条件" border>
                    <template  slot="extra">
                        <el-button type="primary" icon="el-icon-refresh-right" circle  @click="reset()" ></el-button>
                        <el-button type="success" icon="el-icon-folder-add" circle @click="add()" ></el-button>
                        <el-button type="danger" icon="el-icon-folder-remove" circle @click="remove()" ></el-button>
                    </template>
                    <template v-for="(item, index) in RecordInputList">
                    <el-descriptions-item :key="index">
                        <template slot="label">
                        <i class="el-icon-tickets" />搜索条件{{ item.label }}
                        </template>
                        <el-select v-model="item.value" style="width: 10vw;margin-left: auto;" placeholder="请选择活动区域" >
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                        <el-select style="width: 10vw;margin-left: auto;" placeholder="请选择活动区域">
                            <el-option label="等于" value="shanghai"></el-option>
                            <el-option label="不等于" value="shanghai"></el-option>
                            <el-option label="大于" value="beijing"></el-option>
                            <el-option label="小于" value="beijing"></el-option>
                            <el-option label="包含" value="beijing"></el-option>
                        </el-select>
                        <el-input style="width: 10vw;margin-left: auto;" v-model="item.value"></el-input>
                    </el-descriptions-item>
                    </template>
                </el-descriptions>
            </el-form-item>
          
            <el-form-item>
                <el-descriptions title="排序方式" border>
                    <template v-for="(item, index) in RecordInputList">
                    <el-descriptions-item :key="index">
                        <template slot="label">
                        <i class="el-icon-tickets" />搜索条件{{ item.label }}
                        </template>
                        <el-select v-model="item.value" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                        <el-select v-model="item.value" placeholder="请选择活动区域">
                            <el-option label="升序" value="shanghai"></el-option>
                            <el-option label="降序" value="beijing"></el-option>
                        </el-select>
                    </el-descriptions-item>
                    </template>
                </el-descriptions>
            </el-form-item>
            <el-form-item>
                <el-button @click="reset()" >复位搜索条件</el-button>
                <el-button @click="add()" >添加搜索条件</el-button>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-aline: center">
            <el-button type="primary" icon="el-icon-refresh-left"   @click="mjj_edit_Visible = false">取 消</el-button>
            <el-button type="danger" icon="el-icon-search">搜索</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
// import study003 from "@/views/a02_dagl/ViewTongJi.vue"
import study003 from "@/test/study003.vue"
export default {
    components:{
        study003
    },
    data() {
        return{
            ColCn:5,
            muitisearchVisible:true,
            RecordInputList:[
                {
                    label:"1",
                    value:"123123"
                }
            ]
        }
    },
    mounted(){
    },
    methods:{
        reset(){
           this.RecordInputList=[
                {
                    label:"1",
                    value:"123123"
                }
            ]
        },
        add(){
            var data={};
            data.label=(this.RecordInputList.length+1)+"";
            data.value="123";
            this.RecordInputList.push(data)
        },
        remove(){
            this.RecordInputList.pop();
        }
    }
}
</script>
<style scoped lang="scss">
.container{
    display: flex;
    flex-wrap: wrap;

    .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}

</style>
