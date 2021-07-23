<template>
  <div class="box">
    <div class="goods-item" @click="goodsClick">
      <img :src="goodsItem.goods_small_logo" />
      <div class="goods-info">
        <p>{{ goodsItem.goods_name }}</p>
        <span class="price">价格:{{ goodsItem.goods_price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    goodsClick() {
      let goodsId = this.goodsItem.goods_id;
      console.log(goodsId);
      this.$router.push("/detail/" + goodsId);
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  /* padding-right: 30px;
  padding-left: 30px; */
  position: relative;
  justify-content: center;
  align-items: center;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
  border: 1px solid gray;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0px;
  right: 0px;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: darkblue;
  margin-right: 20px;
}
</style>
