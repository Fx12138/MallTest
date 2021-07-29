<template>
  <div class="box" @click="toHome">登陆界面</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toHome() {
      this.$router.replace("/home");
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