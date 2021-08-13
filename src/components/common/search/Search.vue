<template>
  <div class="search-box">
    <div class="search">
      <el-input v-model="searchContent" placeholder="请输入搜索内容"></el-input>
      <el-button round @click="handleSearch">圆角按钮</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchContent: null,
    };
  },
  watch: {
    searchContent(newVla) {
      let This = this;
      //父级组件绑定data值需要用到的修饰符.sync
      this.$emit("update:searchContent", newVla);
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        //节流完毕之后触发一个自定义函数
        This.$emit("searchChange", newVla);
      }, 500);
    },
  },
  methods: {
    init() {},
    //处理点击搜索按钮
    handleSearch() {
      this.$emit("handleSearch", this.searchContent);
    },
    //输入框防抖
    debounce(fn, delay) {
      var timer = null;
      var delay = delay || 500;
      return function () {
        var args = arguments;
        var that = this;
        // 清除上一次延时器
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(that, args);
        }, delay);
      };
    },
  },
  components: {},
  created() {},
  mounted() {
    this.init();
  },
};
</script>
<style>
.search {
  display: flex;
  margin-bottom: 50px;
  margin-top: 50px;
}
</style>