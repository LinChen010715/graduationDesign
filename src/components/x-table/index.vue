<template>
  <el-card class="x-table" shadow="hover">
    <div v-loading="loading" class="x-table__wrap">
      <div class="x-table__header">
        <h3 class="x-table__title">{{ title }}</h3>
        <div class="x-table__operation">
          <slot name="operation" :checked-rows="checkedRows"></slot>
        </div>
      </div>
      <el-empty v-if="isEmpty"></el-empty>
      <div v-else class="x-table__table-wrap">
        <!-- 表格 -->
        <el-table
          ref="tableRef"
          border
          :data="tableData"
          v-bind="elProps"
          @selection-change="handleSelectionChange"
        >
          <slot name="default"></slot>
        </el-table>
      </div>
      <!-- 分页· -->
      <el-pagination
        v-model:current-page="paginationData.currentPage"
        v-model:page-size="paginationData.pageSize"
        class="x-table__pagination"
        background
        :page-sizes="paginationData.pageSizes"
        layout="sizes, prev, pager, next, total"
        :total="paginationData.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script setup lang="ts">
// TODO: 持续优化
import {
  CustomPageTableForm,
  ElPaginationData,
  XTableAPI,
  XTableOptions,
} from "@/interface/table";
import { ElTableElement } from "@/interface/table";
import { computed, ref, reactive, watch, nextTick, onMounted } from "vue";
import {
  difference,
  differenceBy,
  differenceWith,
  intersectionBy,
  intersectionWith,
} from "lodash-es";

// props
const props = withDefaults(
  defineProps<{
    /**
     * 加载数据api
     */
    api?: XTableAPI;
    /**
     * 表格配置
     */
    tableOptions?: XTableOptions;
    /**
     * 标题
     */
    title?: string;
    /**
     * 表格其他属性
     */
    elProps?: any;

    /**
     * 行key值
     */
    rowKey: string;
  }>(),
  {
    api: () => {
      return {
        get: () => Promise.resolve({}),
        del: () => Promise.resolve(true),
      };
    },
    tableOptions: () => {
      return {
        selectionable: false,
        queryCurrentPageKey: "page",
        queryPageSizeKey: "limit",
        returnTotalKey: "total",
        returnRecordKey: "records",
        returnCurrentPageKey: "current",
      };
    },
    title: "数据列表",
    elProps: {},
    rowKey: "id",
  }
);

/**
 * table ref
 */
const tableRef = ref<ElTableElement | null>(null);

/**
 * loading
 */
const loading = ref<boolean>(false);

/**
 * 表格数据
 */
const tableData = ref<[]>([]);

/**
 * 分页数据
 */
const paginationData = ref<ElPaginationData>({
  total: 0,
  currentPage: 1,
  pageSizes: [10, 20, 50, 100],
  pageSize: 10,
});

/**
 * 监听data数据变化，调用doLayout函数，解决从隐藏到展示时el-table布局错位问题
 */
watch(
  () => tableData.value,
  () => {
    nextTick(() => {
      tableRef.value?.doLayout();
    });
  }
);

/**
 * 数据是否为空
 */
const isEmpty = computed<boolean>(() => {
  return tableData.value.length === 0;
});

/**
 * 搜索条件
 * @description 用户保存表格上次获取数据的查询条件
 */
const searchData = ref<Record<string, unknown>>({});

/**
 * 加载表格数据
 */
async function loadData(queryData?: CustomPageTableForm): Promise<boolean> {
  loading.value = true;

  // 调用获取数据api
  const res = await props.api.get(
    Object.assign(
      {
        [props.tableOptions.queryCurrentPageKey || "page"]:
          paginationData.value.currentPage,
        [props.tableOptions.queryPageSizeKey || "limit"]:
          paginationData.value.pageSize,
      },
      props.tableOptions.params,
      queryData
    )
  );

  // 保存查询条件
  searchData.value = queryData || {};

  // 响应失败
  if (!res) {
    loading.value = false;
    paginationData.value.total = 0;
    paginationData.value.currentPage = 1;
    return false;
  }

  // 表格数据
  tableData.value = res.data.data.data ?? [];
  // props.tableOptions.returnRecordKey === "self"
  //   ? res.valueOf()
  //   : res[props.tableOptions.returnRecordKey || "data"] || [];

  intersectionBy(tableData.value, checkedRows.value, props.rowKey).forEach(
    (item: any) => {
      tableRef.value?.toggleRowSelection(item, true);
    }
  );

  // 分页数据
  paginationData.value.total =
    res.data.data[props.tableOptions.returnTotalKey || "total"] || 0;
  paginationData.value.currentPage = Number(
    res.data.data[props.tableOptions.returnCurrentPageKey || "current"]
  );

  loading.value = false;
  return true;
}

/**
 * 处理当前页变化
 */
function handleCurrentChange() {
  loadData(searchData.value);
}

/**
 * 处理数量变化
 */
function handleSizeChange() {
  loadData(searchData.value);
}

/**
 * 选中行数据
 */
const checkedRows = ref<Record<string, unknown>[]>([]);

/**
 * 处理选中
 */
function handleSelectionChange(rows: []): void {
  checkedRows.value = differenceBy(
    checkedRows.value,
    differenceBy(tableData.value, rows, props.rowKey),
    props.rowKey
  );
  checkedRows.value = [
    ...checkedRows.value,
    ...differenceBy(rows, checkedRows.value, props.rowKey),
  ];
}

/**
 * 获取选中行数据
 */
function getCheckedRows(): any[] {
  return checkedRows.value;
}

/**
 * 清除选中行
 */
function clearSelection(): void {
  checkedRows.value = [];
  tableRef.value?.clearSelection();
}

/**
 * 清空表格
 */
function clearTable(): void {
  tableData.value = [];

  paginationData.value.currentPage = 1;
  paginationData.value.total = 0;
}

// 数据初始化
onMounted(() => {
  loadData();
});

/**
 * 暴露属性/方法
 */
defineExpose({
  loadData,
  /**
   * el-table ref
   */
  table: tableRef,
  /**
   * 选中行数据
   */
  getCheckedRows,
  /**
   * 清除选中行
   */
  clearSelection,
  /**
   * 清空表格
   */
  clearTable,
});
</script>

<style lang="scss" scoped>
.x-table {
  width: 100%;

  &__header {
    display: flex;
    align-items: center;
    height: 50px;
  }

  &__title {
    width: 250px;
  }

  &__operation {
    width: calc(100% - 250px);
    text-align: right;
  }

  &__wrap {
    position: relative;
  }

  &__table-wrap {
    position: relative;
    min-height: 300px;
    padding-bottom: 50px;
  }

  &__pagination {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-top: 15px;
    text-align: right;
  }
}
</style>
