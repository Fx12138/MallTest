<template>
  <div>
    <div class="cart">
      <h2>购物车,总数:{{ cartList.length }}</h2>
      <div v-for="goods in cartList" :key="goods.goods_id" class="item">
        <img :src="goods.goods_small_logo" />
        <p>{{ goods.goods_name }}*{{ goods.count }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  data() {
    return {
      cartList: null,
    };
  },
  computed: {
    ...mapGetters(["getCartList"]),
  },
  activated() {
    this.cartList = this.$store.state.cartList;
  },
};
</script>

<style scoped>
.cart {
  width: 100%;
}
.item {
  height: 200px;
  width: 100%;
  display: flex;
  border: 5px solid black;
  margin-bottom: 10px;
}
.item img {
  width: 200px;
}
.item p {
  line-height: 200px;
}
</style>
