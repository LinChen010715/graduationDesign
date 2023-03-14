<template>
  <div class="login">
    <div class="loginContainer">
      <div class="title">登录</div>
      <loginForm>
        <template #loginAction>
          <el-button type="text">注册</el-button>
          <el-button type="primary">登录</el-button>
        </template>
      </loginForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import loginForm from "./form.vue";
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url(@/assets/previewFix.jpg);
  background-size: 100% 100%;
}
.loginContainer {
  width: 20%;
  padding: 10px;
  position: absolute;
  left: 300px;
  top: 300px;
}

.title {
  font-size: 20px;
  padding: 10px;
  text-align: center;
}
</style>
