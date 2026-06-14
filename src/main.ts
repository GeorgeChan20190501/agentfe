import { createApp } from 'vue'
import {createPinia} from "pinia";
import router from './router/router.ts'
import Root from './Root.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


// 基于根组件，创建vue实例
const app = createApp(Root)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 将状态管理、路由、element-plus挂载[注册]到vue实例中（类似bean）
// 状态管理必须在路由之前注册
app.use(createPinia())
app.use(ElementPlus)
app.use(router)

// 最后将vue实例挂载dom节点中
app.mount('#app1')
