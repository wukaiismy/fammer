<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2019-05-17 14:10:13
 * @LastAuthor: wukai
 * @lastTime: 2019-05-31 15:12:41
 -->
<template>
  <div class="bb">
    <mu-container>
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="0" title="首页" icon="home" to="/"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="1" title="分类" icon="reorder" to="/FoodList"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="2" title="订单" icon="local_grocery_store" to="/ShopCarList"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="3" title="我的" icon="perm_identity" to="/MyCenter"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>

<script>
export default {
  name: "FootNavigation",
  data() {
    return {
      bottomNav: "0"
    };
  },
  created() {},
  mounted() {
    var nulls = sessionStorage.getItem("navItem");

    if (!nulls) {
      this.bottomNav = "0";
    } else {
      this.bottomNav = sessionStorage.getItem("navItem");
    }
  },
  methods: {
    handleChange(val) {
      console.log(val);
      this.bottomNav = val;
      sessionStorage.setItem("navItem", this.bottomNav); //存储状态
    }
  }
};
</script>

<style >
.bb {
  position: fixed;
  bottom: 0rem;
  width: 100%;
  background: #f9f9f9;
  height: 0.9rem;
}
.mu-bottom-nav,
.mu-bottom-nav-shift {
  width: 100%;
  height: 0.9rem;
  background: #f9f9f9 !important;
}
.container {
  position: fixed;
  bottom: 0rem;
  z-index: 11;
  padding-right: 0.16rem;
  padding-left: 0.16rem;
}

.mu-bottom-item {
  min-width: 1.6rem;
  max-width: 3.36rem;
  padding: 0rem;
  color: #999999;
}
.mu-bottom-item-active {
  padding-top: 0.01rem;
  padding-bottom: 0.01rem;
  color: #43b02a !important;
}
.mu-bottom-item-icon {
  width: 0.44rem;
}
.material-icons {
  font-size: 0.44rem;
}
.mu-bottom-item-active .mu-bottom-item-text {
  font-size: 0.24rem;
}
.mu-bottom-item-text {
  font-size: 0.24rem;
}
</style>