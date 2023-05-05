<template>
  <div class="container">
    <span>尊敬的{{ name }},欢迎您</span>
    <div class="operate">
      <div class="fullScreen"><full-screen></full-screen></div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :icon="UserFilled" :size="25" />
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="Setting" @click="openChangePasswordDialog"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item icon="SwitchButton" @click="loginOut"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
import FullScreen from "./FullScreen.vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { UserFilled, ArrowDown } from "@element-plus/icons-vue";

const userInfoStore = userStore();

const name =
  userInfoStore.userInfo.userName !== ""
    ? userInfoStore.userInfo.userName
    : "游客";

async function loginOut() {
  const res = await request.post("/user/logout");
  if (!res) {
    return;
  }
  ElMessage({
    message: "已退出",
    type: "success",
  });
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
  color: rgb(200, 200, 255);
  font-size: 20px;
}

.operate {
  display: flex;
  padding: 5px;
}

.fullScreen {
  margin-right: 20px;
}
</style>
