<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-21 10:58:32
 * @LastAuthor: wukai
 * @lastTime: 2019-05-21 11:38:29
 -->
<template>
  <div class="foootBox">
    <img class="Voice" @click="$toast.warning('暂不支持语音')" src="../../assets/friends/Voice.png" alt>
    <img
      class="biaoQing"
      @click="$toast.warning('网页不支持表情')"
      src="../../assets/friends/biaoqing.png"
      alt
    >
    <template>
      <img v-show="!my_msg" class="biaoQing ass" src="../../assets/friends/icon02.png" alt>
      <span v-show="my_msg" @click="sendJump" class="sendJump">发送</span>
    </template>
    <input type="text" class="ipt" v-model="my_msg" @keyup.enter="sendJump">
  </div>
</template>

<script>
export default {
  name: "FootNav",
  data() {
    return {
      my_msg: ""
    };
  },
  methods: {
    sendJump() {
      console.log(this.my_msg);
    }
  }
};
</script>

<style lang="scss" scoped>
.foootBox {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.44rem;
  background-color: #f9f9f9;
  border-top: #999999 solid 0.02rem;
  text-align: left;
  padding: 0.1rem;
}
.Voice {
  width: 0.6rem;
  position: absolute;
  top: 0.45rem;
}
.biaoQing {
  top: 0.45rem;
  width: 0.6rem;
  position: absolute;
  right: 1.2rem;
}
.ass {
  width: 0.64rem;
  right: 0.32rem;
}
.ipt {
  width: 64%;
  height: 0.88rem;
  margin: 0.2rem 0 0 0.81rem;
  caret-color: #ee8018;
  border: none;
  outline: none;
  border-width: 0;
  font-size: 0.32rem;
  padding-left: 0.2rem;
}
.footg {
  width: 100%;
  height: 1.64rem;
}
.sendJump {
  top: 0.35rem;
  position: absolute;
  width: 0.64rem;
  right: 0.12rem;
  background: #6ee790;
  width: 0.9rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-radius: 0.1rem;
  text-align: center;
  color: white;
  font-size: 0.3rem;
}
#Biddd {
  width: 100%;

  overflow-y: auto;
  overflow-x: hidden;
  /* background-color: #6ee790; */
}
</style>