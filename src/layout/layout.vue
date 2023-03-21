<template>
  <div class="main">
    <div class="content">
      <div class="top">
        <user-info></user-info>
      </div>
      <div class="viewContainer"><router-view></router-view></div>
    </div>
    <div class="menu">
      <el-menu
        :uniqueOpened="true"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <template v-for="item in menu">
          <template v-if="!item.children">
            <el-menu-item>
              <router-link :to="item.path"
                ><p>{{ item.name }}</p></router-link
              >
            </el-menu-item>
          </template>
          <template v-else>
            <sub-menu :menu-info="item"></sub-menu>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "homePage",
  props: {},
});
</script>

<script lang="ts" setup>
import menu from "@/router/menu";
import SubMenu from "./SubMenu.vue";
import UserInfo from "./UserInfo.vue";
import { userStore } from "./index";
import { onMounted } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router";

const userInfoStore = userStore();
const userName = userInfoStore.userInfo.userName;
const account = userInfoStore.userInfo.account;
const password = userInfoStore.userInfo.password;

function checkLoginStatus() {
  if (
    !userName ||
    !account ||
    !password ||
    userName === "" ||
    account === "" ||
    password === ""
  ) {
    return false;
  }
  return true;
}

onMounted(() => {
  let status = checkLoginStatus();
  if (!status) {
    ElMessage({
      message: "您尚未登录，已为您跳转至登录页",
      type: "warning",
    });
    router.push("/login");
    return;
  }
});

function handleOpen() {}
function handleClose() {}
</script>

<style>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
}
.content {
  width: 88%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.top {
  width: 100%;
  height: 8%;
  background-color: grey;
}
.viewContainer {
  width: 100%;
  height: 92%;
}
.menu {
  width: 12%;
  height: 100%;
  background-color: grey;
}

p {
  color: white;
}
</style>
