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
          <el-button type="primary" @click="login('ruleForm')">提交</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
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
        username: [
          { validator: validateUsername, trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        // age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          // 函数中的参数分别为 cookie 的名称、值以及过期天数
          // function setCookie(c_name, value, expiredays) {
          //   var exdate = new Date();
          //   exdate.setDate(exdate.getDate() + expiredays);
          //   document.cookie =
          //     c_name +
          //     "=" +
          //     escape(value) +
          //     (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
          // }
          // setCookie("name", "zzyn", 1); // cookie过期时间为1天。

          // 如果要设置过期时间以秒为单位
          function setCookie(c_name, value, expireseconds) {
            var exdate = new Date();
            exdate.setTime(exdate.getTime() + expireseconds * 1000);
            document.cookie =
              c_name +
              "=" +
              escape(value) +
              (expireseconds == null ? "" : ";expires=" + exdate.toGMTString());
          }
          setCookie("token", "zzyn", 3600); //cookie过期时间为一个小时

          // window.sessionStorage.setItem("token", "已登录");
          this.$router.replace("/home");
          this.$parent.showNav = true;
        } else {
          alert("shibai!");
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
  width: 800px;
  height: 500px;
  margin-left: -400px;
  margin-top: -250px;
  border: 1px solid green;
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
  margin: 50px auto auto auto;
}
</style>