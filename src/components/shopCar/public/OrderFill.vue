<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-28 16:22:28
 * @LastAuthor: wukai
 * @lastTime: 2019-05-31 17:43:56
 -->
<template>
  <div>
    <NavBack name="填写订单" @backjump="backjump"/>
    <div class="addsBox">
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
      <!-- 选择商品展示列表 -->
      <template>
        <div class="contentItem" v-if="shows">
          <img
            class="logo"
            v-for="(item, index) in dataLists.ret"
            :key="index"
            :src="item.logos"
            alt
            v-show="index<4"
          >
          <div class="mores" v-if="dataLists.num>3">...</div>
          <div class="nums">共{{dataLists.num}}件</div>
        </div>
        <div v-else class="contentItem">过期订单，确认后重新操作！！！</div>
      </template>
    </div>
    <!-- 支付方式 -->
    <div class="addMsg">
      <img class="weixin" src="../../../assets/weixinzhifu.png" alt>
      <span class="payTitle">微信支付</span>
      <mu-radio value="1" @change="changes" color="red" v-model="radio"></mu-radio>
      <div class="gaird1"></div>
    </div>
    <div class="addMsg">
      <img class="weixin" src="../../../assets/zhifubao.png" alt>
      <span class="payTitle">支付宝支付</span>
      <mu-radio value="2" @change="changes" color="red" v-model="radio"></mu-radio>

      <div class="gaird1"></div>
    </div>
    <!-- 底部导航 -->
    <div class="footNav">
      ￥
      <span class="allMoney">{{dataLists.allMoney}}</span>
      <div class="submits" @click="jumpSubmit">支付订单</div>
    </div>

    <!-- 底部抽屉 -->
    <BottomSheet ref="open" @changeJump="changeJump"/>
  </div>
</template>

<script>
import NavBack from "../../public/NavBack";
import MescrollVue from "mescroll.js/mescroll.vue";
import BottomSheet from "../../public/BottomSheet";
import waves from "@/directive/waves"; // 水波纹指令
export default {
  name: "OrderFill",
  directives: {
    waves
  },
  components: { NavBack, MescrollVue, BottomSheet },
  data() {
    return {
      dataList: {
        name: "吴先生",
        tel: "135*****0385",
        add: "四川省成都市高新区交子金融科技中心高新区交子金融科技中心"
      },
      dataLists: {},
      radio: 1,
      shows: true
    };
  },
  created() {
    var datas = this.$route.params.data;
    // var datas = this.$route.query;
    console.log("11111");
    console.log(datas);
    if (datas) {
      this.dataLists = datas;
    } else {
      console.log("进来了吗");
      this.shows = false;
      this.$confirm("订单过期，请退回上一步重新操作？", "提示", {
        type: "warning"
      }).then(({ result }) => {
        if (result) {
          this.$router.push({
            path: "/ShopCarList"
          });
        } else {
          this.$toast.message("您点击了取消");
        }
      });
    }
  },
  methods: {
    backjump() {
      this.$router.push({
        path: "/ShopCarList"
      });
    },
    // 打开下拉选框
    openBotttomSheet() {
      this.$refs.open.openBotttomSheet();
    },
    jumpSubmit() {
      console.log("你点击了提交");
    },

    // 确认地址
    changeJump(val) {
      console.log(val);
      this.dataList = val;
    },
    changes(val) {
      console.log(val);
      console.log(this.radio);
    }
  }
};
</script>

<style lang="scss" scoped>
.addsBox {
  width: 100%;
  //   padding: 0;
}
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
  background-color: white;
  position: fixed !important;
  border-top: 1px solid #f0f0f0;
  bottom: 0;
  color: red;
  line-height: 1rem;
  padding-left: 0.32rem;
  text-align: left;
  font-size: 0.3rem;
  .allMoney {
    font-size: 0.34rem;
    font-weight: 600;
  }
  .submits {
    height: 0.6rem;
    background-color: red;
    position: absolute;
    right: 0.32rem;
    top: 0.21rem;
    line-height: 0.6rem;
    padding: 0 0.42rem 0 0.42rem;
    border-radius: 0.6rem;
    color: white;
    font-size: 0.26rem;
  }
}
/* 选择商品展示列表*/
.contentItem {
  width: 100%;
  margin: 0.32rem auto;
  padding: 0.32rem;
  border-radius: 0.2rem;
  background-color: #fff;
  position: relative;
  text-align: left;
  .logo {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0.1rem;
    // -moz-box-shadow: 3px 3px 6px #999999;
    // -webkit-box-shadow: 3px 3px 6px #999999;
    // box-shadow: 3px 3px 6px #999999;
  }
  .mores {
    display: inline-block;
    // background-color: palegoldenrod;
  }
  .nums {
    position: absolute;
    font-size: 0.3rem;
    color: #333;
    top: 0.46rem;
    right: 0.62rem;
    font-weight: 600;
    letter-spacing: 2px;
  }
}
.weixin {
  width: 0.81rem;
  height: 0.7rem;
}
.payTitle {
  position: absolute;
  font-size: 0.26rem;
  top: 0.5rem;
  left: 1.52rem;
}
.mu-radio {
  left: 5.2rem;
}
</style>