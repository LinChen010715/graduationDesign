<template>
  <div v-if="!whetherHasPermission">您暂无权限访问此页面</div>
  <div v-else class="customer">
    <x-form :form-list="formList">
      <template #action="{ form, formRef }">
        <el-button type="primary" @click="handleSearch(form)">查询</el-button>
        <el-button @click="handleReset(form, formRef)">重置</el-button>
      </template>
    </x-form>

    <x-table ref="tableRef" :api="api">
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
            <el-button
              type="text"
              :disabled="row.isGood"
              @click="openSetGreat(row)"
              >设为优秀作品</el-button
            >
            <el-button
              type="text"
              :disabled="row.isGood"
              @click="confirmDelete(row)"
              >驳回</el-button
            >
          </template>
        </el-table-column>
      </template>
    </x-table>

    <!--设为优秀作品-->
    <x-form-dialog
      v-model="setGreatVisible"
      :form-list="setGreatFormList"
      :el-form-props="elFromProps"
      title="设为优秀作品"
    >
      <template #action="{ form, formRef }">
        <el-button
          type="primary"
          :loading="setGreatLoading"
          @click="setGreat(form, formRef)"
        >
          确认
        </el-button>
        <el-button @click="cancelsetGreat">取消</el-button>
      </template>
    </x-form-dialog>

    <!--查看作品详情-->
    <el-dialog v-model="detailVisible">
      <h2>查看作品详情</h2>
      <br />
      <img :src="url" />
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
import { ref, onMounted } from "vue";

import { XTableAPI, XTableColumn, XTableElement } from "@/interface/table";
import fileAPI from "@/api/file/file/file";
import { ElMessage } from "element-plus";
import { OPERATION_NOTICE } from "@/utils/notice";
import to from "@/utils/await-to";
import { confirmReturnMessage } from "@/utils/confirm-message";
import { userStore } from "@/layout/index";

const whetherHasPermission = ref<boolean>(true);

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
 * 设置优秀表单
 */
const baseFormList: XFormItem[] = [
  {
    prop: "score",
    label: "评价分数",
    type: "inputNumber",
    rule: [
      {
        required: true,
        message: "请输入评价分数",
      },
      {
        validator: (rule, value, callback) => {
          if (value <= 0) {
            callback(new Error("评价分数必须大于0"));
          } else if (value > 10) {
            callback(new Error("评价分数必须小于10"));
          } else {
            callback();
          }
        },
      },
    ],
    elProps: {
      placeholder: "请输入评价分数",
    },
  },
  {
    prop: "scoreExplain",
    label: "个人评价",
    type: "input",
    rule: [
      {
        required: true,
        message: "请输入个人评价",
      },
    ],
    elProps: {
      placeholder: "请输入个人评价",
    },
  },
];

/**
 * 设置优秀显示
 */
const setGreatVisible = ref<boolean>(false);

/**
 * el-form props
 */
const elFromProps = {
  labelWidth: "150px",
};

/**
 * 设置优秀表单
 */
const setGreatFormList = ref<XFormItem[]>(baseFormList);

/**
 * 打开设置优秀
 */
function openSetGreat(row: any): void {
  setGreatVisible.value = true;
}

/**
 * setGreat loading
 */
const setGreatLoading = ref<boolean>(false);

/**
 * 设置优秀
 */
async function setGreat(
  form: XFormValue,
  formRef: FormElement | null
): Promise<boolean> {
  setGreatLoading.value = true;
  // 表单验证
  const [err, valid] = await to<boolean>(
    formRef?.validate() || Promise.resolve(false)
  );

  // 未通过表单验证
  if (err || !valid) {
    setGreatLoading.value = false;
    return false;
  }

  // 设置优秀
  const res = await fileAPI.setGreat(form);

  // 设置优秀失败
  if (!res) {
    ElMessage.error(OPERATION_NOTICE.SETGREAT_ERROR);
    setGreatLoading.value = false;
    return false;
  }

  // 设置优秀成功
  ElMessage.success(OPERATION_NOTICE.SETGREAT_SUCCESS);
  tableRef.value?.loadData(searchData.value);
  setGreatVisible.value = false;
  setGreatLoading.value = false;
  return true;
}

/**
 * 取消设置优秀
 */
function cancelsetGreat(): void {
  setGreatVisible.value = false;
}

/**
 * 确认删除
 */
async function confirmDelete(row: Record<string, unknown>): Promise<boolean> {
  // 弹出提示信息
  const res = await confirmReturnMessage();

  // 取消删除
  if (!res) {
    return false;
  }

  // 确认删除
  handleDelete(row);
  return true;
}

/**
 * 删除
 */
async function handleDelete(row: Record<string, unknown>): Promise<boolean> {
  const res = await fileAPI.del({
    idList: [row.id],
  });

  // 删除失败
  if (!res) {
    ElMessage.error(OPERATION_NOTICE.RETURN_ERROR);
    return false;
  }

  // 删除成功
  ElMessage.success(OPERATION_NOTICE.RETURN_SUCCESS);
  tableRef.value?.loadData(searchData.value);
  return true;
}

/**
 * 查看详情 显示
 */
const detailVisible = ref<boolean>(false);

/**
 * 图片显示地址
 */
const url = ref<string>();

/**
 * 打开查看详情
 * @param row
 */
async function viewDetail(row: any) {
  debugger;
  detailVisible.value = true;
  const res: any = await fileAPI.viewFile({ id: row.id });
  console.log(res);
  url.value = res.data;
}

/**
 * 处理表头改变事件
 * @param val
 */
function handleColumnsChange(val: XTableColumn[]) {
  columns.value = val;
}

/**
 * 判断身份是否有权限
 */
onMounted(() => {
  const userInfoStore = userStore();
  let role = userInfoStore.userInfo.role;
  whetherHasPermission.value = role === 0 ? false : true;
  if (!whetherHasPermission.value) {
    ElMessage.warning(OPERATION_NOTICE.PERMISSION_NONE);
  }
});
</script>
