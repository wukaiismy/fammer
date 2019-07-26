<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-06-12 14:32:13
 * @LastAuthor: wukai
 * @lastTime: 2019-07-10 10:46:59
 -->
<template>
  <div>
    <NavBack :name="title" @backjump="backjump" />
    <component :is="componentId" :val="val"></component>
  </div>
</template>

<script>
import NavBack from "../../public/NavBack";
import PhotoUps from "./components/PhotoUps";
import NickName from "./components/NickName";
import Birth from "./components/Birth";
import Address from "./components/Address";
import Signature from "./components/Signature";
// 引入加密js
import CryptoJS from "crypto-js";
// 引入base64
import Base64 from "js-base64";

export default {
  name: "SettingUp",
  components: { PhotoUps, NavBack, NickName, Birth, Address, Signature },
  data() {
    return {
      title: "",
      componentId: PhotoUps,
      val: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    };
  },
  created() {
    var id = this.$route.query.id;
    var value = this.$route.query.value;

    console.log(id);
    console.log(value);
    if (id.length) {
      this.title = id;
      this.val = value || "未设置";
      if (id === "更改头像") {
        this.componentId = PhotoUps;
      } else if (id === "更改昵称") {
        this.componentId = NickName;
      } else if (id === "更改生日") {
        this.componentId = Birth;
      } else if (id === "更改地区") {
        this.componentId = Address;
      } else if (id === "更改个性签名") {
        this.componentId = Signature;
      }
    }
  },
  mounted() {
    this.text();
  },
  methods: {
    backjump() {
      this.$router.push({
        path: "/MySelfSetting"
      });
    },
    // 加密测试
    text() {
      var api_key = "ICVvC_xUs6177WEtyUNwIH8J6NfGu50t";
      var api_secret = "UjYGdN9CBZKsDBLB5-5v3DykPXY6dw3q";
      // 时间戳
      var current_time = new Date().valueOf();
      console.log(`时间戳:  ${current_time}`);
      var expire_time = current_time + 100;
      console.log(`时间戳+100:  ${expire_time}`);
      // 随机数
      var rdm = this.rdm();
      console.log(`随机数:  ${rdm}`);
      //  合成字符串
      var raw = `a=${api_key}&b=${expire_time}&c=${current_time}&d=${rdm}`;
      var sign_tmp = CryptoJS.HmacSHA1(api_secret, raw);
      console.log(`sign_tmp=:  ${sign_tmp}`);
      var sign = Base64.Base64.encode(sign_tmp, raw);
      console.log(`sign=:  ${sign}`);
      this.faceUP(sign);
    },
    // 发起请求
    faceUP(sign) {
      var data = {
        sign: sign, //签名
        sign_version: "hmac_sha1",
        return_url: "https://www.ifepay.com"
      };
    },
    // 生成随机数
    rdm() {
      var number = "";
      for (let i = 0; i < 10; i++) {
        var number1 = Math.floor(Math.random() * 10);
        // console.log(number1);
        number += number1;
      }
      // console.log(number);
      return number;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>