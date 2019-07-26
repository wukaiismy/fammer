// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Cookies from "js-cookie";
import axios from "axios";
import { post, get, del, put } from "./httpConfig/http";
import VueLazyLoad from "vue-lazyload";
import vueTouch from "kim-vue-touch";
import Toast from "muse-ui-toast";
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$del = del;
Vue.prototype.$put = put;
import $ from "jquery";
import store from "./store";
import "./permission";
import MuseUI from "muse-ui";
import vueg from "vueg";
import "vueg/css/transition-min.css";
import "muse-ui/dist/muse-ui.css";
import "muse-ui-loading/dist/muse-ui-loading.css"; // load css
import "muse-ui-message/dist/muse-ui-message.css";
import Message from "muse-ui-message";
import Loading from "muse-ui-loading";
import * as NumFormat from "./common/filters/NumFormat";
// 引入vue-amap
import AMap from "vue-amap";
import "./style.css";
import "./icon/iconfont.js";
//全局引用富文本编辑器

import initRichText from "./common/initHTMLEditor";
import "font-awesome/css/font-awesome.min.css";
initRichText();

Vue.use(Message);
Vue.use(AMap);
Vue.use(MuseUI);
Vue.use(Toast);
const options = {
  duration: "0.8", //转场动画时长，默认为0.3，单位秒
  firstEntryDisable: false, //值为true时禁用首次进入应用时的渐现动画，默认为false
  firstEntryDuration: "1", //首次进入应用时的渐现动画时长，默认为.6
  forwardAnim: "zoomInRight", //前进动画，默认为fadeInRight
  backAnim: "zoomInLeft", //后退动画，默认为fedeInLeft
  sameDepthDisable: false, //url深度相同时禁用动画，默认为false
  tabs: [
    {
      name: "Homepage"
    },
    {
      name: "MsgList"
    },
    {
      name: "FriendList"
    },
    {
      name: "MyCenter"
    }
  ], //默认为[]，'name'对应路由的name,以实现类似app中点击tab页面水平转场效果，如tabs[1]到tabs[0]    ，会使用backAnim动画，tabs[1]到tabs[2]，会使用forwardAnim动画
  tabsDisable: false, //值为true时，tabs间的转场没有动画，默认为false
  shadow: true, //值为false，转场时没有阴影的层次效果
  disable: false, //禁用转场动画，默认为false，嵌套路由默认为true
  nuxt: false //若使用后端渲染框架Nuxt，需要将此设为true，默认为false
};
Vue.use(vueg, router, options);
Vue.use(Loading);
Vue.use(vueTouch);

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: "ab4d646c0e5d7148db7f62ba307295b7",
  // 插件集合 （插件按需引入）
  plugin: [
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation" //定位控件，用来获取和展示用户主机所在的经纬度位置
  ]
});

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: require("../static/cw.jpg"), //请求失败后显示的图片"../static/cuowu.gif",
  loading: require("../static/jiazai.gif"), //"../static/jiazai.gif"
  attempt: 1 // 加载图片数量
});
Vue.config.productionTip = false;

Object.keys(NumFormat).forEach(key => {
  Vue.filter(key, NumFormat[key]);
});
/* eslint-disable no-new */

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
