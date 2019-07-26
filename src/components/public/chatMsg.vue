<template>
  <div class="contentBoxs">
    <img class="contentBoxsLgo" :src="logo" alt>
    <div class="contentss">
      <span class="t1"></span>
      {{msgs}}
    </div>
  </div>
</template>

<script>
export default {
  name: "chatMsg",
  props: ["logo", "msgs"]
};
</script>

<style scoped>
.contentBoxs {
  width: 100%;
  padding: 0.32rem 0.32rem 0rem 0.32rem;
  /* background-color: palegreen; */
  text-align: left;
  position: relative;
  margin: 0.32rem auto 0.22rem;
}

.contentBoxsLgo {
  width: 0.8rem;
  height: 1rem;
  position: absolute;
  top: 0.1rem;
}
.contentss {
  position: relative;
  padding: 0.2rem;
  display: inline-block;
  background-color: #fff;
  top: -0.21rem;
  margin-left: 1.2rem;
  max-width: 5rem;
  font-size: 0.3rem;
  border-radius: 0.1rem;
}

.t1 {
  width: 0;
  height: 0;
  font-size: 0;
  overflow: hidden;
  position: absolute;
  border-width: 0.18rem;
  border-style: solid;
  border-color: transparent #ffffff transparent transparent;
  left: -0.35rem;
  top: 0.3rem;
}
</style>