<template>
    <el-dialog
        v-model="visible"
        :title="title"
        @update:modelValue="updateVisible"
        @open="handleDialogOpen"
        @close="handleClose"
    >
        <div v-if="showInitForm" class="x-form">
            <el-form
                ref="formRef"
                :model="form"
                label-position="right"
                v-bind="elFormProps"
                :rules="rules"
            >
                <el-row>
                    <el-col
                        v-for="formItem in formEnableList"
                        :key="formItem.prop"
                        :span="formItem.elProps?.span ? formItem.elProps.span : 12"
                    >
                        <el-form-item
                            :label="formItem.label"
                            :prop="formItem.prop"
                            :label-width="
                                formItem.elProps?.labelWidth
                                    ? formItem.elProps?.labelWidth
                                    : elFormProps.labelWidth
                            "
                        >
                            <el-input
                                v-if="formItem.type === 'input'"
                                v-model="form[formItem.prop]"
                                v-bind="formItem.elProps"
                                clearable
                                @input="handleSelectChange($event, selectForm, formItem)"
                            ></el-input>
                            <el-input-number
                                v-else-if="formItem.type === 'inputNumber'"
                                v-model="form[formItem.prop]"
                                v-bind="formItem.elProps"
                                :style="{ width: '100%' }"
                                controls-position="right"
                                :min="0"
                                @input="handleSelectChange($event, selectForm, formItem)"
                            ></el-input-number>
                            <el-select
                                v-else-if="formItem.type === 'select'"
                                v-model="form[formItem.prop]"
                                clearable
                                v-bind="formItem.elProps"
                                :component-props="formItem.componentProps"
                                :style="{ width: '100%' }"
                                :loading="selectForm[formItem.prop].loading"
                                @change="handleSelectChange($event, selectForm, formItem)"
                            >
                                <!-- 固定项 -->
                                <el-option
                                    v-for="option in selectForm[formItem.prop].options"
                                    :key="option.value"
                                    :value="formItem.selectValueGetOption ? option : option.value"
                                    :label="option.label"
                                ></el-option>
                            </el-select>
                            <el-date-picker
                                v-else-if="formItem.type === 'date'"
                                v-model="form[formItem.prop]"
                                v-bind="formItem.elProps"
                                clearable
                                :style="{ width: '100%' }"
                                @change="handleDatePickerChange($event, formItem)"
                            ></el-date-picker>
                            <el-upload
                                v-else-if="formItem.type === 'upload'"
                                v-bind="formItem.elProps"
                                :action="VITE_API_URL + VITE_GLOB_UPLOAD_URL"
                                :file-list="fileList"
                                :on-remove="removeFile"
                                @change="uploadHandle($event, formItem.prop)"
                            >
                                <el-button size="small" type="success">点我上传</el-button>
                                <span class="x-form__tip">上传图片(限一张)</span>
                            </el-upload>
                            <!-- TODO: 优化 -->
                            <el-radio-group
                                v-else
                                v-model="form[formItem.prop]"
                                v-bind="formItem.elProps"
                                @change="handleSelectChange($event, selectForm, formItem)"
                            >
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div v-if="showChangeForm" class="x-form">
            <el-form
                ref="formRef"
                :model="form"
                label-position="right"
                v-bind="elFormProps"
                :rules="rules"
            >
                <el-row>
                    <el-col
                        v-for="formItem in formEnableChangeList"
                        :key="formItem.prop"
                        :span="formItem.elProps?.span ? formItem.elProps.span : 12"
                    >
                        <el-form-item
                            :label="formItem.label"
                            :label-width="
                                formItem.elProps?.labelWidth
                                    ? formItem.elProps?.labelWidth
                                    : elFormProps.labelWidth
                            "
                            :prop="formItem.prop"
                        >
                            <el-input
                                v-if="formItem.type === 'input'"
                                v-model="form[formItem.prop]"
                                v-bind="formItem.elProps"
                                clearable
                                @input="handleSelectChange($event, selectForm, formItem)"
                            ></el-input>
                            <el-input-number
                                v-else-if="formItem.type === 'inputNumber'"
                                v-model="form[formItem.prop]"
                                v-bind="formItem.elProps"
                                :style="{ width: '100%' }"
                                controls-position="right"
                                :min="0"
                            ></el-input-number>
                            <el-select
                                v-else-if="formItem.type === 'select'"
                                v-model="form[formItem.prop]"
                                clearable
                                v-bind="formItem.elProps"
                                :component-props="formItem.componentProps"
                                :style="{ width: '100%' }"
                                :loading="selectForm[formItem.prop].loading"
                                @change="handleSelectChange($event, selectForm, formItem)"
                            >
                                <!-- 固定项 -->
                                <el-option
                                    v-for="option in selectForm[formItem.prop].options"
                                    :key="option.value"
                                    :value="formItem.selectValueGetOption ? option : option.value"
                                    :label="option.label"
                                ></el-option>
                            </el-select>
                            <el-date-picker
                                v-else-if="formItem.type === 'date'"
                                v-model="form[formItem.prop]"
                                v-bind="formItem.elProps"
                                clearable
                                :style="{ width: '100%' }"
                                @change="handleDatePickerChange($event, formItem)"
                            ></el-date-picker>
                            <el-upload
                                v-else-if="formItem.type === 'upload'"
                                v-bind="formItem.elProps"
                                :action="VITE_API_URL + VITE_GLOB_UPLOAD_URL"
                                :on-remove="removeFile"
                                @change="uploadHandle($event, formItem.prop)"
                            >
                                <!--                                :file-list="fileList"-->
                                <el-button size="small" type="success">点我上传</el-button>
                                <span class="x-form__tip">上传图片(限一张)</span>
                            </el-upload>
                            <!-- TODO: 优化 -->
                            <el-radio-group
                                v-else
                                v-model="form[formItem.prop]"
                                v-bind="formItem.elProps"
                                @change="handleSelectChange($event, selectForm, formItem)"
                            >
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="x-form">
            <slot name="volumeList" :form="form" :form-ref="formRef"></slot>
        </div>
        <template #footer>
            <div>
                <slot name="action" :form="form" :form-ref="formRef"></slot>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { FormElement, XFormItem, XFormValue, XSelectForm } from '@/interface/form';
