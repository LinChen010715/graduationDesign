import { ZoomOut } from '@element-plus/icons-vue/dist/types';

<template>
  <div>
    <span class="full-screen" :title="title" @click="toggle">
      <el-icon size="20" color="white" class="full-screen__button">
        <ZoomIn v-if="!isFullscreen" />
        <!-- TODO: 缩小图标替换 -->
        <ZoomOut v-else />
      </el-icon>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useFullscreen } from "@vueuse/core";
import { computed } from "vue";
import { ZoomIn, ZoomOut } from "@element-plus/icons-vue";

const { toggle, isFullscreen } = useFullscreen();
const title = computed<string>(() => {
  return isFullscreen.value ? "缩小" : "放大";
});
</script>

<style lang="scss" scoped>
.full-screen {
  cursor: pointer;
  &__button:hover {
    color: var(--el-color-primary);
  }
}
</style>
