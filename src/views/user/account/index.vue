<template>
  <div class="customer">
    <x-form :form-list="formList">
      <template #action="{ form, formRef }">
        <el-button type="primary" @click="handleSearch(form)">查询</el-button>
        <el-button @click="handleReset(form, formRef)">重置</el-button>
      </template>
    </x-form>

    <x-table ref="tableRef" :api="api">
      <template #operation="{ checkedRows }">
        <el-button type="success" @click="openCreateDialog">新增</el-button>
        <el-button type="danger" @click="confirmMultiDelete(checkedRows)">
          批量删除
        </el-button>
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
        <el-table-column width="150" label="操作" fixed="right">
          <template #default="{ row }">
            <el-button type="text" @click="openEditDialog(row)">编辑</el-button>
            <el-button type="text" @click="confirmDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </x-table>

    <!-- 新增  -->
    <x-form-dialog
      v-model="createVisible"
      :form-list="createFormList"
      :el-form-props="elFromProps"
      title="新增"
    >
      <template #action="{ form, formRef }">
        <el-button
          type="primary"
          :loading="createLoading"
          @click="create(form, formRef)"
        >
          确认
        </el-button>
        <el-button @click="cancelCreate">取消</el-button>
      </template>
    </x-form-dialog>

    <!-- 编辑 -->
    <x-form-dialog
      v-model="editVisible"
      :form-list="editFormList"
      :form-default-value="editFormValue"
      :el-form-props="elFromProps"
      title="编辑"
    >
      <template #action="{ form, formRef }">
        <el-button
          type="primary"
          :loading="editLoading"
          @click="edit(form, formRef)"
        >
          确认
        </el-button>
        <el-button @click="cancelEdit">取消</el-button>
      </template>
    </x-form-dialog>
  </div>
</template>
<script setup lang="ts">
import {
  FormElement,
  XFormItem,
  XFormValue,
  XSelectForm,
} from "@/interface/form";
import { ref } from "vue";

import { XTableAPI, XTableColumn, XTableElement } from "@/interface/table";
import accountAPI from "@/api/user/account";
import { ElMessage } from "element-plus";

// TODO: 修改字段
/**
 * 查询表单
 */
