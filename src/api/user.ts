import { get, post } from '@/utils/request'

export interface UserInfo {
  id: number
  name: string
  email: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
  userInfo: UserInfo
}

// 登录
export const login = (data: LoginParams): Promise<LoginResult> => {
  return post('/auth/login', data)
}

// 获取用户信息
export const getUserInfo = (): Promise<UserInfo> => {
  return get('/user/info')
}

// 退出登录
export const logout = (): Promise<void> => {
  return post('/auth/logout')
}
