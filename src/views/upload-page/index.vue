<template>
  <div class="page_wrap">
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
        <h2>什么是3D打印</h2>
        <p class="article">
          3D打印机又称三维打印机，它是意大利发明家恩里科•迪尼发明的，3D打印机通过使用3D辅助设计软件，工程师在设计出一个模型或原型后，运用粉末状金属或塑料等可粘合材料，通过逐层打印的方式来构造物体的一种技术，3D打印机也成了很多创客空间必配的设备之一。
          只需要象橡胶、塑料这样的材料，通过一台3D打印机，你就可以把脑中的一切想法转化成实体。从原理上看，3D打印机可以打印一辆车、一栋房子、甚至身体上的一只胳膊。3D打印技术与其他数字化生产模式一起推动实现第三次工业革命。无论你想到什么，只要用3D软件做出来，输入3D打印机就可以变成实体。
        </p>
        <h2>3D打印所用的材料</h2>
        <p class="article">
          3D打印材料是3D打印技术发展的重要物质基础，在某种程度上，3D打印材料的发展决定着3D打印能否有更广泛的应用。目前，3D打印材料主要包括工程塑料、光敏树脂、橡胶类材料、金属材料和陶瓷材料等，除此之外，彩色石膏材料、人造骨粉、细胞生物原料以及砂糖等食品材料也在3D打印领域得到了应用。3D打印所用的这些原材料都是专门针对3D打印设备和工艺而研发的，与普通的塑料、石膏、树脂等有所区别，其形态一般有粉末状、丝状、层片状、液体状等。通常，根据打印设备的类型及操作条件的不同，所使用的粉末状3D打印材料的粒径为1～100μｍ不等，而为了使粉末保持良好的流动性，一般要求粉末要具有高球形度。
        </p>
        <h2>3D打印的技术原理</h2>
        <p class="article">
          通过对3D打印技术的了解，我们知道并不复杂，其运作原理和传统打印机工作原理基本相同。传统打印机是只要轻点电脑屏幕上的打印按钮，一份数字文件便被传送到一台喷墨打印机上，它将一层墨水喷到纸的表面以形成一副二维图像。而3D打印机首先将物品转化为一组3D数据，然后打印机开始逐层分切，针对分切的每一层构建，按层次打印。
          <br />
          3D打印打印机在工作时，粉末耗材会一层一层地打印出来，层与层之间通过特殊的胶水进行粘合，并按照横截面将图案固定住，最后一层一层叠加起来，就像我们坐在海边用沙子堆砌城堡一样的程序，最终经过分层打印、层层粘合、逐层堆砌，一个完整的物品就会呈现在我们眼前了。3D打印机与传统打印机最大的区别在于它使用的墨水是实实在在的原材料。
        </p>
        <h2>3D打印的前景</h2>
        <p class="article">
          3D打印在欧美国家已经有30年的历史，目前已经拓展到医学、能源、航空航天等领域应用，产业规模已有几十亿美元。有专家预测，到2025年3D打印的经济影响每年可能高达5500亿美元。在智能控制技术和生物医学是被一致看好的应用领域。
          <br />
          对于正处于培育推广阶段的中国3D产业而言，政府的重视与政策扶持显得尤为重要。目前国内已有多省市成立了地方3D打印产业联盟，并在相关政策中提及要重点发展3D产业。教育部也正在制订方案，让3D打印机走进学校的创客教育，此举将在创客精神和创客文化的推动上起到了更加积极作用。
        </p>
        <h2>3D打印与创客</h2>
        <p class="article">
          随着3D打印技术的推出和普及，3D打印机已走向普通学校和创客空间，让创客的门槛再一次降低。未来，我们将会看到更多的行业出现颠覆创新式的发展。
        </p>
      </div>

      <div>
        <h2>上传与记录（点击按钮进行操作）</h2>
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

.page_wrap {
  height: 640px;
  overflow-y: auto;
}

.article {
  text-align: left;
  padding: 0 20px;
}
</style>
