<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-28 17:25:29
 * @LastAuthor: wukai
 * @lastTime: 2019-05-28 17:42:17
 -->
<template>
  <div>
    <!-- 底部抽屉 -->
    <mu-bottom-sheet :open.sync="open">
      <!-- 地址列表 -->
      <div class="sheetTitleq">选择地址</div>
      <div class="gaird g1"></div>
      <div class="contentBox">
        <div
          class="itemsBox"
          @click="changeJump(index)"
          v-for="(ads, index) in dataLists"
          :key="index"
        >
          <div class="name">{{ads.name}}</div>
          <span class="tels">
            {{ads.tel}}
            <template>
              <span v-if="ads.bq=='默认'" class="bq">{{ads.bq}}</span>
              <span v-else class="bq bq1">{{ads.bq}}</span>
            </template>
          </span>
          <img
            @click.stop="changeAdds(index)"
            class="changeAddressLogo"
            src="../../assets/xiugai.png"
            alt
          >
          <div class="adds">{{ads.add}}</div>
          <div class="gaird"></div>
        </div>
      </div>
      <div class="footg"></div>
      <!-- 底部 -->
      <div class="footNavs" v-waves @click="newAddressJump">
        <img class="addImg" src="../../assets/54.png" alt>
        <span>新建地址</span>
      </div>
    </mu-bottom-sheet>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import addsLists from "./data";
export default {
  name: "BottomSheet",
  directives: {
    waves
  },

  data() {
    return {
      open: false,
      dataLists: addsLists.addsLists
    };
  },
  mounted() {},
  methods: {
    // 关闭
    closeBottomSheet() {
      this.open = false;
    },
    // 打开下拉选框
    openBotttomSheet() {
      this.open = true;
    },
    // 修改地址
    changeAdds(index) {
      console.log(index);
    },
    // 确认地址
    changeJump(index) {
      var dataList = this.dataLists[index];
      this.open = false;
      this.$emit("changeJump", dataList);
    },
    //新建地址跳转
    newAddressJump() {
      setTimeout(() => {
        this.$router.push({
          path: "/MapDemo"
        });
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
/*抽屉导航*/
.contentBox {
  width: 100%;
  max-height: 9rem;
  overflow: hidden;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  /* background-color: antiquewhite; */
}
.itemsBox {
  width: 100%;
  padding: 0.32rem 0.32rem 0 0.32rem;
  background-color: #fff;
  text-align: left;
  /* margin-top: 0.1rem; */
  position: relative;
}
.name {
  font-size: 0.36rem;
  color: black;
  display: inline-block;
}
.tels {
  position: absolute;
  left: 2.1rem;
  font-size: 0.3rem;
}
.adds {
  font-size: 0.24rem;
  margin-top: 0.12rem;
  width: 80%;
  text-align: left;
}
.bq {
  margin-left: 0.12rem;
  background-color: red;
  display: inline-block;
  font-size: 0.2rem;
  color: #fff;
  width: 0.84rem;
  height: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  border-radius: 0.4rem;
}
.bq1 {
  background-color: rgb(51, 51, 230);
}
.changeAddressLogo {
  position: absolute;
  width: 0.68rem;
  right: 0.32rem;
  top: 0.88rem;
}
.gaird {
  width: 100%;
  border: 0.02rem solid #f9f9f9;
  margin-top: 0.32rem;
}
.g1 {
  margin-top: 0rem;
}
.sheetTitleq {
  font-size: 0.34rem;
  text-align: center;
  width: 100%;
  height: 0.86rem;
  line-height: 0.86rem;
  /* background-color: #ee8018; */
}
.footNavs {
  width: 100%;
  height: 0.88rem;
  background-color: #f9f9f9;
  position: fixed;
  bottom: 0;
  text-align: center;
  line-height: 0.88rem;
}
.footg {
  width: 100%;
  height: 1.2rem;
  background-color: #f9f9f9;
}
.addBox {
  width: 80%;
  height: 0.88rem;
  line-height: 0.88rem;
  color: white;
  background-color: red;
  margin: 0.2rem auto;
  border-radius: 1rem;
}
.footNavs span {
  font-size: 0.34rem;
  /* margin-top: -0.1rem; */
  position: relative;
  top: -0.18rem;
  letter-spacing: 0.08rem;
}
.addImg {
  height: 0.56rem;
  margin: 0rem 0.1rem 0 0;
  /* position: absolute; */
}
</style>