declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

//TS 只认识 .ts、.tsx、.json 等标准格式，遇到 .vue 文件需要显式告诉它：".vue 文件是一个 Vue 组件模块"。