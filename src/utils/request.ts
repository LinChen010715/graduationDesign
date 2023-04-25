import axios from 'axios'

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
export default instance
