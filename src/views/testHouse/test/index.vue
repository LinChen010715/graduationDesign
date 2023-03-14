<template>
  <el-tabs v-model="test" class="tabContainer" @tab-click="handleClick">
    <el-tab-pane label="标签页1" name="first">
      <Tab1></Tab1>
    </el-tab-pane>
    <el-tab-pane label="标签页2" name="second">
      <Tab2></Tab2>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
export default {
  name: "test",
};
</script>

<script lang="ts" setup>
import Tab1 from "./tab1/tab1.vue";
import Tab2 from "./tab2/tab2.vue";
import type { TabsPaneContext } from "element-plus";
import { ref } from "vue";
const test = ref("first");
</script>
