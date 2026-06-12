import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as apiLogin, type LoginParams, logout as apiLogout, type UserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userInfo = ref<UserInfo | null>(null)

  const isLoggedIn = computed(() => !!token.value)

  async function login(data: LoginParams) {
    try {
      const res = await apiLogin(data)
      token.value = res.token
      userInfo.value = res.userInfo
      localStorage.setItem('token', res.token)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  async function logout() {
    try {
      await apiLogout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      token.value = ''
      userInfo.value = null
      localStorage.removeItem('token')
    }
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    login,
    logout
  }
})
