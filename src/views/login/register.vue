<template>
  <el-dialog v-model="registerVisible" :title="title" width="30%">
    <el-form
      ref="registerFormRef"
      :model="registerForm"
      label-width="130px"
      :rules="rules"
    >
      <el-form-item label="请输入用户名:" prop="account">
        <el-input
          v-model="registerForm.account"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item>
      <el-form-item label="请输入密码:" prop="password">
        <el-input
          v-model="registerForm.password"
          placeholder="请输入密码"
          clearable
          show-password
          type="password"
        />
      </el-form-item>
      <el-form-item label="请再次输入密码:" prop="rePassword">
        <el-input
          v-model="registerForm.rePassword"
          placeholder="请再次输入密码"
          clearable
          show-password
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <template #default>
          <div class="registerButton">
            <slot name="registerAction"></slot>
          </div>
        </template>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="registerLoginVisible" :title="loginTitle" width="30%">
    <template #footer>
      <div class="registerLoginButton">
        <slot name="registerLogin"></slot>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";

const registerVisible = ref(false);

const title = ref();

function open(caption: string) {
  registerVisible.value = true;
  title.value = caption;
}

const registerFormRef = ref();

const registerForm = ref({
  account: "",
  password: "",
  rePassword: "",
});

const rules = ref({
  account: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  rePassword: [{ required: true, message: "请再次输入密码", trigger: "blur" }],
});

function valid() {
  if (!registerForm.value.account || registerForm.value.account === "") {
    ElMessage({
      message: "用户名不能为空",
      type: "warning",
    });
    return false;
  } else if (
    !registerForm.value.password ||
    registerForm.value.password === ""
  ) {
    ElMessage({
      message: "密码不能为空",
      type: "warning",
    });
    return false;
  } else if (
    !registerForm.value.rePassword ||
    registerForm.value.rePassword === ""
  ) {
    ElMessage({
      message: "请再次输入密码",
      type: "warning",
    });
    return false;
  }
  if (registerForm.value.password !== registerForm.value.rePassword) {
    ElMessage({
      message: "两次密码输入不一致",
      type: "warning",
    });
    return false;
  }
  return true;
}

const registerLoginVisible = ref(false);

const loginTitle = ref();

function openLogin(loginCaption: string) {
  registerLoginVisible.value = true;
  loginTitle.value = loginCaption;
}

defineExpose({
  open,
  valid,
  registerVisible,
  registerForm,
  openLogin,
  registerLoginVisible,
});
</script>

<style scoped>
.registerButton {
  margin-top: 10px;
  display: flex;
  width: 70%;
  justify-content: space-around;
}

.registerLoginButton {
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>
