<template>
  <div>
    <h2>我的</h2>
    <h3 @click="logout">退出</h3>
  </div>
</template>

<script>
export default {
  name: "Mine",
  created() {
    this.$parent.showNav = true;
  },
  methods: {
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    },
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    logout() {
      this.delCookie("token");
      // window.sessionStorage.removeItem("token");
      this.$parent.showNav = false;
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
</style>
