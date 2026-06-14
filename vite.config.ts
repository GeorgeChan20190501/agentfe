import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000,           //建议明确端口
      host: '0.0.0.0',      // 允许局域网访问
      open: true,           // 自动打开浏览器
      cors: true,           // 启用 CORS
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_ADDRESS || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      outDir: 'dist',           // 输出目录（默认就是 dist）
      assetsDir: 'assets',      // 静态资源目录
      sourcemap: false,         // 生产环境是否生成 source map
      chunkSizeWarningLimit: 1000, // chunk 大小警告阈值（KB）
      rollupOptions: {
        output: {
          manualChunks(id) {    // 代码分割优化（新语法）
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