import { FormElement, XFormItem, XFormProps, XFormValue, XSelectForm } from '@/interface/form';
import { RuleItem } from 'async-validator';
import dayjs from 'dayjs';
import { computed, reactive, ref, onBeforeMount, watch, Ref, UnwrapRef } from 'vue';
// FIXME: 下拉菜单多次调用BUG

/**
 * useForm 函数返回值类型
 */
interface UseForm {
    formEnableList: Ref<XFormItem[]>;
    fileList: any;
    form: Ref<XFormValue>;
    formRef: Ref<FormElement | null>;
    rules: UnwrapRef<{ [key: string]: RuleItem[] }>;
    selectForm: UnwrapRef<XSelectForm>;
    initForm: () => void;
    handleSelectVisibleChange: (
        visible: boolean,
        key: string,
        api: (() => Promise<[] | undefined>) | undefined
    ) => Promise<boolean>;
    handleDatePickerChange: (value: any, item: XFormItem) => void;
    isRangePicker: (formItem: XFormItem) => boolean;
}

/**
 * x-form组件函数API
 * @param props x-form组件props
 * @returns
 */
export default function useXForm(props: XFormProps): UseForm {
    // 表单中显示的值
    const formEnableList = computed<XFormItem[]>(
        () =>
            props.formList?.filter((formItem) => formItem.hidden === false || !formItem.hidden) ||
            []
    );

    // 表单值
    const form = ref<XFormValue>({});

    // 表单element
    const formRef = ref<FormElement | null>(null);

    /**
     * 表单规则
     */
    const rules = reactive<{
        [key: string]: RuleItem[];
    }>({});

    /**
     * selectForm
     */
    const selectForm = reactive<XSelectForm>({});
    /**
     * fileList
     */
    const fileList = ref<{ name: string; url: any }[]>([]);

    /**
     * 展开处理
     */
    async function handleSelectVisibleChange(
        visible: boolean,
        key: string,
        api: (() => Promise<[] | undefined>) | undefined
    ): Promise<boolean> {
        // 关闭或不存在api
        if (!visible || !api) {
            return false;
        }

        // 加载数据
        selectForm[key].loading = true;

        const res = await api();

        // 加载错误
        if (!res) {
            selectForm[key].loading = false;
            return false;
        }

        // 加载成功
        selectForm[key].options = res;
        selectForm[key].loading = false;

        return true;
    }

    /**
     * 判断是否为时间范围选择器
     */
    function isRangePicker(formItem: XFormItem): boolean {
        return (
            formItem.type === 'date' &&
            (formItem.elProps?.type === 'datetimerange' || formItem.elProps?.type === 'daterange')
        );
    }

    /**
     * 初始化表单
     */
    function initForm() {
        props.formList?.forEach(async (item) => {
            // 初始化 key - value
            if (typeof item.default === 'function') {
                form.value[item.prop] = await item.default();
            } else if (item.default === 0 || item.default === false || item.default === undefined) {
                form.value[item.prop] = item.default;
            } else {
                form.value[item.prop] = item.default || '';
            }

            // 初始化 select 相关数据
            if (item.type === 'select') {
                selectForm[item.prop] = {
                    options: [],
                    loading: false,
                };

                // 初始化下拉菜单
                if (item.api) {
                    const res = await item.api();
                    if (res) selectForm[item.prop].options = res;
                    else selectForm[item.prop].options = [];
                } else {
                    selectForm[item.prop].options = item.options || [];
                }
            }

            // 初始化表单规则
            rules[item.prop] = item.rule || [];
        });

        setForm();
    }

    /**
     * 赋值表单
     */
    function setForm(): void {
        // 表单初始值
        Object.entries(props.formDefaultValue || {}).forEach((keyValue) => {
            if (form.value.hasOwnProperty(keyValue[0])) {
                form.value[keyValue[0]] = keyValue[1];
            }
        });

        // TODO: 优化
        // 清除上一次setForm的缓存
        fileList.value = [];
        //表单上传组件编辑时回显，因为后端数据不好存对象数组，暂时这样，后期希望大家推动后端将保存和查询时数据变成对象数组形式并将此代码优化
        if (form.value[form.value.uploadFieldName]) {
            //第一次切‘/’拿到携带id的文件名称
            const fileName: any = form.value[form.value.uploadFieldName].split('/');
            //讲携带id的文件名称pop出来
            const fileNamePop: string = fileName.pop();
            //通过index方法查到第一个‘_’,讲id和名称区分开来
            const Index: number = fileNamePop.indexOf('_');
            //通过substring方法并且使用index下标拿到id后面的准确名称
            const fileNameFinal: string = fileNamePop.substring(Index + 1);
            fileList.value = [
                {
                    name: fileNameFinal,
                    url: form.value[form.value.uploadFieldName],
                },
            ];
        }
        // TODO: 优化
        //初始化时遍历一次componentProps事件;
        formEnableList.value.forEach((formItem) => {
            if (
                formItem.componentProps &&
                props.formDefaultValue &&
                !props.formDefaultValue[formItem.prop]
            ) {
                formItem.componentProps({
                    value: props.formDefaultValue[formItem.prop],
                    formModel: form.value,
                    schema: props.formList,
                    formItem: formItem,
                });
            }

            if (
                formItem.change &&
                props.formDefaultValue &&
                props.formDefaultValue[formItem.prop]
            ) {
                formItem.change(props.formDefaultValue[formItem.prop], selectForm, form, false);
            }
        });
    }

    /**
     * 处理时间控件
     * @description 处理时间控件返回值格式
     */
    function handleDatePickerChange(value: Date, item: XFormItem): void {
        if (Array.isArray(value)) {
            form.value[item.prop] = value.map((dateValue) =>
                dayjs(dateValue).format(item.dateValueFormat)
            );
        } else {
            form.value[item.prop] = dayjs(value).format(item.dateValueFormat);
        }
    }

    // 监听formList
    watch(
        () => props.formList,
        () => {
            form.value = {};
            initForm();
        }
    );

    // 监听formList
    watch(
        () => props.formDefaultValue,
        () => {
            setForm();
        }
    );

    onBeforeMount(() => {
        initForm();
    });

    return {
        formEnableList,
        form,
        formRef,
        rules,
        selectForm,
        fileList,
        initForm,
        handleSelectVisibleChange,
        handleDatePickerChange,
        isRangePicker,
    };
}
