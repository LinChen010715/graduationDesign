<template>
  <div>
    {{ title }}<br />
    {{ subTitle }}<br />
    <p id="sentence">我在子组件中，即将被修改颜色</p>
    <!-- <el-button @click="changeColor">子组件按钮一:点击我修改字体颜色</el-button> -->
    <el-button @click="change">子组件按钮二:点击我修改副标题</el-button
    ><br /><br />
    <el-button @click="changeSize">子组件按钮三:点击我修改字体大小</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
});

const emit = defineEmits(["changeSub", "changeSize"]);

const subTitle = ref("子组件中起的副标题");

function changeColor(color: string) {
  const word: any = document.getElementById("sentence");
  word.style.color = color;
  alert("现在的字体颜色:" + color);
}

function change() {
  emit("changeSub");
}

function changeSize() {
  emit("changeSize", 30);
}

defineExpose({
  subTitle,
  changeColor,
});
</script>

<style scoped>
#sentence {
  color: blue;
}
</style>
