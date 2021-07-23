<template>
  <div class="back-top">
    <div>回到顶部</div>
  </div>
</template>

<script>
export default {
  name: "backTop",
  data() {
    return {};
  },
  methods: {
    backClick() {
      console.log("回到顶部");
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style scoped>
.back-top {
  background-color: cornflowerblue;
}
</style>
