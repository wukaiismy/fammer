<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:12
 * @LastAuthor: wukai
 * @lastTime: 2019-07-26 16:53:41
 -->
<template>
  <div>
    <div class="navBox">
      <!-- <div class="Bas"></div> -->
      <NavBack name="登录" @backjump="backjump" />
    </div>
    <div class="gaidm"></div>
    <div class="logoBox">
      <img class="logoImg" src="../../assets/logoImg.jpg" alt />
    </div>
    <!-- 登录主体内容 -->
    <div class="iptBox">
      <mu-container>
        <mu-text-field
          v-model="validateForm.mobile"
          label="用户名"
          type="number"
          label-float
          help-text="用户名为注册手机号"
          icon="account_circle"
        ></mu-text-field>
        <br />
        <mu-text-field
          v-model="validateForm.password"
          label="密码"
          label-float
          help-text="请输入正确的密码"
          icon="locked"
        ></mu-text-field>
        <br />
      </mu-container>

      <div v-waves class="loginSubmit" @click="submitJump">登录</div>
      <div class="regBox">
        <div class="rights" @click="regJump">立即注册</div>
        <div class="lights" @click="forgetJump">忘记密码？</div>
      </div>
      <!-- 第三方登录 -->
      <div class="otherBox">
        <div class="otherSubmit">第三方登录</div>
        <div class="otherSubmitGaird">
          <mu-divider></mu-divider>
        </div>
      </div>
      <!-- 下面是第三方登录详情 -->
      <div class="showServer">
        <mu-row>
          <mu-col span="4" v-for="(msg, ind) in dataList" :key="ind">
            <div class="grid-cell" v-waves @click="jumpServer(ind)">
              <img class="imgServe" :src="msg" alt />
            </div>
          </mu-col>
        </mu-row>
      </div>
    </div>
  </div>
</template>

<script>
import NavBack from "../public/NavBack";
import carouselImg2 from "../../assets/B1.jpg";
import qq from "../../assets/login/qq.jpg";
import weixin from "../../assets/login/winxin.jpg";
import xl from "../../assets/login/xinlang.jpg";
import waves from "@/directive/waves"; // 水波纹指令
export default {
  name: "Login",
  directives: {
    waves
  },
  components: { NavBack },
  data() {
    return {
      validateForm: {
        mobile: "",
        password: "",
        login_way: "a01"
      },
      dataList: [qq, weixin, xl]
    };
  },
  created() {
    this.clearedToken();
  },
  methods: {
    // 只要跳转到登录页先清除token
    clearedToken() {
      this.$store.dispatch("FedLogOut").then(() => {
        console.log("登录页清空token");
      });
    },
    backjump() {
      this.$router.push({
        path: "/MyCenter"
      });
    },
    // 注册
    regJump() {
      console.log("跳转到注册页面");
      this.$router.push({
        path: "/Reg"
      });
    },
    // 忘记密码器
    forgetJump() {
      console.log("跳转到找回密码页面");
    },
    //  提交按钮
    submitJump() {
      console.log(this.validateForm);
      this.$store.dispatch("LoginByUsername", this.validateForm).then(res => {
        console.log("登录信息");
        console.log(res);
        if (res.data.code == "1") {
          var redirect = decodeURIComponent(this.$route.query.redirect || "/");
          console.log("+++++++++++++++++++++++++++++++");
          console.log(this.$route.query);
          console.log(redirect);
          if (redirect == "/Login") {
            redirect = "/MyCenter";
          }
          console.log(redirect);
          console.log("+++++++++++++++++++++++++++++++");
          this.$router.push({
            path: redirect
          });
        } else {
          this.msg = res.data.errors;
          this.openSimple = true;
        }
      });
    },
    // 第三方登录
    jumpServer(index) {
      if (index == 0) {
        console.log("qq登录");
      } else if (index == 1) {
        console.log("微信登录");
      } else if (index == 2) {
        console.log("新浪微博登录");
      }
    }
  }
};
</script>

