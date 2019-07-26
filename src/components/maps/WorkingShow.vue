<template>
  <div>
    <NavBack name="您正在工作中" @backjump="backjump"/>
    <div class="tipShow">
      <template>
        <div v-if="sles">
          <img class="workLogo slogo" src="../../../static/worked.gif" alt>
          <div class="contentsd ssadasfv">
            <span class="trew">恭喜您!</span>
            <br>完成了本次订单，再接再厉,本次订单详情可在工作日程里查看。
          </div>
        </div>
        <div v-else>
          <img class="workLogo" src="../../../static/working.gif" alt>

          <div class="contentsd">您正在工作中，完成后请点击确认，才能进行下一单接单。</div>
        </div>
      </template>
    </div>
    <div class="workedShows" @click="workedShows">
      <img class="workLogos" :class="sles?'workLogosd':''" :src="workLogo" alt>
      <div class="workLogoTitle" :class="sles?'ss':''">{{msgData}}</div>
    </div>
  </div>
</template>

<script>
import NavBack from "../public/NavBack";
import waves from "@/directive/waves"; // 水波纹指令
import wc1 from "../../assets/buss/wc1.png";
import wc2 from "../../assets/buss/wc.png";
export default {
  name: "WorkingShow",
  components: { NavBack },
  directives: {
    waves
  },
  data() {
    return {
      workLogo: wc1,
      msgData: "完成工作",
      sles: false
    };
  },
  methods: {
    backjump() {
      this.$router.go(-1);
    },
    workedShows() {
      if (this.msgData == "完成工作") {
        this.sles = true;

        setTimeout(() => {
          this.workLogo = wc2;
          this.msgData = "已完成";
        }, 300);
      } else {
        console.log("您已经完成工作");
      }
    }
  }
};
</script>

<style scoped>
.tipShow {
  width: 100%;
  padding: 0.32rem;
  background-color: #fff;

  text-align: left;
  position: relative;
}
.workLogo {
  width: 40%;
}
.contentsd {
  position: absolute;
  width: 50%;
  top: 1.1rem;
  right: 0.32rem;
  font-size: 0.28rem;
  color: rgb(95, 168, 202);
  font-family: SimHei;
}
.workedShows {
  margin: 0.65rem auto;
  /* background-color: #fff; */
  width: 3rem;
}
.workLogos {
  width: 3rem;
  height: 3rem;

  margin: 0.32rem auto;
}
.workLogosd {
  animation: myfirst 0.51s 0.01s ease-in-out;
  -moz-animation: myfirst 0.51s 0.01s ease-in-out; /* Firefox */
  -webkit-animation: myfirst 0.51s 0.01s ease-in-out; /* Safari and Chrome */
  -o-animation: myfirst 0.51s 0.01s ease-in-out; /* Opera */
}
@keyframes myfirst {
  0% {
    opacity: 1;
    transform: perspective(120px) rotateY(0) rotateX(0);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(0);
  }
  25% {
    opacity: 0.55;
    transform: perspective(120px) rotateY(0) rotateX(-90.1deg);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(-90.1deg);
  }
  50% {
    opacity: 0.15;
    transform: perspective(120px) rotateY(0) rotateX(-180.1deg);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(-180.1deg);
  }
  75% {
    opacity: 0.55;
    transform: perspective(120px) rotateY(0) rotateX(-180deg);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(-270deg);
  }
  100% {
    opacity: 1;
    transform: perspective(120px) rotateY(0) rotateX(-360deg);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(-360deg);
  }
}

@-moz-keyframes myfirst /* Firefox */ {
  0% {
    opacity: 1;
    transform: perspective(120px) rotateY(0) rotateX(0);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(0);
  }
  25% {
    opacity: 0.75;
    transform: perspective(120px) rotateY(0) rotateX(-90.1deg);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(-90.1deg);
  }
  50% {
    opacity: 0.5;
    transform: perspective(120px) rotateY(-90deg) rotateX(-180.1deg);
    -webkit-transform: perspective(220px) rotateY(-90deg) rotateX(-180.1deg);
  }
  75% {
    opacity: 0.75;
    transform: perspective(120px) rotateY(-179.9deg) rotateX(-180deg);
    -webkit-transform: perspective(220px) rotateY(-179.9deg) rotateX(-180deg);
  }
  100% {
    opacity: 1;
    transform: perspective(120px) rotateY(0) rotateX(0);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(0);
  }
}

@-webkit-keyframes myfirst /* Safari and Chrome */ {
  0% {
    opacity: 1;
    transform: perspective(120px) rotateY(0) rotateX(0);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(0);
  }
  25% {
    opacity: 0.75;
    transform: perspective(120px) rotateY(0) rotateX(-90.1deg);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(-90.1deg);
  }
  50% {
    opacity: 0.5;
    transform: perspective(120px) rotateY(-90deg) rotateX(-180.1deg);
    -webkit-transform: perspective(220px) rotateY(-90deg) rotateX(-180.1deg);
  }
  75% {
    opacity: 0.75;
    transform: perspective(120px) rotateY(-179.9deg) rotateX(-180deg);
    -webkit-transform: perspective(220px) rotateY(-179.9deg) rotateX(-180deg);
  }
  100% {
    opacity: 1;
    transform: perspective(120px) rotateY(0) rotateX(0);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(0);
  }
}

@-o-keyframes myfirst /* Opera */ {
  0% {
    opacity: 1;
    transform: perspective(120px) rotateY(0) rotateX(0);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(0);
  }
  25% {
    opacity: 0.75;
    transform: perspective(120px) rotateY(0) rotateX(-90.1deg);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(-90.1deg);
  }
  50% {
    opacity: 0.5;
    transform: perspective(120px) rotateY(-90deg) rotateX(-180.1deg);
    -webkit-transform: perspective(220px) rotateY(-90deg) rotateX(-180.1deg);
  }
  75% {
    opacity: 0.75;
    transform: perspective(120px) rotateY(-179.9deg) rotateX(-180deg);
    -webkit-transform: perspective(220px) rotateY(-179.9deg) rotateX(-180deg);
  }
  100% {
    opacity: 1;
    transform: perspective(120px) rotateY(0) rotateX(0);
    -webkit-transform: perspective(220px) rotateY(0) rotateX(0);
  }
}
.workLogoTitle {
  font-size: 0.36rem;
  color: #333333;
  padding-bottom: 0.32rem;
  font-weight: 500;
}
.ss {
  color: #999999;
}
.slogo {
  height: 2.3rem;
}
.trew {
  font-size: 0.32rem;
}

.ssadasfv {
  color: rgb(196, 13, 196);
}
</style>