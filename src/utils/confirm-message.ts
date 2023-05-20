import { OPERATION_NOTICE } from './notice';
import { ElMessageBox } from 'element-plus';
import to from './await-to';
// TODO: 合并

/**
 * 确认删除弹出提示
 * @returns 是否删除
 */
export async function confirmDeleteMessage(): Promise<boolean> {
    const [err] = await to(
        ElMessageBox.confirm(OPERATION_NOTICE.DELETE_CONFIRM, '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        })
    );

    if (err) {
        return false;
    }

    return true;
}

/**
 * 确认驳回弹出提示
 * @returns 是否驳回
 */
export async function confirmReturnMessage(): Promise<boolean> {
    const [err] = await to(
        ElMessageBox.confirm(OPERATION_NOTICE.RETURN_CONFIRM, '提示', {
            confirmButtonText: '撤回',
            cancelButtonText: '取消',
            type: 'warning',
        })
    );

    if (err) {
        return false;
    }

    return true;
}