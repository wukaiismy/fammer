<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:13
 * @LastAuthor: wukai
 * @lastTime: 2019-05-20 16:35:36
 -->
<template>
  <div>
    <NavBack name="我的任务" @backjump="backjump"/>
    <!-- 主体部分 -->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="bigBoxs" v-for="(item, index) in dataList1" :key="index">
        <div class="msgBigBox">
          <div class="items">
            <span class="itemTitle">发布时间：</span>
            <span class="itemShow">{{item.times}}</span>
          </div>
          <div class="items">
            <span class="itemTitle">订单编号：</span>
            <span class="itemShow">{{item.order}}</span>
          </div>
          <div class="items">
            <span class="itemTitle">客户姓名：</span>
            <span class="itemShow">{{item.name}}</span>
          </div>
          <div class="items">
            <span class="itemTitle">联系电话：</span>
            <span class="itemShow">{{item.tel}}</span>
          </div>
          <div class="items">
            <span class="itemTitle">服务时间：</span>
            <span class="itemShow ttt">{{item.workTime}}</span>
          </div>
          <div class="items">
            <span class="itemTitle">服务地址：</span>
            <span class="itemShow">{{item.add}}</span>
          </div>
          <div class="items">
            <span class="itemTitle">任务状态：</span>
            <span class="itemShow">
              <template>
                <span v-if="item.status==1" class="falished">已完成</span>
                <span v-else class="falishing">待完成</span>
              </template>
            </span>
          </div>
          <img v-if="item.status==1" class="falishedLogo" src="../../assets/yiwancheng.png" alt>
        </div>
      </div>

      <div class="foots">------我是有底线的------</div>
    </mescroll-vue>
  </div>
</template>

<script>
import NavBack from "../public/NavBack";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "Task",
  components: { NavBack, MescrollVue },
  data() {
    return {
      dataList: [
        {
          order: "10000000012",
          times: "2018-12-09 01:13:11",
          name: "陈长生",
          tel: "135***0385",
          workTime: "11:50",
          add: "成都市大都汇天上人间天字号山河岳包厢",
          status: 2
        },
        {
          order: "10002000031",
          times: "2019-01-01 21:31:41",
          name: "王重阳",
          tel: "135***0385",
          workTime: "11:50",
          add: "成都市大都汇天上人间",
          status: 2
        },
        {
          order: "10000000022",
          times: "2019-01-03 14:41:21",
          name: "轩辕破",
          tel: "135***0385",
          workTime: "11:50",
          add: "成都市大都汇天上人间",
          status: 1
        },
        {
          order: "10000000042",
          times: "2019-01-09 16:31:01",
          name: "诸葛红尘",
          tel: "135***0385",
          workTime: "11:50",
          add: "成都市大都汇天上人间",
          status: 1
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
  width: 4rem;
  opacity: 0.7;
}
.foots {
  font-size: 0.32rem;
  margin: 0.32rem auto;
}
/*以fixed的方式固定mescroll的高度*/
.mescroll {
  position: fixed;
  top: 1.32rem;
  bottom: 0;
  height: auto;
}
</style>