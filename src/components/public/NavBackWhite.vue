<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-29 14:48:30
 * @LastAuthor: wukai
 * @lastTime: 2019-05-29 16:05:59
 -->
<template>
  <div class="HomeBox">
    <div class="navBox" :style="rgbs">
      <div class="Bas"></div>
      <div class="navLogin">
        <svg @click="backJump" class="icon" :style="'fill:'+ colors" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <!-- <img class="backLogo" src="../../assets/fanhui.png" @click="backJump" alt> -->
        {{name}}
      </div>
    </div>
    <div class="gaidm"></div>
    <!-- 主体内容 -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBackWhite",
  props: ["name"],
  computed: {
    ...mapGetters(["roles", "rgbs"])
  },
  data() {
    return {
      colors: "white"
    };
  },
  mounted() {
    console.log(this.roles);
    console.log(this.rgbs);
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
  z-index: -1;
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
  font-size: 0.36rem;
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
.icon {
  width: 0.4rem;
  position: absolute;
  top: 0.44rem;
  left: 0.32rem;
  fill: white;
  overflow: hidden;
  height: 0.88rem;
  /* line-height: 0.88rem; */
}
</style>