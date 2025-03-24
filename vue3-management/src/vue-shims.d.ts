/**
 * 解决 router 中引入 .vue 文件报找不到模块"****"或其响应的类型声明
 * 这段代码告诉 TypeScript，所有以 .vue 结尾的文件都是 Vue 组件，可以通过 import 语句进行导入。
 */
declare module '*.vue' {
  import { Component } from 'vue'
  const component: Component
  export default component
}
