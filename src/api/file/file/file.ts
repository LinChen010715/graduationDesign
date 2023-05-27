import request from "@/utils/request";

export default {
    index: (data: unknown): Promise<unknown> => request.get('/composition/select', { params: data }),
    /**
     * 驳回
     * @param data 
     * @returns 
     */
    reject: (data: unknown): Promise<unknown> => request.post('/composition/reject', data),
    /**
     * 设为优秀作品
     * @param data 
     * @returns 
     */
    setGreat:(data: unknown): Promise<unknown> => request.post('/composition/set', data),

    /**
     * 查看附件
     * @param data 
     * @returns 
     */
    viewFile: (data: unknown): Promise<unknown> => request.get('/composition/viewFile', { params: data }),
    
};