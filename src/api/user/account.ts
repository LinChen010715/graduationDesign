import request from "@/utils/request";

export default {
    index: (data: unknown): Promise<unknown> => request.get('/user/select', { params: data }),
    save: (data: unknown): Promise<unknown> => request.post('/user/insert', data),
    del: (data: unknown): Promise<unknown> => request.post('/user/delete', data),
};