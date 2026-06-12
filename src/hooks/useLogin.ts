import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

export function useLogin() {
  const router = useRouter()
  const userStore = useUserStore()

  // 状态管理
  const username = ref('admin')
  const password = ref('123456')
  const loading = ref(false)
  const errorMessage = ref('')

  // 核心逻辑
  async function handleLogin() {
    if (!username.value || !password.value) {
      errorMessage.value = '请输入用户名和密码'
      return
    }

    loading.value = true
    errorMessage.value = ''

    try {
      const success = await userStore.login({ username: username.value, password: password.value })
      if (success) {
        await router.push('/')
      } else {
        errorMessage.value = '用户名或密码错误（试试 admin / 123456）'
      }
    } catch (error) {
      errorMessage.value = '登录请求失败，请稍后重试'
    } finally {
      loading.value = false
    }
  }

  return {
    username,
    password,
    loading,
    errorMessage,
    handleLogin
  }
}
