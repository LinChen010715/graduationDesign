<template>
  <div>
    <el-button @click="openCreateDialog">上传作品</el-button>
  </div>

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
import uploadPageAPI from "@/api/upload-page/upload-page";
import { ElMessage } from "element-plus";
import { OPERATION_NOTICE } from "@/utils/notice";
import to from "@/utils/await-to";

/**
 * 新增/编辑表单
 */
const baseFormList: XFormItem[] = [
  {
    prop: "name",
    label: "作品名称",
    type: "input",
    rule: [
      {
        required: true,
        message: "请输入作品名称",
      },
    ],
    elProps: {
      placeholder: "请输入作品名称",
    },
  },
  {
    prop: "email",
    label: "邮箱",
    type: "input",
    rule: [
      {
        required: true,
        message: "请输入邮箱",
      },
    ],
    elProps: {
      placeholder: "请输入邮箱",
    },
  },
  {
    prop: "phone",
    label: "电话",
    type: "input",
    rule: [
      {
        required: true,
        message: "请输入电话",
      },
    ],
    elProps: {
      placeholder: "请输入电话",
    },
  },
  {
    prop: "address",
    label: "地址",
    type: "input",
    rule: [
      {
        required: true,
        message: "请输入地址",
      },
    ],
    elProps: {
      placeholder: "请输入地址",
    },
  },
  {
    prop: "url",
    label: "上传作品",
    type: "upload",
    rule: [
      {
        required: true,
        message: "请上传文件",
      },
    ],
  },
  {
    prop: "remark",
    label: "备注",
    type: "input",
    elProps: {
      placeholder: "请输入备注",
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
  createLoading.value = true;
  // 表单验证
  const [err, valid] = await to<boolean>(
    formRef?.validate() || Promise.resolve(false)
  );

  // 未通过表单验证
  if (err || !valid) {
    createLoading.value = false;
    return false;
  }

  // 新增
  const res = await uploadPageAPI.save(form);

  // 新增失败
  if (!res) {
    ElMessage.error(OPERATION_NOTICE.CREATE_ERROR);
    createLoading.value = false;
    return false;
  }

  // 新增成功
  ElMessage.success(OPERATION_NOTICE.CREATE_SUCCESS);
  //   tableRef.value?.loadData(searchData.value);
  createVisible.value = false;
  createLoading.value = false;
  return true;
}

/**
 * 取消新增
 */
function cancelCreate(): void {
  createVisible.value = false;
}
</script>