import { VITE_GLOB_UPLOAD_URL, VITE_API_URL } from '@/constant/base';
import { nextTick, ref, watch } from 'vue';
import useXForm from './use-x-form';
import { ElMessage } from 'element-plus';
//------------------------------------------------------props父组件传来的值----------------------------------------------
const props = withDefaults(
    defineProps<{
        formList?: Array<XFormItem>;
        elFormProps?: Record<string, unknown>;
        formVisible: boolean;
        /**
         * 初始值
         */
        formDefaultValue?: Record<string, string | number | boolean | object>;
        /**
         * 标题
         */
        title?: string;
    }>(),
    {
        formList: () => [],
        elFormProps: () => {
            return {};
        },
        modelValue: false,
        formDefaultValue: () => {
            return {};
        },
        title: '',
    }
);
//------------------------------------------------------emit回调----------------------------------------------
const emit = defineEmits<{
    /**
     * 搜索触发事件
     */
    (e: 'search', form: XFormValue): void;
    /**
     * 重置触发事件
     */
    (e: 'reset'): void;
    /**
     * 双向绑定
     */
    (e: 'update:modelValue', value: boolean): void;
    /**
     * 对话框打开回调
     */
    (e: 'open'): void;
}>();
//------------------------------------------------------对话框显示和关闭处理----------------------------------------------
/**
 * 对话框显示
 */
const visible = ref<boolean>(false);

// 监听显示以更新dialog visible
watch(
    () => props.modelValue,
    (newValue) => {
        visible.value = newValue;
    }
);

/**
 * 更新是否显示
 */
function updateVisible(value: boolean) {
    // 重置表单
    formRef.value?.resetFields();
    emit('update:modelValue', value);
}
/**
 * 处理对话框打开回调
 */
function handleDialogOpen() {
    showInitForm.value = true;
    initForm();
    props.formList.forEach((item: any) => {
        if (item.componentProps) {
            if (props.formDefaultValue[item.prop]) {
                if (item.add) {
                    item.add = false;
                }
                handleSelectChange(props.formDefaultValue[item.prop], selectForm, item);
            }
            if (!props.formDefaultValue[item.prop]) {
                if (item.add === false) {
                    item.add = true;
                }
                handleSelectChange(props.formDefaultValue[item.prop], selectForm, item);
            }
        }
    });
    emit('open');
}
/**
 * 处理对话框关闭回调
 */
function handleClose() {
    formRef.value?.resetFields();
    showChangeForm.value = false;
}
//------------------------------------------------------表单数据初始化和处理----------------------------------------------

/**
 * 控制初始化表单的显示和隐藏
 */
const showInitForm = ref<boolean>(true);

/**
 * 控制表单改变后的显示和隐藏
 */
const showChangeForm = ref<boolean>(false);
/**
 * 表单中显示的需要的值
 */
const {
    formEnableList,
    form,
    formRef,
    rules,
    selectForm,
    handleDatePickerChange,
    initForm,
    fileList,
} = useXForm(props);

/**
 * 值改变后表单的渲染列表
 */
const formEnableChangeList = ref<Array<XFormItem>>([]);

/**
 * 处理表单input和select改变事件
 */
async function handleSelectChange(
    value: string | number | object | boolean,
    selectForm: XSelectForm,
    formItem: XFormItem
) {
    if (formItem.change) {
        await formItem.change(value, selectForm, form, true);
    } else if (formItem.componentProps) {
        showInitForm.value = false;
        formItem.componentProps({
            value: value,
            formModel: form.value,
            schema: props.formList,
            formItem: formItem,
        });
        await nextTick(async function () {
            formEnableChangeList.value =
                props.formList?.filter(
                    (formItem) => formItem.hidden === false || !formItem.hidden
                ) || [];
            showChangeForm.value = true;
        });
    }
}
//------------------------------------------------------表单数据初始化和处理----------------------------------------------
/**
 * 上传处理
 */
function uploadHandle(file: any, value: string): void {
    if (file.status === 'success') {
        form.value[value] = file.response.data;
    }
}
/**
 * 上传处理
 */
function removeFile(): void {
    if (form.value.uploadFieldName) {
        form.value[form.value.uploadFieldName] = '';
    }
}
</script>

<style lang="scss" scoped>
.x-form {
    width: 100%;
    margin-bottom: 15px;

    &__action {
        text-align: right;
    }

    &__tip {
        margin-left: 12px;
    }
}
</style>
