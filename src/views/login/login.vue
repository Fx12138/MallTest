<template>
  <div class="box" @click="login">登陆界面</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      window.sessionStorage.setItem("token", "已登录");
      this.$router.replace("/home");
      this.$parent.showNav = true;
    },
  },
  components: {},
  created() {
    this.$parent.showNav = false;
  },
  mounted() {},
};
</script>
<style>
</style>