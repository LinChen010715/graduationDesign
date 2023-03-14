<template>
  <el-form :model="loginForm" label-width="60px">
    <el-form-item label="用户名:">
      <el-input
        v-model="loginForm.userName"
        placeholder="请输入用户名"
        clearable
      />
    </el-form-item>
    <el-form-item label="密码:">
      <el-input
        v-model="loginForm.password"
        placeholder="请输入密码"
        clearable
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

const loginForm = ref({
  userName: "",
  password: "",
});
</script>

<style scoped>
.loginButton {
  display: flex;
  width: 80%;
  justify-content: space-around;
}
</style>
