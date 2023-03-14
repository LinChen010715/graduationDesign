<template>
  <firstTabChild
    ref="childRef"
    :title="title"
    @changeSub="changeSubTitle"
    @changeSize="changeSize"
  ></firstTabChild
  ><br />
  <!-- <el-button type="primary" @click="changeSubTitle"
    >父组件按钮一:点击我修改副标题</el-button
  ><br /><br /> -->
  <el-button type="primary" @click="changeChildColor"
    >父组件按钮二:点击我修改颜色</el-button
  ><br /><br />
  <div
    :style="{
      fontSize: textFontSize + 'px',
    }"
  >
    来，用子组件把我字体大小改了
  </div>
</template>

<script setup lang="ts">
import firstTabChild from "./FirstTabChild.vue";
import { ref } from "vue";

const childRef = ref();

const title = ref("父组件中给子组件定义的标题");

function changeSubTitle() {
  childRef.value.subTitle = "父组件把副标题修改了";
  alert("副标题被我改掉咯");
}

function changeChildColor() {
  childRef.value.changeColor("red");
}

const textFontSize = ref<number>(10);

function changeSize(size: number) {
  textFontSize.value = size;
  alert("原来的字体大小:" + textFontSize.value + "px");
  textFontSize.value += size;
  alert("现在的字体大小:" + textFontSize.value + "px");
}
</script>
