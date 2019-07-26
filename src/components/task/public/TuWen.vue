<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-24 15:02:04
 * @LastAuthor: wukai
 * @lastTime: 2019-07-22 11:17:43
 -->
<template>
  <div>
    <NavBack name="图文发布" @backjump="backjump" />
    <div class="submitFabu" @click="sbmitJump" :class="newsList.title.length?'sumibt':''">发表</div>
    <!-- 下面是主体部分 -->
    <div class="mainsBoxs">
      <div class="itemBox">
        <span class="addTitle">标题</span>
        <div class="rightBox">
          <input type="text" v-model="newsList.title" class="rightBoxIpt" placeholder="标题不能超过30字" />
        </div>
        <!-- <div class="gaird1"></div> -->
      </div>
      <div class="itemBox">
        <span class="addTitle">标签</span>
        <div class="rightBox">
          <mu-select
            class="rightBoxIpt"
            @change="changetype"
            v-model="newsList.article_type_name"
            full-width
          >
            <mu-option
              v-for="(item, index) in article_types"
              :key="index"
              :label="item.at_name"
              :value="item.at_name"
              :solo="solos"
              @click.native="labels(item.at_id)"
            ></mu-option>
          </mu-select>
        </div>
        <!-- <div class="gaird1"></div> -->
      </div>
      <!-- <div class="itemBox">
        <span class="addTitle">logo图</span>
        <div class="rightBox">
          <PhotoUp @cardOne="cardOne"/>
        </div>
        <div class="gaird1"></div>
      </div>-->
      <div class="itemBox itm1" v-if="hackReset">
        <!-- <span class="addTitle">编辑发布内容</span> -->
        <div class="rightBox rachBox">
          <vue-html5-editor :content="newsList.body" :height="200" @change="updateData"></vue-html5-editor>
        </div>
        <!-- <div class="gaird1"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import NavBack from "../../public/NavBack";
import PhotoUp from "../../infoCollection/public/PhotoUp";
export default {
  name: "TuWen",
  components: { NavBack, PhotoUp },
  data() {
    return {
      solos: true,
      hackReset: false,
      newsList: {
        title: "",
        images: [],
        body: "",
        article_type: "",
        article_type_name: "请选择标签"
      },
      article_types: []
    };
  },
  created() {
    // 获取标签
    this.articles();
  },
  mounted() {
    this.hackReset = false; //销毁组件
    this.$nextTick(() => {
      this.hackReset = true; //重建组件
    });
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
    // 选择的值
    changetype(val, label) {
      // console.log(666);
      // console.log(val);
    },
    labels(index) {
      // console.log("11111");
      // console.log(index);
      this.newsList.article_type = index;
      console.log(this.newsList);
    },
    // 获取标签
    articles() {
      this.$get("/wangtian/api/v1/write_operate/article_type/")
        .then(res => {
          console.log(res);
          if (res.code == "1") {
            this.article_types = res.ret;
          } else {
            this.$toast.warning("暂未获取到标签");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 图片组件上传的地址
    cardOne(val) {
      console.log(val);
      // this.newsList.images = val;
    },
    // 发布
    sbmitJump() {
      console.log(this.newsList);
      var str = this.newsList.body;
      var arrimg = [];
      str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(
        match,
        capture
      ) {
        arrimg.push(capture);
      });

      if (arrimg != null && arrimg.length > 0) {
        this.newsList.images = arrimg;
        console.log(this.newsList.images);
      }
      // 发起请求
      this.$post("/wangtian/api/v1/write_operate/us_reg/", this.newsList)
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
    },
    // 富文本通用更换照片尺寸
    updateData(e = "") {
      let c1 = e.replace(/<img width="80%"/g, "<img");
      let c2 = c1.replace(/<img/g, '<img width="80%"');
      this.newsList.body = c2;
      console.log(this.newsList.body);
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

  // background-color: white;
}
.itemBox {
  position: relative;
  text-align: left;
  padding: 0.32rem 0.32rem 0 0.32rem;
  // background-color: pink;
}
.itm1 {
  padding: 0.32rem 0 0 0;
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
.addTitle {
  font-size: 0.3rem;
  position: absolute;
  top: 0.42rem;
  /* letter-spacing: 0.06rem; */
}
.rightBox {
  width: 85%;
  // padding-left: 0.32rem;
  // background-color: #fbda61;
  position: relative;
  margin-left: 1.2rem;
  top: 0rem;
  /* right: 0; */
}
.rachBox {
  width: 100%;
  top: 0.1rem;
  left: 0;
  margin: 0 auto 1rem;
  padding-bottom: 1rem;
}
.gaird1 {
  width: 100%;
  border: #f0f0f0 solid 0.02rem;
  margin-top: 0.32rem;
}
.rightBoxIpt {
  width: 95%;
  height: 100%;
  outline: none;
  border: 1px solid #eee;
  height: 0.8rem;
  caret-color: #ee8018;
  padding-left: 0.1rem;
  font-size: 0.26rem;
  border-radius: 0.06rem;
}
</style>