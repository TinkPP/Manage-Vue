<template>
  <el-form
    :model="form"
    :rules="rules"
    status-icon
    ref="form"
    label-position="left"
    class="login-form"
  >
    <div class="login-title">系统登录</div>
    <el-form-item
      label="用户名"
      label-width="60px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        auto-complete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="密码"
      label-width="60px"
      prop="password"
      class="password"
    >
      <el-input
        type="password"
        v-model="form.password"
        auto-complete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login-bottom">
      <el-button
        type="primary"
        @click="login"
        class="login-button"
        style="width: 150px"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { userLogin } from "@/api/data";
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        uername: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      userLogin(this.form).then((res) => {
        console.log(res.data.token);
        if (res.data.code == 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  padding: 0 40px;
  background-color: #bdc3c7;
  border-radius: 10px;

  .login-title {
    font-size: 24px;
    text-align: center;
    line-height: 80px;
    margin-bottom: 10px;
  }
  .login-bottom {
    display: flex;
    justify-content: center;
  }
}
</style>