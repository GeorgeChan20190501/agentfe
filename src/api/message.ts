import { get, post } from '@/utils/request'

export interface Res {
  code: number
  msg: string
  data: object
}

// 发送消息到 AI
export const sendAiMessage = (msg: string): Promise<Res> => {
  return post('/ai/message', msg)
}


