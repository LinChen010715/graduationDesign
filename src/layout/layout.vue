<template>
  <div class="main">
    <div class="content">
      <router-view></router-view>
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
  border: 1px solid black;
}
.content {
  width: 90%;
  height: 100%;
}
.menu {
  width: 10%;
  height: 100%;
  background-color: grey;
}

p {
  color: white;
}
</style>
