<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:13
 * @LastAuthor: wukai
 * @lastTime: 2019-06-21 16:36:49
 -->
<template>
  <div>
    <NavBack name="常用地址管理" @backjump="backjump"/>
    <!-- 地址列表 -->
    <div class="contentBox">
      <div class="itemsBox" v-for="(ads, index) in dataList" :key="index">
        <div class="name">{{ads.receiver}}</div>
        <span class="tels">
          {{ads.receiver_mobile}}
          <template>
            <span v-if="ads.is_default=='1'" class="bq">默认</span>
            <span v-else class="bq bq1">常规</span>
          </template>
        </span>
        <img
          @click="changeAdds(ads.id)"
          class="changeAddressLogo"
          src="../../assets/xiugai.png"
          alt
        >
        <div class="adds">{{ads.address}}{{ads.address_detailed}}</div>
        <div class="gaird"></div>
      </div>
    </div>
    <div class="footg"></div>
    <!-- 底部 -->
    <div class="footNavs">
      <div class="addBox" v-waves @click="newAddressJump">
        <img class="addImg" src="../../assets/jia.png" alt>
        <span>新建地址</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavBack from "../public/NavBack";
import waves from "@/directive/waves"; // 水波纹指令
import addsLists from "../public/data";
export default {
  name: "MyAdds",
  directives: {
    waves
  },
  components: { NavBack },
  data() {
    return {
      dataList: []
    };
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
    // 获取地址列表
    getMsg() {
      this.$get("/wangtian/api/v1/user_action/shop_address/")
        .then(res => {
          console.log(res);
          this.dataList = res.ret;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 修改地址
    changeAdds(index) {
      console.log(index);
      var data = {
        shou_id: index
      };
      this.$confirm("确定删除该地址？", "提示", {
        type: "warning"
      }).then(({ result }) => {
        if (result) {
          this.$toast.warning("删除");
          this.$del("/wangtian/api/v1/user_action/shop_address/", {
            data: data
          })
            .then(res => {
              console.log(res);
              if (res.code == "1") {
                this.getMsg();
              } else {
                this.$toast.info("删除失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
          // this.$router.push({
          //   path: "/"
          // });
        } else {
          this.$toast.info("取消");
        }
      });
    },
    //新建地址跳转
    newAddressJump() {
      setTimeout(() => {
        this.$router.push({
          path: "/MapDemo"
        });
      }, 500);
    }
  }
};
</script>

<style scoped>
.contentBox {
  width: 100%;
  padding: 0;
  margin: 0;

  /* background-color: antiquewhite; */
}
.itemsBox {
  width: 100%;
  padding: 0.32rem 0.32rem 0 0.32rem;
  background-color: #fff;
  text-align: left;
  /* margin-top: 0.1rem; */
  position: relative;
}
.name {
  font-size: 0.36rem;
  color: black;
  display: inline-block;
}
.tels {
  position: absolute;
  left: 2.1rem;
}
.adds {
  font-size: 0.24rem;
  margin-top: 0.22rem;
  width: 80%;
  text-align: left;
}
.bq {
  margin-left: 0.12rem;
  background-color: red;
  display: inline-block;
  font-size: 0.2rem;
  color: #fff;
  width: 0.84rem;
  height: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  border-radius: 0.4rem;
}
.bq1 {
  background-color: rgb(51, 51, 230);
}
.changeAddressLogo {
  position: absolute;
  width: 0.68rem;
  right: 0.32rem;
  top: 0.88rem;
}
.gaird {
  width: 100%;
  border: 0.02rem solid #f9f9f9;
  margin-top: 0.32rem;
}
.footNavs {
  width: 100%;
  height: 1.4rem;
  background-color: #f9f9f9;
  position: fixed;
  bottom: 0;
  text-align: center;
  line-height: 1.4rem;
}
.footg {
  width: 100%;
  height: 2rem;
  background-color: #f9f9f9;
}
.addBox {
  width: 80%;
  height: 0.88rem;
  line-height: 0.88rem;
  color: white;
  background-color: red;
  margin: 0.2rem auto;
  border-radius: 1rem;
}
.addBox span {
  font-size: 0.34rem;
  margin-top: -0.1rem;
  position: relative;
  top: -0.08rem;
  letter-spacing: 0.08rem;
}
.addImg {
  height: 0.4rem;
  margin: 0.22rem 0.1rem 0 0;
  /* position: absolute; */
}
</style>