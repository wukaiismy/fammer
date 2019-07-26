<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-22 14:33:37
 * @LastAuthor: wukai
 * @lastTime: 2019-06-21 14:16:55
 -->
<template>
  <div>
    <!-- <div class="Bas"></div> -->
    <NavBack name="美食商城"/>

    <!-- <div class="allShow" @click="allShows">全部美食</div> -->
    <!-- 下面是具体的列表 -->
    <div class="showBigBox">
      <!-- 左边固定栏 -->
      <div class="showLightBox">
        <div
          v-for="(item, index) in titleList"
          :key="index"
          :class="selected==index?'slected':''"
          @click="jumpClass(index)"
        >{{item}}</div>
      </div>
      <!-- 右边固定栏 -->
      <div class="showRightBox">
        <div class="titleNum">共 {{number}} 种美食</div>
        <!-- 下面是组件展示页 -->
        <div class="contentBox">
          <!--is 特性动态绑定子组件 keep-alive 将切换出去的组件保留在内存中 -->
          <keep-alive>
            <component :is="componentId" @numbers="numbers"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBack from "../public/NavBack1";
import Food1 from "./public/Food1";
import Food2 from "./public/Food2";
import Food3 from "./public/Food3";
import Food4 from "./public/Food4";
export default {
  name: "FoodList",
  components: { NavBack, Food1, Food2, Food3, Food4 },
  data() {
    return {
      componentId: Food1,
      titleList: ["好吃点", "小零食", "川辣味", "味百鲜"],
      componentIdList: [Food1, Food2, Food3, Food4],
      selected: 0,
      number: 0
    };
  },
  created() {},
  methods: {
    // 选择分类
    jumpClass(index) {
      this.componentId = this.componentIdList[index];
      this.selected = index;
      // 下面进行对应的Ajax请求
    },
    // 获取数量
    numbers(val) {
      console.log(val);
      this.number = val;
    }
  }
};
</script>

<style scoped>
.showBigBox {
  /* background-color: palegoldenrod; */
  width: 100%;
  padding: 0;
  margin: 0 auto 0.32rem;
  position: relative;
  text-align: left;
}
.showLightBox {
  width: 20%;
  /* background-color: aqua; */
  display: inline-block;
}
.showLightBox div {
  color: black;
  letter-spacing: 0.06rem;
  margin: 0.32rem auto;
  text-align: center;
  font-size: 0.26rem;
  /* background-color: rgb(20, 170, 170); */
}
.showLightBox .slected {
  color: red;
}
.showRightBox {
  width: 80%;
  height: 12rem;
  border-left: 0.04rem solid #f1f1f1;
  margin-left: 0;
  display: inline-block;
  /* background-color: antiquewhite; */
  position: absolute;
  top: 0rem;
  padding: 0.1rem;
}
.titleNum {
  text-align: left;
  font-size: 0.28rem;
  height: 0.36rem;
  padding-left: 0.32rem;
  /* background-color: #ee8018; */
}
.contentBox {
  width: 100%;
  height: 95%;
  /* background-color: #fbda61; */
  overflow-y: auto;
  margin-top: 0.32rem;
  padding-bottom: 1.4rem;
  /* padding: 0.32rem; */
}
</style>