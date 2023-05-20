import request from "@/utils/request";

export default {
    index: (data: unknown): Promise<unknown> => request.get('/composition/select', { params: data }),
    /**
     * 上传作品
     * @param data 
     * @returns 
     */
    save: (data: unknown): Promise<unknown> => request.post('/composition/insert', data),
};