<template>
    <div style="width:100%;height:100vh">
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="月份">
                <el-select ref="select" v-model="sizeForm.region" placeholder="请选择月份"  @change="changeValue()">
                    <el-option label="一月" value="1"></el-option>
                    <el-option label="二月" value="2"></el-option>
                    <el-option label="三月" value="3"></el-option>
                    <el-option label="四月" value="4"></el-option>
                </el-select>

                <el-select v-model="rfidgjx"  placeholder="请选择" style="width: 100%;"  @change="changeValue()"  :selected="0">
                        <el-option v-for="item in rfidgjxoptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                </el-select>     
            </el-form-item>
        </el-form>
    </div>
    
</template>
<script>
export default {
    data() {
        return {
            sizeForm: {
                name: '',
                region: '',
            },
            rfidgjxoptions: [{
                value: 0,
                label: '无挂接'
                }, {
                value: '1',
                label: '信息项'
                }, {
                value: '2',
                label: '编号项'
                },
            ],
            rfidgjx:0,
        };
    },
    created() {
    },
    methods: {
      changeValue() {
        console.log("12");
        console.log('submit!',this.sizeForm.region);
        console.log('submit!',this.rfidgjx);

        
      }
    }
}
</script>