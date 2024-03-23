<template>
<div class="container">
    <!-- <div class="item" style="
        background-color: greenyellow;"></div>
    <div class="item" style="
        background-color: black;"></div>
    <div class="item" style="
        background-color: green;"></div>
    <div class="item" style="
        background-color: red;"></div> -->

    <!-- <study003 ref="child" :parentMethod="parentMethod"></study003> -->
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

        }
    },
    mounted(){
       
        console.log( this.$refs.child.title," this.$refs.child.title");
        this.$refs.child.title="adfadfadsf";
    },
    methods:{
        parentMethod(){
            this.$refs.child.title="aafadfadfsd。";
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
