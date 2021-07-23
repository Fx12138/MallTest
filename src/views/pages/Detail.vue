<template>
  <div>
    <h2 @click="addCart">加入购物车{{ goodsId }}</h2>
    <img style="width: 100%" :src="goods.goods_small_logo" />
  </div>
</template>

<script>
import { getGoodsById } from "../../network/home";
export default {
  name: "Cart",
  data() {
    return {
      goodsId: null,
      goods: {},
    };
  },
  activated() {
    this.goodsId = this.$route.params.goodsId;
    this.getGoods(this.goodsId);
  },
  computed: {},
  created() {},
  methods: {
    getGoods(goodsId) {
      getGoodsById(goodsId).then((res) => {
        this.goods = res.data.message;
      });
    },
    addCart() {
      this.$store.dispatch("addToCart", this.goods).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
</style>
