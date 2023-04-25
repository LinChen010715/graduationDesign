import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index'
import elementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import request from '@/utils/request'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 自定义组件 - 表格
import XTable from '@/components/x-table/index.vue';
import ColumnSetting from '@/components/x-table/column-setting/index.vue';
// 自定义组件 - 表单
import XForm from '@/components/x-form/index.vue';
// 自定义组件 - 表单弹窗
import XFormDialog from '@/components/x-form/dialog.vue';

const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState({
    serializer: { // 指定参数序列化器
        serialize: JSON.stringify,
        deserialize: JSON.parse,
      }
}))

// 全局注册自定义组件 - 表格
app.component('XTable', XTable);
app.component('ColumnSetting', ColumnSetting);
// 全局注册自定义组件 - 表单
app.component('XForm', XForm);
// 全局注册自定义组件 - 表单弹窗
app.component('XFormDialog', XFormDialog);

app.use(router)
app.use(elementPlus)
app.use(pinia)



for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
