<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-28 10:24:55
 * @LastAuthor: wukai
 * @lastTime: 2019-05-31 17:33:24
 -->
<template>
  <div>
    <NavBack name="购物车"/>
    <div class="mainsBoxs">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="contentItem" v-for="(item, index) in shopList" :key="index">
          <mu-checkbox
            v-model="item.selected"
            uncheck-icon="favorite_border"
            checked-icon="favorite"
            color="red"
            @change="handleCheckAll(index)"
          ></mu-checkbox>
          <img class="logo" :src="item.logos" alt>
          <div class="titles">{{item.goods}}</div>
          <div class="roless">
            {{item.roles}},选服务
            <img class="xialas" src="../../assets/xiala-.png" alt>
          </div>
          <div class="prase">￥{{item.prase}}</div>
          <!-- 数量加减 -->
          <div class="numCountBox">
            <span class="subtraction" :class="item.num<2?'lost':''" @click="subtrs(index)">-</span>
            <span class="counts">{{item.num}}</span>
            <span class="subtraction" @click="addsNum(index)">+</span>
          </div>
        </div>
      </mescroll-vue>
      <div class="footBoxs1"></div>
    </div>
    <!-- 全部菜单栏 -->
    <div class="allNavBoxs">
      <mu-checkbox
        v-model="allCheck"
        uncheck-icon="favorite_border"
        checked-icon="favorite"
        color="red"
        @change="handleCheckAlls"
      ></mu-checkbox>
      <div class="titless">全选</div>
      <div class="allMoneyBox">
        合计：
        <span>￥{{allMoneys}}</span>
      </div>
      <div class="jumpPayMoney" @click="jumpOrder">去结算({{allNum}})</div>
    </div>
  </div>
</template>

<script>
import NavBack from "../public/NavBack1";
import MescrollVue from "mescroll.js/mescroll.vue";
import logo from "../../assets/xia1.jpg";
const shopList = [
  {
    logos: logo,
    goods:
      "盐水湖小龙虾，源自纯天然野生豪华的极品美食源自纯天然野生豪华的极品美食",
    roles: "大型5斤装",
    prase: "245.91",
    num: 1,
    selected: false
  },
  {
    logos: logo,
    goods: "盐水湖小龙虾，源自纯天然野生豪华的极品美食",
    roles: "1斤装",
    prase: "145.92",
    num: 3,
    selected: false
  },
  {
    logos: logo,
    goods: "盐水湖小龙虾，源自纯天然野生豪华的极品美食",
    roles: "5斤装",
    prase: "245.91",
    num: 1,
    selected: false
  },
  {
    logos: logo,
    goods: "盐水湖小龙虾，源自纯天然野生豪华的极品美食",
    roles: "大型5斤装",
    prase: "245.94",
    num: 1,
    selected: false
  },
  {
    logos: logo,
    goods: "盐水湖小龙虾，源自纯天然野生豪华的极品美食",
    roles: "大型5斤装",
    prase: "245.95",
    num: 1,
    selected: false
  },
  {
    logos: logo,
    goods: "极品小龙虾啊啊啊啊",
    roles: "大型5斤装",
    prase: "245.96",
    num: 1,
    selected: false
  }
];
export default {
  name: "ShopCarList",
  components: { NavBack, MescrollVue },
  data() {
    return {
      shopList,
      allCheck: false,
      allNum: 0,
      allMoneys: "0.00",
      hidd: true,
      condition: "-1",
      mescroll: null, // mescroll实例对象
      mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
        noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          //回到顶部按钮
          src: "", //图片路径,默认null,支持网络图
          offset: 1000, //列表滚动1000px才显示回到顶部按钮
          duration: 1500
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      dataList1: [], // 列表数据,
      str: 0,
      payArr: []
    };
  },
  watch: {
    shopList: {
      deep: true,
      handler(val) {
        // console.log(val);
        this.computeds(val);
      }
    }
  },
  created() {
    //   当进入订单时就进行一次计算
    this.computeds(this.shopList);
  },
  methods: {
    // 计算
    computeds(val) {
      // 这里做监听出来,进行计算
      console.log(val);
      var payNum = 0;
      var nums = 0;
      var arr = [];
      val.forEach(function(value, index, array) {
        if (value.selected) {
          arr.push(value);
          nums += value.num;
          payNum += value.num * value.prase;
        }
      });
      this.allNum = nums;
      console.log(payNum.toFixed(2));
      this.allMoneys = payNum.toFixed(2);
      this.payArr = arr;
    },
    //   选择按钮
    handleCheckAll(index) {
      console.log(index);
      console.log(this.shopList[index].selected);
    },
    // 全选按钮
    handleCheckAlls() {
      console.log("您点击了全选");
      console.log(this.allCheck);
      //   循环遍历数组——————————
      if (this.allCheck) {
        this.shopList.forEach(function(value, index, array) {
          value.selected = true;
        });
      } else {
        this.shopList.forEach(function(value, index, array) {
          value.selected = false;
        });
      }

      //   console.log("+++++++++");
      //   console.log(this.shopList);
    },
    // 减法
    subtrs(index) {
      console.log(index);

      if (this.shopList[index].num > 1) {
        this.shopList[index].selected = true;
        this.shopList[index].num--;
      } else {
        this.$toast.warning("最少购买一件哦！");
      }
    },
    // 加号相加
    addsNum(index) {
      this.shopList[index].selected = true;
      console.log(index);
      this.shopList[index].num++;
    },
    // 去结算订单
    jumpOrder() {
      if (this.allNum > 0) {
        // this.$router.push({
        //   path: "/OrderFill",
        //   query: {
        //     id: 1
        //   }
        // });
        // 隐式传值
        var data = {
          num: this.allNum,
          allMoney: this.allMoneys,
          ret: this.payArr
        };
        this.$router.push({
          name: "OrderFill",
          params: {
            data
          }
        });
      } else {
        this.$toast.info("您还没有选择商品哦！");
      }
    },
    // mescroll组件初始化的回调,可获取到mescroll对象 (如果this.mescroll并没有使用到,可不用写mescrollInit)
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      // 联网请求
      // axios.get('xxxxxx', {
      //   params: {
      //     num: page.num, // 页码
      //     size: page.size // 每页长度
      //   }
      // }).then((response) => {
      //   // 请求的列表数据
      //   let arr = response.data
      //   // 如果是第一页需手动制空列表
      //   if (page.num === 1) this.dataList = []
      //   // 把请求到的数据添加到列表

      if (this.str < 2) {
        this.dataList1 = this.dataList1.concat(this.shopList);
        this.str += 1;
      }
      setTimeout(() => {
        //   // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(this.shopList.length);
        });
      }, 1500);

      // }).catch((e) => {
      //   // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
      //   mescroll.endErr()
      // })
    }
  }
};
</script>

