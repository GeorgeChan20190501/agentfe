import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useLogin } from '@/hooks/useLogin'
import { useUserStore } from '@/stores/user'

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

describe('useLogin Hook', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    // Mock localStorage in each test
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    }
    Object.defineProperty(globalThis, 'localStorage', {
      value: localStorageMock,
      writable: true,
      configurable: true
    })
  })

  it('应该初始化默认值', () => {
    const { username, password, loading, errorMessage } = useLogin()

    expect(username.value).toBe('admin')
    expect(password.value).toBe('123456')
    expect(loading.value).toBe(false)
    expect(errorMessage.value).toBe('')
  })

  it('应该在空用户名密码时显示错误', async () => {
    const { username, password, errorMessage, handleLogin } = useLogin()

    username.value = ''
    password.value = ''

    await handleLogin()

    expect(errorMessage.value).toBe('请输入用户名和密码')
  })

  it('登录成功后应该清空错误信息', async () => {
    const userStore = useUserStore()
    const mockLogin = vi.spyOn(userStore, 'login').mockResolvedValue(true)

    const { username, password, errorMessage, handleLogin } = useLogin()

    username.value = 'admin'
    password.value = '123456'

    await handleLogin()

    expect(errorMessage.value).toBe('')
    expect(mockLogin).toHaveBeenCalledWith({ username: 'admin', password: '123456' })

    mockLogin.mockRestore()
  })
})
