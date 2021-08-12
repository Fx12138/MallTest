<template>
  <div>
    <div class="topLogin">
      <img :src="userInfo.avatar" alt="" />
      <p>{{ userInfo.username || "您好,请登录!" }}</p>
    </div>
    <div class="items">
      <div
        class="item"
        v-for="item in items"
        :key="item.id"
        @click="itemClick(item.path)"
      >
        {{ item.title }}
      </div>
    </div>
    <router-view></router-view>
    <div class="logoutBuutton" @click="logout">
      <el-button type="danger" round>退出</el-button>
    </div>
  </div>
</template>

<script>
// import ws from "./ws";
import { setCookie, getCookie, delCookie } from "../../utils/cookieUtil";
import { mapGetters } from "vuex";
export default {
  name: "Mine",
  created() {
    // this.dataInit();
    this.$parent.showNav = true;
  },
  computed: {
    // ...mapGetters({
    //   userInfo: "userInfo",
    // }),
  },
  activated() {
    this.dataInit();
  },
  deactivated() {},
  data() {
    return {
      items: [
        {
          id: 0,
          title: "个人信息",
          path: "/pro",
        },
        {
          id: 1,
          title: "修改密码",
        },
      ],
      chartInput: "",
      userInfo: null,
    };
  },
  sockets: {
    connection: function () {
      //与socket.io连接后回调
      console.log("socket connected");
    },
  },
  methods: {
    dataInit() {
      let userInfo = JSON.parse(getCookie("userInfo"));
      this.userInfo = userInfo;
      console.log(this.userInfo);
    },
    logout() {
      delCookie("token");
      delCookie("userInfo");
      // window.sessionStorage.removeItem("token");
      // let userInfo = JSON.parse(getCookie("userInfo"));
      this.$parent.showNav = false;
      this.$router.replace("/login");
    },
    itemClick(path) {
      this.$router.push(path);
      this.$socket.emit("toChart", this.userInfo);
    },
    sendWords() {
      const that = this;
      // ws.send(that.chartInput);
      this.$socket.emit("test", this.chartInput); //触发start
    },
  },
};
</script>

<style scoped>
.topLogin {
  display: flex;
}
.topLogin img {
  width: 80px;
  height: 80px;
  border: 1px solid black;
  border-radius: 50%;
  margin-right: 30px;
}
.topLogin p {
  height: 80px;
  line-height: 80px;
  font-size: 22px;
}

.item {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid burlywood;
}
.logoutBuutton {
  width: 100px;
  height: 100px;
  margin: 20px auto auto;
}
</style>
