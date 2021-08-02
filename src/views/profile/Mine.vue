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
    logout() {
      window.sessionStorage.removeItem("token");
      this.$parent.showNav = false;
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
</style>
