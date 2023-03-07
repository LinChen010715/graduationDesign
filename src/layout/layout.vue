<template>
  <div class="main">
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="menu">
      <template v-for="item in menu" :key="item.key">
        <router-link :to="item.path"
          ><p>{{ item.name }}</p></router-link
        >
      </template>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "homePage",
};
</script>

<script lang="ts" setup>
import menu from "@/router/menu";
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
p:hover {
  color: #333;
}
</style>
