<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:12
 * @LastAuthor: wukai
 * @lastTime: 2019-05-28 10:50:40
 -->
<template>
  <div>
    <NavBack name="好友列表" @backjump="backjump"/>
    <!-- 下面是主体部分 -->
    <div class="iptBox" id="searchBar" v-show="hidd">
      <mu-auto-complete
        @change="changShow"
        :data="fruits"
        :max-search-results="6"
        v-model="value6"
        avatar
      >
        <template slot-scope="scope">
          <mu-list-item-action>
            <mu-avatar color="primary">{{scope.item.substring(0, 1)}}</mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content v-html="scope.highlight"></mu-list-item-content>
        </template>
      </mu-auto-complete>
    </div>
    <!--mescroll滚动区域的基本结构-->
    <!--内容...-->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="bigBoxs" ref="viewBox">
        <mu-paper :z-depth="1" class="demo-list-wrap">
          <mu-list>
            <mu-list-item
              :class="condition==index?'selected':''"
              avatar
              button
              :ripple="false"
              v-for="(item, index) in dataList1"
              :key="index"
              @touchstart.native="showDeleteButton(index)"
              @touchend.native="clearLoop(index)"
            >
              <mu-list-item-action></mu-list-item-action>
              <mu-list-item-title>{{item.name}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-avatar>
                  <img :src="item.logoUrl">
                </mu-avatar>
              </mu-list-item-action>
              <div class="gaird2"></div>
              <!-- 弹出框功能界面 -->
              <div v-show="condition==index" class="touchPush">
                <img
                  class="callLogo"
                  src="../../assets/friends/bohao.png"
                  @click.stop="callJump(index)"
                  alt
                >
                <img
                  class="callLogo"
                  src="../../assets/friends/shuju-.png"
                  @click.stop="sendMsgJump(index)"
                  alt
                >
                <img
                  class="callLogo"
                  src="../../assets/friends/ziliao.png"
                  @click.stop="personDataJump(index)"
                  alt
                >
                <img
                  class="callLogo lastChilds"
                  src="../../assets/friends/shanchu.png"
                  @click.stop="deleteJump(index)"
                  alt
                >
              </div>
              <!-- 弹出框功能界面 结束-->
            </mu-list-item>
          </mu-list>
        </mu-paper>
        <div class="allPerson">共有14个联系人</div>
      </div>
    </mescroll-vue>
    <div class="bootS1"></div>
    <!-- <div class="bootS"></div> -->
  </div>
</template>

<script>
import NavBack from "../public/NavBack1";
import logo from "../../assets/logoImg.jpg";
import MescrollVue from "mescroll.js/mescroll.vue";
const fruits = [
  "张小花",
  "李玉环",
  "沈星海",
  "王小翠",
  "吴碧莲",
  "罗玉凤",
  "宋妮尚",
  "洛天梦",
  "舒仁梅",
  "黄凤霞",
  "轩辕洛",
  "欧尼"
];
const dataLists = [
  { logoUrl: logo, name: "张小花" },
  { logoUrl: logo, name: "李玉环" },
  { logoUrl: logo, name: "沈星海" },
  { logoUrl: logo, name: "王小翠" },
  { logoUrl: logo, name: "吴碧莲" },
  { logoUrl: logo, name: "罗玉凤" },
  { logoUrl: logo, name: "宋妮尚" },
  { logoUrl: logo, name: "洛天梦" },
  { logoUrl: logo, name: "舒仁梅" },
  { logoUrl: logo, name: "黄凤霞" },
  { logoUrl: logo, name: "轩辕洛" },
  { logoUrl: logo, name: "欧尼" }
];
export default {
  name: "FriendList",
  data() {
    return {
      fruits,
      value6: "",
      dataList: dataLists,
      dataLists: dataLists,
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
  mounted() {
    //给window添加一个滚动滚动监听事件
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    backjump() {
      this.$router.push({
        path: "/"
      });
    },
    vueTouch: function(txt, e) {
      console.log(txt), console.log(e);
    },
    handleScroll() {
      //改变元素#searchBar的top值
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(scrollTop);
      //   var offsetTop = document.querySelector("#searchBar").offsetTop;

      if (scrollTop <= 44) {
        this.hidd = true;
      } else if (scrollTop > 119) {
        this.hidd = false;
        this.condition = "-1";
      } else {
        this.hidd = false;
      }
    },

    changShow(val) {
      console.log(this.value6);
      console.log(val);
      if (val.length) {
        for (let index = 0; index < this.dataLists.length; index++) {
          if (val == this.dataLists[index].name) {
            this.dataList = [];
            this.dataList.push(this.dataLists[index]);
          } else {
          }
        }
        console.log(this.dataList);
      } else {
        this.dataList = this.dataLists;
      }
    },
    // 长按
    showDeleteButton(e) {
      clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(() => {
        console.log(e);
        this.condition = e;
        console.log("您长按了第" + e + "个");
      }, 300);
    },
    clearLoop(e) {
      console.log("结束" + e + "个");
      console.log(e);
      if (e != this.condition) {
        this.condition = "-1";
      }
      clearTimeout(this.Loop);
    },
    //拨号
    callJump(index) {
      console.log("您选择了拨号" + index);
    },
    //聊天
    sendMsgJump(index) {
      console.log("您选择了聊天" + index);
    },
    //资料
    personDataJump(index) {
      console.log("您选择了资料" + index);
    }, //删除
    deleteJump(index) {
      console.log("您选择了删除" + index);
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
        this.dataList1 = this.dataList1.concat(this.dataLists);
        this.str += 1;
      }
      setTimeout(() => {
        //   // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(this.dataLists.length);
        });
      }, 1500);

      // }).catch((e) => {
      //   // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
      //   mescroll.endErr()
      // })
    }
  },
  destroyed() {
    //离开该页面需要移除这个监听的事件
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: { NavBack, MescrollVue }
};
</script>

<style scoped>
.bigBoxs {
  margin: 0.88rem auto;
  /* max-height: 6rem;
  overflow: hidden;
  overflow-y: scroll; */
  /* background-color: #ee8018; */
}
.bigBoxs >>> .mu-paper-round {
  border-radius: 0.04rem;
}
.bigBoxs >>> .mu-item.has-avatar {
  height: 1.12rem;
}
.bigBoxs >>> .mu-item {
  height: 0.96rem;
  padding: 0 0.32rem;
}

.bigBoxs >>> .mu-item-action {
  min-height: 1.12rem;
}
.bigBoxs >>> .mu-item-title {
  font-size: 0.32rem;
  height: 0.48rem;
  line-height: 0.48rem;
}
.bigBoxs >>> .mu-item-action {
  min-height: 1.12rem;
}
.bigBoxs >>> .mu-avatar {
  width: 0.8rem !important;
  height: 0.8rem !important;
  font-size: 0.4rem !important;
}
.bootS {
  width: 100%;
  height: 1.12rem;
  position: fixed;
  bottom: 0;
  background: #f9f9f9;
  z-index: 10;
}
.bootS1 {
  width: 100%;
  height: 1.12rem;
  margin: 0.32rem auto;
}
.allPerson {
  font-size: 0.32rem;
  margin: 0.32rem auto;
}
.gaird2 {
  width: 100%;
  border: solid 0.02rem #f9f9f9;
  position: absolute;
  top: 1.1rem;
  left: 0rem;
}
.iptBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  background-color: #f9f9f9;
  z-index: 10000;
  box-sizing: border-box;
  /* background-color: aquamarine; */
}
.iptBox >>> .mu-input {
  font-size: 0.32rem;
  width: 5.12rem;
  min-height: 0.96rem;
  margin-bottom: 0.32rem;
  padding-bottom: 0.24rem;
  padding-top: 0.08rem;
}
.iptBox >>> .mu-text-field-input {
  height: 0.64rem;
}
.touchPush {
  width: 60%;
  height: 0.88rem;
  background-color: rgb(238, 226, 203);
  opacity: 0.45;
  position: absolute;
  z-index: 100111110;
  top: 0.42rem;
  left: 2.38rem;
  border: solid 0.02rem #b3b0b0;
  border-radius: 0.16rem;
  box-shadow: 0 0 3px;
  line-height: 0.88rem;
  text-align: left;
  padding: 0.14rem 0.32rem 0 0.32rem;
}
.selected {
  background-color: #f1f1f1;
}
.callLogo {
  width: 0.56rem;
  height: 0.56rem;
  margin-right: 0.41rem;
}
.lastChilds {
  margin-right: 0rem;
}
/*以fixed的方式固定mescroll的高度*/
.mescroll {
  position: fixed;
  top: 1.2rem;
  bottom: 0;
  height: auto;
}
</style>