<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-24 15:02:04
 * @LastAuthor: wukai
 * @lastTime: 2019-06-10 15:44:33
 -->
<template>
  <div>
    <component :is="componentId"></component>
  </div>
</template>

<script>
import Actives from "./public/Actives";
import TuWen from "./public/TuWen";
export default {
  name: "Publishs",
  components: { Actives, TuWen },
  data() {
    return {
      componentId: TuWen
    };
  },
  created() {
    var id = this.$route.query.id;
    console.log(id);
    if (id == "2") {
      this.componentId = Actives;
    } else {
      this.componentId = TuWen;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>