<template>
    <el-popover placement="bottom" :width="180" trigger="click">
        <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
        >
            列展示
        </el-checkbox>
        <el-scrollbar max-height="300px">
            <el-checkbox-group v-model="checkedColumns" @change="handleCheckedColumnsChange">
                <el-checkbox v-for="city in columns" :key="city.label" :label="city.label">
                    {{ city.label }}
                </el-checkbox>
            </el-checkbox-group>
        </el-scrollbar>
        <template #reference>
            <el-button type="text">
                <el-icon :size="18" class="icon"><setting /></el-icon>
            </el-button>
            <!--            <el-tooltip class="box-item" effect="dark" content="列展示" placement="top">-->
            <!--                -->
            <!--            </el-tooltip>-->
        </template>
    </el-popover>
</template>

<script lang="ts" setup>
import { Setting } from '@element-plus/icons';
import { XTableColumn } from '@/interface/table';
import { onMounted, ref } from 'vue';

const props = withDefaults(defineProps<{ columns: XTableColumn[] }>(), {
    columns: () => [],
});

onMounted(() => {
    checkedColumns.value = props.columns.map((item) => {
        return item.label;
    });
});

const emits = defineEmits<{ (e: 'updateColumns', value: XTableColumn[]): void }>();
// 全部选择状态
const checkAll = ref(true);
// 中间状态
const isIndeterminate = ref(false);
// 已选择表头
const checkedColumns = ref<string[]>([]);

/**
 * 处理全选事件
 * @param val
 */
const handleCheckAllChange = (val: boolean) => {
    checkedColumns.value = val
        ? props.columns.map((item) => {
              return item.label;
          })
        : [];
    isIndeterminate.value = false;
    handleEmitColumn();
};

/**
 * 处理选择事件
 * @param value
 */
const handleCheckedColumnsChange = (value: XTableColumn[]) => {
    checkAll.value = value.length === props.columns.length;
    isIndeterminate.value = value.length > 0 && value.length < props.columns.length;
    handleEmitColumn();
};

/**
 * 回调数据处理
 */
function handleEmitColumn() {
    let checkedColumn: XTableColumn[] = [];
    props.columns.forEach((item) => {
        if (checkedColumns.value.includes(item.label)) {
            checkedColumn.push(item);
        }
    });
    emits('updateColumns', checkedColumn);
}
</script>

<style lang="scss" scoped>
el-icon {
    margin-left: 20px;
}
</style>
