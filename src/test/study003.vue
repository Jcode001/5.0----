<template>
<div class="container">
    <!-- <div class="item" style="
        background-color: greenyellow;"></div>
    <div class="item" style="
        background-color: black;"></div>
    <div class="item" style="
        background-color: green;"></div>
    <div class="item" style="
        background-color: red;"></div>
        {{title}}
        <el-button @click="onclick">123123</el-button> -->
</div>
</template>
<script>
export default {
    data() {
        return{
           title:"世界美好！"
        }
    },
    props: {
        parentMethod: {
            type: Function,
            default: () => null
        }
    },
    methods:{
        onclick(){
           this.$parent.parentMethod();
        }
    }
}
</script>
<style scoped lang="scss">
.container{
    display: flex;
    flex-wrap: wrap;

    .item{
        flex-grow: 1;
        flex-basis: 200;
        width: 2rem;
        height: 2rem;
    }

}
</style>
