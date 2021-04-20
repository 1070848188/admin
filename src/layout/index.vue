<template>
  <div class="wrapper">
    <m-header></m-header>
    <div class="wrapper_con">
      <side-bar></side-bar>
      <page-main></page-main>
    </div>
  </div>
</template>

<script>
import MHeader from "./header";
import PageMain from "./pageMain";
import SideBar from "./sideBar";
export default {
  name: "Layout",
  components: {
    MHeader,
    PageMain,
    SideBar,
  },
};
</script>

<style lang="scss" scoped>
</style>