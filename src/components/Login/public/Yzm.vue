<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:13
 * @LastAuthor: wukai
 * @lastTime: 2019-06-03 10:26:00
 -->
<template>
  <div>
    <div class="yzm">
      <!-- 验证码的组件 -->
      <img class="img" src="../../../assets/Verification－code@2x.png" alt>
      <span class="telName">验 证 码</span>
      <mu-text-field v-model="yzms" @change="change" placeholder="请输入验证码" :solo="true" class="ipt"></mu-text-field>
      <mu-button class="yanzm" :disabled="isDisabled" flat @click="YanZM">{{yzm}}</mu-button>
    </div>
    <!-- 下面的灰色线 -->
    <div class="gaid">
      <Gaid/>
      <div class="gaids"></div>
    </div>
  </div>
</template>

<script>
import Gaid from "./Gaid";
export default {
  name: "Yzm",
  data() {
    return {
      yzms: "",
      yzm: "获取验证码",
      isDisabled: false,
      tel: "",
      time_key: ""
    };
  },
  methods: {
    //获取手机号
    getTel(data) {
      console.log(data);
      this.tel = data;
    },
    // 验证码的获取以及相关的计时器
    YanZM() {
      var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.tel)) {
        this.$emit("warmingMsg");
        return;
      }
      //   alert("正在获取验证码");
      var nums = 59;
      this.isDisabled = true;
      var timer = setInterval(() => {
        this.yzm = "获取中(" + nums + ")";
        nums--;
      }, 1000);
      var timers = setTimeout(() => {
        timers = null;
        clearInterval(timer);
        this.yzm = "重新获取";
        this.isDisabled = false;
      }, 60000);
      console.log(this.tel);
      this.$get("/wangtian/api/v1/index_show/send_sms/", {
        mobile: this.tel
      })
        .then(res => {
          console.log(res);
          this.time_key = res.timestamp_key;
        })
        .catch(err => {
          console.log("-------------");
          console.log(err);
        });
    },
    change() {
      var data = { sms_code: this.yzms, time_key: this.time_key };
      this.$emit("yzms", data);
    }
  },

  components: {
    Gaid
  }
};
</script>

<style scoped>
.yzm {
  position: relative;
  /* background-color: aqua; */
  text-align: left;
  padding-left: 0.36rem;
}
.img {
  /* background-color: #1c3672; */
  width: 0.254rem;
  height: 0.48rem;
}
.telName {
  font-size: 0.28rem;
  color: #666666;
  width: 1.12rem;
  display: inline-block;
}
.ipt {
  padding-left: 0.3rem;
  font-size: 0.24rem;
  width: 36%;
  height: 0.56rem;
  min-height: 0.44rem;
  color: #999999;
}
.yanzm {
  position: relative;
  right: -0.5rem;
  font-size: 0.28rem;
  color: #1c3672;
}
.gaid {
  position: relative;
  left: 0.32rem;
  top: 0.1rem;
  width: 6.86rem;
}
.gaids {
  display: inline-block;
  position: absolute;
  top: -0.1rem;
  left: 3.81rem;
  width: 0.74rem;
  height: 0.14rem;
  background-color: #f9f9f9;
}
</style>