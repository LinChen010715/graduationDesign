<template>
  <div class="container">
    <span>{{ name }},欢迎您</span>
    <div>
      <el-button type="text" @click="openChangePasswordDialog"
        >修改密码</el-button
      >
      <el-button type="text" @click="loginOut">退出登录</el-button>
    </div>
  </div>

  <change-password ref="changePasswordRef">
    <template #changePasswordAction>
      <el-button type="text" @click="cancelChange">取消</el-button>
      <el-button type="primary" @click="submitChange">提交</el-button>
    </template>
    <template #changeLogin>
      <el-button type="primary" @click="changeNow">立即跳转</el-button>
    </template>
  </change-password>
</template>

<script lang="ts" setup>
import router from "@/router";
import request from "@/utils/request";
import { userStore } from "./index";
import ChangePassword from "./ChangePassword.vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const userInfoStore = userStore();

const name =
  userInfoStore.userInfo.userName !== ""
    ? userInfoStore.userInfo.userName
    : "超级无敌嘎嘎牛*赛亚人";

async function loginOut() {
  const res = await request.post("/system/user/manage/logout");
  localStorage.clear();
  router.push("./login");
}

const changePasswordRef = ref();

function openChangePasswordDialog() {
  changePasswordRef.value.openChange("修改密码");
}

function cancelChange() {
  changePasswordRef.value.changePasswordVisible = false;
  let changePasswordForm = changePasswordRef.value.changePasswordForm;
  changePasswordForm.oldPassword = "";
  changePasswordForm.password = "";
  changePasswordForm.rePassword = "";
}

function changeNow() {
  changePasswordRef.value.changeLoginVisible = false;
  cancelChange();
  localStorage.clear();
  router.push("/login");
}

function submitChange() {
  let changeValid = changePasswordRef.value.changeValid();
  if (!changeValid) {
    return;
  }
  ElMessage({
    message: "修改成功，即将为你跳转至登录页",
    type: "success",
  });
  changePasswordRef.value.openChangeLogin("跳转");
  changePasswordRef.value.countSecond();
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
span {
  color: white;
  font-size: 20px;
}

:deep(.el-button--text) {
  color: white;
}
</style>
