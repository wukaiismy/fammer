<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:13
 * @LastAuthor: wukai
 * @lastTime: 2019-06-21 15:02:31
 -->
<template>
  <div>
    <NavBack name="选择服务地址" @backjump="backjump"/>
    <!-- 下面是地图相关 -->
    <div class="searchBox">
      <div class="searchBoxConcel" @click="concel" v-show="!condition">取消</div>
      <el-amap-search-box
        @click.native="aaJ"
        class="search-box"
        :search-option="searchOption"
        :on-search-result="onSearchResult"
      ></el-amap-search-box>
    </div>
    <div v-show="condition">
      <div class="amap-wrapper">
        <el-amap class="amap-box" vid="map" :zoom="zoom" :center="center" :plugin="plugin">
          <el-amap-marker vid="marker" :position="center" :label="label"></el-amap-marker>
          <el-amap-circle
            vid="circle"
            :center="center"
            :radius="radius"
            fill-opacity="0.2"
            strokeColor="#38f"
            strokeOpacity="0.8"
            strokeWeight="1"
            fillColor="#38f"
          ></el-amap-circle>
        </el-amap>
      </div>
      <!-- 显示地址 -->
      <div class="addBoxs">{{label.content}}</div>
      <div class="queRen" v-waves @click="submitJump">确认</div>
    </div>
    <div class="footBox" v-show="!condition"></div>
  </div>
</template>

<script>
import NavBack from "../../public/NavBack";
import waves from "@/directive/waves"; // 水波纹指令
export default {
  name: "MapSearch",
  components: { NavBack },
  directives: {
    waves
  },
  data() {
    let vm = this;
    return {
      condition: true,
      searchOption: {
        citylimit: false
      },
      zoom: 16,
      center: [121.406051, 31.179695],
      label: {
        content: "您的位置",
        offset: [10, 12]
      },
      radius: 50,

      plugin: [
        // {
        //   pName: "OverView"
        //   //isOpen:true//鹰眼是否打开
        // },
        {
          pName: "Scale"
        },
        {
          pName: "Geolocation", //定位插件
          showMarker: false,
          events: {
            init(o) {
              //定位成功 自动将marker和circle移到定位点
              o.getCurrentPosition((status, result) => {
                console.log(result);
                vm.center = [result.position.lng, result.position.lat];
                vm.label.content = result.formattedAddress;
                console.log(vm.label);
              });
            }
          }
        }
      ]
    };
  },

  methods: {
    aaJ() {
      console.log(6666);
      this.condition = false;
    },
    concel() {
      this.condition = true;
    },
    submitJump() {
      var data = { local: this.label.content, center: this.center };
      this.$emit("submitJump", data);
    },
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      console.log(pois);
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          this.center.push([poi.lng, poi.lat]);
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.center = [center.lng, center.lat];
        console.log(1111);
        this.label.content = pois[0].name;
        console.log(this.center);
        this.condition = true;
      }
    },
    backjump() {
      this.$emit("searchJump", "Address");
    }
  }
};
</script>

<style scoped>
.amap-wrapper {
  height: 5rem;
}
.searchBox {
  width: 100%;
  height: 1.28rem;
  line-height: 1.28rem;
  position: relative;
}
.searchBoxConcel {
  position: absolute;
  right: 0.32rem;
  z-index: 1000;
  font-size: 0.32rem;
  top: -0.12rem;
}
.search-box {
  width: 70%;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  margin: 0.14rem auto;
  transition: 1s 0s width ease;
}
.search-box:hover {
  width: 100%;
  height: 1rem;
}
.searchBox >>> .el-vue-search-box-container .search-box-wrapper input {
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.3rem;
  text-indent: 0.2rem;
}
.searchBox >>> .el-vue-search-box-container .search-box-wrapper .search-btn {
  display: none;
}
.searchBox >>> .el-vue-search-box-container .search-tips {
  position: absolute;
  width: 100%;
  top: 100%;
  border: 1px solid #dbdbdb;
  background: #fff;
  overflow: auto;
  z-index: 10000;
}
.footBox {
  width: 100%;
  min-height: 12rem;
  background-color: #999999;
}
.searchBox >>> .el-vue-search-box-container .search-tips ul li {
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0 0.2rem;
  font-size: 0.32rem;
}
.addBoxs {
  width: 100%;
  padding: 0.32rem;
  margin: 0.32rem auto;
  background-color: white;
  text-align: left;
  font-size: 0.3rem;
}
.queRen {
  width: 100%;
  height: 0.88rem;
  background-color: #43b02a;
  color: #fff;
  line-height: 0.88rem;
  font-size: 0.36rem;
  margin: 0 auto;
}
</style>