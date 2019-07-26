<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:12
 * @LastAuthor: wukai
 * @lastTime: 2019-07-26 15:59:46
 -->
<template>
  <div id="app">
    <router-view v-transition class="slcdss" />
    <Foot v-show="$route.meta.navShow" />
  </div>
</template>

<script>
import Foot from "./components/public/FootNavigation";
export default {
  name: "App",
  components: { Foot },
  created() {
    const vv = `
//
//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                           O\\  =  /O
//                        ____/'---'\\____
//                      .'' \\\\|     |// ''.
//                     /  \\\\|||  :  |||//  \\ 
//                    /  _||||| -:- |||||-  \\
//                    |   | \\\\\\  -  /// |   |
//                    |   |  ''\\---/''  |   |
//                    \\  .-\\___ '-'  ___/-. /
//                  ___'. .'  /--.--\\  '. . __
//               .""  '< '.___\\_<|>_/___.'  >'"".
//              | | :  '- \\'.;'\\ _ /';.'/ - ' : | |
//              \\  \\ '-.   \\_ __\\ /__ _/   .-' /  /
//         ======'-.____'-.___\\_____/___.-'____.-'======
//                            '=---='
//        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                      Buddha Bless, No Bug !
 `;
    console.log(vv);
  },
  methods: {
    onDeviceReady() {
      // 根据路由动态改变状态栏样式
      // 我给状态栏字体色为白色的路由都设置了一个路由元meta,属性statusBgc为1
      this.$route.meta.statusBgc
        ? StatusBar.styleLightContent()
        : StatusBar.styleDefault();
    }
  },
  watch: {
    $route(to, from) {
      // cordova插件会定义一个StatusBar对象，当它只能在deviceready后才能使用
      if (cordova.platformId == "android") {
        // 安卓需要特殊处理，参见 cordova 官方文档
        StatusBar.overlaysWebView(true);
      }
      StatusBar.backgroundColorByHexString("#43B02A");
      document.addEventListener("deviceready", this.onDeviceReady, false);
    }
  },
  created() {
    // 保证安卓第一次进入状态栏能覆盖webview
    document.addEventListener("deviceready", this.onDeviceReady, false);
  }
};
</script>

<style>
body {
  font-size: 0.24rem;
  background: #f9f9f9;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  /* max-width: 7.5rem; */
  margin: 0 auto;
  font-family: PingFangSC-Regular;
  background-color: #f9f9f9;
}
* {
  box-sizing: border-box;
  /* 在X5新内核Blink中，在排版页面的时候，会主动对字体进行放大，会检测页面中的主字体，当某一块字体在我们的判定规则中，认为字号较小，并且是页面中的主要字体，就会采取主动放大的操作。然而这不是我们想要的，可以采取给最大高度解决 */
  max-height: 100000px;
  margin: 0;
  padding: 0;
}
/* // *:before,
// *:after {
//   box-sizing: border-box;
//   max-height: 100000px;
// }

// *,
// *:before,
// *:after {
//   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
// } */
.slcdss {
  min-height: 100vh;
}
</style>
