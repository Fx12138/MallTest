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
    <div v-if="isEnd" class="isEnd">-----------我是有底线的-------------</div>
    <back-top class="backTop" @click.native="backClick"></back-top>
    <div class="smallCart">{{ getCartNum }}</div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import Recommend from "./childComps/Recommend";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import {
  getScrollHeight,
  getScrollTop,
  getWindowHeight,
} from "../../utils/screen";

import {
  getAllGoods,
  getHomeMul,
  getRecommend,
  getGoods,
} from "../../network/home";
import BackTop from "../../components/content/backTop/backTop.vue";

export default {
  name: "Home",
  computed: {
    getCartNum() {
      return this.$store.state.cartList.length;
    },
  },
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
      allGoods: [],
      tabOffstTop: null,
      isTabFixed: false,
      pagenum: 1,
      total: 50,
      isEnd: false,
    };
  },
  components: {
    GoodsList,
    TabControl,
    Recommend,
    NavBar,
    BackTop,
  },
  mounted() {
    window.addEventListener("scroll", this.load);
  },
  destroyed() {
    window.removeEventListener("scroll", this.load, false);
  },
  created() {
    this.reqAllGoods();
    this.getRecommend();
    this.$parent.showNav = true;
    console.log(this.$parent.showNav);
    // this.getGoods("pop");
    // this.getGoods("new");
    // this.getGoods("com");
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
    reqAllGoods() {
      getAllGoods(this.pagenum).then((res) => {
        let gs = res;
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
        this.allGoods = [...this.allGoods, ...gs.data.message.goods];
      });
    },
    //返回顶部
    backClick() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    //下拉加载更多
    load() {
      let vm = this;
      if (getScrollTop() + getWindowHeight() >= getScrollHeight()) {
        console.log("aaaaa");
        if (this.allGoods.length < this.total) {
          //先判断下一页是否有数据
          this.pagenum += 1; //查询条件的页码+1
          this.reqAllGoods(); //拉取接口数据
        } else {
          //到底了
          console.log("没有更多数据了");
          this.isEnd = true;
        }
      }
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
  width: 80px;
  height: 30px;
  line-height: 30px;
  right: 15px;
  bottom: 80px;
  text-align: center;
  border: 1px solid black;
  border-radius: 100px;
}
.isFixed {
  position: fixed;
  top: 44px;
}
.isEnd {
  margin: 0px auto 63px auto;
  width: 250px;
}
.smallCart {
  position: fixed;
  width: 45px;
  height: 45px;
  line-height: 40px;
  right: 30px;
  bottom: 120px;
  background-color: cornflowerblue;
  border: 1px solid black;
  border-radius: 100px;
  text-align: center;
}
</style>
