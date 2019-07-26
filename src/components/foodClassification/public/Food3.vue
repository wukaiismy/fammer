<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-22 14:29:16
 * @LastAuthor: wukai
 * @lastTime: 2019-06-21 14:22:55
 -->
<template>
  <div class="showServer">
    <!-- 下面是菜单部分 -->
    <div class="mescrollsshow" id="fatherBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <mu-row>
          <mu-col span="6" v-for="(msg, ind) in dataList" :key="ind">
            <div class="grid-cell" v-waves @click="jumpServer(ind)">
              <img class="imgServe" v-lazy="msg.dc_image" alt>
              <div class="titleName">{{msg.dc_name}}</div>
              <!-- <div class="titleNum">100,2部</div> -->
            </div>
          </mu-col>
        </mu-row>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "Food3",
  directives: {
    waves
  },
  components: { MescrollVue },
  data() {
    return {
      dataList: [],

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
          warpId: "fatherBox", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      dataList1: [], // 列表数据,
      str: 0
    };
  },

  methods: {
    // 菜单选择
    jumpServer(index) {
      console.log(index);
      this.$router.push({
        path: "/FoodDetails",
        query: {
          name: this.dataList[index].msg
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
      this.$get("/wangtian/api/v1/shop_show/show_dc_goods/", {
        pg: page.num, // 页码
        size: page.size // 每页长度
      })
        .then(response => {
          // 请求的列表数据
          console.log(response);
          this.$emit("numbers", response.count);
          let arr = response.ret;
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.dataList = [];
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length);
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    }
  }
};
</script>

<style scoped>
.showServer {
  width: 100%;
}
.mescrollsshow {
  position: fixed;
  top: 2rem;
  bottom: 1.2rem;
  height: auto;
}
.grid-cell {
  height: 2.52rem;
  color: #666666;
  text-align: center;
  /* background-color: rgb(206, 213, 219); */
  background-color: #fff;
  margin: 0.2rem 0.1rem 0rem 0.1rem;
  position: relative;
}
.imgServe {
  max-height: 70%;
  width: 100%;
}
.titleName {
  position: relative;
  top: 0rem;
  /* left: 50%; */
  text-align: center;
  /* background-color: palegreen; */
  height: 0.46rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0.12rem auto 0;
  font-size: 0.28rem;
  font-family: KaiTi;
}
.titleNum {
  position: absolute;
  top: 0.8rem;
  left: 49%;
  font-size: 0.22rem;
}
</style>