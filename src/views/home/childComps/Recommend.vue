<template>
  <div id="recommend-box">
    <div v-for="item in recommends" class="recommend-item">
      <img :src="item.image_src" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  data() {
    return {};
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    var b = 1;

    var a = function () {
      console.log("函数被调用了");
    };
    console.log(a);
    console.log(b);
    console.log(this.$parent);
  },
};
</script>

<style scoped>
#recommend-box {
  display: flex;
  flex-wrap: nowrap;
  text-align: center;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 65px;
  height: 65px;
}
</style>
