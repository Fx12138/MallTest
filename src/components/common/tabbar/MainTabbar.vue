<template>
  <div>
    <Tabbar>
      <TabbarItem path="/home" active-color="blue">
        <img src="~assets/img/tabbar/mine.png" slot="item-icon" />
        <img src="~assets/img/tabbar/fruit.png" slot="item-icon-active" />
        <div slot="item-name">首页</div>
      </TabbarItem>
      <TabbarItem path="/category" active-color="blue">
        <img src="~assets/img/tabbar/mine.png" slot="item-icon" />
        <img src="~assets/img/tabbar/fruit.png" slot="item-icon-active" />
        <div slot="item-name">分类</div>
      </TabbarItem>
      <TabbarItem path="/cart" active-color="blue">
        <img src="~assets/img/tabbar/mine.png" slot="item-icon" />
        <img src="~assets/img/tabbar/fruit.png" slot="item-icon-active" />
        <div slot="item-name">购物车</div>
      </TabbarItem>
      <TabbarItem path="/profile" active-color="blue">
        <img src="~assets/img/tabbar/mine.png" slot="item-icon" />
        <img src="~assets/img/tabbar/fruit.png" slot="item-icon-active" />
        <div slot="item-name">我的</div>
      </TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import Tabbar from "./Tabbar";
import TabbarItem from "./TabbarItem";
export default {
  name: "MainTabbar",
  components: {
    Tabbar,
    TabbarItem,
  },
};
</script>

<style scoped>
</style>
