<template>
  <div>
    <!-- 显示当日时间 -->
    <div class="timeShow">{{newTime}}</div>
  </div>
</template>

<script>
//在时间对象原型上增加一个时间转换的方法
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
export default {
  name: "TimeShow",
  data() {
    return {
      newTime: "",
      loop: ""
    };
  },
  mounted() {
    this.TimesAgin();
  },
  methods: {
    //每秒钟获取时间
    TimesAgin() {
      let that = this;
      that.loop = setInterval(() => {
        that.getaTime();
      }, 1000);
    },
    //获取时间
    getaTime() {
      this.newTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
    },
    destroyed() {
      clearInterval(this.loop);
    }
  }
};
</script>

<style scoped>
.timeShow {
  font-size: 0.28rem;
  margin: 0.32rem auto;
}
</style>