<template>
  <div id="home">
    <div id="topAnchor"></div>
    <NavBar class="home-nav">
      <div slot="center">微商城</div>
    </NavBar>
    <Recommend :recommends="recommend"></Recommend>
    <TabControl
      :tabs="['流行', '新款', '推荐']"
      class="home-tabControl"
      @click="tabClick"
      ref="tabControl"
      :class="{ isFixed: isTabFixed }"
    ></TabControl>
    <GoodsList :goods="allGoods"></GoodsList>
    <back-top class="backTop" @click.native="backClick"></back-top>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import Recommend from "./childComps/Recommend";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";

import {
  getAllGoods,
  getHomeMul,
  getRecommend,
  getGoods,
} from "../../network/home";
import BackTop from "../../components/content/backTop/backTop.vue";

export default {
  name: "Home",
  data() {
    return {
      muls: null,
      recommend: null,
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        com: {
          page: 0,
          list: [],
        },
      },
      currentType: "pop",
      allGoods: null,
      tabOffstTop: null,
      isTabFixed: false,
    };
  },
  components: {
    GoodsList,
    TabControl,
    Recommend,
    NavBar,
    BackTop,
  },
  created() {
    this.reqAllGoods();
    this.getRecommend();
    // this.getGoods("pop");
    // this.getGoods("new");
    // this.getGoods("com");
  },
  mounted() {
    //获取tabControl的offsetTop
    //所有组件都有一个属性$el,这个属性用来获取组件中的元素
    this.tabOffstTop = this.$refs.tabControl.$el.offsetTop;
    console.log(this.tabOffstTop);
  },
  methods: {
    /**
     * 点击tabControl切换界面
     * @param index
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "com";
          break;
      }
    },
    //请求推荐数据
    getRecommend() {
      getRecommend().then((res) => {
        this.recommend = res.data.message;
      });
    },

    //请求商品数据
    // getGoods(type) {
    //   const page = this.goods[type].page + 1;
    //   getGoods(type, page).then((res) => {
    //     for (let n = 0; n <= res.data.message.goods.length; n++) {
    //       let g = res.data.message.goods[n];
    //       if (!g.goods_small_logo == "") {
    //         this.goods[type].list.push(g);
    //       }
    //     }
    //     this.goods[type].page += 1;
    //   });
    // },

    //请求全部商品数据
    reqAllGoods(type) {
      getAllGoods().then((res) => {
        let gs = res;
        console.log(res);
        for (let n = 0; n <= gs.data.message.goods.length; n++) {
          let g = gs.data.message.goods[n] || {};
          let keys = Object.keys(g);
          if (
            keys.indexOf("goods_small_logo") == -1 ||
            g.goods_small_logo == ""
          ) {
            g.goods_small_logo =
              "http://image3.suning.cn/uimg/b2c/newcatentries/0070078057-000000000136928577_1_400x400.jpg";
          }
        }
        this.allGoods = gs.data.message.goods;
      });
    },
    backClick() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    //监听页面滚动,从而在适当的位置使tabControl固定在页面上方
    contentScoll() {
      this.isTabFixed = -position.y > this.tabOffstTop;
    },
  },
};
</script>

<style scoped>
.home-nav {
  background-color: lavender;
}
.home-tabControl {
}
.backTop {
  position: fixed;
  right: 20px;
  bottom: 60px;
}
.isFixed {
  position: fixed;
  top: 44px;
}
</style>
