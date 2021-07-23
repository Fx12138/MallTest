<template>
  <div class="goods">
    <goods-item
      v-for="(item, index) in goods"
      :goodsItem="item"
      :key="index"
      class="goodsItem"
    ></goods-item>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
export default {
  name: "GoodsList",
  components: { GoodsItem },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 40px;
}
.goodsItem {
  width: 20%;
  margin-bottom: 20px;
  margin-left: 10px;
}
</style>
