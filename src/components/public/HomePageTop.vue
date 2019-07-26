<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 15:22:44
 * @LastAuthor: wukai
 * @lastTime: 2019-06-12 16:13:53
 -->
<template>
  <div class="HomePageTopBox">
    <div class="navBox" :style="rgbs">
      <div v-if="condition">
        <div class="searchBox" @click="searchJump">
          <mu-icon value="search" color="#ccc" size="30"></mu-icon>
          <div class="searchContent">
            <div v-for="(item, index) in searchList" :key="index">{{item}}</div>
          </div>
          <div class="gaird1s"></div>
        </div>
        <div class="faBox">
          <div class="iremtd">
            <mu-button color="white" @click="open = !open" ref="button" icon>
              <mu-icon value="linked_camera" size="24"></mu-icon>
            </mu-button>
            <span class="faBuJump">发布</span>
          </div>
          <mu-popover :open.sync="open" :trigger="trigger">
            <mu-list>
              <mu-list-item button @click="publishJump(1)">
                <mu-list-item-title>图文发布</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button @click="publishJump(2)">
                <mu-list-item-title>动态发布</mu-list-item-title>
              </mu-list-item>
            </mu-list>
          </mu-popover>
        </div>
      </div>
      <div v-else class="searvhs">
        <mu-auto-complete
          :solo="isTrue"
          class="ppppp"
          :class="focus2?'p1':''"
          @select="searchJumps"
          @blur="jumpaa"
          ref="input"
          :data="fruits"
          v-model="value1"
        ></mu-auto-complete>
        <span class="searhjump" @click="searchJumps">搜索</span>
      </div>
    </div>
    <div class="gaidm"></div>
  </div>
</template>

<script>
const fruits = ["老腊肉", "水果", "车厘子", "随便", "有机蔬菜"];
import { mapGetters } from "vuex";

export default {
  name: "HomePageTop",

  data() {
    return {
      fruits,
      open: false,
      trigger: null,
      searchList: ["深山泉水", "攀枝花大芒果"],
      condition: true,
      value1: "",
      isTrue: true,
      focus2: false
    };
  },
  computed: {
    ...mapGetters(["roles", "rgbs"])
  },
  mounted() {
    this.trigger = this.$refs.button.$el;
  },
  methods: {
    searchJump() {
      // this.$router.push({
      //   path: "/Searchs"
      // });
      console.log(111);
      this.condition = false;
      // 当出现输入框时进行聚焦
      this.thisFocus();
      setTimeout(() => {
        this.thisFocus();
        this.focus2 = true;
      }, 0);
    },
    searchJumps() {
      console.log(this.value1);
    },
    jumpaa() {
      console.log("失去焦点");

      // 调用$nextTick函数，等value1更新后再做逻辑处理
      this.$nextTick(() => {
        console.log(this.value1);
        if (!this.value1) {
          this.focus2 = false;
          setTimeout(() => {
            this.condition = true;
          }, 1500);
        }
      });
    },
    // 文章发布跳转、
    publishJump(index) {
      console.log(index);
      if (index == "2") {
        this.$router.push({
          path: "/Actives",
          query: { id: index }
        });
      } else {
        this.$router.push({
          path: "/TuWen",
          query: { id: index }
        });
      }
    },
    // 创建一个聚焦函数
    thisFocus() {
      $(".mu-text-field-input").focus();
    }
  }
};
</script>

<style lang="scss" scoped>
.HomePageTopBox {
  background-color: #f9f9f9;
  width: 100%;
  /* position: fixed; */
  height: 100%;
}
.navBox {
  height: 1.58rem;
  width: 100%;
  /* background-image: linear-gradient(-137deg, #ee8018 0%, #fbda61 100%); */
  position: fixed;
  z-index: 100000;
}
.gaidm {
  width: 100%;
  //   height: 1.28rem;
  height: 1.58rem;
}

.searchBox {
  width: 80%;
  height: 0.64rem;
  background-color: #fff;
  text-align: left;
  line-height: 0.64rem;
  padding: 0.02rem 0.2rem 0 0.2rem;
  margin: 0.74rem auto;
  border-radius: 0.08rem;
  display: inline-block;
  position: relative;
}
.searvhs {
  width: 100%;
  height: 0.6rem;
  // background-color: bisque;
  margin: 0.74rem auto;
}

.ppppp {
  font-size: 0.26rem;
  width: 4.8rem;
  height: 0.6rem;
  min-height: 0.6rem;
  // margin-left: -0.7rem;
  margin-bottom: 0.01rem;
  padding: 0 0 0.01rem 0.32rem;
  transition: 1s 0s width ease;
  background-color: white;
  border-radius: 0.1rem;
}
// .ppppp:hover {
//   width: 80%;
// }
.p1 {
  width: 80%;
}

.searchContent {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  // background-color: palegoldenrod;
  width: 5rem;
  top: 0;
  left: 0.92rem;
  font-size: 0.28rem;
}
.gaird1s {
  width: 0.02rem;
  height: 0.46rem;
  background-color: #333;
  position: absolute;
  top: 0.13rem;
  left: 55%;
}
.searhjump {
  font-size: 0.28rem;
  margin-left: 0.1rem;
  color: white;
}
.faBox {
  width: 0.8rem;
  height: 0.8rem;
  display: inline-block;
  // background-color: red;
  position: relative;
  top: -0.25rem;
  padding: 0;
  text-align: center;
}
.iremtd {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mu-icon-button {
  height: 0.3rem;
}
.faBuJump {
  // background-color: red;
  font-size: 0.22rem;
  color: white;
}
</style>