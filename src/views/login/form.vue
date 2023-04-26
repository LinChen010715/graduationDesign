<template>
  <el-form
    ref="formRef"
    :model="loginForm"
    label-width="70px"
    :rules="rules"
    :hide-required-asterisk="true"
  >
    <el-form-item label="用户名:" prop="account">
      <el-input
        v-model="loginForm.account"
        placeholder="请输入用户名"
        clearable
      />
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input
        v-model="loginForm.password"
        placeholder="请输入密码"
        clearable
        show-password
        type="password"
      />
    </el-form-item>
    <el-form-item>
      <template #default>
        <div class="loginButton">
          <slot name="loginAction"></slot>
        </div>
      </template>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

const formRef = ref();

const loginForm = ref({
  account: "",
  password: "",
});

const rules = ref({
  account: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});

function validate() {
  if (!loginForm.value.account || loginForm.value.account === "") {
    ElMessage({
      message: "用户名不能为空",
      type: "warning",
    });
    return false;
  } else if (!loginForm.value.password || loginForm.value.password === "") {
    ElMessage({
      message: "密码不能为空",
      type: "warning",
    });
    return false;
  }
  return true;
}

defineExpose({
  loginForm,
  validate,
});
</script>

<style scoped>
.loginButton {
  display: flex;
  width: 80%;
  justify-content: space-around;
}

::v-deep(.el-form-item__label) {
  color: #fff;
}
</style>
