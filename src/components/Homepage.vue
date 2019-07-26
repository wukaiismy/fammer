<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:12
 * @LastAuthor: wukai
 * @lastTime: 2019-06-10 17:06:43
 -->
<template>
  <div>
    <!-- 导航栏 -->
    <HomePageTop/>
    <!-- 主体内容 -->

    <div class="personMsg">
      <mu-tabs
        :value.sync="active1"
        inverse
        color="secondary"
        text-color="rgba(0, 0, 0, .54)"
        center
      >
        <mu-tab>推荐</mu-tab>
        <mu-tab>美食</mu-tab>
        <mu-tab>关注</mu-tab>
      </mu-tabs>
      <div class="demo-text" v-if="active1 === 0">
        <Recommend/>
      </div>
      <div class="demo-text" v-if="active1 === 1">
        <FoodList/>
      </div>
      <div class="demo-text" v-if="active1 === 2">
        <Attentions/>
      </div>
    </div>

    <div class="footNbf"></div>
    <!-- 刷新按钮 -->
    <!-- <div class="refrenchBox" v-loading="loading1" data-mu-loading-size="24" @click="lodings">
      <img src="../assets/shuaxin.png" alt>
    </div>-->
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import HomePageTop from "./public/HomePageTop";
import Recommend from "./homepage/Recommend";
import FoodList from "./homepage/FoodList";
import Attentions from "./homepage/Attentions";
import { mapGetters } from "vuex";

export default {
  name: "Homepage",
  directives: {
    waves
  },
  data() {
    return {
      active1: 0,
      indexs: false,
      loading1: false
    };
  },
  computed: {
    ...mapGetters(["roles", "name", "ids", "avatar", "power"])
  },
  created() {},
  mounted() {},

  methods: {
    lodings() {
      this.loading1 = true;
      setTimeout(() => {
        this.loading1 = false;
      }, 3000);
    }
  },
  destroyed() {},
  components: {
    Recommend,
    Attentions,
    FoodList,
    HomePageTop
  }
};
</script>

<style scoped>
.personMsg {
  width: 100%;
  padding: 0.01rem;
  /* background-color: white; */
  text-align: left;
  margin: -0.01rem auto;
}
.personMsg >>> .mu-tabs {
  position: fixed;
  /* background-color: palegoldenrod; */
  z-index: 100000;
}
.personMsg >>> .mu-tab {
  font-size: 0.28rem;
  min-width: 1.44rem;
  max-width: 5.28rem;
  /* position: fixed; */
}
.personMsg >>> .mu-tab-link-highlight {
  width: 1.44rem !important;
  height: 0;
}

.footNbf {
  width: 100%;
  height: 1rem;
  background-color: #f9f9f9;
}
.ssas {
  width: 0.88rem;
  height: 0.88rem;
}
.icon {
  width: 0.68rem;
  height: 0.68rem;
  vertical-align: 0.21rem;
  fill: #ee8018;
  overflow: hidden;
}
.refrenchBox {
  position: fixed;
  z-index: 10000;
  bottom: 1.6rem;
  right: 0.32rem;
  background-color: white;
  line-height: 100%;
  border-radius: 50%;
  -moz-box-shadow: 0px 0px 0.04rem #666666;
  -webkit-box-shadow: 0px 0px 0.04rem #666666;
  box-shadow: 0px 0px 0.04rem #666666;
}
.refrenchBox img {
  width: 0.64rem;
}
.demo-text {
  /* background-color: cadetblue; */
  margin: 0.6rem auto 0.32rem;
}
</style>