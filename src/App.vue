<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <MainTabbar></MainTabbar>
  </div>
</template>

<script>
import MainTabbar from "./components/common/tabbar/MainTabbar";
export default {
  name: "App",
  components: {
    MainTabbar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
