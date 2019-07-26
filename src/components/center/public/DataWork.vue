<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:12
 * @LastAuthor: wukai
 * @lastTime: 2019-06-11 17:42:00
 -->
<template>
  <div>
    <NavBack name="订单列表" @backjump="backjump"/>
    <!-- 账单主内容 -->
    <div class="title">
      <span>{{datas.years}}年{{datas.month}}月</span>
      <img class="img" src="../../../assets/center/calendar@2x.png" alt @click="chooseMonth">
    </div>
    <!-- 主体部分 -->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="bigBoxs" v-for="(item, index) in dataList1" :key="index">
        <div class="msgBigBox">
          <div class="items">
            <span class="itemTitle">订单编号：</span>
            <span class="itemShow">{{item.order}}</span>
          </div>
          <div class="items">
            <span class="itemTitle">下单时间：</span>
            <span class="itemShow">{{item.times}}</span>
          </div>

          <div class="items">
            <span class="itemTitle">商品名称：</span>
            <span class="itemShow">{{item.name}}</span>
          </div>
          <div class="items">
            <span class="itemTitle">合计价格：</span>
            <span class="itemShow">￥{{item.tel}}</span>
          </div>

          <div class="items">
            <span class="itemTitle">邮寄地址：</span>
            <span class="itemShow">{{item.add}}</span>
          </div>
          <div class="items">
            <span class="itemTitle">任务状态：</span>
            <span class="itemShow">
              <template>
                <span v-if="item.status==1" class="falished">已完成</span>
                <span v-else class="falishing">正在配送中</span>
              </template>
            </span>
          </div>
          <img v-if="item.status==1" class="falishedLogo" src="../../../assets/yiwancheng.png" alt>
        </div>
      </div>

      <div class="foots">------我是有底线的------</div>
    </mescroll-vue>
    <!-- 选择日期展示 -->
    <!-- 模态框 -->
    <mu-dialog class="Motal1" :open.sync="openSimple">
      <mu-paper :z-depth="1" class="demo-date-picker">
        <mu-date-picker @change="change" type="month" :date.sync="date1"></mu-date-picker>
      </mu-paper>
    </mu-dialog>
  </div>
</template>

<script>
import NavBack from "../../public/NavBack";
import MescrollVue from "mescroll.js/mescroll.vue";
import datas from "../../public/data";
export default {
  name: "DataWork",
  components: { NavBack, MescrollVue },
  data() {
    return {
      datas: { years: 2018, month: 9 },
      openSimple: false,
      date1: undefined,
      page: 1,
      per_page: 10,
      loading: false,

      dataList: datas.orderLists,
      hidd: true,
      condition: "-1",
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        afterLoading: function(mescroll) {
          return 5;
        }
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
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
      str: 0
    };
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    backjump() {
      this.$router.push({
        path: "/MyCenter"
      });
    },
    getMsg(page) {
      this.getMonthNow();
    },
    //选择查询日期
    chooseMonth() {
      this.openSimple = true;
    },
    // 滚动插件
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
        this.dataList1 = this.dataList1.concat(this.dataList);
        this.str += 1;
      }
      setTimeout(() => {
        //   // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(this.dataList.length);
        });
      }, 1500);

      // }).catch((e) => {
      //   // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
      //   mescroll.endErr()
      // })
    },
    change(data) {
      //   const loading = this.$loading();
      var years = data.getFullYear();
      var month = data.getMonth() + 1;
      this.datas.years = years;
      this.datas.month = month;
      this.page = 1;
      // 根据选择的日期进行查询 TODO-----
      this.openSimple = false;
      //   this.$get(
      //     "/api/customer/orders/?status=record&page=" +
      //       this.page +
      //       "&per_page=" +
      //       this.per_page +
      //       "&year=" +
      //       years +
      //       "&month=" +
      //       month
      //   )
      //     .then(res => {
      //       loading.close();
      //       console.log("选择日期查询 的结果");
      //       console.log(res);
      //       this.times(res.data);
      //       this.detailList = res.data;
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
    },
    // 获取本月时间
    getMonthNow() {
      var now = new Date(); //当前日期
      var nowMonth = now.getMonth() + 1;
      if (nowMonth.length == 1) {
        nowMonth = "0" + nowMonth;
      }
      var nowYear = now.getYear();
      nowYear += nowYear < 2000 ? 1900 : 0; //
      this.datas.years = nowYear;
      this.datas.month = nowMonth;
    }
  }
};
</script>

