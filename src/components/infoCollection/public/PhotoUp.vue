<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-23 17:14:16
 * @LastAuthor: wukai
 * @lastTime: 2019-06-10 11:18:44
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
      <div class="bgcBox" v-if="this.imgList.length < 1">
        <img class="bgcImg1" src="../../../assets/business.png" alt>
      </div>
      <!-- 上传的照片显示 -->
      <div
        class="upload_warp_img_div bgcBox"
        v-for="(item,index) in imgList"
        :key="index"
        @click="fileDel(1,index)"
      >
        <img :src="item.file.src" class="shoes">
        <mu-circular-progress
          v-show="upImgs"
          class="demo-circular-progress"
          :size="140"
          color="secondary"
        ></mu-circular-progress>
      </div>
    </div>
    <!-- 上传说明 -->
    <div class="aa">*照片大小不得大于3M</div>
  </div>
</template>

<script>
export default {
  name: "PhotoUp",
  data() {
    return {
      imgList: [],
      imgList1: [],
      datas: new FormData(),
      files: 0,
      size: 0,
      clickIndex: 1,
      upImgs: true
    };
  },
  methods: {
    //调用相册&相机
    fileClick(index) {
      $("#upload_file").click();
      this.clickIndex = index;
      this.upImgs = true;
    },
    //将相关数据提交给父组件
    submit() {
      console.log(this.imgList[0]);

      var card_front = this.imgList[0].file.src.split(",")[1];

      // var card_backend = this.imgList1[0].file.src.split(",")[1];

      var formData = new FormData();
      formData.append("card_front", card_front);
      // formData.append("card_backend", card_backend);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      var data = {
        image: card_front
        // card_backend: card_backend
      };
      console.log("上传文件");

      // 这里提交身份证照片;
      this.$post("/sta_me/api/v1/re_path/base_image_path/", data)
        .then(res => {
          console.log(res);
          this.upImgs = false;
          if (res.code == "1") {
            this.$emit("cardOne", res.address);
          } else {
            this.$toast.warning("图片上传失败，请重新上传");
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
        file.src = "businesslicense.png";
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
.imgs {
  width: 4rem;
  height: 4.8rem;
  border: 0.02rem dashed #979797;
  border-radius: 0.2rem;
  margin: 0.1rem 0 0 0.22rem;
}
.adds {
  margin-top: 0.8rem;
}
.bgcBox {
  width: 3.6rem;
  height: 4.4rem;
  // background-color: palegoldenrod;
  background-size: 4.6rem 2.4rem;
  font-size: 0.28rem;
  color: #ffffff;
  position: relative;
  top: 0.2rem;
  left: 0.2rem;
}

.bgcImg1 {
  width: 3.6rem;
  height: 4.4rem;
  position: absolute;
  left: 0rem;
  opacity: 0.7;
}
.aa {
  font-size: 0.24rem;
  color: #999999;
  margin-top: 0.26rem;
  margin-left: 0.32rem;
}
.sumbit {
  margin-top: 0.6rem;
  background-color: palegoldenrod;
  width: 6.86rem;
  height: 0.88rem;
  font-size: 0.36rem;
  color: white;
  border-radius: 0.2rem;
}
.shoes {
  width: 3.6rem;
  height: 4.4rem;
}
.demo-circular-progress {
  top: -3.5rem;
  left: 0.4rem;
}
</style>