<style lang="scss" scoped>
.mainsBoxs {
  position: fixed;
  top: 1.1rem;
  bottom: 1.2rem;
  height: auto;
  width: 100%;
  .contentItem {
    width: 100%;
    margin: 0.32rem auto;
    padding: 0.32rem;
    border-radius: 0.2rem;
    background-color: #fff;
    position: relative;
    text-align: left;
    .logo {
      width: 2rem;
      height: 2rem;
      border-radius: 0.2rem;
      -moz-box-shadow: 3px 3px 6px #999999;
      -webkit-box-shadow: 3px 3px 6px #999999;
      box-shadow: 3px 3px 6px #999999;
    }
    .mu-checkbox {
      top: -0.8rem;
      height: 0.48rem;
      margin-right: 0.32rem;
      line-height: 0.48rem;
    }

    .titles {
      font-size: 0.24rem;
      //   background-color: olivedrab;
      width: 3.6rem;
      position: absolute;
      top: 0.32rem;
      right: 0.32rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
    }
    .roless {
      font-size: 0.22rem;
      position: absolute;
      top: 1.1rem;
      left: 3.62rem;
      height: 0.4rem;
      line-height: 0.4rem;
      padding: 0 0.56rem 0 0.16rem;
      border-radius: 0.4rem;
      background-color: #f1f1f1;
      .xialas {
        width: 0.36rem;
        position: absolute;
        top: 0.02rem;
        right: 0.12rem;
      }
    }
    .prase {
      position: absolute;
      font-size: 0.32rem;
      color: red;
      top: 1.9rem;
      left: 3.62rem;
      font-weight: 600;
    }
    .numCountBox {
      position: absolute;
      width: 1.35rem;
      height: 0.36rem;
      //   background-color: pink;
      right: 0.32rem;
      top: 1.9rem;
      line-height: 0.36rem;
      .subtraction {
        font-size: 0.33rem;
        // position: relative;
        font-weight: 800;
      }
      .lost {
        color: #f0f0f0;
      }
      .counts {
        font-size: 0.24rem;
        display: inline-block;
        font-weight: 800;
        background-color: #f1f1f1;
        width: 0.7rem;
        height: 100%;
        text-align: center;
        border-radius: 0.06rem;
      }
    }
  }
  .footBoxs1 {
    width: 100%;
    height: 2.1rem;
    background-color: #f9f9f9;
  }
}
/*底部合计菜单栏*/
.allNavBoxs {
  width: 100%;
  height: 1rem;
  background-color: #f9f9f9;
  position: fixed;
  bottom: 1rem;
  padding: 0.32rem;
  border-bottom: 1px solid #dad6d6;
  //   background-color: lawngreen;
  text-align: left;
  .titless {
    font-size: 0.28rem;
    position: absolute;
    top: 0.32rem;
    left: 0.9rem;
  }
  .allMoneyBox {
    position: absolute;
    width: 4rem;
    height: 100%;
    // background-color: palevioletred;
    top: -0.04rem;
    left: 1.7rem;
    line-height: 1.08rem;
    font-size: 0.3rem;
    span {
      font-weight: 600;
    }
  }
  .jumpPayMoney {
    // width: 2rem;
    height: 0.64rem;
    background-color: red;
    position: absolute;
    right: 0.32rem;
    top: 0.21rem;
    line-height: 0.64rem;
    padding: 0 0.32rem 0 0.32rem;
    border-radius: 0.6rem;
    color: white;
    font-size: 0.28rem;
  }
}
</style>