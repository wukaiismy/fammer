<template>
  <div>
    <mu-dialog title="消息提示" transition="slide-top" width="360" :open.sync="openSimple">注册失败：{{msg}}</mu-dialog>
  </div>
</template>

<script>
export default {
  name: "MotalFail",
  data() {
    return {
      openSimple: false,
      msg: "请核实信息"
    };
  },
  mounted() {},
  methods: {
    msgs(val) {
      this.openSimple = true;
      this.msg = val;
      setTimeout(() => {
        this.openSimple = false;
      }, 2000);
    }
  }
};
</script>

<style scoped>
</style>