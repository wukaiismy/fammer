<template>
  <div>
    <NavBack name="我的简历" @backjump="backjump"/>
    <!-- 主题内容 -->
    <div v-if="showDis" class="msgBox">
      <div class="resumeBox">
        您还没有填写简历，
        <span class="newResume">新建简历</span>
      </div>
    </div>
    <div v-else>
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="msgBox">
          <div class="contentBox">
            <div class="title">保洁员-苗翠花</div>
            <div class="workingBox">
              <mu-row>
                <mu-col span="4" v-for="(items, ind) in dataLists" :key="ind">
                  <div class="grid-cell" @click="jumpServer(ind)">
                    <img class="logosss" :src="items.logo" alt>
                    <div class="titleName">{{items.msg}}</div>
                  </div>
                </mu-col>
              </mu-row>
            </div>
          </div>
          <div class="baceMsgBox">
            <div class="titles">
              基本信息
              <img class="forwardLogo" src="../../../assets/forward@2x.png" alt>
            </div>
            <div class="gaird1"></div>
            <div class="nameBox">
              <img class="personImg" :src="personData.logo" alt>
              <div class="contentMsgBox">
                <div class="names">{{personData.name}}</div>
                <span class="sexs">{{personData.sex}}</span>
                <span class="sexs ages">{{personData.age}}岁</span>
              </div>
              <div class="contentMsgBox c1">
                <div class="names">{{personData.address}}</div>
                <span class="sexs ages1">{{personData.workYears}}工作经验</span>
              </div>
              <div class="contentMsgBox c2">
                <div class="names">
                  <img class="namesTel" src="../../../assets/center/weibiaoti.png" alt>
                  <span class="telNum">{{personData.tel}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 工作经验 -->
          <div class="workBoxShows">
            <div class="titles">
              工作经验
              <img class="forwardLogo" src="../../../assets/forward@2x.png" alt>
            </div>
            <div class="gaird1"></div>
            <div class="workBoxShowsContent" v-for="(item, index) in workList" :key="index">
              <div class="workBoxShowsContentYears">{{item.years}}</div>
              <div class="workBoxShowsContentName">{{item.name}}</div>
              <div class="workBoxShowsContentYears">{{item.positions}}</div>
              <div class="gaird1"></div>
            </div>
          </div>
          <!-- 教育经验 -->
          <div class="workBoxShows w1">
            <div class="titles">
              最高学历
              <img class="forwardLogo" src="../../../assets/forward@2x.png" alt>
            </div>
            <div class="gaird1"></div>
            <div class="workBoxShowsContent" v-for="(item, index) in educationList" :key="index">
              <div class="workBoxShowsContentYears">{{item.years}}</div>
              <div class="workBoxShowsContentName">{{item.name}}</div>
              <div class="workBoxShowsContentYears">
                <span>{{item.university}}</span>
                <span class="university">{{item.major}}</span>
              </div>
            </div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import NavBack from "../../public/NavBack";
import shez from "../../../assets/center/shezhi.png";
import shuax from "../../../assets/center/shuaxin.png";
import yul from "../../../assets/center/yulan.png";
import toux from "../../../assets/logoImg.jpg";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "ResumeShow",
  components: { NavBack, MescrollVue },
  data() {
    return {
      showDis: false,
      dataLists: [
        { logo: shez, msg: "设置" },
        { logo: shuax, msg: "刷新" },
        { logo: yul, msg: "预览" }
      ],
      personData: {
        logo: toux,
        name: "苗翠花",
        age: "46",
        sex: "女",
        workYears: "3年",
        address: "成都",
        tel: "135****0385"
      },
      workList: [
        {
          name: "国际宝蓝服务部",
          years: "2018/2-至今",
          positions: "服务部先锋小组成员"
        },
        {
          name: "艾莉丝服务公司",
          years: "2017/7-2018/1",
          positions: "普通成员"
        }
      ],
      educationList: [
        {
          name: "五道口职业技术学院",
          years: "2009/9/1-2013/9/1",
          university: "本科",
          major: "公共服务专业"
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
    jumpServer(ind) {
      console.log(ind);
    },
    //
    //
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
        this.dataList1 = this.dataList1.concat(this.dataLists);
        this.str += 1;
      }
      setTimeout(() => {
        //   // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(this.dataLists.length);
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
.msgBox {
  width: 100%;
  padding: 0.32rem;
  background-image: linear-gradient(-137deg, #ee8018 0%, #fbda61 100%);
  margin: 0rem auto;
  position: relative;
  height: 5rem;
}
.resumeBox {
  font-size: 0.32rem;
}
.newResume {
  color: rgb(30, 105, 218);
}
.contentBox {
  width: 6.86rem;
  height: 3rem;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 0.22rem;
  position: absolute;
  padding: 0.32rem;
  text-align: left;
  top: 3.6rem;
  /* left: 1.62rem; */
}
.title {
  font-size: 0.3rem;
  color: black;
  font-family: SimHei;
}
.workingBox {
  /* background-color: violet; */
  text-align: center;
  margin: 0.32rem auto;
  padding: 0.32rem;
}
.titleName {
  font-size: 0.28rem;
  color: #999999;
  margin-top: 0.32rem auto;
}
.logosss {
  width: 0.46rem;
  margin-bottom: 0.12rem;
}
.baceMsgBox {
  width: 6.86rem;
  padding: 0.32rem;
  background-color: #fff;
  margin: 6.62rem auto 0;
  text-align: left;
  position: relative;
  border-radius: 0.22rem;
}
.titles {
  font-size: 0.32rem;
  color: #666666;
}
.forwardLogo {
  width: 0.2rem;
  position: absolute;
  top: 0.34rem;
  right: 0.32rem;
}
.gaird1 {
  width: 100%;
  border: 0.02rem solid #f9f9f9;
  margin: 0.32rem auto;
}
.nameBox {
  width: 100%;
  padding: 0.32rem 0.32rem 0.32rem 0;
  border-radius: 0.2rem;
  position: relative;
  height: 2.3rem;
}
.personImg {
  width: 1.2rem;
}
.contentMsgBox {
  width: 4.8rem;
  margin: 0 auto;
  display: inline-block;
  position: absolute;
  top: 0rem;
  left: 1.4rem;
  padding-top: 0.32rem;
}
.c1 {
  top: 0.72rem;
}
.c2 {
  top: 1.42rem;
}
.names {
  font-size: 0.34rem;
  color: #333333;
  display: inline-block;
}
.sexs {
  font-size: 0.28rem;
  margin-left: 0.32rem;
  color: #726e6e;
  padding-left: 0.12rem;
  border-left: #726e6e solid 0.02rem;
}
.ages {
  margin-left: 0.12rem;
}
.ages1 {
  margin-left: 0.12rem;
  color: #333333;
  border-left: #333333 solid 0.02rem;
}
.namesTel {
  width: 0.42rem;
  position: absolute;
  top: 0.38rem;
}
.telNum {
  margin-left: 0.6rem;
  font-size: 0.28rem;
}
.workBoxShows {
  width: 6.86rem;
  padding: 0.32rem 0.32rem 0 0.32rem;
  background-color: #fff;
  margin: 0.32rem auto;
  text-align: left;
  position: relative;
  border-radius: 0.22rem;
}
.workBoxShowsContent {
  width: 100%;
  /* padding: 0.32rem; */
  margin: 0.32rem auto 0;
}
.workBoxShowsContent:last-child > .gaird1 {
  visibility: hidden;
}
.workBoxShowsContentYears {
  font-size: 0.28rem;
  color: #999999;
}
.workBoxShowsContentName {
  font-size: 0.28rem;
  color: #666666;
  margin: 0.12rem auto;
}

.university {
  border-left: #999999 solid 0.04rem;
  margin-left: 0.12rem;
  padding-left: 0.1rem;
}
.w1 {
  padding-bottom: 0.32rem;
  margin-bottom: 0.88rem;
}
/*以fixed的方式固定mescroll的高度*/
.mescroll {
  position: fixed;
  top: -1.6rem;
  bottom: 0;
  height: auto;
}
</style>