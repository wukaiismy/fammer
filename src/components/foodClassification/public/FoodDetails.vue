<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-29 14:04:30
 * @LastAuthor: wukai
 * @lastTime: 2019-05-31 15:09:06
 -->
<template>
  <div>
    <div class="HomeBox" :style="auto_fixed">
      <div class="navBox" :style="rgbs">
        <div class="Bas"></div>
        <div class="navLogin">
          <svg @click="backJump" class="icon" :style="'fill:'+ colors" aria-hidden="true">
            <use xlink:href="#icon-fanhui"></use>
          </svg>
          美食详情
        </div>
      </div>
    </div>
    <div class="imgBox" v-show="isShow">
      <svg @click="backJump" class="icon icons1" :style="'fill:'+colors" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </div>
    <!-- 下面是主页内容 -->
    <div class="header">
      <mu-carousel hide-controls :cycle="falses">
        <mu-carousel-item v-for="(item, index) in dataDetail.imgs" :key="index">
          <img class="imgss" :src="item">
        </mu-carousel-item>
      </mu-carousel>
      <div class="prese">
        ￥
        <span>{{dataDetail.prese}}</span>
        <div class="remenber">
          ￥{{dataDetail.remenber}}
          <span class="hui">会员价</span>
        </div>
      </div>
      <!-- 店家名字 -->
      <div class="stores">
        {{dataDetail.stores}}
        <div class="adds">
          <img src="../../../assets/dizhi.png" alt>
          {{dataDetail.adds}}
        </div>
      </div>
      <div class="garids"></div>
      <!-- 产品描述 -->
      <div class="details">{{dataDetail.title}}</div>
    </div>
    <!-- 下面是规格 -->
    <div class="guiBox">
      <div class="guis">
        已选
        <span>{{dataDetail.gui}}</span>
        <img src="../../../assets/xiala-.png" alt>
      </div>
    </div>
    <div class="gaird1"></div>
    <!-- 底部导航 -->
    <div class="footNav">
      <div class="gouBox">
        <img class="gouwuLogo" src="../../../assets/daohanggouwuche.png" alt>
        <div class="gTil">购物车</div>
        <div class="nums">{{dataDetail.num}}</div>
      </div>
      <div class="submits carShop" @click="jumpSubmit">加入购物车</div>
      <div class="submits" @click="jumpSubmit">立即购买</div>
    </div>
  </div>
</template>

<script>
import datas from "../../public/data";
import { mapGetters } from "vuex";
export default {
  name: "FoodDetails",
  components: {},
  data() {
    return {
      dataDetail: datas.foodDetail,
      auto_fixed: {
        opacity: 1
      },
      colors: "white",
      cha: 0,
      isShow: true,
      falses: false
    };
  },
  computed: {
    ...mapGetters(["roles", "rgbs"])
  },
  methods: {
    backJump() {
      this.$router.go(-1);
    },
    jumpSubmit() {},
    onScroll() {
      let scrolled =
        document.documentElement.scrollTop || document.body.scrollTop;
      let header_height = null;
      if (document.getElementsByClassName("header")[0]) {
        header_height = document.getElementsByClassName("header")[0]
          .offsetHeight;
      }
      console.log("滚动的距离:" + scrolled, "头部的高度:" + header_height);

      console.log(this.cha);

      if (scrolled < 40) {
        console.log("小于40");
        this.auto_fixed.opacity = 0;
        this.isShow = true;
      } else if (40 < scrolled && scrolled < 250) {
        console.log("40-200");
        this.isShow = false;
        if (scrolled > this.cha) {
          if (scrolled % 11 == 0) {
            this.auto_fixed.opacity += 0.1;
            if (this.auto_fixed.opacity >= 1) {
              this.auto_fixed.opacity = 1;
            }
          }
        } else if (scrolled < this.cha) {
          this.isShow = false;
          if (scrolled % 5 == 0) {
            this.auto_fixed.opacity -= 0.1;
            if (this.auto_fixed.opacity <= 0) {
              this.auto_fixed.opacity = 0;
            }
          }
        }
        this.cha = scrolled;
      } else if (scrolled > 250) {
        console.log("大于250");
        this.auto_fixed.opacity = 1;
      }
      console.log(this.auto_fixed.opacity);
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.onScroll);
    });
  },

  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style lang="scss" scoped>