<style scoped>
.navBox {
  height: 1.28rem;
  width: 100%;
  background-image: linear-gradient(-137deg, #ee8018 0%, #fbda61 100%);
  position: fixed;
  z-index: 100000;
}
.Bas {
  width: 100%;
  height: 0.4rem;
}
.gaidm {
  width: 100%;
  height: 1.28rem;
}
.logoBox {
  width: 100%;
  height: 3.5rem;
  position: relative;
  background: url(~@/assets/121.jpg) no-repeat;
  background-size: cover;
  padding: 1px;
  box-sizing: border-box;
  z-index: 1;
}
.logoBox:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(1px);
  z-index: 2;
}

.logoImg {
  width: 3rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 11;
  border-radius: 50%;
}
.loginSubmit {
  margin-top: 0.5rem;
  background-image: linear-gradient(-137deg, #ee8018 0%, #fbda61 100%);
  width: 6.45rem;
  height: 0.88rem;
  font-size: 0.36rem;
  color: white;
  border-radius: 0.2rem;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  text-align: center;
  letter-spacing: 0.08rem;
  line-height: 0.88rem;
  margin: 0.32rem auto 0;
}
.regBox {
  width: 100%;
  height: 0.68rem;
  line-height: 0.68rem;
  /* background-color: #fbda61; */
  text-align: left;
  position: relative;
}
.regBox div {
  display: inline-block;
  font-size: 0.24rem;
}
.rights {
  position: relative;
  left: 0.65rem;
  color: cornflowerblue;
}
.lights {
  position: relative;
  left: 4.45rem;
  color: darkgreen;
}
.otherBox {
  position: relative;
  margin: 0.12rem auto 0.32rem;
  z-index: 1000;
}
.otherSubmit {
  font-size: 0.28rem;
  display: inline-block;
  position: absolute;
  padding: 0 0.32rem 0 0.32rem;
  left: 37%;
  z-index: 1000;
  background-color: #f1f1f1;
}
.otherSubmitGaird {
  position: absolute;
  width: 100%;
  padding: 0 0.48rem 0;
  top: 0.22rem;
  z-index: 1;
}
.showServer {
  margin: 1.02rem auto 0;
}
.imgServe {
  height: 1rem;
  border-radius: 50%;
}
/* 下面是输入框样式 */
.iptBox {
  /* background-color: palegoldenrod; */
  margin: 0.32rem auto;
  padding-bottom: 0.32rem;
  width: 95%;
  border-radius: 0.16rem;
  background-color: #f1f1f1;
}
.iptBox >>> .container {
  width: 100%;
  padding-right: 0.16rem;
  position: relative;
  padding-left: 0.16rem;
}
.iptBox >>> .mu-input.has-label {
  min-height: 1.42rem;
}
.iptBox >>> .mu-input.has-icon {
  padding-left: 1.12rem;
}
.iptBox >>> .mu-input.has-label {
  padding-top: 0.56rem;
  padding-bottom: 0.24rem;
}
.iptBox >>> .mu-input {
  font-size: 0.32rem;
  width: 5.12rem;
  min-height: 0.96rem;
  display: inline-block;
  position: relative;
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 0.32rem;
  padding-bottom: 0.24rem;
  padding-top: 0.08rem;
}
.mu-input.has-label .mu-input-icon {
  top: 0.64rem;
}
.iptBox >>> .mu-input-icon {
  position: absolute;
  left: 0.32rem;
  top: 0.75rem;
}
.iptBox >>> .material-icons {
  font-size: 0.48rem;
}
.iptBox >>> .mu-text-field-input {
  height: 0.64rem;
}
.iptBox >>> .mu-input-line {
  height: 0.02rem;
  bottom: -0.02rem;
}
.iptBox >>> .mu-input-focus-line {
  height: 0.04rem;
  bottom: -0.02rem;
}
.iptBox >>> .mu-input-help {
  font-size: 0.24rem;
  line-height: 0.24rem;
  bottom: -0.32rem;
}
</style>