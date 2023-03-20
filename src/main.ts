import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index'
import elementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import request from '@/utils/request'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'



const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState({
    serializer: { // 指定参数序列化器
        serialize: JSON.stringify,
        deserialize: JSON.parse,
      }
}))

app.use(router)
app.use(elementPlus)
app.use(pinia)

app.mount('#app')
