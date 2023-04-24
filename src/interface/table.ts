// TODO: 完善

/**
 * 自定义分页数据
 */
export interface CustomPageTableData {
    /**
     * 当前页
     */
    current?: number;
    /**
     * 总页数
     */
    pages?: number;
    /**
     * 记录
     */
    records?: [];
    /**
     * 总数
     */
    total?: number;
    /**
     * 每页记录数
     */
    size?: number;
}

/**
 * 分页查询参数
 */
export interface CustomPageTableForm {
    /**
     * 页码
     */
    page?: number;
    /**
     * 数量
     */
    limit?: number;
    /**
     * 其他
     */
    [key: string]: unknown;
}

/**
 * el-pagination
 */
export interface ElPaginationData {
    total: number;
    currentPage: number;
    pageSizes: number[];
    pageSize: number;
}

/**
 * 表格列
 */
export interface XTableColumn {
    prop: string;
    label: string;
    width?: string | number;
    fixed?: boolean | 'left' | 'right';
    [key: string]: any;
}

// TODO: element-plus应该有此类型
/**
 * el-table ref
 */
export interface ElTableElement extends HTMLElement {
    /**
     * 重新计算布局
     */
    doLayout: () => void;
    /**
     * 清除选中行
     */
    clearSelection: () => void;
    /**
     * 设置行数据选择状态
     * @param row
     * @param selected
     */
    toggleRowSelection: (row: any, selected: boolean) => void;
}

/**
 * x-table ref
 */
export interface XTableElement extends HTMLElement {
    /**
     * 加载表格数据
     */
    loadData: (data: any) => void;
    /**
     * 获取选中值
     */
    getCheckedRows: () => any[];
    /**
     * 清除选中行
     */
    clearSelection: () => void;
    /**
     * 清除表格
     */
    clearTable: () => void;
}

/**
 * x-table api props
 */
export interface XTableAPI {
    /**
     * 分页获取
     */
    get: (data: any) => Promise<any>;
    /**
     * 删除
     */
    del?: (data: any) => Promise<any>;
}

/**
 * x-table options
 */
export interface XTableOptions {
    /**
     * 默认携带参数
     */
    params?: Record<string, unknown>;
    /**
     * 查询时的当前页key
     */
    queryCurrentPageKey?: string;
    /**
     * 查询时的每页数量key
     */
    queryPageSizeKey?: string;
    /**
     * 返回时的数组总量 key值
     */
    returnTotalKey?: string;
    /**
     * 返回时的数据list key值
     */
    returnRecordKey?: string;
    /**
     * 返回时当前页key
     */
    returnCurrentPageKey?: string;
}
