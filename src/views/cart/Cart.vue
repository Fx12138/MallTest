<template>
  <div>
    <div class="cart">
      <h2>购物车,总数:{{ cartList.length }}</h2>
      <div v-for="goods in cartList" :key="goods.goods_id" class="item">
        <img :src="goods.goods_small_logo" />
        <div class="des">
          <p class="goods_name">{{ goods.goods_name }}</p>
          <p>数量:{{ goods.count }}</p>
        </div>
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
  components: {},
  computed: {
    ...mapGetters(["getCartList"]),
  },
  created() {
    this.cartList = this.$store.state.cartList;
  },
};
</script>

<style scoped>
.cart {
  width: 100%;
  margin-bottom: 60px;
}
.item {
  height: 200px;
  width: 100%;
  display: flex;
  border: 5px solid black;
  margin-bottom: 10px;
}
.item img {
  width: 35%;
}
.goods_name {
  height: 80px;
  line-height: 80px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
