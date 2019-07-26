<template>
  <div>
    <NavBack name="我的评价" @backjump="backjump"/>
    <!-- 综合评分 -->
    <div class="allBox">
      <div class="itemBox">
        <span class="itemTitle">平台评分：{{prointList.plant}}</span>
        <span class="stard">
          <star-rate
            :value="prointList.plant"
            :star-half="true"
            :disabled="true"
            type="star1"
            font-size="0.4rem"
          />
        </span>
      </div>
      <div class="itemBox">
        <span class="itemTitle">公司评分：{{prointList.company}}</span>
        <span class="stard">
          <star-rate
            :value="prointList.company"
            :star-half="true"
            :disabled="true"
            type="star1"
            font-size="0.4rem"
          />
        </span>
      </div>
      <div class="itemBox">
        <span class="itemTitle">客户评分：{{prointList.customer}}</span>
        <span class="stard">
          <star-rate
            :value="prointList.customer"
            :star-half="true"
            :disabled="true"
            type="star1"
            font-size="0.4rem"
          />
        </span>
      </div>
    </div>
    <div class="orderPonitBox">
      <div class="titleBoxs">订单评价</div>
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="orderPonitBoxShow">
          <div class="orderItemBox" v-for="(item, index) in dataList" :key="index">
            <div class="itemShow">
              <span class="itemShowTitle">订单编号：</span>
              <span class="itemShowContent">{{item.orderNum}}</span>
              <div class="itemShowType">类型：{{item.type}}</div>
            </div>
            <div class="itemShow">
              <span class="itemShowTitle">服务时间：{{item.time}}</span>
            </div>
            <div class="itemShow">
              <span class="itemShowTitle">服务地址：{{item.address}}</span>
            </div>
            <div class="itemShow">
              <mu-row>
                <mu-col span="4">
                  <span class="itemShowTitle retes">平台评分：{{item.plant}}</span>
                </mu-col>
                <mu-col span="4">
                  <span class="itemShowTitle retes">公司评分：{{item.company}}</span>
                </mu-col>
                <mu-col span="4">
                  <span class="itemShowTitle retes">客户评分：{{item.customer}}</span>
                </mu-col>
              </mu-row>
            </div>
            <div class="itemShow">
              <span class="itemShowTitle">客户评价：{{item.remark}}</span>
            </div>
            <div class="garid"></div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import NavBack from "../../public/NavBack";
import StarRate from "vue-cute-rate";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "Service",
  components: { NavBack, StarRate, MescrollVue },
  data() {
    return {
      prointList: {
        plant: 4.8,
        company: 4.8,
        customer: 4.9
      },
      dataList: [
        {
          orderNum: "100000006",
          address: "成都市温江区朝阳时代1栋2单元103号",
          type: "普通保洁",
          time: "2018年12月30日 14:42:20",
          plant: 4.8,
          company: 4.8,
          customer: 4.9,
          remark: "很好"
        },
        {
          orderNum: "100000005",
          address: "成都市高新区天府长城",
          type: "普通保洁",
          time: "2018年12月20日 11:22:20",
          plant: 4.8,
          company: 4.8,
          customer: 4.9,
          remark: "这是个高手"
        },
        {
          orderNum: "100000004",
          address: "成都市成华区荷花池聚居地",
          type: "普通保洁",
          time: "2018年12月23日 16:22:30",
          plant: 4.8,
          company: 4.8,
          customer: 4.9,
          remark: ""
        },
        {
          orderNum: "100000003",
          address: "成都市温江区朝阳时代1栋2单元103号",
          type: "普通保洁",
          time: "2018年12月30日 14:42:20",
          plant: 4.8,
          company: 4.8,
          customer: 4.9,
          remark: ""
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
        path: "/MyCenter"
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
      }, 500);

      // }).catch((e) => {
      //   // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
      //   mescroll.endErr()
      // })
    }
  }
};
</script>

<style scoped>
.allBox {
  width: 100%;
  padding: 0.32rem;
  background-color: #fff;
}
.itemBox {
  /* background-color: rgb(170, 199, 170); */
  text-align: left;
  position: relative;
  margin: 0.32rem auto;
}
.stard {
  display: inline-block;
  /* background-color: palegoldenrod; */
  height: 0.48rem;
  line-height: 0.48rem;
  position: absolute;
  top: -0.2rem;
  left: 2.4rem;
}
.itemTitle {
  font-size: 0.28rem;
  color: #666666;
}
.orderPonitBox {
  background-color: #fff;
  width: 100%;
  /* padding: 0.32rem; */
  margin: 0.32rem auto;
}
.titleBoxs {
  width: 100%;
  height: 0.88rem;
  font-size: 0.32rem;
  background-color: #e6dfdf;
  line-height: 0.88rem;
}
.orderItemBox {
  width: 100%;
  padding: 0.32rem 0.32rem 0 0.32rem;
  text-align: left;

  /* background-color: palegoldenrod; */
  /* margin: 0rem auto 0.1rem; */
}
.itemShow {
  font-size: 0.24rem;
  position: relative;
  margin-bottom: 0.1rem;
}
.itemShowTitle {
  color: #666666;
}
.itemShowContent {
  color: #666666;
}
.itemShowType {
  color: #666666;
  position: absolute;
  top: 0rem;
  right: 1.12rem;
}
.retes {
  margin-right: 0.32rem;
}
.garid {
  width: 100%;
  border: solid #f9f9f9 0.02rem;
  margin-top: 0.2rem;
}
.orderPonitBoxShow {
  height: 60%;
  overflow-y: scroll;
  background-color: #fff;
}
/*以fixed的方式固定mescroll的高度*/
.mescroll {
  position: fixed;
  top: 5.76rem;
  bottom: 0;
  height: auto;
}
</style>