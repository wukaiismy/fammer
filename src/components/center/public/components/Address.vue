<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-06-12 15:56:27
 * @LastAuthor: wukai
 * @lastTime: 2019-06-12 17:14:47
 -->
<template>
  <div class="bigBox">
    <div class="btn" @click="upDataJump">保存</div>
    <div class="iptBox" @click="jumpSearch">{{nick_name}}</div>
    <div class="divwrap" v-if="shows">
      <v-distpicker id="sss" type="mobile" @selected="onSelected"></v-distpicker>
    </div>
    <div class="pcz">选择你的地址</div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  name: "Address",
  props: ["val"],
  components: {
    VDistpicker
  },
  data() {
    return {
      nick_name: "",
      adds: {
        address_province: "",
        address_city: ""
      },
      shows: false
    };
  },
  mounted() {
    this.nick_name = this.val;
  },
  methods: {
    jumpSearch() {
      this.shows = !this.shows;
    },
    //省市区选择拼接
    onSelected(data) {
      console.log(data);
      console.log(data.province.value + data.city.value + data.area.value);
      this.nick_name = data.province.value + data.city.value;
      this.shows = false;
      this.adds.address_province = data.province.value;
      this.adds.address_city = data.city.value;
    },
    // 提交资料
    upDataJump() {
      this.$post("/wangtian/api/v1/user_action/user_info/", this.adds)
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
  height: 0.68rem;
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
//  三级联动菜单样式修改
.divwrap {
  height: 6rem;
  overflow-y: auto;
  // position: fixed;
  left: 0;
  top: 0rem;
  width: 100%;
  // z-index: 100000;
  margin-left: 0;
}
.distpicker-address-wrapper {
  color: #999;
}
.address-header {
  position: fixed;
  bottom: 4rem;
  top: 1rem;
  width: 100%;
  background: #000;
  color: #fff;
}
.address-header ul li {
  flex-grow: 1;
  text-align: left;
}
.address-header .active {
  color: #fff;
  border-bottom: #666 solid 8px;
}
.address-container .active {
  color: #000;
}
#sss >>> .address-container {
  background-color: rgb(214, 18, 18);
}
</style>
