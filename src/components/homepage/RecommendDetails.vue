<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-20 11:32:39
 * @LastAuthor: wukai
 * @lastTime: 2019-07-26 15:57:24
 -->
<template>
  <div>
    <NavBack name="帖子详情" @backjump="backjump" />
    <!-- 主体内容 -->
    <div class="mainsContentBox">
      <div class="titles">{{dataList.title}}</div>
      <div class="autherBox">
        <img v-lazy="dataList.avatar" alt />
        <span class="autherName">{{dataList.nick_name}}</span>
        <span class="autherName autherType">{{dataList.up_time}} · {{dataList.article_type_name}}</span>
        <div
          v-show="admin_id!=dataList.u_id"
          class="guanZhuBox"
          data-mu-loading-size="24"
          @click="guanzhuJump(dataList.is_attention,dataList.u_id)"
          v-loading="loading1"
        >
          <template>
            <div class="guan1" v-show="dataList.is_attention=='0'">关注</div>
            <div class="guan2" v-show="dataList.is_attention=='1'">已关注</div>
          </template>
        </div>
      </div>
      <!-- 下面才是正文内容 -->
      <div class="contentShowBos" v-html="dataList.body"></div>
    </div>
    <div class="garids"></div>
    <!-- 评论区 -->
    <Comments :commentList="commentList" />
    <!-- 底部留白 -->
    <div class="footg"></div>
    <div>
      <FootNav />
    </div>
  </div>
</template>

<script>
import NavBack from "../public/NavBack";
import FootNav from "./FootNav";
import Comments from "./Comments";
import imga from "../../assets/toux.jpg";
import { mapGetters } from "vuex";
const commentList = {
  all_comment_num: "502",
  ret: [
    {
      autherLogo: imga,
      autherName: "成都吴彦祖",
      times: "1小时前",
      nums: "126",
      zan: 221,
      contents:
        "从今以后，我一直用华为手机！中国要崛起，我们要打倒美帝主义！！",
      ret: [
        {
          autherLogo: imga,
          autherName: "成都吴彦祖",
          times: "1小时前",
          nums: "126",
          zan: 221,
          contents:
            "从今以后，我一直用华为手机！中国要崛起，我们要打倒美帝主义！！",
          ret: []
        },
        {
          autherLogo: imga,
          autherName: "广东刘德华",
          times: "2小时前",
          nums: "26",
          zan: 21,
          contents: "我担心台积水也反水",
          ret: []
        },
        {
          autherLogo: imga,
          autherName: "湖北陈冠希",
          times: "4小时前",
          nums: "1326",
          zan: 2231,
          contents:
            "从今以后，我一直用华为手机！中国要崛起，我们要打倒美帝主义！！",
          ret: []
        },
        {
          autherLogo: imga,
          autherName: "山东郭德纲",
          times: "2天前",
          nums: "36",
          contents:
            "美国看的不是华为手机，而是其推导的5G，最终手机都会被其他传感器所取代，任正非看的是世界几十年，几百年以后的技术发展趋势，所以美国禁华为是看到了未来，谁拥有5G技术，谁就拥有了未来的主导权。",
          zan: 2145,
          ret: []
        }
      ]
    },
    {
      autherLogo: imga,
      autherName: "广东刘德华",
      times: "2小时前",
      nums: "26",
      zan: 21,
      contents: "我担心台积水也反水",
      ret: []
    },
    {
      autherLogo: imga,
      autherName: "湖北陈冠希",
      times: "4小时前",
      nums: "1326",
      zan: 2231,
      contents:
        "从今以后，我一直用华为手机！中国要崛起，我们要打倒美帝主义！！",
      ret: []
    },
    {
      autherLogo: imga,
      autherName: "山东郭德纲",
      times: "2天前",
      nums: "36",
      contents:
        "美国看的不是华为手机，而是其推导的5G，最终手机都会被其他传感器所取代，任正非看的是世界几十年，几百年以后的技术发展趋势，所以美国禁华为是看到了未来，谁拥有5G技术，谁就拥有了未来的主导权。",
      zan: 2145,
      ret: []
    }
  ]
};
export default {
  name: "RecommendDetails",
  data() {
    return {
      dataList: {},
      commentList,
      loading1: false
    };
  },
  computed: {
    ...mapGetters(["admin_id", "name"])
  },
  components: { NavBack, FootNav, Comments },
  created() {
    var ids = this.$route.query.graphic_id;
    console.log(ids);
    this.getMsg(ids);
  },
  methods: {
    backjump() {
      this.$router.push({
        path: "/"
      });
    },
    // 获取信息
    getMsg(val) {
      this.$get("/wangtian/api/v1/index_show/graphic_detail/", {
        graphic_id: val
      })
        .then(res => {
          console.log(res);

          if (res.code == "1") {
            console.log("获取成功");
            this.dataList = res.re_data;
          } else {
            console.log("获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
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
    },
    // 关注、
    guanzhuJump(val, index) {
      console.log(val);
      console.log(index);
      if (!this.name) {
        this.jumplogin();
        return;
      }
      this.loading1 = true;
      if (val == 0) {
        this.$post("/wangtian/api/v1/user_action/attention_people/", {
          to_people: index
        })
          .then(res => {
            this.loading1 = false;
            console.log(res);

            if (res.code == "1") {
              console.log("关注成功");
              this.dataList.is_attention = 1;
            } else {
              console.log("关注失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        var param = { to_people: index };
        this.$del("/wangtian/api/v1/user_action/attention_people/", {
          data: param
        })
          .then(res => {
            this.loading1 = false;
            console.log(res);

            if (res.code == "1") {
              console.log("取关成功");
              this.dataList.is_attention = 0;
            } else {
              console.log("关注失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mainsContentBox {
  width: 100%;
  padding: 0.32rem;
  //   background-color: paleturquoise;
  text-align: left;
  .titles {
    font-size: 0.32rem;
    // background-color: violet;
  }
  .autherBox {
    margin: 0.2rem auto;
    // background-color: white;
    position: relative;
    width: 100%;
    height: 1.18rem;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-top: 0.09rem;
    }
    .autherName {
      position: absolute;
      font-size: 0.28rem;
      font-weight: 600;
      top: 0.12rem;
      left: 1.32rem;
    }
    .autherType {
      top: 0.62rem;
      font-weight: 100;
      font-size: 0.24rem;
    }
    .guanZhuBox {
      position: absolute;

      top: 0.32rem;
      right: 0.02rem;
      .guan1 {
        width: 1rem;
        background-color: red;
        color: white;
        height: 0.56rem;
        line-height: 0.56rem;
        border-radius: 0.1rem;
        text-align: center;
      }
      .guan2 {
        width: 1.26rem;
        background-color: none;
        border: 0.02rem solid #e4e2e2;
        color: #666;
        height: 0.56rem;
        line-height: 0.56rem;
        border-radius: 0.1rem;
        text-align: center;
      }
    }
  }
  .contentShowBos {
    width: 100%;
    // background-color: palegoldenrod;
    overflow: hidden;
    margin: 0 auto 0.1rem;
    p > img {
      width: 100%;
    }
  }
}
.footg {
  width: 100%;
  height: 1.64rem;
}
.garids {
  width: 100%;
  border: 0.02rem dashed #f0f0f0;
  margin: 0 auto;
}
</style>