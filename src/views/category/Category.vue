<template>
  <div>
    <div class="box">
      <div class="left_nav">
        <div
          class="left_item"
          :class="activeIndex == index ? 'active' : ''"
          v-for="(item, index) in categories"
          @click="handleCategoryClick(item.cat_id, index)"
        >
          {{ item.cat_name }}
        </div>
      </div>
      <div class="right_content">
        <div v-if="isNull">暂无数据</div>
        <div class="item" v-for="item in categoryContent">
          <img :src="item.goods_big_logo"></img>
          <div>{{ item.goods_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { getCategories, categoryClick } from "../../network/category";
export default {
  name: "Category",
  data() {
    return {
      categories: null,
      activeIndex: 5,
      categoryContent: null,
      isNull: true,
      loading: true,
    };
  },
  components: {},

  methods: {
    /**
     * 获取商品分类
     */
    getLeftNav() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      getCategories().then((res) => {
        this.categories = res.data.message;
        this.handleCategoryClick(0, 4);
        loading.close();
      });
    },

    /**
     * @param {Object} index
     * 左侧点击后获取右侧数据
     */
    handleCategoryClick(catId, index) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.activeIndex = index;
      categoryClick(index).then((res) => {
        console.log(res);
        this.categoryContent = res.data.message.goods;
        if (this.categoryContent[0] == null) {
          this.isNull = true;
        } else {
          this.isNull = false;
        }
        loading.close();
      });
    },
  },
  created() {
    this.getLeftNav();
  },
};
</script>

<style scoped>
page {
  height: 100%;
}

.box {
  height: 100%;
  display: flex;
}

.left_nav {
  width: 30%;
  border: 3rpx solid #808080;
  position: fixed;
  overflow-y: scroll;
  height: 100%;
}
.right_content {
  width: 65%;
  margin-left: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: fixed;
  right: 0px;
  overflow-y: scroll;
  height: 100%;
}

.left_item {
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-top: 5px solid #eeeeee;
}

.active {
  background-color: #669900;
}
.item {
  width: 90%;
  margin-bottom: 10px;
  border: 5px solid #c0c0c0;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.item img {
  width: 90%;
}
</style>
