<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:13
 * @LastAuthor: wukai
 * @lastTime: 2019-05-31 14:51:07
 -->
<template>
  <div class="navLogin">
    <img class="backLogo" src="../../assets/fanhui.png" @click="backJump" alt>
    {{name}}
  </div>
</template>

<script>
export default {
  name: "NavBacks",
  props: ["name"],
  methods: {
    backJump() {
      //返回上一页
      this.$emit("backjump");
    }
  }
};
</script>

<style scoped>
.navLogin {
  font-size: 0.32rem;
  color: white;
  height: 0.88rem;
  line-height: 0.88rem;
}
.backLogo {
  width: 0.4rem;
  position: absolute;
  top: 0.64rem;
  left: 0.32rem;
}
</style>