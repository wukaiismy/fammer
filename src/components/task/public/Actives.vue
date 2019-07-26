<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-24 15:02:04
 * @LastAuthor: wukai
 * @lastTime: 2019-06-10 14:54:51
 -->
<template>
  <div>
    <NavBack name="动态发布" @backjump="backjump"/>
    <div class="submitFabu" @click="sbmitJump" :class="newsList.body.length?'sumibt':''">发表</div>
    <!-- 下面是主体部分 -->
    <div class="mainsBoxs">
      <div class="rightBox rachBox">
        <textarea
          class="textTareaBox"
          v-model="newsList.body"
          placeholder="#输入您的动态,字符不超过240"
          cols="4"
          rows="6"
        ></textarea>
        <div>
          <PhotoUp @photoUp="photoUp"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBack from "../../public/NavBack";
import PhotoUp from "../../infoCollection/public/PhotoUpMoer";

export default {
  name: "Actives",
  components: { NavBack, PhotoUp },
  data() {
    return {
      newsList: {
        image: [],
        body: "",
        display_mode: "3"
      }
    };
  },

  methods: {
    backjump() {
      this.$confirm("离开后内容无法保存，确定要离开？", "提示", {
        type: "warning"
      }).then(({ result }) => {
        if (result) {
          this.$toast.warning("取消发布");
          this.$router.push({
            path: "/"
          });
        } else {
          this.$toast.info("继续编写发布内容");
        }
      });
    },
    // 照片组件传值
    photoUp(val) {
      console.log("++++++++++++++");
      console.log(val);
      this.newsList.image = val;
    },
    // 发布
    sbmitJump() {
      console.log(this.newsList);

      // 发起请求
      this.$post("/wangtian/api/v1/write_operate/user_dynamic/", this.newsList)
        .then(res => {
          console.log(res);
          if (res.code == "1") {
            this.$toast.success("发布成功");
            this.$router.push({
              path: "/"
            });
          } else {
            this.$toast.warning("发布失败");
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
.submitFabu {
  position: fixed;
  font-size: 0.3rem;
  letter-spacing: 2px;
  background-color: #4cbb33;
  width: 1.32rem;
  height: 0.6rem;
  line-height: 0.6rem;
  top: 0.54rem;
  z-index: 1000011;
  color: #4ca039;
  border-radius: 0.6rem;
  right: 0.32rem;
}
.sumibt {
  color: #ce4b17;
  background-color: white;
}
.mainsBoxs {
  width: 100%;
}

.vue-html5-editor {
  font-size: 0.28rem;
  line-height: 1.5;
  background-color: #fff;
  color: #333;
  border: none;
  text-align: left;
  border-radius: 0;
  overflow: hidden;
}

.rachBox {
  position: relative;
  width: 100%;
  top: 0.1rem;
  left: 0;
  margin: 0 auto;
  padding-bottom: 1rem;
}
.textTareaBox {
  caret-color: #ee8018;
  border: none;
  padding-left: 0.1rem;
  outline: none;
  width: 100%;
  font-size: 0.26rem;
}
</style>