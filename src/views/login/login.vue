<template>
  <div class="login-box">
    <div class="main-login">
      <div class="login-form">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="username">
            <el-form-item label="账号" prop="username">
              <el-input
                v-model="ruleForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>
          <div class="password">
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="login-botton">
        <el-button type="primary" @click="login('ruleForm')">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { loginByUsername } from "../../network/login";
import { setCookie } from "../../utils/cookieUtil";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不得少于6字符"));
      }
      callback();
    };
    return {
      userName: null,
      password: null,
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        // age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginByUsername(this.ruleForm).then((res) => {
            if (res.data.code == 200) {
              alert("submit!");
              setCookie("token", "zzyn", 3600); //cookie过期时间为一个小时
              setCookie("userInfo", JSON.stringify(res.data.data), 3600);
              //用户信息存入vuex
              this.$store.commit("setUserInfo", res.data.data);
              this.$router.replace("/home");
              this.$parent.showNav = true;
            } else {
              alert(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  components: {},
  created() {
    this.$parent.showNav = false;
  },
  mounted() {},
};
</script>
<style>
.body {
  width: 100%;
  height: 100%;
}
.login-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: greenyellow;
  background-image: url("../../assets/img/tabbar/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 45%;
  height: 40%;
  margin-left: -400px;
  margin-top: -250px;
  /* border: 1px solid green; */
  /* display: flex;
  flex-wrap: wrap; */
}
.login-form {
  margin: 180px auto auto auto;
  width: 65%;
  height: 50%;
}
.password {
  margin-top: 40px;
}
.login-botton {
  width: 100px;
  margin: 0 auto;
}
</style>