.HomeBox {
  background-color: #f9f9f9;
  // width: 100%;
  position: fixed;
  height: 100%;
  z-index: 100003;
}
.navBox {
  height: 1.28rem;
  width: 100%;
  /* background-image: linear-gradient(-137deg, #ee8018 0%, #fbda61 100%); */
  position: fixed;
}
.Bas {
  width: 100%;
  height: 0.4rem;
}
.gaidm {
  width: 100%;
  height: 1.28rem;
}
.navLogin {
  font-size: 0.36rem;
  color: white;
  height: 0.88rem;
  line-height: 0.88rem;
}
.backLogo {
  width: 0.4rem;
  position: absolute;
  top: 0.64rem;
  left: 0.32rem;
}
.imgBox {
  z-index: 100000;
  background-color: rgb(194, 190, 190);
  position: fixed;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  top: 0.54rem;
  left: 0.18rem;
}
.icon {
  width: 0.4rem;
  position: absolute;
  top: 0.44rem;
  left: 0.32rem;
  fill: white;
  overflow: hidden;
  height: 0.88rem;
  /* line-height: 0.88rem; */
}
.icons1 {
  position: fixed;
}

.header {
  padding: 0;
  background-color: #fff;
  border-radius: 0.2rem;
}
.imgss {
  width: 2rem;
}
.mu-carousel {
  height: 5rem;
  top: 0;
  //   background-color: palegoldenrod;
}
.prese {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  position: relative;

  margin: 0rem auto;
  text-align: left;
  padding-left: 0.32rem;
  color: red;
  font-size: 0.28rem;
  span {
    font-size: 0.34rem;
    font-weight: 600;
  }
  .remenber {
    position: absolute;
    top: 0rem;
    left: 2rem;
    color: rgb(70, 29, 219);
    .hui {
      width: 1rem;
      height: 0.3rem;
      background-color: rgb(70, 29, 219);
      color: white;
      font-size: 0.2rem;
      padding: 0 0.1rem 0 0.1rem;
      border-radius: 0.04rem;
    }
  }
}
.stores {
  margin: 0.32rem auto;
  //   background-color: palegoldenrod;
  width: 100%;
  height: 1rem;
  text-align: left;
  padding: 0 0.32rem;
  color: #333;
  .adds {
    font-size: 0.24rem;
    color: #999;
    img {
      width: 0.36rem;
      position: relative;
      top: 0.08rem;
    }
  }
}
.garids {
  width: 100%;
  border: 1px solid #f9f9f9;
}
.details {
  margin: 0rem auto;
  //   background-color: palegoldenrod;
  padding: 0.32rem;
  font-size: 0.28rem;
  color: #333;
  text-align: left;
  letter-spacing: 1px;
}
.guiBox {
  margin: 0.32rem auto;
  background-color: white;
  padding: 0.32rem;
  border-radius: 0.2rem;
  text-align: left;
  .guis {
    font-size: 0.24rem;
    color: #333;
    position: relative;
    span {
      margin-left: 0.4rem;
      font-weight: 600;
    }
    img {
      width: 0.4rem;
      position: absolute;
      right: 0.12rem;
    }
  }
}
.gaird1 {
  width: 100%;
  height: 2.1rem;
  background-color: #f9f9f9;
}
.footNav {
  width: 100%;
  height: 1.2rem;
  background-color: white;
  position: fixed !important;
  border-top: 1px solid #f0f0f0;
  bottom: 0;
  color: red;
  line-height: 1.2rem;
  padding-left: 0.32rem;
  text-align: left;
  font-size: 0.3rem;
  .gouBox {
    position: relative;
    top: 0rem;
    left: 1.5rem;
  }
  .gouwuLogo {
    width: 0.5rem;
  }
  .gTil {
    display: inline-block;
    font-size: 0.22rem;
    color: #666;
    position: relative;
    top: 0.28rem;
    left: -0.62rem;
  }
  .nums {
    position: absolute;
    top: 0.1rem;
    font-size: 0.2rem;
    border: 1px solid red;
    box-sizing: border-box;
    width: 0.3rem;
    height: 0.3rem;
    left: 0.4rem;
    line-height: 0.3rem;
    text-align: center;
    border-radius: 0.3rem;
  }
  .submits {
    height: 0.8rem;
    background-color: #ee8018;
    position: absolute;
    right: 0.32rem;
    top: 0.21rem;
    line-height: 0.8rem;
    padding: 0 0.32rem 0 0.32rem;
    border-radius: 0.6rem;
    color: white;
    font-size: 0.28rem;
    font-weight: 600;
  }
  .carShop {
    left: 3rem;
    width: 2.2rem;
    padding: 0;
    text-align: center;
    background-color: red;
  }
}
</style>