<template>
  <el-sub-menu>
    <template #title>{{ menuInfo.name }}</template>

    <template v-for="item in menuInfo.children" :key="item.path">
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
  </el-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style scoped>
p {
  color: #fff;
}
</style>
