<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:13
 * @LastAuthor: wukai
 * @lastTime: 2019-05-21 11:30:17
 -->
<template>
  <div class="bigbox">
    <NavBack :name="msg" @backjump="backjump"/>

    <img class="AddImg" src="../../assets/friends/gengduo.png" alt>
    <!-- 主题内容 -->
    <div id="Biddd" :style="{height:(screenHeight-80)+'px'}">
      <div v-for="(item, index) in messageList" :key="index">
        <template>
          <chatMsg v-if="item.myself" :logo="msgslist.logo" :msgs="item.message"/>
          <chatMyMsg v-else :logo="myMsg.logo" :msgs="item.message"/>
        </template>
      </div>
      <div class="footg"></div>
    </div>
    <!-- 最底层 -->
    <div class="foootBox">
      <img class="Voice" src="../../assets/friends/Voice.png" alt>
      <img class="biaoQing" src="../../assets/friends/biaoqing.png" alt>
      <template>
        <img v-show="!my_msg" class="biaoQing ass" src="../../assets/friends/icon02.png" alt>
        <span v-show="my_msg" @click="sendJump" class="sendJump">发送</span>
      </template>
      <input type="text" class="ipt" v-model="my_msg" @keyup.enter="sendJump">
    </div>
  </div>
</template>

<script>
import NavBack from "../public/NavBack";
import chatMsg from "../public/chatMsg";
import chatMyMsg from "../public/ChatMyslef";

import logo from "../../assets/logoImg.jpg";
import logo1 from "../../assets/9.jpg";
const msgData = {
  logo: logo,
  msgList: ["帅哥进来玩啊", "我有个好东西送给你", "s什么？不要啊", "不要就算了"]
};
export default {
  name: "WeChatShow",
  components: { NavBack, chatMsg, chatMyMsg },
  data() {
    return {
      msg: "",
      msgslist: msgData,
      screenHeight: document.documentElement.clientHeight, // 屏幕高度
      myMsg: {
        logo: logo1,
        msgList: ["算了，身体遭不住", "算了，身体遭不住"]
      },
      messageList: [],
      my_msg: ""
    };
  },
  mounted() {
    this.scrollToBottom();
  },
  //每次页面渲染完之后滚动条在最底部
  updated() {
    this.scrollToBottom();
  },

  created() {
    if (this.$route.query) {
      this.msg = this.$route.query.name;
      // console.log(this.msg);
    }
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        setTimeout(() => {
          var container = this.$el.querySelector("#Biddd");
          // console.log(container.scrollHeight);
          container.scrollTop = container.scrollHeight - 150;
          // console.log(container.clientHeight);
        }, 13);
      });
    },

    backjump() {
      this.$router.push({
        path: "/MsgHome"
      });
    },
    sendJump() {
      var _this = this;
      //  console.log(_this.$refs.charView);
      this.messageList.push({
        message: this.my_msg,
        //这个是判断当前是否是自己输入的内容,自己的是true,机器人的是false
        myself: false
      });
      // console.log(1);
      // console.log(message)
      // console.log(this.inputValue);
      //每次发送信息之后机器人就要回复,所以添加完之后直接调用机器人的接口
      $.ajax({
        url: "http://www.tuling123.com/openapi/api",
        type: "post",
        data: {
          key: "307ffd33506940a6a446c3e61c140beb",
          info: this.my_msg,
          box: ""
        },
        success: data => {
          // console.log(data);
          this.messageList.push({
            message: data.text,
            myself: true
          });
          // _this.$refs.charView.scrollTop+=999;
        }
      });

      this.my_msg = "";
    }
  }
};
</script>

<style scoped>
.bigbox {
  width: 100%;
  height: 100%;
}
.AddImg {
  position: fixed;
  width: 0.66rem;
  top: 0.58rem;
  right: 0.32rem;
  z-index: 100000;
  opacity: 0.6;
}
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