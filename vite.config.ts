import { defineConfig, loadEnv } from 'vite' // 解构导入，意味着vite模块中又多个导出
import vue from '@vitejs/plugin-vue'         // 默认导入，意味着模块中只有一个默认导出 @vitejs 表示官方维护，/plugin-vue 表示维护的是一个vite处理vue文件插件
import { fileURLToPath, URL } from 'url'

// vite 配置辅助函数，用于接受环境参数，返回用户环境配置对象
export default defineConfig(({ mode }) => {
  // loadEnv 是 Vite 用来读取项目根据目录下 .env 文件的，mode 参数指定了要读取的 .env 文件的模式
  const env = loadEnv(mode, process.cwd(), '')

  // 返回的配置对象将与 Vite 的默认配置进行合并
  return {
    // 插件列表，Vite 启动时加载这些插件，获得处理 .vue 文件的能力
    plugins: [vue()],
    // 告诉vite如何解析一个import路径
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)) // 解析成绝对路径 D:/xx
      },
      extensions: ['.mjs','.js', '.json', '.ts', '.tsx', '.vue']    // 自动补全的文件扩展名
    },
    // 服务器配置
    server: {
      port: 3000,           // 建议明确端口,默认5173
      host: '0.0.0.0',      // 允许局域网访问
      open: true,           // 自动打开浏览器
      cors: true,           // 启用 CORS
      proxy: {
        '/api': {           // 匹配axios封装的api请求
          target: env.VITE_BACKEND_ADDRESS || 'http://localhost:8080', // 代理到后端的Host
          changeOrigin: true,                                          // 转发请求头中的host字段为target字段的值
          rewrite: (path) => path.replace(/^\/api/, '')         // 重写路径，去掉/api前缀
        }
      }
    },
    // 构建配置
    build: {
      outDir: 'dist',           // 输出目录（默认就是 dist）
      assetsDir: 'assets',      // 静态资源目录
      sourcemap: false,         // 生产环境是否生成 source map，避免源码映射泄露，减少包大小，构建更快
      chunkSizeWarningLimit: 1000, // chunk大小警告阈值（KB），vite按策略将打包后代码分割成多个chunk（块），避免单个chunk过大，同时可以按需加载，第三方库可长期缓存。默认500kb，适当调大，防止过多警告
      rollupOptions: {          //通常无需配置，默认的已经足够使用
        output: {
          manualChunks(id) {    // 代码分割优化, 手动指定哪些模块打包成一个 chunk
            if (id.includes('node_modules')) {
              if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) {
                return 'vue-vendor'
              }
              if (id.includes('element-plus')) {
                return 'element-vendor'
              }
              return 'vendor'
            }
          }
        }
      }
    }
  }
})

//所有 Vite 的工作行为都在这里定义
//1.开发时候，会启动一个本地服务器，配置热更新、代理等 ,npm run dev
//2.构建的时候，指导打包流程，优化输出产物 ,npm run build

// Vite 启动
//     ↓
// 读取 vite.config.ts
//     ↓
// 执行 defineConfig 中的函数（传入 mode 参数） npm run dev,就是dev环境
//     ↓
// 函数内部调用 loadEnv 读取环境变量
//     ↓
// 返回配置对象
//     ↓
// Vite 将配置与默认值合并
//     ↓
// 启动开发服务器 或 执行打包
