<template>
  <div>
    <NavBack name="接单页面" @backjump="backjump"/>
    <!-- 主体内容 -->
    <div class="orderMsgBox">
      <img class="orderMsgBoxLogo" src="../../assets/buss/tixing.png" alt>
      您已接收
      <span>张先生</span>的普通保洁订单，请带好工具以及相关证明尽快上门。
    </div>
    <div class="contentBigBox">
      <div class="contentItem">
        <span class="contentItemTitle">客户姓名：</span>
        <span class="contentItemAddress">{{dataList.name}}</span>
      </div>
      <div class="contentItem">
        <span class="contentItemTitle">联系方式：</span>
        <span class="contentItemAddress">{{dataList.tel}}</span>
      </div>
      <div class="contentItem">
        <span class="contentItemTitle">到达时间：</span>
        <span class="contentItemAddress Times">{{dataList.time}}</span>
      </div>
      <div class="contentItem">
        <span class="contentItemTitle">订单编号：</span>
        <span class="contentItemAddress">{{dataList.orderNum}}</span>
      </div>
      <div class="contentItem">
        <span class="contentItemTitle">服务地址：</span>
        <span class="contentItemAddress">{{dataList.add}}</span>
      </div>
    </div>
    <!-- 倒计时 -->
    <div class="timeEnd">
      <div class="timeEndTitle">上门倒计时</div>
      <CountDown
        class="aasass"
        v-on:start_callback="countDownS_cb(1)"
        v-on:end_callback="countDownE_cb(1)"
        :currentTime="1481450110"
        :startTime="1481440110"
        :endTime="1481451115"
        :tipText="'距离开始文字1'"
        :tipTextEnd="'距离结束文字1'"
        :endText="'结束自定义文字2'"
        :dayTxt="'天'"
        :hourTxt="':'"
        :minutesTxt="':'"
        :secondsTxt="''"
      />
    </div>
    <!-- 下面是导航和到达显示 -->
    <div class="navShowsBoxs">
      <mu-row>
        <mu-col @click="navJump" span="6" class="itemNav" v-waves>
          <img class="itemNavLogo" src="../../assets/buss/daohang.png" alt>
          <div class="title">导航</div>
        </mu-col>
        <mu-col @click="workJump" span="6" class="itemNav da" v-waves>
          <img class="itemNavLogo" src="../../assets/buss/wancheng.png" alt>
          <div class="title">到达</div>
        </mu-col>
      </mu-row>
    </div>
    <div class="shuoM">（请确保手机安装有高德地图等APP，推荐使用高德地图）</div>
  </div>
</template>

<script>
import NavBack from "../public/NavBack";
import waves from "@/directive/waves"; // 水波纹指令
import CountDown from "vue2-countdown";
import { mapGetters } from "vuex";
import openMapApp from "../business/public/Nav.js";
export default {
  name: "SubmitOrders",
  directives: {
    waves
  },
  components: { NavBack, CountDown },
  computed: {
    ...mapGetters(["roles", "name", "ids", "avatar", "power"])
  },
  data() {
    return {
      open: false,
      switchVal: {
        value1: false
      },
      dataList: {
        name: "张先生",
        tel: "135*****0385",
        orderNum: "1000000021",
        add: "四川省成都市高新区交子金融科技中心",
        time: "2019年1月14日 17:30前到达"
      }
    };
  },
  methods: {
    backjump() {
      console.log("ddddd");
      this.$router.push({
        path: "/Homepage"
      });
    },
    // 导航 MapDemo
    navJump() {
      openMapApp("30.576929", "104.068577", "孵化园");
    },
    // 到达按钮
    workJump() {
      this.$router.push({
        path: "/MapDemo"
      });
    },

    countDownS_cb(x) {
      console.log(x);
    },
    countDownE_cb(x) {
      console.log(x);
    }
  }
};
</script>

<style scoped>
.orderMsgBox {
  width: 100%;
  padding: 0.32rem;
  background-color: #fff;
  font-size: 0.28rem;
  color: #333333;
  text-align: left;
  position: relative;
  padding-left: 1.5rem;
}
.orderMsgBox span {
  color: red;
}
.orderMsgBoxLogo {
  width: 0.68rem;
  position: absolute;
  left: 0.32rem;
}
.contentBigBox {
  width: 100%;
  background-color: white;
  margin-top: 0.32rem;
  padding: 0.32rem;
}
.contentItem {
  /* background-color: #ee8018; */
  text-align: left;
  position: relative;
  font-size: 0.28rem;
  color: #333333;
  margin-top: 0.1rem;
}
.contentItemTitle {
  position: absolute;
}
.contentItemAddress {
  margin-left: 1.6rem;
  display: inline-block;
  width: 65%;
  font-size: 0.28rem;
}
.navShowsBoxs {
  width: 100%;
  background-color: #fff;
  height: 2.4rem;
  margin: 0.68rem auto 0;
}
.itemNav {
  /* background-color: palegoldenrod; */
  height: 2.4rem;
  padding: 0.32rem;
}
.da {
  border-left: #ccc7c7 solid 0.02rem;
}
.itemNavLogo {
  width: 1rem;
}
.title {
  font-size: 0.32rem;
  margin-top: 0.12rem;
}
.Times {
  color: red;
}
.shuoM {
  font-size: 0.24rem;
  color: #999999;
  margin-top: 0.1rem;
}
.timeEnd {
  width: 100%;
  height: 2rem;
  /* background-color: palegoldenrod; */
  padding: 0.32rem;
  position: relative;
}
.timeEndTitle {
  font-size: 0.36rem;
  /* padding-bottom: 0.32rem; */
}
.aasass {
  font-size: 0.48rem;
  color: #ee8018;
  background: linear-gradient(limegreen, transparent),
    linear-gradient(90deg, skyblue, transparent),
    linear-gradient(-90deg, coral, transparent);
  background-blend-mode: screen;
  width: 4rem;
  text-align: center;
  margin: 0.32rem auto 0.1rem;
}
</style>