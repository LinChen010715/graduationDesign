<template>
  <div>
    <el-scroll>
      <!-- 走马灯 -->
      <div>
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item>
            <div><img src="@/assets/1.jpg" alt="" /></div>
          </el-carousel-item>
          <el-carousel-item>
            <div><img src="@/assets/2.jpg" alt="" /></div>
          </el-carousel-item>
          <el-carousel-item>
            <div><img src="@/assets/3.jpg" alt="" /></div>
          </el-carousel-item>
          <el-carousel-item>
            <div><img src="@/assets/4.jpg" alt="" /></div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div>
        <el-button @click="openCreateDialog">上传作品</el-button>
        <el-button @click="openRecordDialog">查看记录</el-button>
      </div>
    </el-scroll>
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

  <el-dialog v-model="recordDialogRef" title="历史记录" width="60%">
    <x-table ref="tableRef" :api="api">
      <template #default>
        <el-table-column type="selection" width="36"></el-table-column>
        <el-table-column
          v-for="(col, index) in columns"
          :key="index"
          min-width="150"
          v-bind="col"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column width="120" label="操作" fixed="right">
          <template #default="{ row }">
            <el-button type="text" @click="viewDetail(row)"
              >查看作品详情</el-button
            >
          </template>
        </el-table-column>
      </template>
    </x-table>
  </el-dialog>

  <!--查看作品详情-->
  <el-dialog v-model="detailVisible">
    <h2>查看作品详情</h2>
    <br />
    <div>{{ fileName }}</div>
    <a :href="filePath">{{ filePath }}</a>
  </el-dialog>
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
import fileAPI from "@/api/file/file/file";

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

const recordDialogRef = ref<boolean>(false);
/**
 * 打开历史记录
 */
function openRecordDialog(): void {
  recordDialogRef.value = true;
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

// TODO: 核对字段名称
/**
 * 表格列
 */
const tableColumns: XTableColumn[] = [
  {
    prop: "isRejectLabel",
    label: "是否被驳回",
  },
  {
    prop: "name",
    label: "作品名称",
  },
  {
    prop: "username",
    label: "用户名",
  },
  {
    prop: "email",
    label: "邮箱",
  },
  {
    prop: "phone",
    label: "电话",
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
  get: fileAPI.index,
};

/**
 * 查看详情 显示
 */
const detailVisible = ref<boolean>(false);

/**
 * 图片显示
 */
const fileName = ref<string>();

const filePath = ref<string>();

/**
 * 打开查看详情
 * @param row
 */
async function viewDetail(row: any) {
  detailVisible.value = true;
  const res: any = await fileAPI.viewFile({ id: row.id });
  if (!res) {
    return;
  }
  console.log(res);
  let fileArr = res.data?.split("/")?.reverse();
  filePath.value = res.data;
  fileName.value = fileArr[0];
}
</script>

<style lang="scss" scoped>
img {
  width: 80%;
  height: 100%;
}
</style>
