<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-23 17:14:16
 * @LastAuthor: wukai
 * @lastTime: 2019-06-21 10:11:28
 -->
<template>
  <div>
    <!-- 获取摄像头用的 -->
    <input
      id="upload_file"
      type="file"
      style="display: none;"
      accept="image/*"
      name="file"
      @change="fileChange($event)"
    >
    <div class="image-item space" @click="showActionSheet()">
      <!-- <div class="image-up"></div> -->
    </div>

    <!-- 上传身份证 -->
    <div class="imgs" @click="fileClick(1)">
      <template>
        <div class="bgcBox" v-if="val.length<='20'&& imgList.length<='1'">上传头像</div>
        <div v-else>
          <img :src="val" class="shoes">
        </div>
      </template>

      <!-- 上传的照片显示 -->
      <div class="bgcBox1" v-for="(item,index) in imgList" :key="index" @click="fileDel(1,index)">
        <img :src="item.file.src" class="shoes">
        <mu-circular-progress
          v-show="upImgs"
          class="demo-circular-progress"
          :size="180"
          color="secondary"
        ></mu-circular-progress>
      </div>
    </div>
    <div>{{datass}}</div>
    <div class="vidoesBox">
      <video ref="video"></video>
      <canvas ref="canvas" width="500" height="300"></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
