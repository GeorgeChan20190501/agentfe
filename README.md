NEW_FILE_CODE
# My Vue3 - 现代化前端项目模板

![CI/CD](https://github.com/GeorgeChan20190501/agentfe/actions/workflows/ci-cd.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.5-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)

一个基于 **Vue 3 + TypeScript + Vite** 的现代化前端项目模板，具备完整的工程化配置和自动化部署能力。

**在线预览**: http://122.51.82.232:7090

---

## ✨ 核心特性

### 🏗️ 技术栈
- **Vue 3.5** - 渐进式 JavaScript 框架（Composition API + `<script setup>`）
- **TypeScript 6.0** - 类型安全的 JavaScript 超集
- **Vite 8** - 极速的前端构建工具
- **Pinia 3** - Vue 官方推荐的状态管理库
- **Vue Router 4** - 官方路由管理器
- **Axios** - 基于 Promise 的 HTTP 客户端
- **Element Plus** - Vue 3 组件库

### 🔧 工程化
- ✅ **代码规范** - ESLint + Prettier 自动检查和格式化
- ✅ **类型检查** - TypeScript 严格模式，无 `any` 类型
- ✅ **单元测试** - Vitest + @vue/test-utils，测试覆盖率可视化
- ✅ **CI/CD** - GitHub Actions 自动化构建、测试、部署
- ✅ **环境变量** - 多环境配置（开发/测试/生产）
- ✅ **路径别名** - `@/` 指向 `src/`，简化导入路径

### 🚀 性能优化
- ⚡ **路由懒加载** - 按需加载页面组件
- ⚡ **CDN 加速** - 静态资源 CDN 分发
- ⚡ **Gzip 压缩** - Nginx 自动压缩传输
- ⚡ **浏览器缓存** - 静态资源长期缓存策略

---

## 📦 快速开始

### 前置要求
- Node.js >= 24.0.0
- npm >= 11.0.0

### 安装依赖
```bash 
npm install
```
### 开发模式
```bash 
npm run dev
```
### 预览生产构建
```bash
npm run preview
````

### 生产环境打包
```bash
npm run build
````
---

## 🛠️ 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产环境打包 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | ESLint 代码检查并自动修复 |
| `npm run format` | Prettier 格式化代码 |
| `npm run type-check` | TypeScript 类型检查 |
| `npm run test` | 运行单元测试（监听模式） |
| `npm run test:run` | 运行单元测试（单次） |
| `npm run test:coverage` | 生成测试覆盖率报告 |

---

## 📁 项目结构

my-vue3/ <br/>
├── .github/workflows/     ===》`#GitHub Actions CI/CD 配置`<br/>
├── public/ ============》 静态资源 <br/>
├── src/ <br/>
│ ├── api/ ============》# API 接口层,发起http请求<br/>
│ │ └── user.ts  <br/>
│ ├── assets/ =========》# 资源文件（图片、字体等）<br/>
│ ├── components/ =====》# UI组件，封装html片段 <br/>
│ ├── hooks/ ==========》# 组合式函数（业务逻辑）<br/>
│ │ └── useLogin.ts  <br/>
│ ├── router/ =========》# 路由配置<br/>
│ │ └── router.ts ======》# 路由定义 + 守卫<br/>
│ ├── stores/ =========》# Pinia 状态管理<br/>
│ │ └── user.ts  <br/>
│ ├── utils/ ===========》# 工具函数<br/>
│ │ └── request.ts =====》# Axios 封装<br/>
│ ├── views/ ==========》# 页面组件<br/>
│ │ ├── Login.vue  <br/>
│ │ ├── Home.vue  <br/>
│ │ └── About.vue <br/>
│ ├── App.vue ============》# 根组件 <br/>
│ └── main.ts ============》# 入口文件<br/>
├── .env  ================》# 通用环境变量 <br/>
├── .env.development ======》# 开发环境配置<br/>
├── .env.production ========》# 生产环境配置<br/>
├── .eslintrc.cjs ===========》# 配置ESLint 代码质量检查工具<br/>
├── .prettierignore =========》# 格式化忽略文件配置<br/>
├── .prettierrc.json =========》# 格式化配置文件<br/>
├── tsconfig.json ==========》# TypeScript 配置 <br/>
├── tsconfig.app.json =======》# Vue应用TS配置 <br/>
├── tsconfig.node.json ======》# Node/vite应用TS配置 <br/>
├── package.json ==========》# 项目核心依赖<br/>
├── package-lock.json ======》# 项目依赖的具体依赖树<br/>
├── vite.config.ts ==========》# Vite 配置<br/>
└── README.md =========》# 项目说明 <br/>

# 项目说明
---

## 🎯 架构设计

### 分层架构
Views (视图层) <br/>
↓ <br/>
Hooks (业务逻辑层) <br/>
↓ <br/>
Stores (状态管理层) <br/>
↓ <br/>
API (接口层) <br/>
↓ <br/>
Utils (工具层)<br/>


### 核心原则
- **逻辑与视图分离** - 业务逻辑抽离到 `hooks/`，组件只负责 UI 渲染
- **单一职责** - 每个模块只负责一个功能
- **类型安全** - 所有 API 响应都有明确的 TypeScript 接口定义

---

## 🔐 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_APP_TITLE` | 应用标题 | `My Vue3 App` |
| `VITE_API_BASE_URL` | API 基础地址 | `https://api.example.com` |
| `VITE_ENABLE_MOCK` | 是否启用 Mock | `true/false` |
| `VITE_ENABLE_LOG` | 是否开启日志 | `true/false` |

---

## 🚀 CI/CD 流程

### 自动化流水线

流程说明：

1. **Push Code** - 推送代码到仓库
2. **CI: Lint & Test** - 执行代码检查和单元测试
3. **Pass?** - 判断是否通过
    - ✅ **Yes** → 进入构建阶段
    - ❌ **No** → 通知开发者修复
4. **Build** - 打包生产代码
5. **CD: Deploy to Server** - 部署到服务器
6. **Verify Deployment** - 验证部署结果

### 触发条件
- **Push 到 main/master 分支** - 自动执行完整 CI/CD 流程
- **Pull Request** - 仅执行 CI（代码检查 + 测试）

### 部署目标
- **服务器**: CentOS + Nginx
- **部署路径**: `/www/wwwroot/my-vue3`
- **自动重载**: Nginx 配置自动生效

---

## 📊 测试覆盖率

运行以下命令查看覆盖率报告：
```bash 
npm run test:coverage
```
报告会生成在 `coverage/` 目录，打开 `coverage/index.html` 查看详细分析。

---

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

MIT License

---

## 👨‍💻 作者

**George Chan**
- GitHub: [@GeorgeChan20190501](https://github.com/GeorgeChan20190501)
- Email: 327052186@qq.com

---

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Element Plus](https://element-plus.org/) - Vue 3 组件库
