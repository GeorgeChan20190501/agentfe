<template>
  <div class="dashboard-container">
    <el-card>
      <template #header>
        <div class="header">
          <h2>控制台</h2>
          <el-button type="danger" @click="handleLogout">退出登录</el-button>
        </div>
      </template>
      <p>这是受保护的页面，需要登录才能访问</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { logout } from '@/api/user'

  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('退出失败:', error)
    } finally {
      localStorage.removeItem('token')
      ElMessage.success('已退出登录')
      router.push('/login')
    }
  }
</script>

<style scoped>
  .dashboard-container {
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
