<template>
  <div class="profile-box">
    <div class="user-list">
      <h4 v-if="newHere">{{ newUser.username }}用户加入</h4>
      <h3>用户列表</h3>
      <div v-for="user in userList" :key="user.id">{{ user.username }}</div>
    </div>
    <div class="middle-box">
      <div class="chart-box">
        <div
          :class="chart.username == userInfo.username ? 'self' : 'other'"
          v-for="(chart, index) in chartList"
          :key="index"
        >
          <!-- <div class="photo">{{ chart.username }}说:</div> -->

          <img
            class="photo"
            src=" http://img.wanyx.com/softImg/soft/1650_s.jpg "
            alt="显示网络上的图片"
          />
          <p>{{ chart.mes }}</p>
        </div>
      </div>
      <div class="writeMes">
        <el-input v-model="chartInput" placeholder="请输入内容"></el-input>
        <el-button
          type="primary"
          @click="sendWords"
          @keyup.enter="enterSendWords"
          >发送</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { setCookie, getCookie, delCookie } from "../../utils/cookieUtil";
export default {
  data() {
    return {
      userInfo: null,
      content: null,
      userList: [],
      newHere: false,
      chartInput: null,
      chartList: [],
      newUser: {
        username: null,
      },
    };
  },
  methods: {
    init() {},
    dataInit() {
      let userInfo = JSON.parse(getCookie("userInfo"));
      this.userInfo = userInfo;
      this.userList.push(this.userInfo);
    },
    sendWords() {
      let mes = this.chartInput;
      let mesPack = {
        username: this.userInfo.username,
        mes: mes,
      };
      this.chartList.push(mesPack);
      this.chartInput = null;
      this.$socket.emit("send", mesPack);
    },
    enterSendWords() {
      document.onkeydown = (e) => {
        //13表示回车键，baseURI是当前页面的地址，为了更严谨，也可以加别的，可以打印e看一下
        if (e.keyCode === 13 && e.target.baseURI.match("/pro")) {
          this.sendWords();
        }
      };
    },
  },
  sockets: {
    inchart: function (data) {
      console.log("inchart被触发");

      let oldUserList = this.userList;
      var isContain = oldUserList.find(
        (user) => user.username == data.username
      );
      if (isContain) {
        console.log("用户已存在");
      } else {
        this.userList.push(data);
        this.newHere = true;
        this.newUser.username = data.username;
        setTimeout(() => {
          this.newHere = false;
        }, 3000);
      }
    },
    send: function (data) {
      this.chartList.push(data);
    },
  },
  components: {},
  created() {
    this.dataInit();
    this.enterSendWords();
  },
  mounted() {
    this.init();
  },
};
</script>
<style>
.profile-box {
  display: flex;
  width: 100%;
}

.user-list {
  width: 30%;
  height: 500px;
  border: 1px solid black;
}
.middle-box {
  width: 70%;
  height: 500px;
  border: 1px solid black;
}
.chart-box {
  position: relative;
  width: 100%;
  height: 70%;
  border: 1px solid green;
}
.self {
  height: 70px;
  width: 600px;
  float: right;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  /* border: 1px solid gray; */
}
.other {
  height: 70px;
  width: 600px;
  /* float: left; */
  display: flex;
  align-items: center;
  /* border: 1px solid yellow; */
}
.photo {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border: 2px solid black;
  border-radius: 10px;
}
.writeMes {
  width: 100%;
  height: 30%;
  border: 1px solid red;
}
</style>