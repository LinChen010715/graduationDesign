<template>
  <div class="main">
    <div class="menu">
      <h2>{{ title }}</h2>
      <el-menu
        router
        unique-opened
        class="el-menu"
        @open="handleOpen"
        @close="handleClose"
        :default-active="getDefaultActive()"
        background-color="#rgb(200, 200, 255)"
        text-color="#fff"
        active-text-color="rgb(200, 200, 255)"
      >
        <template v-for="item in menu" :key="item">
          <template v-if="!item.children">
            <el-menu-item :index="item.path">
              <router-link :to="item.path"
                ><p>{{ item.name }}</p></router-link
              >
            </el-menu-item>
          </template>
          <template v-else :index="item.path">
            <sub-menu :menu-info="item"></sub-menu>
          </template>
        </template>
      </el-menu>
    </div>
    <div class="content">
      <div class="top">
        <user-info></user-info>
      </div>
      <div class="viewContainer"><router-view></router-view></div>
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
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router";
import { useRoute } from "vue-router";

const title = ref(import.meta.env.VITE_APP_NAME as string);

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
  // let status = checkLoginStatus();
  // if (!status) {
  //   ElMessage({
  //     message: "您尚未登录，已为您跳转至登录页",
  //     type: "warning",
  //   });
  //   router.push("/login");
  //   return;
  // }
});

function handleOpen() {}
function handleClose() {}

const route = useRoute();

/**
 * 获取当前展开路由菜单index
 */
function getDefaultActive(): string {
  const matchedRoutes = [...route.matched];
  let currentRouteMetaHidden = route.meta.hidden;
  let currentRoutePath = route.path;

  // 向route.matched数组中找到hidden不为true的路由（代表其在侧边栏中显示）
  while (currentRouteMetaHidden && matchedRoutes.length > 0) {
    const matchRoute = matchedRoutes.pop();
    currentRouteMetaHidden = matchRoute?.meta.hidden;
    currentRoutePath = matchRoute?.path || "";
  }

  return currentRoutePath;
}
</script>

<style lang="scss" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  background-color: whitesmoke;
}

h2 {
  color: #000;
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
  border-bottom: 1px solid #333;
  background-color: #fff;
}

.viewContainer {
  width: 97%;
  height: 92%;
  padding: 20px;
}

.menu {
  width: 12%;
  height: 100%;
  background-color: rgb(200, 200, 255);
}

.el-menu .el-menu-item:hover {
  background-color: var(--el-menu-hover-bg-color);
}

.el-menu .el-menu-item p {
  color: #fff;
}
</style>
