<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:13
 * @LastAuthor: wukai
 * @lastTime: 2019-05-31 14:52:09
 -->
<template>
  <div class="HomeBox">
    <div class="navBox" :style="rgbs">
      <div class="Bas"></div>
      <div class="navLogin">{{name}}</div>
    </div>
    <div class="gaidm"></div>
    <!-- 主体内容 -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavBack1",
  props: ["name"],
  computed: {
    ...mapGetters(["roles", "rgbs"])
  },
  methods: {
    backJump() {
      //返回上一页
      this.$emit("backjump");
    }
  }
};
</script>

<style scoped>
.HomeBox {
  background-color: #f9f9f9;
  width: 100%;
  /* position: fixed; */
  height: 100%;
}
.navBox {
  height: 1.28rem;
  width: 100%;
  /* background-image: linear-gradient(-137deg, #ee8018 0%, #fbda61 100%); */
  position: fixed;
  z-index: 100000;
}
.Bas {
  width: 100%;
  height: 0.4rem;
}
.gaidm {
  width: 100%;
  height: 1.28rem;
}
.navLogin {
  font-size: 0.3rem;
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