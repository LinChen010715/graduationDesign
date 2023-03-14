<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
  <div class="viewContainer"><router-view></router-view></div>
</template>

<style>
html,
body {
  background: #f0f2f5;
  /*a-modal 会使 body 宽度缩小*/
  width: 100% !important;
  height: 100%;
  overflow: hidden;
  margin: 0;
  box-sizing: border-box;
}
</style>
