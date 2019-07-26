<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-06-12 15:56:27
 * @LastAuthor: wukai
 * @lastTime: 2019-06-12 16:36:16
 -->
<template>
  <div class="bigBox">
    <div class="btn" @click="upDataJump">保存</div>
    <div class="iptBox">
      <mu-date-input
        v-model="nick_name"
        @change="changesTime"
        container="dialog"
        label-float
        full-width
        no-display
        :solo="cons"
      ></mu-date-input>
    </div>
    <div class="pcz">选择你的生日</div>
  </div>
</template>

<script>
export default {
  name: "Birth",
  props: ["val"],
  data() {
    return {
      focus2: false,
      nick_name: "",
      cons: true
    };
  },
  mounted() {
    this.nick_name = this.val;
  },
  methods: {
    changesTime() {
      var str = this.nick_name;
      var date = new Date(str);
      var date_value =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.nick_name = date_value;
      console.log(this.nick_name);
    },
    // 提交资料
    upDataJump() {
      this.$post("/wangtian/api/v1/user_action/user_info/", {
        birthday: this.nick_name
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
  height: 0.88rem;
  text-align: left;
  padding-left: 0.32rem;
  background-color: #f9f9f9;
  border-bottom: #43b02a solid 1px;
}
.pcz {
  font-size: 0.2rem;
  text-align: left;
  margin-top: 0.2rem;
  padding-left: 0.32rem;
  color: #999;
}
</style>