<template>
  <div class="customer">
    <x-form :form-list="formList">
      <template #action="{ form, formRef }">
        <el-button type="primary" @click="handleSearch(form)">查询</el-button>
        <el-button @click="handleReset(form, formRef)">重置</el-button>
      </template>
    </x-form>

    <x-table ref="tableRef" :api="api" :table-options="tableOptions">
      <template #operation>
        <column-setting
          :columns="tableColumns"
          @update-columns="handleColumnsChange"
        ></column-setting>
      </template>
      <template #default>
        <el-table-column type="selection" width="36"></el-table-column>
        <el-table-column
          v-for="(col, index) in columns"
          :key="index"
          min-width="150"
          v-bind="col"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column width="400" label="操作" fixed="right">
          <template #default="{ row }">
            <el-button type="text" @click="viewDetail(row)"
              >查看作品详情</el-button
            >
            <el-button type="text" v-if="role" @click="returnGreat(row)"
              >撤回优秀作品</el-button
            >
          </template>
        </el-table-column>
      </template>
    </x-table>

    <!--查看作品详情-->
    <el-dialog v-model="detailVisible">
      <h2>查看作品详情</h2>
      <br />
      <div>{{ fileName }}</div>
      <a :href="filePath">{{ filePath }}</a>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {
  FormElement,
  XFormItem,
  XFormValue,
  XSelectForm,
} from "@/interface/form";
import { computed, ref } from "vue";

import {
  XTableAPI,
  XTableColumn,
  XTableElement,
  XTableOptions,
} from "@/interface/table";
import greatAPI from "@/api/file/great-file/great-file";
import { ElMessage } from "element-plus";
import { OPERATION_NOTICE } from "@/utils/notice";
import to from "@/utils/await-to";
import { confirmReturnMessage } from "@/utils/confirm-message";
import { userStore } from "@/layout/index";

const userInfoStore = userStore();

const role = computed(() => {
  return userInfoStore.userInfo.role === 0 ? false : true;
});

// TODO: 修改字段
/**
 * 查询表单
 */
const formList = ref<XFormItem[]>([
  {
    prop: "name",
    label: "作品名称",
    type: "input",
    elProps: {
      placeholder: "请输入作品名称",
      filterable: true,
    },
  },
  {
    prop: "username",
    label: "用户名",
    type: "input",
    elProps: {
      placeholder: "请输入用户名",
      filterable: true,
    },
  },
]);

/**
 * 查询数据
 */
const searchData = ref<Record<string, unknown>>({});

/**
 * table ref
 */
const tableRef = ref<XTableElement>();

/**
 * 查询
 */
function handleSearch(form: XFormValue): void {
  tableRef.value?.loadData(form);
  // 保存查询数据
  searchData.value = form;
}

/**
 * 重置
 */
function handleReset(form: XFormValue, formRef: FormElement | null): void {
  formRef?.resetFields();
  tableRef.value?.loadData(form);
  // 保存查询数据
  searchData.value = form;
}

// TODO: 核对字段名称
/**
 * 表格列
 */
const tableColumns: XTableColumn[] = [
  {
    prop: "name",
    label: "作品名称",
  },
  {
    prop: "username",
    label: "所有人用户名",
  },
  {
    prop: "score",
    label: "评价分数",
  },
  {
    prop: "scoreExplain",
    label: "评价",
  },
  {
    prop: "address",
    label: "地址",
  },
  {
    prop: "remark",
    label: "备注",
  },
];
/**
 * 表格列
 */
const columns = ref<XTableColumn[]>(tableColumns);
/**
 * 表格API
 */
const api: XTableAPI = {
  get: greatAPI.index,
};

/**
 * 表格配置
 */
const tableOptions: XTableOptions = {
  params: {
    isGood: 1,
    isReject: 0,
  },
};

/**
 * 确认撤回
 */
async function returnGreat(row: Record<string, unknown>): Promise<boolean> {
  // 弹出提示信息
  const res = await confirmReturnMessage();

  // 取消撤回
  if (!res) {
    return false;
  }

  // 确认撤回
  handleDelete(row);
  return true;
}

/**
 * 撤回
 */
async function handleDelete(row: Record<string, unknown>): Promise<boolean> {
  const res = await greatAPI.del({
    id: row.id,
  });

  // 撤回失败
  if (!res) {
    ElMessage.error(OPERATION_NOTICE.RETURN_ERROR);
    return false;
  }

  // 撤回成功
  ElMessage.success(OPERATION_NOTICE.RETURN_SUCCESS);
  tableRef.value?.loadData(searchData.value);
  return true;
}

/**
 * 查看详情 显示
 */
const detailVisible = ref<boolean>(false);

const fileName = ref<string>();

const filePath = ref<string>();

/**
 * 打开查看详情
 * @param row
 */
async function viewDetail(row: any) {
  detailVisible.value = true;
  const res: any = await greatAPI.viewFile({ id: row.id });
  if (!res) {
    return;
  }
  console.log(res);
  let fileArr = res.data?.split("/")?.reverse();
  filePath.value = res.data;
  fileName.value = fileArr[0];
}

/**
 * 图片显示地址
 */
const url = ref<string>();

/**
 * 处理表头改变事件
 * @param val
 */
function handleColumnsChange(val: XTableColumn[]) {
  columns.value = val;
}
</script>
