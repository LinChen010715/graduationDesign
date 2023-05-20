import request from "@/utils/request";

export default {
    index: (data: unknown): Promise<unknown> => request.get('/composition/select', { params: data }),
    /**
     * 撤回优秀作品
     * @param data 
     * @returns 
     */
    del: (data: unknown): Promise<unknown> => request.post('/composition/withdraw', data),

    /**
     * 查看附件
     * @param data 
     * @returns 
     */
    viewFile: (data: unknown): Promise<unknown> => request.get('/composition/viewFile', { params: data }),
};