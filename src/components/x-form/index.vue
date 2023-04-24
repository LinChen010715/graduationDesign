<template>
    <el-card shadow="hover" class="x-form">
        <el-form ref="formRef" :model="form" inline class="x-form__form">
            <el-row>
                <el-col
                    v-for="(formItem, index) in formEnableList"
                    :key="formItem.prop"
                    :hidden="isShow ? formItemShow(index) : false"
                    :span="isRangePicker(formItem) ? 12 : 6"
                >
                    <el-form-item
                        :label="formItem.label"
                        :prop="formItem.prop"
                        v-bind="elFormProps"
                        :style="{ width: '100%' }"
                    >
                        <el-input
                            v-if="formItem.type === 'input'"
                            v-model="form[formItem.prop]"
                            v-bind="formItem.elProps"
                            clearable
                        ></el-input>
                        <el-select
                            v-else-if="formItem.type === 'select'"
                            v-model="form[formItem.prop]"
                            clearable
                            :loading="selectForm[formItem.prop].loading"
                            v-bind="formItem.elProps"
                            :style="{ width: '100%' }"
                        >
                            <!-- 固定项 -->
                            <!-- <el-option
                                v-for="(option, index) in formItem.options"
                                :key="index"
                                :value="formItem.selectValueGetOption ? option : option.value"
                                :label="option.label"
                            ></el-option> -->
                            <!-- api获取 -->
                            <el-option
                                v-for="option in selectForm[formItem.prop].options"
                                :key="option.value"
                                :value="formItem.selectValueGetOption ? option : option.value"
                                :label="option.label"
                            ></el-option>
                        </el-select>

                        <el-date-picker
                            v-else
                            v-model="form[formItem.prop]"
                            v-bind="formItem.elProps"
                            :style="{ width: '100%' }"
                            clearable
                            @change="handleDatePickerChange($event, formItem)"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="x-form__action" :span="6" :offset="actionOffset">
                    <slot name="action" :form="form" :form-ref="formRef"></slot>
                    <el-button
                        v-if="openForm"
                        title="展开查询条件"
                        icon="el-icon-arrow-down"
                        circle
                        @click="handleOpenForm"
                    ></el-button>
                    <el-button
                        v-if="closedForm"
                        title="收起查询条件"
                        icon="el-icon-arrow-up"
                        circle
                        @click="handleCloseForm"
                    ></el-button>
                </el-col>
            </el-row>

            <el-row class="x-form__action-line"></el-row>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { XFormItem } from '@/interface/form';
import { ref } from 'vue';
import useXForm from './use-x-form';

// props
const props = withDefaults(
    defineProps<{
        formList?: XFormItem[];
        elFormProps?: Record<string, unknown>;
    }>(),
    {
        formList: () => [],
        elFormProps: () => {
            return { labelWidth: '120px' };
        },
    }
);

const {
    formEnableList,
    form,
    formRef,
    selectForm,
    handleDatePickerChange,
    isRangePicker,
    initForm,
} = useXForm(props);

const actionOffset = ref(countFormItems() > 3 ? 0 : (3 - (countFormItems() % 4)) * 6);

/**
 * 重置表单
 */
function resetFields(): void {
    formRef.value?.resetFields();
}

/**
 * 计算 form 表单字段数量
 */
function countFormItems(): number {
    return (
        formEnableList.value.length +
        formEnableList.value.filter((formitem) => isRangePicker(formitem)).length
    );
}

/**
 * 是否收缩查询表单
 */
const isShow = ref(countFormItems() > 3 ? true : false);

/**
 * 展开 / 收起
 */
function formItemShow(itemIndex: number) {
    // 默认展示两行，3个搜索框
    let count = 0;
    // 第 3 个搜索框的位置
    let location = 3;

    formEnableList.value.forEach((item, index) => {
        if (isRangePicker(item)) {
            count = count + 2;
        } else {
            count = count + 1;
        }

        if (count === 3) {
            location = index;
        }
    });

    if (itemIndex > location) {
        return true;
    }

    return false;
}

/**
 * 展开
 */
const openForm = ref(isShow.value);

function handleOpenForm() {
    closedForm.value = true;
    openForm.value = false;
    isShow.value = false;
    actionOffset.value = (3 - (countFormItems() % 4)) * 6;
}

/**
 * 收起
 */
const closedForm = ref(false);

function handleCloseForm() {
    closedForm.value = false;
    openForm.value = true;
    isShow.value = true;
    actionOffset.value = 0;
}

/**
 * 暴露属性
 */
defineExpose({
    /**
     * 重置表单
     */
    resetFields,

    /**
     * 刷新表单项
     */
    initForm,
});
</script>

<style lang="scss" scoped>
.x-form {
    width: 100%;
    margin-bottom: 15px;

    &__form {
        transition: all 0.3s ease;
    }

    &__action {
        text-align: right;
    }

    &__span {
        padding: 10px;
    }
}

// .x-form__form {
//     position: relative;
//     width: 100%;
//     height: 124px;
//     overflow: hidden;
// }

// .x-form__action-line {
//     position: absolute;
//     bottom: 0;
//     z-index: 2;
//     width: 100%;
//     height: 62px;
//     background-color: #fff;
// }
</style>