import "../../../../../static/facepp_sdk/exif";
import "../../../../../static/facepp_sdk/facepp_sdk";
const APIKEY = "yHc0p5uI9wHCd6m_pZ3cKSoghSyyczAj";
const APISERET = "-cTQB4qUvZMEfyb-O6hzHejhFNL8Cd8r";
export default {
  name: "PhotoUps",
  props: ["val"],
  data() {
    return {
      imgList: [],
      datas: new FormData(),
      files: 0,
      size: 0,
      clickIndex: 1,
      upImgs: true,
      access_token: "",
      expires_in: null,
      datass: "",
      suessed: false,
      timeout: "",
      datelist: {
        api_key: APIKEY,
        api_secret: APISERET,
        image_base64_1: "",
        image_base64_2: ""
      }
    };
  },
  mounted() {
    console.log("000000000");
    console.log(this.val.length);
    // 获取百度云token
    // this.getTokens();
    this._initMedia();
  },
  methods: {
    // 初始化摄像头
    _initMedia() {
      let constraints = {
        audio: false,
        video: {
          width: 500,
          height: 500
        }
      };

      let _this = this;
      // 调用浏览器摄像头
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(mediaStream => {
          _this.video = this.$refs.video;
          // 将结果分配给 video 标签
          _this.video.srcObject = mediaStream;
          _this.video.onloadedmetadata = function(e) {
            // 元数据加载后，播放
            _this.video.play();
          };
        })
        .catch(err => {
          console.log(err.name + ":" + err.message);
        });

      // 每秒获取一次
      this.timeout = setInterval(() => {
        // this._captureImg();
      }, 2000);
    },
    // canvas 截取图片
    _captureImg() {
      // 取到 canvas
      this.canvas = this.$refs.canvas;
      // 获取 canvas 上下文
      let ctx = this.canvas.getContext("2d");
      // 截图
      ctx.drawImage(this.video, 0, 0, 300, 300);
      // 将截图转换成 base64
      this.image = this.canvas.toDataURL("image/png");
      // 只保留 base64 部分
      let base64Str = this.image.split("base64,")[1];
      console.log("截图截图————————————————");

      console.log(base64Str);
      this.datelist.image_base64_2 = base64Str;
      console.log(this.datelist);
      // 发起人脸识别的请求
      var Urls = "/facepp/v3/compare";
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      var _this = this;
      console.log("人脸识别");
      $.ajax({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        type: "post",
        url: Urls,
        async: true,
        data: this.datelist,
        dataType: "json",
        timeout: 30000,
        success: function(data) {
          console.log("解析成功");
          // console.log(data);
          console.log(data.confidence);

          if (data.confidence > 50) {
            alert("相似度极高");
          } else {
            _this._captureImg();
          }
        },
        error: function(xhr) {
          console.log("请求解析失败");
        }
      });
      // this.$post(Urls, this.datelist)
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      // return base64Str;
    },

    //获取百度云token
    getTokens() {
      console.log("百度token");
      var Urls =
        "/oauth/2.0/token?grant_type=client_credentials&client_id=PDcAoCNK3cHehXWYghUa62nC&client_secret=1SNamUnZLw874N9FGSOCjjBcH5bjiWx6";

      this.$post(Urls)
        .then(res => {
          console.log(res);
          this.access_token = res.access_token;
          this.expires_in = res.expires_in;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //调用相册&相机
    fileClick(index) {
      $("#upload_file").click();
      this.clickIndex = index;
      this.upImgs = true;
    },
    //将相关数据提交给父组件
    submit() {
      console.log(this.imgList[0]);
      // console.log(this.access_token);
      var logos = this.imgList[0].file.src.split(",")[1];
      this.datelist.image_base64_1 = logos;

      //获取摄像头的图片
      // this._captureImg();

      // console.log(logos);
      // let config = {
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // };

      // var _this = this;
      // console.log("百度身份识别接口");
      // $.ajax({
      //   header: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   type: "post",
      //   url: "/rest/2.0/ocr/v1/idcard?access_token=" + this.access_token,
      //   async: true,
      //   data: {
      //     id_card_side: "front",
      //     image: logos
      //   },
      //   dataType: "json",
      //   timeout: 30000,
      //   success: function(data) {
      //     console.log("解析成功");
      //     console.log(data);
      //     this.upImgs = false;
      //     _this.datass = data.words_result;
      //   },
      //   error: function(xhr) {
      //     console.log("请求解析失败");
      //   }
      // });
      // console.log("百度身份识别接口");
      //  var data = {
      //   id_card_side: "front",
      //   image: logos
      // };
      // data = Qs.stringify(data);
      // axios
      //   .post(
      //     "/rest/2.0/ocr/v1/idcard?access_token=" + this.access_token,
      //     data,
      //     {
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded"
      //       }
      //     }
      //   )
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      // 提交;
      this.$post("/wangtian/api/v1/user_action/avatar_path/", { image: logos })
        .then(res => {
          console.log(res);
          if (res.code == "1") {
            this.upImgs = false;
            this.upDataJump(res.address);
          } else {
            this.$toast.warning("图片上传失败，请重新上传");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交资料
    upDataJump(val) {
      this.$post("/wangtian/api/v1/user_action/user_info/", {
        avatar: val
      })
        .then(res => {
          console.log(res);
          if (res.code == "1") {
            this.$toast.message("更新成功");
            this.$router.push({
              path: "/MySelfSetting"
            });
          } else {
            this.$toast.warning("更新头像失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //调用手机摄像头并拍照
    getImage() {
      let cmr = plus.camera.getCamera();
      cmr.captureImage(
        function(p) {
          plus.io.resolveLocalFileSystemURL(
            p,
            function(entry) {
              compressImage(entry.toLocalURL(), entry.name);
            },
            function(e) {
              plus.nativeUI.toast("读取拍照文件错误：" + e.message);
            }
          );
        },
        function(e) {},
        {
          filter: "image"
        }
      );
    },
    //从相册选择照片
    galleryImgs() {
      plus.gallery.pick(
        function(e) {
          let name = e.substr(e.lastIndexOf("/") + 1);
          compressImage(e, name);
        },
        function(e) {},
        {
          filter: "image"
        }
      );
    },
    //点击事件，弹出选择摄像头和相册的选项
    showActionSheet() {
      let bts = [
        {
          title: "拍照"
        },
        {
          title: "从相册选择"
        }
      ];
      plus.nativeUI.actionSheet(
        {
          cancel: "取消",
          buttons: bts
        },
        function(e) {
          if (e.index == 1) {
            this.getImage();
          } else if (e.index == 2) {
            this.galleryImgs();
          }
        }
      );
    },
    fileChange(el) {
      this.files = $("#upload_file").get(0).files;
      console.log(this.files.length);
      for (let i = 0; i < this.files.length; i++) {
        this.datas.append("file", this.files[i]);
      }
      this.show1 = false;
      console.log(typeof this.files);
      console.log(this.files);
      if (!el.target.files[0].size) return;
      this.fileList(el.target);
      el.target.value = "";
    },
    fileList(fileList) {
      let files = fileList.files;

      for (let i = 0; i < files.length; i++) {
        //判断是否为文件夹
        if (files[i].type != "") {
          this.fileAdd(files[i]);
        } else {
          //文件夹处理
          this.folders(fileList.items[i]);
        }
      }
    },
    //文件夹处理
    folders(files) {
      let _this = this;

      //判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry();
      }
      files.createReader().readEntries(function(file) {
        for (let i = 0; i < file.length; i++) {
          if (file[i].isFile) {
            _this.foldersAdd(file[i]);
          } else {
            _this.folders(file[i]);
          }
        }
      });
    },
    fileAdd(file) {
      //总大小
      console.log("111111");
      console.log(file);

      this.size = this.size + file.size;
      //判断是否为图片文件
      if (file.type.indexOf("image") == -1) {
        file.src = "avatar.png";
        this.imgList.push({
          file
        });
      } else {
        let reader = new FileReader();
        reader.vue = this;
        reader.readAsDataURL(file);
        reader.onload = function() {
          file.src = this.result;
          this.vue.imgList.push({
            file
          });
        };
      }

      // 这里可以上传图片
      setTimeout(() => {
        this.submit();
      }, 100);
    },
    fileDel(ind, index) {
      this.size = this.size - this.imgList[index].file.size; //总大小
      this.imgList.splice(index, 1);
    },
    bytesToSize(bytes) {
      if (bytes === 0) {
        return "0 B";
      }
      let k = 1000, // or 1024
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    },
    dragenter(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    dragover(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    drop(el) {
      el.stopPropagation();
      el.preventDefault();
      this.fileList(el.dataTransfer);
    },
    shows(et, tx) {
      this.strut = et;
      this.txt = tx;
    },
    handleClick() {
      this.$store.commit("add");
    }
  }
};
</script>

<style lang="scss" scoped>
canvas {
  display: none;
}
video {
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  // padding-bottom: 1rem;
}
.vidoesBox {
  width: 7rem;
  height: 7rem;
  background-color: palevioletred;
  margin: 0.3rem auto;
  border-radius: 50%;
}
.imgs {
  width: 100%;
  min-height: 4.8rem;
  background-color: white;
  margin: 0 auto;
}

.bgcBox {
  font-size: 0.58rem;
  color: #f1f1f1;
  text-align: center;
  line-height: 4.8rem;
}
.bgcBox1 {
  position: absolute;
  top: 1.25rem;
  width: 100%;
}

.shoes {
  width: 100%;
}
.demo-circular-progress {
  top: -5.5rem;
  left: 0.2rem;
}
</style>