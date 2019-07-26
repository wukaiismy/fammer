<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:13
 * @LastAuthor: wukai
 * @lastTime: 2019-05-20 11:08:35
 -->
<template>
  <div>
    <NavBack name="WeChat" @backjump="backjump"/>
    <img class="AddImg" src="../../assets/jia.png" alt>
    <!-- 主体内容 -->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="mainBoxs">
        <div
          @click="wechatJump(index)"
          class="contentBox"
          v-for="(item, index) in datas"
          :key="index"
        >
          <img class="Logo" :src="item.logo" alt>
          <div class="titleName">{{item.name}}</div>
          <div class="content">{{item.content}}</div>
          <div class="times">{{item.times}}</div>
          <div class="gaeid"></div>
          <div class="msgNum" v-if="item.num!=0">{{item.num}}</div>
        </div>
      </div>
    </mescroll-vue>
    <div class="footNbf"></div>
  </div>
</template>

<script>
import NavBack from "../public/NavBack1";
import MescrollVue from "mescroll.js/mescroll.vue";
import logo1 from "../../assets/logoImg.jpg";
import logo2 from "../../assets/toux.jpg";
import logo3 from "../../assets/9.jpg";
import logo4 from "../../assets/B1.jpg";
import logo5 from "../../assets/b2.jpg";
import logo6 from "../../assets/b3.jpg";
const dataList = [
  {
    logo: logo1,
    name: "小姐姐",
    content: "今晚有空哦！[图片]",
    times: "下午 5:01",
    num: 21
  },
  {
    logo: logo2,
    name: "沐沐",
    content: "大叔在哪里",
    times: "下午 3:01",
    num: 12
  },
  {
    logo: logo3,
    name: "大佬",
    content: "嗯",
    times: "上午10:01",
    num: 0
  },
  {
    logo: logo4,
    name: "医生",
    content: "今晚有空哦！[图片]",
    times: "下午 5:01",
    num: 12
  },
  {
    logo: logo5,
    name: "小姐姐",
    content: "今晚有空哦！[图片]",
    times: "下午 5:01",
    num: 12
  },
  {
    logo: logo6,
    name: "小姐姐",
    content: "今晚有空哦！[图片]",
    times: "下午 5:01",
    num: 12
  },
  {
    logo: logo4,
    name: "医生",
    content: "今晚有空哦！[图片]",
    times: "下午 5:01",
    num: 12
  },
  {
    logo: logo5,
    name: "小姐姐",
    content: "今晚有空哦！[图片]",
    times: "下午 5:01",
    num: 12
  },
  {
    logo: logo6,
    name: "小姐姐",
    content: "今晚有空哦！[图片]",
    times: "下午 5:01",
    num: 12
  }
];
export default {
  name: "MsgHome",
  data() {
    return {
      datas: dataList,
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
      str: 0
    };
  },
  components: { NavBack, MescrollVue },
  methods: {
    backjump() {
      this.$router.push({
        path: "/"
      });
    },
    // 跳转到聊天页面
    wechatJump(index) {
      this.$router.push({
        path: "/WeChatShow",
        query: {
          name: this.datas[index].name
        }
      });
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
        this.dataList1 = this.dataList1.concat(this.datas);
        this.str += 1;
      }
      setTimeout(() => {
        //   // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(this.datas.length);
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
.AddImg {
  position: fixed;
  width: 0.36rem;
  top: 0.58rem;
  right: 0.32rem;
  z-index: 100000;
}
.mainBoxs {
  width: 100%;
  padding: 0.32rem;
  margin: 0 auto;
  background-color: #fff;
}
.contentBox {
  width: 100%;
  height: 1.6rem;
  /* background-color: palegoldenrod; */
  margin-top: 0.04rem;
  position: relative;
  text-align: left;
  padding: 0.22rem 0 0.22rem 0;
}
.Logo {
  height: 100%;
  width: 1.1rem;
}
.titleName {
  position: absolute;
  top: 0.32rem;
  left: 1.5rem;
  font-size: 0.32rem;
  font-weight: 600;
  letter-spacing: 0.04rem;
}
.content {
  position: absolute;
  top: 0.99rem;
  left: 1.5rem;
  font-size: 0.24rem;
  color: #999999;
}
.times {
  position: absolute;
  top: 0.3rem;
  right: 0.32rem;
  font-size: 0.24rem;
  color: #999999;
}
.gaeid {
  width: 100%;
  border: #f9f9f9 solid 0.02rem;
  position: absolute;
  bottom: 0.01rem;
}
.footNbf {
  width: 100%;
  height: 1.1rem;
  background-color: #f9f9f9;
}
.msgNum {
  width: 0.42rem;
  height: 0.42rem;
  background-color: red;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 0.42rem;
  position: absolute;
  top: 0.1rem;
  left: 0.88rem;
  font-size: 0.2rem;
}
</style>