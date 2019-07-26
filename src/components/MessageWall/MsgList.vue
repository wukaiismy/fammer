<template>
  <div>
    <NavBack name="消息提醒" @backjump="backjump"/>
    <!-- 下面是主体内容 -->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="bigBoxs" v-for="(item, index) in dataList" :key="index">
        <div class="msgBigBox">
          <div class="titles">{{item.msgTitle}}</div>
          <div class="contents">{{item.content}}</div>
          <div class="times">{{item.times}}</div>
          <div class="gaird1"></div>
          <div class="reasder">
            查看详情
            <img class="reasderLogo" src="../../assets/forward@2x.png" alt>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import NavBack from "../public/NavBack";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "MsgList",
  components: { NavBack, MescrollVue },
  data() {
    return {
      dataList: [
        {
          msgTitle: "您的好友张小花送您一张优惠卡",
          content:
            "您的好友张小花在阅读使我快乐活动，送您一张优惠卡，凭此优惠卡可享受减免。",
          times: "2018-12-09 01:13:11"
        },
        {
          msgTitle: "优质服务",
          content: "您在订单号：0000002211中客户给予您5星好评。",
          times: "2019-01-01 21:31:41"
        },
        {
          msgTitle: "平台奖金到账提醒",
          content: "您上月的平台奖励已发放，请及时查收，若有问题请及时反馈。",
          times: "2019-01-03 14:41:21"
        },
        {
          msgTitle: "技能分享审批通过",
          content:
            "您分享的‘如何有效简洁得保养厨房设施’的技能分享已成功通过审核。",
          times: "2019-01-09 16:31:01"
        }
      ],
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
  methods: {
    backjump() {
      this.$router.push({
        path: "/"
      });
    },
    colse() {
      console.log("您正准备关闭浏览器");
      window.opener = null;
      window.open("about:blank", "_self");
      window.close();
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
    }
  }
};
</script>

<style scoped>
.bigBoxs {
  width: 100%;
  position: relative;
  text-align: left;
}
.msgBigBox {
  width: 6.86rem;
  margin: 0.32rem auto;
  padding: 0.32rem;

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
/*以fixed的方式固定mescroll的高度*/
.mescroll {
  position: fixed;
  top: 1.32rem;
  bottom: 0;
  height: auto;
}
</style>