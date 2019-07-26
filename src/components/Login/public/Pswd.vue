<template>
  <div>
    <!-- 密码输入 -->
    <div class="pswd">
      <img class="img" src="../../../assets/account－password@2x.png" alt>
      <span class="telName">{{name}}</span>
      <mu-text-field
        @change="change"
        @click="focus"
        v-model="psword"
        placeholder="请输入你的密码"
        :solo="true"
        class="ipt"
        :type="visibility ? 'text' : 'password'"
      ></mu-text-field>
      <img
        class="psImg"
        :src="Img"
        :class="Img=='psImg2'?'psImg1':'psImg2'"
        alt
        @click="visibilityChange"
      >
      <br>
      <span v-if="name=='再次输入'" v-show="isShow" class="errMsg">密码不一致</span>
      <span v-else v-show="isShow" class="errMsg">密码必须6-32位两种或以上类型字符组成</span>
    </div>
    <!-- 下面的灰色线 -->
    <div class="gaid">
      <Gaid/>
    </div>
  </div>
</template>

<script>
import Gaid from "./Gaid";
import psImg1 from "../../../assets/invisible@2x.png";
import psImg2 from "../../../assets/visible@2x.png";

export default {
  name: "Pswd",
  props: ["name"],
  data() {
    return {
      psword: "",
      visibility: false,
      Img: psImg1,
      isShow: false
    };
  },
  methods: {
    //模拟聚焦事件
    focus() {
      this.isShow = false;
      // this.psword = "";
    },
    //   密码选择是否明文
    visibilityChange() {
      this.visibility = !this.visibility;
      if (this.Img == psImg1) {
        this.Img = psImg2;
      } else this.Img = psImg1;
    },
    change() {
      var data = { pswd: this.psword, name: this.name };
      var myreg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,32}$/;
      if (!myreg.test(this.psword)) {
        this.isShow = true;
        this.$emit("pswd", data);
      } else {
        this.isShow = false;
        this.$emit("pswd", data);
      }
    },
    //父组件改变子组件的值
    changIsShow() {
      this.isShow = true;
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
.pswd {
  text-align: left;
  position: relative;
  width: 100%;
  height: 0.76rem;
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
  width: 1.15rem;
  display: inline-block;
  /* background-color: aqua; */
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
.psImg {
  position: absolute;
  top: 0.21rem;
  right: 0.81rem;
}
.psImg1 {
  width: 0.48rem;
  /* height: 0.2rem; */
}
.psImg2 {
  width: 0.48rem;
  /* height: 0.32rem; */
}
.gaid {
  position: relative;
  left: 0.32rem;
  top: 0.03rem;
  width: 6.86rem;
}

.errMsg {
  font-size: 0.24rem;
  color: red;
}
</style>