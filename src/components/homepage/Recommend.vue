<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 16:47:46
 * @LastAuthor: wukai
 * @lastTime: 2019-06-21 11:37:50
 -->
<template>
  <div class="mescrollsshow" id="fatherId">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="contentBox" v-for="(item, index) in dataList" :key="index">
        <template>
          <div v-if="item.show_type=='dongtai'">
            <div @click="jumpDetailss(item.dynamic_id)">
              <img class="errLogo" src="../../assets/error.png" alt>
              <img class="authorLogo" v-lazy="item.avatar" alt>
              <span class="authorName">{{item.nick_name}}</span>
              <h3 class="titles" v-html="item.body"></h3>
              <div class="contentShowBox">
                <img class="contentShowBoxImg" v-lazy="item.show_images[0]" alt>
              </div>
            </div>
            <!-- 下面是操作栏 -->
            <div class="todoBox">
              <div class="tdItems">
                <img class="tdImg" src="../../assets/zan1.png" alt>
                <span>{{item.like_count}}</span>
              </div>
              <div class="tdItems">
                <img class="tdImg" src="../../assets/cai.png" alt>
                <span>0</span>
              </div>
              <div class="tdItems">
                <img class="tdImg" src="../../assets/pinglun.png" alt>
                <span>{{item.comment_count}}</span>
              </div>
              <div class="tdItems rightBox">
                <img class="tdImg" src="../../assets/zhuanfa.png" alt>
                <span>{{item.zhuan}}</span>
              </div>
            </div>
          </div>
          <!-- 另一种 内容格式 -->
          <div v-if="item.show_type=='tuwen'" @click="jumpDetails(item.graphic_id)">
            <h4 class="titles">
              {{item.title}}
              <span># {{item.article_type_name}}#</span>
            </h4>
            <div class="contentShowBox contentBox1">
              <img
                v-for="(item1, index1) in item.show_images"
                :key="index1"
                class="contentShowBoxImg img2"
                v-lazy="item1"
                alt
              >
            </div>
            <span class="authorName scendName">{{item.nick_name}}</span>
            <span class="authorName scendName pinglun">{{item.comment}} 评论</span>
            <span class="authorName scendName pinglun">{{item.up_time}}</span>
          </div>
          <!-- 最后一种广告推广 -->
          <div v-if="item.show_type=='kedinggou'" @click="jumpDetails(item.g_id)">
            <span class="titleShows">商城可订</span>
            <span class="authorName nameTile">{{item.nick_name}}</span>
            <span class="authorName preseTile">预计定价：{{item.unit_price}}</span>

            <div class="titles contenbox1">{{item.title}}</div>
            <div class="contentShowBox contentBox1">
              <template>
                <img
                  v-for="(item1, index1) in item.show_images"
                  :key="index1"
                  class="contentShowBoxImg img2"
                  v-lazy="item1"
                  alt
                >
              </template>
            </div>
          </div>
        </template>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "Recommend",
  components: { MescrollVue },
  data() {
    return {
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
          warpId: "fatherId", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      dataList: [], // 列表数据,
      str: 0
    };
  },

  methods: {
    // 跳转到详情页面、】
    jumpDetails(val) {
      console.log(val);
      this.$router.push({
        path: "/RecommendDetails",
        query: {
          graphic_id: val
        }
      });
    },
    jumpDetailss(val) {
      this.$router.push({
        path: "/ActDetails",
        query: {
          graphic_id: val
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
      this.$get("/wangtian/api/v1/index_show/all_list/", {
        pg: page.num, // 页码
        size: page.size // 每页长度
      })
        .then(response => {
          // 请求的列表数据
          console.log(response.ret);
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
      // });
    }
  }
};
</script>

<style scoped>
.mescrollsshow {
  position: fixed;
  top: 2.3rem;
  bottom: 1.2rem;
  height: auto;
}
.contentBox {
  width: 100%;
  margin: 0.32rem auto;
  padding: 0.32rem 0.32rem 0 0.32rem;
  background-color: #fff;
  position: relative;
  text-align: left;
}
.errLogo {
  position: absolute;
  width: 0.4rem;
  right: 0.22rem;
  top: 0.32rem;
}
.authorLogo {
  width: 0.68rem;
  height: 0.68rem;
  border-radius: 50%;
}
.authorName {
  color: #999999;
  font-size: 0.24rem;
  position: absolute;
  top: 0.58rem;
  margin-left: 0.32rem;
}
.nameTile {
  color: #333;
  font-size: 0.28rem;
}
.preseTile {
  color: red;
  right: 0.32rem;
  font-weight: 600;
}
.scendName {
  position: relative;
  top: -0.2rem;
  margin-left: 0rem;
}
.pinglun {
  margin-left: 0.2rem;
}
.titles {
  font-size: 0.3rem;
  margin: 0.2rem auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
.titles span {
  color: red;
  font-size: 0.28rem;
  font-weight: 400;
}
.contenbox1 {
  font-size: 0.24rem;
}
.contentShowBox {
  width: 100%;
  max-height: 6.4rem;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  padding-bottom: 0.32rem;
  /* background-color: chartreuse; */
}
.contentBox1 {
  margin-top: 0rem;
  justify-content: flex-start;
}
.todoBox {
  width: 100%;
  height: 1.1rem;
  /* background-color: aqua; */
  line-height: 1.1rem;
}
.tdItems {
  display: inline-block;
  /* background-color: lemonchiffon; */
  position: relative;
  margin-right: 0.22rem;
}
.tdImg {
  width: 0.46rem;
  position: absolute;
  top: 0.32rem;
  /* margin: 0.32rem; */
}
.tdItems span {
  margin-left: 0.54rem;
  font-size: 0.26rem;
  color: #999999;
}
.rightBox {
  position: absolute;
  right: 0.02rem;
}
.contentShowBoxImg {
  height: 100%;
  width: 60%;
}
/* .imgs1 {
  width: 30%;
} */
.img2 {
  width: 32%;
  max-height: 2.5rem;
  margin-right: 0.1rem;
}
.titleShows {
  width: 1rem;
  height: 1rem;
  display: inline-block;
  padding: 0.1rem;
  text-align: center;
  border-radius: 1rem;

  font-weight: bold;
  font-size: 0.28rem;
  color: blueviolet;
  background-color: palegreen;
}
</style>
