<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:12
 * @LastAuthor: wukai
 * @lastTime: 2019-07-10 10:57:25
 -->
<template>
  <div>
    <NavBack name="个人中心" @backjump="backjump" />
    <!-- 头部 -->
    <div class="contentBox">
      <template>
        <!-- 已登录的显示 -->
        <div v-if="tel">
          <img class="myImg" v-lazy="avatar" alt />
          <div class="userName">{{name}}</div>
          <div class="userName navl">已认证</div>
          <div class="userName nums">{{tel}}</div>
          <!-- <div class="msgBox">
        <mu-badge content="12" circle color="secondary">
          <mu-button icon>
            <mu-icon value="notifications" color="red"></mu-icon>
          </mu-button>
        </mu-badge>
          </div>-->
          <div class="setting" @click="jumpMyself">
            <img class="settingImg" src="../../assets/center/shezhi.png" alt />
          </div>
        </div>
        <!-- 未登录的显示 -->
        <div v-else>
          <img class="myImg" src="../../assets/login/denglu.png" alt />
          <div v-waves class="logins" @click="jumpLogin">登录/注册</div>
        </div>
      </template>
    </div>
    <!-- 主体内容 -->
    <!-- 资产 -->
    <div class="workingBox">
      <mu-row>
        <mu-col span="3" v-for="(items, ind) in dataLists" :key="ind">
          <div class="grid-cell" @click="jumpServer(ind)">
            <div class="imgServe numss">{{items.num}}</div>
            <div class="titleName name1">{{items.msg}}</div>
          </div>
        </mu-col>
      </mu-row>
    </div>
    <!-- 分列式主体内容 -->
    <div class="contentItemBox">
      <div class="contentItemsShow" @click="jumpMyResume">
        <img class="contentItemsImgs" src="../../assets/center/dizhi.png" alt />
        <div class="myMsg">
          <span>我的地址</span>
          <div class="garid2"></div>
        </div>
        <img class="forwardLogo" src="../../assets/forward@2x.png" alt />
      </div>
      <div class="contentItemsShow" @click="jumpMyService">
        <img class="contentItemsImgs" src="../../assets/center/fuwu-copy.png" alt />
        <div class="myMsg">
          <span>我要求购</span>
        </div>
        <img class="forwardLogo" src="../../assets/forward@2x.png" alt />
      </div>
    </div>
    <div class="contentItemBox">
      <div class="contentItemsShow" @click="jumpMsgInfo">
        <img class="contentItemsImgs" src="../../assets/center/rizhi.png" alt />
        <div class="myMsg">
          <span>商户录入</span>
          <div class="garid2"></div>
        </div>
        <img class="forwardLogo" src="../../assets/forward@2x.png" alt />
      </div>
      <div class="contentItemsShow" @click="jumpDataWork">
        <img class="contentItemsImgs" src="../../assets/center/richeng.png" alt />
        <div class="myMsg">
          <span>我的订单</span>
        </div>
        <img class="forwardLogo" src="../../assets/forward@2x.png" alt />
      </div>
    </div>
    <div class="contentItemBox">
      <div class="contentItemsShow">
        <img class="contentItemsImgs" src="../../assets/center/lianxikefu.png" alt />
        <div class="myMsg">
          <span>联系客服</span>
          <div class="garid2"></div>
        </div>
        <img class="forwardLogo" src="../../assets/forward@2x.png" alt />
      </div>
      <div class="contentItemsShow">
        <img class="contentItemsImgs" src="../../assets/center/tousujubao.png" alt />
        <div class="myMsg">
          <span>投诉举报</span>
        </div>
        <img class="forwardLogo" src="../../assets/forward@2x.png" alt />
      </div>
    </div>
    <div class="contentItemBox ssss" @click="jumpMores">
      <div class="contentItemsShow lastShows">
        <img class="contentItemsImgs" src="../../assets/center/icon-test1.png" alt />
        <div class="myMsg">
          <span>更多</span>
        </div>
        <img class="forwardLogo" src="../../assets/forward@2x.png" alt />
      </div>
    </div>
    <div class="gesss"></div>
  </div>
</template>

