<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-21 14:16:32
 * @LastAuthor: wukai
 * @lastTime: 2019-05-30 15:42:57
 -->
<template>
  <div class="commentsBox">
    <div class="commentTitles">最新评论({{commentList.all_comment_num}})</div>
    <!-- 下面是评论的列表显示 -->
    <div class="commentListBox" v-for="(item, index) in commentList.ret" :key="index">
      <img v-lazy="item.autherLogo" alt>
      <span class="names">{{item.autherName}}</span>
      <div class="zan" @click="zanJump(index)" :class="!zaned&&indexId===index?'zans':''">
        <template>
          <img class="tdImg" v-if="!zaned&&indexId===index" :src="zan" alt>
          <img class="tdImg" v-else :src="zan1" alt>
        </template>
        {{item.zan}}
      </div>
      <div class="contentsShow">
        <div class="contentsMain">{{item.contents}}</div>
        <div class="lastBox">
          {{item.times}}
          <span>·</span>
          <div @click="openBotttomSheet(index)" class="moreComment">{{item.nums}} 回复</div>
        </div>
      </div>
    </div>

    <!-- 底部抽屉 -->
    <mu-bottom-sheet :open.sync="open">
      <!-- 地址列表 -->
      <div class="sheetTitleq">
        <img @click="closeBottomSheet" class="errLogo" src="../../assets/error.png" alt>
        {{this.dataList.nums}}条回复
      </div>
      <div class="gaird g1"></div>
      <!-- 下面是评论的列表显示 -->
      <div ref="viewBox" class="sheetBoxShows" id="searchBar" v-swipedown="(e)=>vueTouch('下滑',e)">
        <!-- 楼主发的 -->
        <div>
          <div class="commentListBox clbs">
            <img v-lazy="dataList.autherLogo" alt>
            <span class="names">
              {{dataList.autherName}}
              <span class="bioanq">楼主</span>
            </span>

            <div class="contentsShow">
              <div class="contentsMain">{{dataList.contents}}</div>
              <div class="lastBox">{{dataList.times}}</div>
              <!-- 显示多少人赞过-->
              <div class="zanBox">共有{{dataList.zan}}人赞过</div>
            </div>
          </div>
          <div class="gaird g1"></div>
        </div>
        <div class="commentListBox" v-for="(item, index) in dataList.ret" :key="index">
          <img :src="item.autherLogo" alt>
          <span class="names">{{item.autherName}}</span>
          <div class="zan" @click="zanJump(index)" :class="!zaned&&indexId===index?'zans':''">
            <template>
              <img class="tdImg" v-if="!zaned&&indexId===index" :src="zan" alt>
              <img class="tdImg" v-else :src="zan1" alt>
            </template>
            {{item.zan}}
          </div>
          <div class="contentsShow">
            <div class="contentsMain">{{item.contents}}</div>
            <div class="lastBox">{{item.times}}</div>
          </div>
        </div>
        <!-- 底部留白 -->
        <div class="footg"></div>
      </div>
      <FootNav/>
    </mu-bottom-sheet>
  </div>
</template>

