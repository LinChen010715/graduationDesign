<template>
  <div>
    <CanvasSign ref="canvasSign" height="400" width="600" line-width="1">
      <el-button type="primary">清除</el-button>
    </CanvasSign>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import CanvasSign from "vue-canvas-sign";

const canvasSign = ref<typeof CanvasSign>();
</script>
