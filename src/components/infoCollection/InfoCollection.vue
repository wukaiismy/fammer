<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-23 10:44:06
 * @LastAuthor: wukai
 * @lastTime: 2019-06-12 16:48:08
 -->
<template>
  <div>
    <NavBack name="商户录入" @backjump="backjump"/>
    <div class="bigBoxShows">
      <div class="addMsg">
        <span class="addTitle">省市区</span>
        <div class="rightBox" @click="jumpSearch">{{dataMsgAddress.local}}</div>
        <div class="rightBox divwrap" v-if="shows">
          <v-distpicker type="mobile" @selected="onSelected"></v-distpicker>
          <!-- <input
            type="text"
            v-model="dataMsgAddress.local"
            class="rightBoxIpt"
            placeholder="请输入省市区"
          >-->
        </div>

        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">详细地址</span>
        <div class="rightBox">
          <input
            type="text"
            v-model="dataMsgAddress.adds"
            class="rightBoxIpt"
            placeholder="详细地址 例如：9栋2单元201"
          >
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">商户名</span>
        <div class="rightBox">
          <input
            type="text"
            v-model="dataMsgAddress.storeName"
            class="rightBoxIpt"
            placeholder="请录入商户名"
          >
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">
          简称
          <span class="xuanz">(选填)</span>
        </span>
        <div class="rightBox">
          <input
            type="text"
            v-model="dataMsgAddress.storeNameJC"
            class="rightBoxIpt"
            placeholder="商户简称，可不填写"
          >
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">联系人</span>
        <div class="rightBox">
          <input
            type="text"
            v-model="dataMsgAddress.name"
            class="rightBoxIpt"
            placeholder="请填写联系人，如：张女士"
          >
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">手机号</span>
        <div class="rightBox">
          <input
            type="number"
            v-model="dataMsgAddress.tel"
            class="rightBoxIpt"
            placeholder="请填写联系方式"
          >
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">经营范围</span>
        <div class="rightBox">
          <!-- <span v-if="jumpInputs" class="jumpInput" @click="jumpInput">输入经营类目，如：车厘子，老腊肉</span> -->
          <input type="text" v-model="categorys" class="rightBoxIpt rbit1" placeholder>
          <img class="addLogo" src="../../assets/54.png" alt @click="addCategory">
          <div class="categoryBox" v-show="dataMsgAddress.category.length">
            <div class="categoryItem" v-for="(item, index) in dataMsgAddress.category" :key="index">
              {{item}}
              <img class="logoss" src="../../assets/error.png" alt @click="deletes(index)">
            </div>
          </div>
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">商户简介</span>
        <div class="rightBox">
          <textarea
            class="textTareaBox"
            v-model="dataMsgAddress.storeJS"
            placeholder="对录入的商户进行不超过100字简单介绍"
            cols="4"
            rows="4"
          ></textarea>
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <span class="addTitle">营业执照</span>
        <div class="rightBox">
          <PhotoUp/>
        </div>
        <div class="gaird1"></div>
      </div>
      <div class="addMsg">
        <div class="addTitle">确认提示</div>
        <div class="shuoMing">除了商户简称外，其他信息为必填</div>
        <!-- <mu-flex class="select-control-row">
          <mu-switch @change="changeMsg" v-model="switchVal.value1"></mu-switch>
        </mu-flex>-->
        <div class="gaird1"></div>
      </div>
      <!-- <div class="addMsg">
        <div class="addTitle">设置默认地址</div>
        <div class="shuoMing">提醒：每次下单时会使用该地址，实际下单地址会根据您下单切换的地区进行智能判断，请在下单时确认哦！</div>
        <mu-flex class="select-control-row">
          <mu-switch @change="changeMsg" v-model="switchVal.value1"></mu-switch>
        </mu-flex>
        <div class="gaird1"></div>
      </div>-->
      <div class="submitAdd" v-waves @click="submitJump">录入保存</div>
    </div>
  </div>
</template>