<script>
import zan from "../../assets/zan11.png";
import zan1 from "../../assets/zan1.png";
import waves from "@/directive/waves"; // 水波纹指令
import FootNav from "./FootNav";
export default {
  name: "Comments",
  directives: {
    waves
  },
  props: ["commentList"],
  components: { FootNav },
  data() {
    return {
      zan,
      zan1,
      zaned: true,
      indexId: 0,
      open: false,
      dataList: [],
      scrolls: null
    };
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    zanJump(index) {
      this.indexId = index;
      if (this.zaned) {
        this.zanLogo = zan;
        this.commentList.ret[index].zan += 1;
        this.zaned = false;
      } else {
        this.zanLogo = zan1;
        this.commentList.ret[index].zan -= 1;
        this.zaned = true;
      }
    },
    // 底部抽屉事件
    // 打开下拉选框
    openBotttomSheet(index) {
      this.open = true;
      this.dataList = this.commentList.ret[index];
      console.log(this.dataList);
      this.$nextTick(() => {
        var box = this.$refs.viewBox; // 监听这个dom的scroll事件
        // console.log(box);
        box.addEventListener(
          "scroll",
          () => {
            // console.log(" scroll " + this.$refs.viewBox.scrollTop); //以下是我自己的需求，向下滚动的时候显示“我是有底线的（类似支付宝）”
            this.scrolls = this.$refs.viewBox.scrollTop;
          },
          true
        );
      });
    },
    // 关闭
    closeBottomSheet() {
      this.open = false;
    },
    // 修改地址
    changeAdds(index) {
      console.log(index);
    },

    //新建地址跳转
    newAddressJump() {
      setTimeout(() => {
        this.$router.push({
          path: "/MapDemo"
        });
      }, 500);
    },
    vueTouch: function(txt, e) {
      // console.log(txt);
      // console.log(e);
      if (this.scrolls == 0) {
        this.closeBottomSheet();
      }
    },
    // 监听滚动事件
    handleScroll() {
      //改变元素#searchBar的top值
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = document.querySelector("#searchBar");
      console.log(offsetTop);
      // console.log(offsetTop);
    }
  },
  destroyed() {
    //离开该页面需要移除这个监听的事件
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
.commentsBox {
  width: 100%;
  padding: 0.32rem;

  .commentTitles {
    font-size: 0.3rem;
  }
}
.sheetBoxShows {
  padding: 0.32rem;
  width: 100%;
  max-height: 11rem;
  overflow: hidden;

  margin: 0;
  overflow-y: scroll;
}
.commentListBox {
  // background-color: rgb(224, 241, 234);
  width: 100%;
  margin: 0.2rem auto;
  position: relative;
  text-align: left;
  padding: 0.1rem 0 0.1rem 0;
  img {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
  }
  .names {
    position: absolute;
    font-size: 0.26rem;
    left: 1.08rem;
    color: rgb(79, 184, 216);
    .bioanq {
      font-size: 0.2rem;
      border: 1px solid rgb(79, 184, 216);
      border-radius: 0.1rem;
      display: inline-block;
      margin-left: 0.1rem;
      padding-left: 0.1rem;
      padding-right: 0.1rem;
    }
  }
  .zan {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.24rem;
    .tdImg {
      width: 0.46rem;
      height: 0.4rem;
      position: relative;
      top: 0.1rem;
      /* margin: 0.32rem; */
    }
  }
  .zansss {
    position: absolute;
    right: 0;
    bottom: 0.32rem;
    font-size: 0.24rem;
    .tdImg {
      width: 0.46rem;
      height: 0.4rem;
      position: relative;
      top: 0.1rem;
      /* margin: 0.32rem; */
    }
  }
  .zans {
    color: red;
  }
  .contentsShow {
    width: 5.8rem;
    //   background-color: salmon;
    position: relative;
    left: 1rem;
    top: -0.1rem;

    .contentsMain {
      color: #333333;
      font-size: 0.26rem;
    }
    .lastBox {
      font-size: 0.22rem;
      color: #666666;
      margin-top: 0.2rem;
      position: relative;
      span {
        font-size: 0.4rem;
        position: relative;
        top: 0.06rem;
      }
    }
    .zanBox {
      width: 100%;
      font-size: 0.22rem;
      color: #666666;
      padding-top: 0.1rem;
      // background-color: palegoldenrod;
    }
    .moreComment {
      position: relative;
      display: inline-block;
      height: 0.4rem;
      line-height: 0.2rem;
      font-size: 0.22rem;
      background-color: #f0f0f0;
      padding: 0.1rem 0.2rem;
      border-radius: 0.2rem;
    }
  }
}
.clbs {
  margin: 0.1rem auto;
}
.gaird {
  width: 100%;
  border: 0.02rem solid #f9f9f9;
  margin-top: 0.32rem;
}
.g1 {
  margin-top: 0rem;
}
.sheetTitleq {
  font-size: 0.34rem;
  text-align: center;
  width: 100%;
  height: 0.86rem;
  line-height: 0.86rem;
  /* background-color: #ee8018; */
  .errLogo {
    position: absolute;
    width: 0.8rem;
    left: 0rem;
  }
}
.mu-bottom-sheet {
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 1rem;
}
.footg {
  width: 100%;
  height: 1.64rem;
}
</style>