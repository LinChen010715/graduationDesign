import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index'
import elementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css';
import request from '@/utils/request'

console.log(request);


const app = createApp(App)

app.use(router)
app.use(elementPlus)

app.mount('#app')
