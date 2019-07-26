<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-06-12 15:56:27
 * @LastAuthor: wukai
 * @lastTime: 2019-06-12 17:17:43
 -->
<template>
  <div class="bigBox">
    <div class="btn" @click="upDataJump">保存</div>
    <div class="iptBox">
      <input id="inputs" v-model="nick_name" type="text">
    </div>
    <div class="pcz">一句话签名让您更有魅力</div>
  </div>
</template>

<script>
export default {
  name: "Signature",
  props: ["val"],
  data() {
    return {
      focus2: false,
      nick_name: ""
    };
  },
  mounted() {
    this.nick_name = this.val;
    this.thisFocus();
    setTimeout(() => {
      this.thisFocus();
      this.focus2 = true;
    }, 0);
  },
  methods: {
    // 提交资料
    upDataJump() {
      this.$post("/wangtian/api/v1/user_action/user_info/", {
        signature: this.nick_name
      })
        .then(res => {
          console.log(res);
          if (res.code == "1") {
            this.$toast.message("更新成功");
            this.$router.push({
              path: "/MySelfSetting"
            });
          } else {
            this.$toast.warning("更新失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 创建一个聚焦函数
    thisFocus() {
      $("#inputs").focus();
    }
  }
};
</script>

<style lang="scss" scoped>
.bigBox {
  text-align: right;
}
.btn {
  width: 1.2rem;
  height: 0.68rem;
  display: inline-block;
  background-color: #43b02a;
  color: white;
  text-align: center;
  line-height: 0.68rem;
  border-radius: 0.1rem;
  position: relative;
  margin: 0.32rem;
}
.iptBox {
  width: 100%;
  height: 0.68rem;
  padding-left: 0.32rem;
  background-color: #f9f9f9;
  border-bottom: #43b02a solid 1px;
  input {
    width: 100%;
    height: 100%;
    outline: none;
    border-width: 0;

    caret-color: #43b02a;
    font-size: 0.26rem;
    background-color: #f9f9f9;
  }
}
.pcz {
  font-size: 0.2rem;
  text-align: left;
  margin-top: 0.2rem;
  padding-left: 0.32rem;
  color: #999;
}
</style>