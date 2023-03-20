<template>
  <el-dialog v-model="changePasswordVisible" :title="title" width="30%">
    <el-form
      ref="changePasswordFormRef"
      :model="changePasswordForm"
      label-width="130px"
      :rules="rules"
    >
      <el-form-item label="请输入用户名:" prop="account">
        <el-input
          v-model="changePasswordForm.account"
          placeholder="请输入用户名"
          disabled
        />
      </el-form-item>
      <el-form-item label="请输入原密码:" prop="oldPassword">
        <el-input
          v-model="changePasswordForm.oldPassword"
          placeholder="请输入原密码"
          clearable
          show-password
          type="password"
        />
      </el-form-item>
      <el-form-item label="请输入新密码:" prop="password">
        <el-input
          v-model="changePasswordForm.password"
          placeholder="请输入新密码"
          clearable
          show-password
          type="password"
        />
      </el-form-item>
      <el-form-item label="请再次输入密码:" prop="rePassword">
        <el-input
          v-model="changePasswordForm.rePassword"
          placeholder="请再次输入密码"
          clearable
          show-password
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <template #default>
          <div class="changePasswordButton">
            <slot name="changePasswordAction"></slot>
          </div>
        </template>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="changeLoginVisible" :title="loginTitle" width="30%">
    <span>还有{{ time }}秒为您跳转至登录页，您也可以选择立即跳转</span>
    <template #footer>
      <div class="changeLoginButton">
        <slot name="changeLogin"></slot>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { userStore } from "./index";

const changePasswordVisible = ref(false);

const changePasswordFormRef = ref();

const title = ref();
const rules = ref({
  account: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  oldPassword: [{ required: true, message: "原密码不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  rePassword: [{ required: true, message: "请再次输入密码", trigger: "blur" }],
});

const changePasswordForm = ref({
  account: "",
  oldPassword: "",
  password: "",
  rePassword: "",
});

function openChange(changeTitle: string) {
  changePasswordVisible.value = true;
  title.value = changeTitle;
}

const userInfoStore = userStore();

function changeValid() {
  if (changePasswordForm.value.account === "请先登录账号") {
    ElMessage({
      message: "您还未登录账号，请先登录账号",
      type: "error",
    });
    return false;
  } else if (
    !changePasswordForm.value.oldPassword ||
    changePasswordForm.value.oldPassword === ""
  ) {
    ElMessage({
      message: "请输入原密码",
      type: "error",
    });
    return false;
  } else if (
    !changePasswordForm.value.password ||
    changePasswordForm.value.password === ""
  ) {
    ElMessage({
      message: "请输入新密码",
      type: "error",
    });
    return false;
  } else if (
    !changePasswordForm.value.rePassword ||
    changePasswordForm.value.rePassword === ""
  ) {
    ElMessage({
      message: "请再次输入新密码",
      type: "error",
    });
    return false;
  } else if (
    changePasswordForm.value.oldPassword !== userInfoStore.userInfo.password
  ) {
    ElMessage({
      message: "原密码错误",
      type: "error",
    });
    return false;
  } else if (
    changePasswordForm.value.password !== changePasswordForm.value.rePassword
  ) {
    ElMessage({
      message: "两次密码输入不一致",
      type: "error",
    });
    return false;
  } else if (
    changePasswordForm.value.password === userInfoStore.userInfo.password
  ) {
    ElMessage({
      message: "新密码不能与旧密码一致",
      type: "error",
    });
    return false;
  }
  return true;
}

const changeLoginVisible = ref(false);

const loginTitle = ref();

function openChangeLogin(changeLoginTitle: string) {
  changeLoginVisible.value = true;
  loginTitle.value = changeLoginTitle;
}

const time = ref<number>(3);

function countSecond() {
  let second = time.value;
  second -= 1;
  time.value = second;
  let timer = setInterval(() => {
    //创建定时器
    if (time.value === 0) {
      clearInterval(timer); //关闭定时器
      localStorage.clear(); //清空本地存储内的用户信息
      router.push("/login"); //路由跳转
    } else {
      second = time.value;
      second -= 1;
      time.value = second;
    }
  }, 1000);
}

onMounted(() => {
  const accountInfo =
    userInfoStore.userInfo.account !== ""
      ? userInfoStore.userInfo.account
      : "请先登录账号";
  changePasswordForm.value.account = accountInfo;
});

defineExpose({
  changePasswordVisible,
  changePasswordForm,
  openChange,
  changeValid,
  changeLoginVisible,
  openChangeLogin,
  countSecond,
});
</script>

<style scoped>
.changePasswordButton {
  margin-top: 10px;
  display: flex;
  width: 70%;
  justify-content: space-around;
}

.changeLoginButton {
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>
