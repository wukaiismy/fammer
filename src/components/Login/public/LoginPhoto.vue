<template>
  <div>
    <!-- 手机输入 -->
    <div class="photo">
      <img class="img" src="../../../assets/phone@2x.png" alt>
      <span class="telName">手机号码</span>
      <mu-text-field
        @change="change"
        @click="focus"
        v-model="tel"
        type="number"
        placeholder="请输入你的手机号"
        :solo="true"
        class="ipt"
      ></mu-text-field>
      <br>
      <span v-show="isShow" class="errMsg">您输入的手机号不正确</span>
    </div>
    <!-- 下面的灰色线 -->
    <div class="gaid">
      <Gaid/>
    </div>
  </div>
</template>

<script>
import Gaid from "./Gaid";
export default {
  name: "LoginPhoto",
  data() {
    return {
      tel: "",
      isShow: false
    };
  },
  methods: {
    //模拟聚焦事件
    focus() {
      this.isShow = false;
      // this.tel = "";
    },
    change() {
      var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.tel)) {
        this.isShow = true;
        this.$emit("photo", this.tel);
      } else {
        this.isShow = false;
        this.$emit("photo", this.tel);
      }
    },
    tostal() {
      this.isShow = true;
    }
  },
  components: {
    Gaid
  }
};
</script>

<style scoped>
.photo {
  text-align: left;
  position: relative;
  width: 100%;
  height: 0.76rem;
  padding-left: 0.36rem;
  /* background-color: #666666; */
}
.img {
  /* background-color: #1c3672; */
  width: 0.32rem;
  height: 0.48rem;
}
.telName {
  font-size: 0.28rem;
  color: #666666;
  font-family: PingFangSC-Regular;
}
.ipt {
  padding-left: 0.2rem;
  font-size: 0.24rem;
  width: 60%;
  height: 0.56rem;
  min-height: 0.44rem;
  color: #999999;
}
.gaid {
  width: 6.86rem;
  position: relative;
  left: 0.32rem;
  top: 0.03rem;
}
.errMsg {
  font-size: 0.24rem;
  color: red;
}
</style>