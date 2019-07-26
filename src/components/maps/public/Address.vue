<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:13
 * @LastAuthor: wukai
 * @lastTime: 2019-06-21 15:00:05
 -->
<template>
  <div>
    <NavBack name="新建地址" @backjump="backjump"/>
    <div class="bigBoxShows">
      <div class="addMsg">
        <span class="addTitle">地址</span>

        <div class="rightBox" @click="jumpSearch">
          <template>
            <div class="showLocal" v-if="local">{{local}}</div>
            <div v-else>
              <img class="rightBoxLocalImg" src="../../../assets/dizhi.png" alt>
              <span class="rightBoxLocalDetail">{{dataMsgAddress.address}}</span>
            </div>
          </template>
          <img class="rightBoxLocalForward" src="../../../assets/forward@2x.png" alt>
        </div>

        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">门牌号</span>
        <div class="rightBox">
          <input
            type="text"
            v-model="dataMsgAddress.address_detailed"
            class="rightBoxIpt"
            placeholder="详细地址 例如：9栋2单元201"
          >
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">联系人</span>
        <div class="rightBox">
          <input
            type="text"
            v-model="dataMsgAddress.receiver"
            class="rightBoxIpt"
            placeholder="请填写联系人，如：张女士"
          >
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">手机号</span>
        <div class="rightBox">
          <input
            type="number"
            v-model="dataMsgAddress.receiver_mobile"
            class="rightBoxIpt"
            placeholder="请填写联系方式"
          >
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <div class="addTitle">设置默认地址</div>
        <div class="shuoMing">提醒：每次下单时会使用该地址，实际下单地址会根据您下单切换的地区进行智能判断，请在下单时确认哦！</div>
        <mu-flex class="select-control-row">
          <mu-switch @change="changeMsg" v-model="switchVal.value1"></mu-switch>
        </mu-flex>
        <div class="gaird1"></div>
      </div>
      <div class="submitAdd" v-waves @click="submitJump">保存地址</div>
    </div>
  </div>
</template>

<script>
import NavBack from "../../public/NavBack";
import waves from "@/directive/waves"; // 水波纹指令
export default {
  name: "Address",
  props: ["local"],
  components: { NavBack },
  directives: {
    waves
  },
  data() {
    let vm = this;
    return {
      switchVal: {
        value1: false
      },
      dataMsgAddress: {
        address: "点击选择",
        address_detailed: "",
        receiver: "",
        receiver_mobile: "",
        is_default: 0
      }
    };
  },

  methods: {
    backjump() {
      this.$router.go(-1);
    },

    changeMsg() {
      console.log(this.switchVal.value1);
      if (this.switchVal.value1) {
        this.dataMsgAddress.is_default = 1;
      } else {
        this.dataMsgAddress.is_default = 0;
      }
    },
    // 保存地址
    submitJump() {
      this.dataMsgAddress.address = this.local;
      console.log(this.dataMsgAddress);
      this.$post(
        "/wangtian/api/v1/user_action/shop_address/",
        this.dataMsgAddress
      )
        .then(res => {
          console.log(res);
          if (res.code == "1") {
            this.$toast.warning("操作成功");
            this.$router.push({
              path: "/MyAdds"
            });
          } else {
            this.$toast.warning("操作失败，请重新操作");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    jumpSearch() {
      this.$emit("searchJump", "MapSearch");
    }
  }
};
</script>

<style scoped>
.amap-wrapper {
  height: 300px;
}
.search-box {
  position: absolute;
  top: 25px;
  left: 20px;
  width: 5rem;
}
.bigBoxShows {
}
.addMsg {
  width: 100%;
  padding: 0.32rem 0.32rem 0 0.32rem;
  background-color: #fff;
  position: relative;
  text-align: left;
  /* line-height: 100%; */
  /* background-color: palegoldenrod; */
}
.addTitle {
  font-size: 0.3rem;
  position: absolute;
  /* letter-spacing: 0.06rem; */
}

.rightBox {
  width: 85%;
  padding-left: 0.32rem;
  /* background-color: #fbda61; */
  position: relative;
  margin-left: 1.2rem;
  top: 0rem;
  /* right: 0; */
}
.rightBoxLocalImg {
  width: 0.46rem;
}
.rightBoxLocalDetail {
  font-size: 0.28rem;
  color: #999999;
  position: relative;
  left: 0.32rem;
  top: -0.07rem;
}
.rightBoxLocalForward {
  width: 0.14rem;
  position: absolute;
  right: 0.21rem;
  top: 0.12rem;
}
.gaird1 {
  width: 100%;
  border: #f9f9f9 solid 0.02rem;
  margin-top: 0.32rem;
}
.rightBoxIpt {
  width: 90%;
  height: 100%;
  outline: none;
  border-width: 0;
  caret-color: #43b02a;
  font-size: 0.3rem;
}
.shuoMing {
  width: 80%;
  font-size: 0.24rem;
  margin-top: 0.64rem;
  /* background-color: aqua; */
}
.select-control-row {
  position: absolute;
  /* background-color: palegoldenrod; */
  top: 0.82rem;
  right: 0.32rem;
}
.mu-switch {
  height: 0.64rem;
  line-height: 0.64rem;
}
.select-control-row >>> .mu-switch-wrapper {
  width: 100%;
  height: 0.64rem;
}
.select-control-row >>> .mu-switch-container {
  width: 0.76rem;
  padding: 0.08rem 0 0.08rem 0.04rem;
  margin-right: 0.16rem;
}
.select-control-row >>> .mu-switch-track {
  width: 100%;
  height: 0.28rem;
  border-radius: 0.6rem;
}
.select-control-row >>> .mu-switch-thumb {
  position: absolute;
  top: 1px;
  left: 0;
  width: 0.4rem;
  height: 0.4rem;
  line-height: 0.48rem;
}
.select-control-row >>> .mu-switch-checked {
  color: #ee8018;
}
.select-control-row >>> .mu-switch-checked .mu-switch-thumb {
  transform: translate3d(0.36rem, 0, 0);
}
.select-control-row >>> .mu-switch-ripple-wrapper {
  top: -0.2rem;
  left: -0.2rem;
}
.submitAdd {
  width: 100%;
  height: 0.88rem;
  background-color: #43b02a;
  font-size: 0.36rem;
  color: #fff;
  line-height: 0.88rem;
  margin: 0.32rem auto;
}
.showLocal {
  width: 70%;
  font-size: 0.3rem;
}
</style>