const formList = ref<XFormItem[]>([
  {
    prop: "userName",
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
    prop: "account",
    label: "用户名",
  },
  {
    prop: "password",
    label: "密码",
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
  get: accountAPI.index,
};

/**
 * 新增/编辑表单
 */
const baseFormList: XFormItem[] = [
  {
    prop: "account",
    label: "用户名",
    type: "input",
    rule: [
      {
        required: true,
        message: "请输入用户名",
      },
    ],
    elProps: {
      placeholder: "请输入用户名",
    },
  },
  {
    prop: "password",
    label: "密码",
    type: "input",
    rule: [
      {
        required: true,
        message: "请输入密码",
      },
    ],
    elProps: {
      placeholder: "请输入密码",
    },
  },
];

/**
 * 新增显示
 */
const createVisible = ref<boolean>(false);

/**
 * el-form props
 */
const elFromProps = {
  labelWidth: "150px",
};

/**
 * 新增表单
 */
const createFormList = ref<XFormItem[]>(baseFormList);

/**
 * 打开新增
 */
function openCreateDialog(): void {
  createVisible.value = true;
}

/**
 * create loading
 */
const createLoading = ref<boolean>(false);

/**
 * 新增
 */
async function create(
  form: XFormValue,
  formRef: FormElement | null
): Promise<boolean> {
  //   createLoading.value = true;
  //   // 表单验证
  //   const [err, valid] = await to<boolean>(
  //     formRef?.validate() || Promise.resolve(false)
  //   );

  //   // 未通过表单验证
  //   if (err || !valid) {
  //     createLoading.value = false;
  //     return false;
  //   }

  //   // 新增
  //   const res = await CustomerRequirementAPI.save(form);

  //   // 新增失败
  //   if (!res) {
  //     ElMessage.error(OPERATION_NOTICE.CREATE_ERROR);
  //     createLoading.value = false;
  //     return false;
  //   }

  //   // 新增成功
  //   ElMessage.success(OPERATION_NOTICE.CREATE_SUCCESS);
  //   tableRef.value?.loadData(searchData.value);
  //   createVisible.value = false;
  //   createLoading.value = false;
  return true;
}

/**
 * 取消新增
 */
function cancelCreate(): void {
  createVisible.value = false;
}

/**
 * 编辑显示
 */
const editVisible = ref<boolean>(false);

/**
 * 编辑表单
 */
const editFormList = ref<XFormItem[]>(baseFormList);

/**
 * 编辑初始值
 */
const editFormValue = ref<Record<string, unknown>>({});

/**
 * 打开编辑
 */
function openEditDialog(row: Record<string, string>) {
  if (row.validityTerm == null) delete row.validityTerm;
  if (row.shelfLife == null) delete row.shelfLife;
  editFormValue.value = row;
  editVisible.value = true;
}

/**
 * edit loading
 */
const editLoading = ref<boolean>(false);

/**
 * 编辑
 */
async function edit(form: XFormValue, formRef: FormElement): Promise<boolean> {
  //   editLoading.value = true;
  //   // 表单验证
  //   const [err, valid] = await to<boolean>(
  //     formRef?.validate() || Promise.resolve(false)
  //   );

  //   // 未通过表单校验
  //   if (err || !valid) {
  //     editLoading.value = false;
  //     return false;
  //   }

  //   // 编辑
  //   const res = await CustomerRequirementAPI.save(form);

  //   // 编辑失败
  //   if (!res) {
  //     ElMessage.error(OPERATION_NOTICE.EDIT_ERROR);
  //     editLoading.value = false;
  //     return false;
  //   }

  //   // 编辑成功
  //   ElMessage.success(OPERATION_NOTICE.EDIT_SUCCESS);
  //   tableRef.value?.loadData(searchData.value);
  //   editVisible.value = false;
  //   editLoading.value = false;
  return true;
}

/**
 * 取消编辑
 */
function cancelEdit(): void {
  editVisible.value = false;
}

/**
 * 确认删除
 */
async function confirmDelete(row: Record<string, unknown>): Promise<boolean> {
  //   // 弹出提示信息
  //   const res = await confirmDeleteMessage();

  //   // 取消删除
  //   if (!res) {
  //     return false;
  //   }

  //   // 确认删除
  //   handleDelete(row);
  return true;
}

/**
 * 删除
 */
async function handleDelete(row: Record<string, unknown>): Promise<boolean> {
  //   const res = await CustomerRequirementAPI.del({
  //     ids: [row.id],
  //   });

  //   // 删除失败
  //   if (!res) {
  //     ElMessage.error(OPERATION_NOTICE.DELETE_ERROR);
  //     return false;
  //   }

  //   // 删除成功
  //   ElMessage.success(OPERATION_NOTICE.DELETE_SUCCESS);
  //   tableRef.value?.loadData(searchData.value);
  return true;
}

/**
 * 确认多项删除
 */
async function confirmMultiDelete(
  checkedRows: Record<string, unknown>[]
): Promise<boolean> {
  //   if (checkedRows.length < 1) {
  //     ElMessage.warning(OPERATION_NOTICE.SELECTION_NONE);
  //     return false;
  //   }

  //   // 弹出提示信息
  //   const res = await confirmDeleteMessage();

  //   // 取消删除
  //   if (!res) {
  //     return false;
  //   }

  //   // 确认删除
  //   handleMultiDelete(checkedRows);
  return true;
}

/**
 * 删除多项
 */
async function handleMultiDelete(
  checkedRows: Record<string, unknown>[]
): Promise<boolean> {
  //   const res = await CustomerRequirementAPI.del({
  //     ids: checkedRows.map((row) => row.id),
  //   });

  //   // 删除失败
  //   if (!res) {
  //     ElMessage.error(OPERATION_NOTICE.DELETE_ERROR);
  //     return false;
  //   }

  //   // 删除成功
  //   ElMessage.success(OPERATION_NOTICE.DELETE_SUCCESS);
  //   tableRef.value?.loadData(searchData.value);
  return true;
}
/**
 * 处理表头改变事件
 * @param val
 */
function handleColumnsChange(val: XTableColumn[]) {
  columns.value = val;
}
</script>
