<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-06-12 10:02:28
 * @LastAuthor: wukai
 * @lastTime: 2019-06-12 17:47:27
 -->
<template>
  <div>
    <NavBack name="个人信息" @backjump="backjump"/>
    <div class="bigBoxShows">
      <div class="addMsg">
        <div class="addTitle">头像</div>
        <div class="rightBox" @click="jumpSetingUp('更改头像',Info.avatar)">
          <div class="items">
            <img class="Logo" v-lazy="Info.avatar" alt>
          </div>
          <img class="nextLogo" src="../../../assets/forward@2x.png" alt>
        </div>
      </div>
      <div class="gaird1"></div>
      <div class="addMsg">
        <div class="addTitle">昵称</div>
        <div class="rightBox" @click="jumpSetingUp('更改昵称',Info.nick_name)">
          <div class="items">{{Info.nick_name}}</div>
          <img class="nextLogo n1" src="../../../assets/forward@2x.png" alt>
        </div>
      </div>
      <div class="gaird1"></div>
      <div class="addMsg">
        <div class="addTitle">生日</div>
        <div class="rightBox" @click="jumpSetingUp('更改生日',Info.birthday)">
          <div class="items">{{Info.birthday}}</div>
          <img class="nextLogo n1" src="../../../assets/forward@2x.png" alt>
        </div>
      </div>
      <div class="gaird1"></div>
      <div class="addMsg">
        <div class="addTitle">地区</div>
        <div class="rightBox" @click="jumpSetingUp('更改地区',add)">
          <div class="items">{{Info.address_province}}{{Info.address_city}}</div>
          <img class="nextLogo n1" src="../../../assets/forward@2x.png" alt>
        </div>
      </div>
      <div class="gaird1"></div>
      <div class="addMsg">
        <div class="addTitle">个性签名</div>
        <div class="rightBox" @click="jumpSetingUp('更改个性签名',Info.signature)">
          <div class="items">{{Info.signature}}</div>
          <img class="nextLogo n1" src="../../../assets/forward@2x.png" alt>
        </div>
      </div>
      <div class="gaird1"></div>
      <div class="addMsg">
        <div class="addTitle">性别</div>
        <div class="rightBox" @click="openScrollDialog">
          <div class="items">
            <template>
              <div v-if="Info.sex=='0'">女</div>
              <div v-if="Info.sex=='1'">男</div>
              <div v-if="Info.sex=='2'">未设置</div>
            </template>
          </div>
          <img class="nextLogo n1" src="../../../assets/forward@2x.png" alt>
        </div>
      </div>
      <div class="gaird1"></div>
    </div>

    <mu-dialog title="请选择性别" width="360" scrollable :open.sync="openScroll">
      <mu-list>
        <mu-list-item v-for="(option, index) in options" :key="index">
          <mu-list-item-content>
            <mu-radio :label="option" :value="index" v-model="ringtone"></mu-radio>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
      <mu-button slot="actions" flat color="primary" @click="closeScrollDialog">确认</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import NavBack from "../../public/NavBack";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "MySelfSetting",

  components: { NavBack },
  data() {
    return {
      Info: {},
      add: "",
      openScroll: false,
      ringtone: "",
      options: ["女", "男"]
    };
  },
  computed: {
    ...mapGetters(["admin_id", "name"])
  },
  created() {
    this.getMsg();
  },
  methods: {
    backjump() {
      this.$router.push({
        path: "/MyCenter"
      });
    },
    //    获取个人资料
    getMsg() {
      this.$get("/wangtian/api/v1/user_action/user_info/", {
        u_id: this.admin_id
      })
        .then(res => {
          console.log(res);

          if (res.code == "1") {
            console.log("获取成功");
            this.Info = res.main_data;
            this.add = this.Info.address_province + this.Info.address_city;
          } else {
            console.log("获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
      // 更新vuex用户信息
      this.GetUserInfo();
    },
    openScrollDialog() {
      this.openScroll = true;
    },
    closeScrollDialog() {
      this.openScroll = false;
      console.log(this.ringtone);
      this.$post("/wangtian/api/v1/user_action/user_info/", {
        sex: this.ringtone.toString()
      })
        .then(res => {
          console.log(res);
          if (res.code == "1") {
            this.$toast.message("更新成功");
            this.getMsg();
          } else {
            this.$toast.warning("更新失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转到详细设置
    jumpSetingUp(val, value) {
      this.$router.push({
        path: "/SettingUp",
        query: {
          id: val,
          value: value
        }
      });
    },
    ...mapActions(["GetUserInfo"])
  }
};
</script>

<style lang="scss" scoped>
.addMsg {
  width: 100%;
  padding: 0.2rem 0.2rem 0.2rem 0.2rem;
  background-color: #fff;
  position: relative;
  text-align: left;
  line-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.addTitle {
  font-size: 0.26rem;
  position: absolute;
}

.rightBox {
  width: 5.6rem;
  //   padding-left: 0.32rem;
  // background-color: #fbda61;
  position: relative;
  font-size: 0.24rem;
  text-align: right;
  left: 1.4rem;
}
.items {
  min-height: 0.48rem;
  line-height: 0.48rem;
  display: inline-block;
  // background-color: palevioletred;
  margin-right: 0.3rem;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.Logo {
  width: 1rem;
  height: 1rem;
}
.nextLogo {
  width: 0.12rem;
  position: absolute;
  right: 0rem;
  margin: auto;
  top: 0;
  bottom: 0;
}

.gaird1 {
  width: 100%;
  height: 0.01rem;
  border: #f9f9f9 solid 0.02rem;
}
</style>