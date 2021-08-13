<template>
  <div class="profile-box">
    <div class="user-list">
      <h4 v-if="inOut">{{ inOutMes }}</h4>
      <h3>用户列表</h3>
      <div v-for="user in userList" :key="user.id">{{ user.username }}</div>
    </div>
    <div class="middle-box">
      <div class="chart-box" ref="chart-box" id="persional-box">
        <div
          :class="chart.user_id == userInfo.user_id ? 'self' : 'other'"
          v-for="(chart, index) in chartList"
          :key="index"
        >
          <img class="photo" :src="chart.avatar" alt="" />
          <p>{{ chart.content }}</p>
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
import { getAllMessage, saveMes } from "../../network/chart";
import { getUserById } from "../../network/login";
export default {
  data() {
    return {
      userInfo: null,
      content: null,
      userList: [],
      inOut: false,
      chartInput: null,
      chartList: [],
      inOutMes: null,
    };
  },
  watch: {},
  activated() {
    let userInfo = JSON.parse(getCookie("userInfo"));
    this.userInfo = userInfo;
    this.$socket.emit("toChart", this.userInfo);
  },
  deactivated() {
    console.log(this.userInfo.username + "退出聊天室");
    this.$socket.emit("outChart", this.userInfo);
    console.log(this.userList);
  },
  updated() {
    this.toLastedChart();
  },
  methods: {
    init() {},
    dataInit() {
      let userInfo = JSON.parse(getCookie("userInfo"));
      this.userInfo = userInfo;
      this.userList.push(this.userInfo);

      //获取聊天记录
      getAllMessage().then((res) => {
        this.chartList.push(...res.data);
      });
    },
    sendWords() {
      let content = this.chartInput;
      let mesPack = {
        ...this.userInfo,
        content: content,
      };
      this.chartInput = null;

      this.$socket.emit("send", mesPack);

      //保存聊天记录到数据库
      //日期格式化方法
      Date.prototype.format = function (format) {
        var args = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
          S: this.getMilliseconds(),
        };
        if (/(y+)/.test(format))
          format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var i in args) {
          var n = args[i];
          if (new RegExp("(" + i + ")").test(format))
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length)
            );
        }
        return format;
      };
      saveMes(
        this.userInfo.user_id,
        content,
        new Date().format("yyyy-MM-dd hh:mm:ss")
      );
    },
    //回车发送消息事件
    enterSendWords() {
      document.onkeydown = (e) => {
        //13表示回车键，baseURI是当前页面的地址，为了更严谨，也可以加别的，可以打印e看一下
        if (e.keyCode === 13 && e.target.baseURI.match("/chart")) {
          this.sendWords();
        }
      };
    },

    //聊天框滚动到底部
    toLastedChart() {
      let ele = document.getElementById("persional-box");
      ele.scrollTop = ele.scrollHeight;
    },
  },
  sockets: {
    //用户进入聊天室
    inchart: function (userList) {
      this.inOut = true;
      let newUsername = userList[userList.length - 1].username;
      this.inOutMes = newUsername + "用户加入了聊天室";
      setTimeout(() => {
        this.inOut = false;
      }, 3000);
      this.userList.splice(0, this.userList.length, ...userList);
    },
    //用户退出聊天室
    outChart(data) {
      this.userList.map((user, index) => {
        if (user.username == data.username) {
          this.userList.splice(index, 1);
        }
      });
      let outUsername = data.username;
      this.inOutMes = outUsername + "用户离开了聊天室";
      this.inOut = true;
      setTimeout(() => {
        this.inOut = false;
      }, 3000);

      console.log(this.userList);
    },
    //用户发送消息
    send: function (data) {
      // console.log(data);
      this.chartList.push(data);
    },
  },
  components: {},
  created() {
    this.$parent.showNav = true;
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
  /* position: relative; */
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 70%;
  border: 1px solid green;
}
.self {
  height: 70px;
  width: 100%;
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