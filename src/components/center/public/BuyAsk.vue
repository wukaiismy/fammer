<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-27 14:44:33
 * @LastAuthor: wukai
 * @lastTime: 2019-06-21 14:31:49
 -->
<template>
  <div>
    <NavBack name="发布求购" @backjump="backjump"/>
    <div class="bigBoxShows">
      <div class="addMsg">
        <span class="addTitle">求购商品</span>
        <div class="rightBox">
          <input type="text" v-model="storeData.name" class="rightBoxIpt" placeholder="请填写求购商品名称">
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">产地</span>
        <div class="rightBox">
          <input type="text" v-model="storeData.adds" class="rightBoxIpt" placeholder="求购产品产地">
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">数量</span>
        <div class="rightBox">
          <input
            type="text"
            v-model="storeData.num"
            class="rightBoxIpt"
            placeholder="请输入预定购数量，如10斤、20只"
          >
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">价格</span>
        <div class="rightBox">
          <input
            type="text"
            v-model="storeData.money"
            class="rightBoxIpt"
            placeholder="请输入价格，如：50-100"
          >
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">预计时间</span>
        <div class="rightBox">
          <mu-date-input
            v-model="storeData.times"
            @change="changesTime"
            container="dialog"
            label-float
            full-width
            no-display
            :solo="cons"
          ></mu-date-input>
        </div>
      </div>

      <!-- 地址栏 -->
      <div class="addressBox">
        <div class="addMsg">
          <span class="addTitle">联系人</span>
          <div class="rightBox">
            <span class="rightBoxIpt">{{dataList.name}}</span>
          </div>
          <div class="gaird1"></div>
        </div>
        <div class="addMsg">
          <span class="addTitle">联系电话</span>
          <div class="rightBox">
            <span class="rightBoxIpt">{{dataList.tel}}</span>
          </div>
          <div class="gaird1"></div>
        </div>
        <div class="addMsg">
          <span class="addTitle">地址</span>
          <div class="rightBox" @click="openBotttomSheet">
            <span class="rightBoxIpt rt1">{{dataList.add}}</span>
            <img class="rightBoxLocalForward" src="../../../assets/forward@2x.png" alt>
          </div>
          <div class="gaird1"></div>
        </div>
      </div>
    </div>
    <!-- 底部导航 -->
    <div class="footNav" v-waves @click="jumpSubmit">提交</div>

    <!-- 底部抽屉 -->
    <BottomSheet ref="open" @changeJump="changeJump"/>
  </div>
</template>

<script>
import NavBack from "../../public/NavBack";
import waves from "@/directive/waves"; // 水波纹指令

import BottomSheet from "../../public/BottomSheet";
export default {
  name: "BuyAsk",
  directives: {
    waves
  },
  components: { NavBack, BottomSheet },
  data() {
    return {
      cons: true,
      storeData: {
        name: "",
        adds: "",
        num: "",
        money: "",
        times: null
      },
      dataList: {
        name: "吴先生",
        tel: "135*****0385",
        add: "四川省成都市高新区交子金融科技中心高新区交子金融科技中心"
      }
    };
  },
  methods: {
    backjump() {
      this.$router.push({
        path: "/MyCenter"
      });
    },
    // 提交按钮
    jumpSubmit() {
      console.log(this.storeData);
    },
    // 打开下拉选框
    openBotttomSheet() {
      this.$refs.open.openBotttomSheet();
    },
    // 确认地址
    changeJump(val) {
      console.log(val);
      this.dataList = val;
    },
    changesTime() {
      var str = this.storeData.times;
      var date = new Date(str);
      var date_value =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.storeData.times = date_value;
      console.log(this.storeData.times);
    }
  }
};
</script>

<style lang="scss" scoped>
.addMsg {
  width: 100%;
  padding: 0.32rem 0.32rem 0 0.32rem;
  background-color: #fff;
  position: relative;
  text-align: left;
}
.addTitle {
  font-size: 0.28rem;
  position: absolute;
}
.rightBox {
  width: 85%;
  padding-left: 0.32rem;
  padding-right: 0.32rem;
  position: relative;
  margin-left: 1.2rem;
  top: 0rem;
  font-size: 0.28rem;
}
.gaird1 {
  width: 100%;
  border: #f9f9f9 solid 0.02rem;
  margin-top: 0.32rem;
}
.jumpInput {
  color: #999999;
}
.rightBoxIpt {
  width: 100%;
  height: 100%;
  outline: none;
  border-width: 0;
  caret-color: #ee8018;
  font-size: 0.26rem;
}
.rt1 {
  width: 85%;
}
/* 时间选择器样式*/
.rightBox >>> .mu-input {
  font-size: 0.26rem;
  width: 100%;
  min-height: 0.96rem;
  margin-bottom: 0rem;
  padding-bottom: 0px;
  padding-top: 0;
  margin-top: -0.08rem;
}
.addressBox {
  padding: 0rem;
  background-color: #fff;
  margin-top: 0.32rem;
}
.rightBoxLocalForward {
  position: absolute;
  width: 0.16rem;
  position: absolute;
  right: 0.21rem;
  top: 0.08rem;
}
.footNav {
  width: 100%;
  height: 1rem;
  background-color: #ee8018;
  position: fixed !important;
  bottom: 0;
  color: #fff;
  line-height: 1rem;
  font-size: 0.34rem;
}
</style>