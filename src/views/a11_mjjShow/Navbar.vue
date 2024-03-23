<template>
  <div class="navbar">
    <span class="icon_goback">
      <!-- <svg-icon icon-class="back" @click.native="goback" /> -->
    </span>
    <!-- <span class="icon_gengduo">
      <svg-icon icon-class="more" @click.native="gengduo" />
    </span> -->
    <h2>{{ name }}</h2>
  </div>
</template>

<script>
// import { Avatar } from 'element-ui';
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  props: ['name'],
  components: {
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    async goback() {//返回上一级
      // await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.back();
      // this.$router.push(`/home`);
    },
    gengduo() {//更多按钮
      // console.log(Avatar,'avatar')
      // this.$message({
      //   message: "更多功能正在开发",
      //   type: "info",
      // });
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 3vw;
  line-height: .1vw;
  overflow: hidden;
  position: relative;
  background: rgb(24, 61, 228);
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  h2 {
    text-align: center;
    color: aliceblue;
    margin-top: 1.4vw;
    font-size: 1.8vw;
  }

  .icon_goback {
    float: left;
    height: 100%;
    line-height: 1.5vw;
    margin-top: .625vw;
    margin-left: .4vw;
  }

  .icon_gengduo {
    float: right;
    height: 100%;
    line-height: 60px;
    margin-top: .625rem;
    margin-right: 15px;
  }

  .svg-icon {
    font-size: 1.875vw;
  }
}
</style>