<script>
import NavBack from "../public/NavBack";
import PhotoUp from "./public/PhotoUp";
import waves from "@/directive/waves"; // 水波纹指令
import VDistpicker from "v-distpicker";
export default {
  name: "InfoCollection",
  components: { NavBack, PhotoUp, VDistpicker },
  directives: {
    waves
  },
  props: ["local"],
  data() {
    return {
      switchVal: {
        value1: false
      },
      dataMsgAddress: {
        local: "点击选择省市区",
        adds: "",
        storeName: "",
        storeNameJC: "",
        storeJS: "",
        name: "",
        tel: "",
        category: []
      },
      categorys: "",
      shows: false
    };
  },
  methods: {
    backjump() {
      this.$router.push({
        path: "/MyCenter"
      });
    },
    changeMsg() {
      console.log(this.switchVal.value1);
    },
    //  增加范围
    addCategory() {
      console.log(this.categorys);
      this.dataMsgAddress.category.push(this.categorys);
      console.log(this.dataMsgAddress.category);
      this.categorys = "";
    },
    // 删除
    deletes(index) {
      this.dataMsgAddress.category.splice(index, 1);
    },
    // 保存地址
    submitJump() {
      console.log(this.dataMsgAddress);
    },

    jumpSearch() {
      this.shows = !this.shows;
    },
    //省市区选择拼接
    onSelected(data) {
      console.log(data);
      console.log(data.province.value + data.city.value + data.area.value);
      this.dataMsgAddress.local =
        data.province.value + data.city.value + data.area.value;
      this.shows = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.bigBoxShows {
}
.addMsg {
  width: 100%;
  padding: 0.32rem 0.32rem 0 0.32rem;
  background-color: #fff;
  position: relative;
  text-align: left;
  /* line-height: 100%; */
  /* background-color: palegoldenrod; */
}
.addTitle {
  font-size: 0.3rem;
  position: absolute;
  /* letter-spacing: 0.06rem; */
}
.xuanz {
  font-size: 0.24rem;
  color: orange;
}
.rightBox {
  width: 85%;
  padding-left: 0.32rem;
  /* background-color: #fbda61; */
  position: relative;
  margin-left: 1.2rem;
  top: 0rem;
  font-size: 0.28rem;
  /* right: 0; */
}
.categoryBox {
  width: 100%;
  // height: 0.6rem;
  margin-top: 0.1rem;
  // background-color: palegreen;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-right: 0.32rem;
}
.categoryItem {
  background-color: #fff;
  display: inline-block;
  border: 1px solid #f0f0f0;
  margin-right: 0.32rem;
  line-height: 170%;
  padding: 0.06rem;
  margin-bottom: 0.2rem;
  border-radius: 0.1rem;
}
.logoss {
  width: 0.5rem;
  position: relative;
  top: 0.08rem;
}
.rightBoxLocalImg {
  width: 0.46rem;
}
.rightBoxLocalDetail {
  font-size: 0.28rem;
  color: #999999;
  position: relative;
  left: 0.32rem;
  top: -0.07rem;
}
.rightBoxLocalForward {
  width: 0.14rem;
  position: absolute;
  right: 0.21rem;
  top: 0.12rem;
}
.gaird1 {
  width: 100%;
  border: #f9f9f9 solid 0.02rem;
  margin-top: 0.32rem;
}
.jumpInput {
  color: #999999;
}
.rightBoxIpt {
  width: 90%;
  height: 100%;
  outline: none;
  border-width: 0;
  caret-color: #ee8018;
  font-size: 0.26rem;
}
.rbit1 {
  border: 1px solid #eee;
  width: 3rem;
  height: 0.8rem;
  margin-top: -0.2rem;
  padding-left: 0.1rem;
}
.textTareaBox {
  caret-color: #ee8018;
  border: 1px solid #eee;
  padding-left: 0.1rem;
  outline: none;
  width: 90%;
  font-size: 0.26rem;
}
.addLogo {
  width: 0.6rem;
  position: absolute;
  margin-left: 0.3rem;
  top: -0.08rem;
}
.shuoMing {
  width: 80%;
  font-size: 0.24rem;
  margin-top: 0.64rem;
  color: #ee8018;
  /* background-color: aqua; */
}
.select-control-row {
  position: absolute;
  /* background-color: palegoldenrod; */
  top: 0.82rem;
  right: 0.32rem;
}
.mu-switch {
  height: 0.64rem;
  line-height: 0.64rem;
}
.select-control-row >>> .mu-switch-wrapper {
  width: 100%;
  height: 0.64rem;
}
.select-control-row >>> .mu-switch-container {
  width: 0.76rem;
  padding: 0.08rem 0 0.08rem 0.04rem;
  margin-right: 0.16rem;
}
.select-control-row >>> .mu-switch-track {
  width: 100%;
  height: 0.28rem;
  border-radius: 0.6rem;
}
.select-control-row >>> .mu-switch-thumb {
  position: absolute;
  top: 1px;
  left: 0;
  width: 0.4rem;
  height: 0.4rem;
  line-height: 0.48rem;
}
.select-control-row >>> .mu-switch-checked {
  color: #ee8018;
}
.select-control-row >>> .mu-switch-checked .mu-switch-thumb {
  transform: translate3d(0.36rem, 0, 0);
}
.select-control-row >>> .mu-switch-ripple-wrapper {
  top: -0.2rem;
  left: -0.2rem;
}
.submitAdd {
  width: 100%;
  height: 0.88rem;
  background-color: #ee8018;
  font-size: 0.36rem;
  color: #fff;
  line-height: 0.88rem;
  margin: 0.32rem auto;
}
.showLocal {
  width: 70%;
  font-size: 0.3rem;
}
//  三级联动菜单样式修改
.divwrap {
  height: 4rem;
  overflow-y: auto;
  // position: fixed;
  left: 0;
  top: 0rem;
  width: 100%;
  // z-index: 100000;
  margin-left: 0;
}
.divwrap >>> .distpicker-address-wrapper {
  color: #999;
}
.divwrap >>> .address-header {
  position: fixed;
  bottom: 4rem;
  width: 100%;
  background: #000;
  color: #fff;
}
.divwrap >>> .address-header ul li {
  flex-grow: 1;
  text-align: center;
}
.divwrap >>> .address-header .active {
  color: #fff;
  border-bottom: #666 solid 8px;
}
.divwrap >>> .address-container .active {
  color: #000;
}
</style>