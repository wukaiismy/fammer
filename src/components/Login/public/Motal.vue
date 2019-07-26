<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:13
 * @LastEditors: wukai
 * @lastTime: 2019-05-17 14:10:13
 -->
<template>
  <div>
    <mu-dialog title="消息提示" transition="slide-top" width="360" :open.sync="openSimple">注册成功，正在跳转登录页面</mu-dialog>
  </div>
</template>

<script>
export default {
  name: "Motal",
  data() {
    return {
      openSimple: false
    };
  },
  mounted() {},
  methods: {
    msgs() {
      this.openSimple = true;
      setTimeout(() => {
        this.openSimple = false;
        this.$router.push({
          path: "/MyCenter"
        });
      }, 2000);
    }
  }
};
</script>

<style scoped>
</style>