<style scoped>
.title {
  margin-top: 0.02rem;
  height: 0.77rem;
  background: #43b02a;
  line-height: 0.77rem;
  font-size: 0.36rem;
  color: #ffffff;
  position: relative;
}
.img {
  width: 0.4rem;
  position: absolute;
  right: 0.32rem;
  top: 0.18rem;
}
.dataShow {
  margin: 0.32rem auto;
  width: 100%;
  padding: 0.32rem;
  background-color: #fff;
}
.bigBoxs {
  width: 100%;
  position: relative;
  text-align: left;
}
.msgBigBox {
  width: 6.86rem;
  margin: 0.32rem auto;
  padding: 0.32rem;
  border-radius: 0.12rem;
  background-color: #fff;
}
.titles {
  font-size: 0.32rem;
  color: #666666;
}
.contents {
  font-size: 0.24rem;
  color: #999999;
  margin-top: 0.2rem;
}
.times {
  font-size: 0.28rem;
  color: #151515;
  line-height: 20px;
  margin-top: 0.2rem;
}
.gaird1 {
  width: 100%;
  border: solid 0.02rem #f9f9f9;
  margin: 0.32rem auto;
}
.reasder {
  font-size: 0.28rem;
  color: #333333;
  position: relative;
}
.reasderLogo {
  position: absolute;
  width: 0.18rem;
  top: 0.04rem;
  right: 0rem;
}
.items {
  /* background-color: antiquewhite; */
  margin-top: 0.1rem;
  position: relative;
}
.itemTitle {
  font-size: 0.28rem;
  color: #666666;
  position: absolute;
}
.itemShow {
  font-size: 0.28rem;
  color: #333333;
  display: inline-block;
  position: relative;
  left: 1.68rem;
  width: 4.6rem;
}
.falished {
  color: #999999;
}
.falishing {
  color: chocolate;
}
.ttt {
  color: brown;
}
.falishedLogo {
  position: absolute;
  top: 0.4rem;
  width: 3rem;
  right: 0.32rem;
  opacity: 0.5;
}
.foots {
  font-size: 0.32rem;
  margin: 0.32rem auto;
}
/*以fixed的方式固定mescroll的高度*/
.mescroll {
  position: fixed;
  top: 2.1rem;
  bottom: 0;
  height: auto;
}
/* 选择日期模态框 */
.Motal1 >>> .mu-scale {
  width: 6.2rem;
  /* height: 7.8rem; */
  max-width: 6.2rem;
  border-radius: 0.2rem;
}
.Motal1 >>> .mu-dialog-body {
  text-align: center;
  padding: 0;
}
.Motal1 >>> .mu-picker {
  width: 6.2rem;
  height: 7.8rem;
  font-size: 0.32rem;
  color: #43b02a;
}
.Motal1 >>> .mu-picker-display {
  width: 100%;
  height: 2rem;
  padding-left: 0.32rem;
  padding-right: 0.32rem;
}
.Motal1 >>> .mu-date-display-year {
  font-size: 0.32rem;
  line-height: 0.32rem;
  height: 0.32rem;
  margin-bottom: 0.2rem;
  width: 5.56rem;
  height: 0.32rem;
}
.Motal1 >>> .mu-date-display-monthday {
  font-size: 0.72rem;
  line-height: 0.72rem;
  height: 0.76rem;
}
.Motal1 >>> .mu-picker-container {
  padding-bottom: 0.16rem;
  width: 6.2rem;
  height: 5.44rem;
}
.Motal1 >>> .mu-datepicker-year-container {
  width: 6.2rem;
  height: 5.44rem;
  margin-top: 0.2rem;
}
.Motal1 >>> .mu-datepicker-year {
  line-height: 0.7rem;
}
.Motal1 >>> .mu-year-button {
  font-size: 0.28rem;
  height: 0.72rem;
}
.Motal1 >>> .mu-year-button-text {
  font-size: 0.32rem;
}
.Motal1 >>> .mu-datepicker-month-container {
  font-size: 0.24rem;
  font-weight: 400;
  padding: 0 0.16rem;
}
.Motal1 >>> .mu-datepicker-toolbar {
  height: 0.96rem;
}
.Motal1 >>> .mu-icon-button {
  width: 0.96rem;
  height: 0.96rem;
  border-radius: 50%;
  font-size: 0.48rem;
  padding: 0.24rem;
}
.Motal1 >>> .mu-datepicker-toolbar-title {
  line-height: 0.96rem;
}
.Motal1 >>> .mu-datepicker-toolbar-title-wrapper {
  font-size: 0.28rem;
}
.Motal1 >>> .mu-datepicker-month {
  height: 4.68rem;
}
.Motal1 >>> .mu-datepicker-month-row {
  margin-bottom: 0.04rem;
}
.Motal1 >>> .mu-month-button {
  border: 0.2rem;
  width: 1.68rem;
  height: 1.12rem;
  padding: 0.2rem 0;
}
.Motal1 >>> .mu-year-button.selected {
  margin: 0.2rem 0;
}
.Motal1 >>> .mu-datepicker-svg-icon {
  height: 0.48rem;
  width: 0.48rem;
}
</style>