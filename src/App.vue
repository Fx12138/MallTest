<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <MainTabbar v-if="showNav"></MainTabbar>
  </div>
</template>

<script>
import MainTabbar from "./components/common/tabbar/MainTabbar";
import Login from "./views/login/login.vue";
export default {
  name: "App",
  components: {
    MainTabbar,
    Login,
  },
  data() {
    return {
      showNav: false,
    };
  },
  created() {},
};
</script>

<style>
@import "assets/css/base.css";
body {
  height: 100px;
}
</style>
