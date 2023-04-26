<template>
  <div class="login">
    <div class="loginContainer">
      <div class="title">登录</div>
      <loginForm ref="loginFormRef">
        <template #loginAction>
          <el-button type="text" @click="openRegisterDialog">注册</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </template>
      </loginForm>
      <register ref="registerRef">
        <template #registerAction>
          <el-button type="text" @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </template>
        <template #registerLogin>
          <el-button type="text" @click="loginCancel">稍后再说</el-button>
          <el-button type="success" @click="loginNow">立即登录</el-button>
        </template>
      </register>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import loginForm from "./form.vue";
import request from "@/utils/request";
import router from "@/router";
import { userStore } from "@/layout/index";
import register from "./register.vue";
import { ElMessage } from "element-plus";

const userInfoStore = userStore();

const loginFormRef = ref();

async function login() {
  const validate = loginFormRef.value.validate();
  if (!validate) {
    return;
  }

  const res = await request.post("/api/v1/user/manage/login", {
    account: loginFormRef.value.loginForm.account,
    password: loginFormRef.value.loginForm.password,
  });

  if (!res) {
    return false;
  }
  if (!res.data.data) {
    ElMessage({
      message: res.data.message,
      type: "error",
    });
    return false;
  }
  ElMessage({
    message: "登录成功，欢迎来到小世界",
    type: "success",
  });
  let userName = res.data.data.userName;
  let account = res.data.data.account;
  let password = loginFormRef.value.loginForm.password;

  userInfoStore.setUserInfo({
    userName: userName,
    account: account,
    password: password,
  });

  router.push("./");
}

const registerRef = ref();

function openRegisterDialog() {
  registerRef.value.open("注册");
}

function cancel() {
  let registerForm = registerRef.value.registerForm;
  registerForm.account = "";
  registerForm.password = "";
  registerForm.rePassword = "";
  registerRef.value.registerVisible = false;
}

const registerAccount = ref();
const registerPassword = ref();

function submit() {
  const valid = registerRef.value.valid();
  if (!valid) {
    return;
  }

  let registerForm = registerRef.value.registerForm;
  registerAccount.value = registerForm.account;
  registerPassword.value = registerForm.password;

  cancel();

  ElMessage({
    message: "注册成功",
    type: "success",
  });
  registerRef.value.openLogin("是否立即登录？");
}

function loginCancel() {
  registerRef.value.registerLoginVisible = false;
}

function loginNow() {
  registerRef.value.registerLoginVisible = false;
  loginFormRef.value.loginForm.account = registerAccount.value;
  loginFormRef.value.loginForm.password = registerPassword.value;
  login();
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url(@/assets/back.jpg);
  background-size: 100% 100%;
}
.loginContainer {
  width: 20%;
  padding: 10px;
  position: absolute;
  right: 50px;
  top: 400px;
  border: 1px solid #fff;
}

.title {
  font-size: 20px;
  padding: 10px;
  text-align: center;
  color: #fff;
}
</style>
