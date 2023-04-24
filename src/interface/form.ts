import { RuleItem } from 'async-validator';
import { UnwrapRef, Ref } from 'vue-demi';

// TODO: interface优化

/**
 * x-form form item
 */
export interface XFormItem {
    prop: string;
    label: string;
    type: 'input' | 'select' | 'date' | 'radio' | 'inputNumber' | 'switch' | 'divider' | 'upload';
    default?: any;
    hidden?: boolean;
    rule?: RuleItem[];
    api?: () => Promise<[]>;
    change?: (
        value: any,
        selectForm: UnwrapRef<XSelectForm>,
        form: Ref<XFormValue>,
        // 联动数据是否清空
        isClear?: boolean
    ) => Promise<boolean>;
    options?: {
        label: string;
        value: string | number;
    }[];
    selectValueGetOption?: boolean;
    dateValueFormat?: string;
    elProps?: {
        [key: string]: any;
    };
    colSpan?: number;
    displayBy?: string;
    componentProps?: (opt: {
        value?: string | number | object | boolean;
        formModel: XFormValue;
        schema: XFormItem[] | undefined;
        formItem: XFormItem;
    }) => void;
}

/**
 * 表单form值
 */
export interface XFormValue {
    // TODO: any
    [key: string]: any;
}

/**
 * 扩展HTMLElement
 */
export interface FormElement extends HTMLElement {
    validate: () => Promise<boolean>;
    resetFields: () => void;
}

/**
 * x-form表单Props
 */
export interface XFormProps {
    formList?: XFormItem[];
    formDefaultValue?: Record<string, string | number | boolean | object>;
}

/**
 *
 */
export interface XSelectForm {
    [key: string]: {
        options: {
            label: string;
            value: string | number;
        }[];
        loading?: boolean;
    };
}