<script>
import NavBack from "../public/NavBack1";
import logos from "../../assets/logoImg.jpg";
import waves from "@/directive/waves"; // 水波纹指令
import { mapGetters } from "vuex";
export default {
  name: "MyCenter",
  directives: {
    waves
  },
  data() {
    return {
      condition: true,

      dataLists: [
        { num: "12", msg: "关注" },
        { num: "1", msg: "粉丝" },
        { num: "2", msg: "发布" },
        { num: "3", msg: "收藏" }
      ]
    };
  },
  computed: {
    ...mapGetters(["name", "ids", "tel", "avatar"])
  },
  components: { NavBack },
  methods: {
    backjump() {
      this.$router.push({
        path: "/"
      });
    },
    // 登录注册
    jumpLogin() {
      this.$router.push({
        path: "/Login"
      });
    },
    // 跳转到个人设置
    jumpMyself() {
      if (!this.name) {
        this.jumplogin();
      } else {
        this.$router.push({
          path: "/MySelfSetting"
        });
      }
    },
    // 我的地址
    jumpMyResume() {
      if (!this.name) {
        this.jumplogin();
      } else {
        this.$router.push({
          path: "/MyAdds"
        });
      }
    },
    // 我的求购
    jumpMyService() {
      if (!this.name) {
        this.jumplogin();
      } else {
        this.$router.push({
          path: "/BuyAsk"
        });
      }
    },
    //信息录入
    jumpMsgInfo() {
      if (!this.name) {
        this.jumplogin();
      } else {
        this.$router.push({
          path: "/InfoCollection"
        });
      }
    },
    // 工作日程
    jumpDataWork() {
      if (!this.name) {
        this.jumplogin();
      } else {
        this.$router.push({
          path: "/DataWork"
        });
      }
    },
    jumpServer(ind) {
      console.log(ind);
    },
    // 更多（发布）
    jumpMores() {
      if (!this.name) {
        this.jumplogin();
      } else {
        console.log("您正准备跳转更多发布");
        this.$get("/wangtian_backend/api/v1/release_review/get_ak/")
          .then(res => {
            console.log(res);
            if (res.code == 1) {
              window.location.href = res.url;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 弹出登录框
    jumplogin() {
      this.$confirm("您还未登录，前往登录？", "提示", {
        type: "info"
      }).then(({ result }) => {
        if (result) {
          this.$toast.info("正在前往登录页");
          this.$router.push({
            path: "/Login"
          });
        } else {
          this.$toast.info("取消登录");
        }
      });
    }
  }
};
</script>

<style scoped>
.contentBox {
  /* background: repeating-linear-gradient(
      to top left,
      beige 0,
      beige 2em,
      moccasin 2em,
      moccasin 4em,
      wheat 4em,
      wheat 6em
    ),
    repeating-linear-gradient(
      to left,
      white 0,
      white 2em,
      wheat 2em,
      wheat 4em,
      beige 4em,
      beige 6em
    ),
    white;
  background-blend-mode: multiply; */
  background: linear-gradient(limegreen, transparent),
    linear-gradient(90deg, skyblue, transparent),
    linear-gradient(-90deg, coral, transparent);
  background-blend-mode: screen;
  width: 100%;
  height: 2.4rem;
  margin: 0rem auto;
  /* background-color: white; */
  padding: 0.32rem;
  text-align: left;
  line-height: 2.4rem;
  position: relative;
}
.myImg {
  /* width: 2rem; */
  height: 1.76rem;
  border-radius: 50%;
  width: 1.76rem;
}
.userName {
  font-size: 0.3rem;
  position: absolute;
  top: -0.28rem;
  left: 2.4rem;
  font-family: SimHei;
}
.logins {
  position: relative;
  letter-spacing: 2px;
  width: 2rem;
  left: 2.3rem;
  height: 0.6rem;
  line-height: 0.6rem;
  top: -2.3rem;
  text-align: center;
  color: white;
  border-radius: 0.1rem;
  -moz-box-shadow: -1px 0px 4px #704363, 2px 2px 5px #333333;
  -webkit-box-shadow: -1px 0px 4px #704363, 2px 2px 5px #333333;
  box-shadow: -1px 0px 4px #704363, 2px 2px 5px #333333;
  background-color: #ee8018;
}
.nums {
  font-size: 0.28rem;
  top: 0.48rem;
}
.navl {
  left: 4.2rem;
  top: 1.48rem;
  font-size: 0.23rem;
  width: 1rem;
  height: 0.46rem;
  text-align: center;
  line-height: 0.46rem;
  border-radius: 0.46rem;
  background-color: #ee8018;
  color: white;
}
.setting {
  font-size: 0.38rem;
  width: 0.5rem;
  height: 0.6rem;
  line-height: 0.6rem;
  position: absolute;
  top: 0.32rem;
  right: 0.32rem;
  /* background-color: #fff; */
}
.settingImg {
  width: 0.5rem;
}
.workingBox {
  width: 100%;
  height: 1.6rem;
  padding-top: 0.1rem;
  background-color: #fff;
  margin: 0.32rem auto;
  position: relative;
}
.grid-cell {
  height: 1.82rem;
  color: #666666;
}
.imgServe {
  margin-top: 0.22rem;
  height: 0.6rem;
}
.titleName {
  font-size: 0.28rem;
  font-family: "Microsoft YaHei";
  color: #443d8b;
}
.garidBox {
  position: absolute;
  height: 1.36rem;
  border-left: solid 0.04rem #666666;
  top: 0.22rem;
  right: 1.78rem;
}
.numss {
  font-size: 0.32rem;
  color: #f6a623;
  margin: 0.12rem auto 0.06rem;
}
.name1 {
  color: #333333;
  font-family: SimHei;
}
.gesss {
  /* margin: 0.32rem auto; */
  width: 100%;
  height: 1.32rem;
  /* background-color: #333333; */
}
.gairds {
  width: 100%;
  border: 0.01rem solid #999999;
  position: absolute;
  top: 50%;
}
.contentItemBox {
  margin: 0.32rem auto;
  width: 100%;
  padding: 0.01rem 0.01rem 0.08rem 0.32rem;
  background-color: #fff;
}
.contentItemsShow {
  /* background-color: sandybrown; */
  text-align: left;
  position: relative;
  width: 100%;
  height: 0.84rem;
  line-height: 0.64rem;
  margin-top: 0.12rem;
  font-family: KaiTi;
}
.lastShows {
  height: 0.64rem;
}
.contentItemsImgs {
  width: 7%;
  margin-top: 0.08rem;
}
.myMsg {
  font-size: 0.32rem;
  position: absolute;
  left: 15%;
  display: inline-block;
  width: 85%;
  /* background-color: chartreuse; */
}
.forwardLogo {
  position: absolute;
  right: 0.32rem;
  width: 0.46em;
  top: 0.16rem;
}
.garid2 {
  width: 100%;
  border: solid 0.02rem #f9f9f9;
  margin-top: 0.2rem;
}
</style>