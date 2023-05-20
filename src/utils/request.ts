import axios from 'axios'
import { userStore } from "@/layout/index";
import pinia from "./index"

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,

    headers: {
        'Content-Type': 'application/json',
    },
    data: {
        appName: '',
    },
    timeout: 30000, // request timeout
});

const TOKEN = "token";


// 请求拦截
instance.interceptors.request.use(
    (config: any) => {
        const userInfoStore = userStore();
        // console.log(userInfoStore.getUserInfo());
        console.log('24',userInfoStore.userInfo);
        
        // const { token } =  userInfoStore.getUserInfo()
        const token = userInfoStore.userInfo.token;
        // 统一添加token
        if (config.headers) {
            config.headers['TOKEN'] = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance
