<template>
  <div class="home-container">
    <el-card>
      <template #header>
        <h2>{{msg}}</h2>
      </template>
      <p>这是一个基于 Vue3 + Vite + Element Plus 的项目</p>
      <el-button type="primary" @click="testRequest">测试封装后的请求</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import service from '@/utils/request'
  import {ref} from "vue";
  let msg:string = ref('1')
  const testRequest = async () => {
    try {
      const data1 = await service.get('/chat')
      console.log('请求成功:', data1)
      alert('请求成功！查看控制台'+data1)
      msg.value = data1
    } catch (error) {
      console.error('请求失败:', error)
    }
  }
</script>

<style scoped>
  .home-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
