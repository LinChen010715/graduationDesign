import request from "@/utils/request";

export default {
    index: (data: unknown): Promise<unknown> => request.get('/user/select', { params: data }),
    // save: (data: unknown): Promise<unknown> => post('/customer/request/save', data),
    // detail: (data: unknown): Promise<any> => get('/customer/request/detail', { params: data }),
    // del: (data: unknown): Promise<unknown> => post('/customer/request/deleteBatch', data),
};