import { post } from '@/utils/request'

export interface Res {
  code: number
  msg: string
  data: string
}

export interface ChatRes {
  code: number
  msg: string
  data: {
    sessionId: string
    content: string
  }
}

export const sendAiMessage = (msg: string, sessionId?: string): Promise<ChatRes> => {
  return post('/api/ai/message', { message: msg, sessionId: sessionId ?? null })
}

export interface StreamCallbacks {
  onSessionId?: (sessionId: string) => void
  onChunk: (chunk: string) => void
}

export const sendAiMessageStream = (
    msg: string,
    sessionId: string | null,
    callbacks: StreamCallbacks
): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log('[SSE] 开始流式请求:', msg)
    fetch('/api/ai/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: msg, sessionId }),
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          const reader = response.body?.getReader()
          const decoder = new TextDecoder()

          if (!reader) {
            reject(new Error('No reader available'))
            return
          }

          let buffer = ''
          let chunkCount = 0

          function read() {
            reader!.read().then(({ done, value }) => {
              if (done) {
                console.log('[SSE] 流式请求完成，共接收', chunkCount, '个数据块')
                resolve()
                return
              }

              const text = decoder.decode(value, { stream: true })
              console.log('[SSE] 收到原始数据:', text.substring(0, 100))
              buffer += text

              const lines = buffer.split('\n')
              buffer = lines.pop() || ''

              for (const line of lines) {
                if (!line.trim()) continue

                if (line.startsWith('data:')) {
                  const content = line.substring(5).trim()
                  if (content) {
                    chunkCount++

                    try {
                      const parsed = JSON.parse(content)
                      if (parsed.sessionId && callbacks.onSessionId) {
                        console.log('[SSE] 获取到sessionId:', parsed.sessionId)
                        callbacks.onSessionId(parsed.sessionId)
                        continue
                      }
                    } catch {
                      // 非JSON，当作普通内容块
                    }

                    console.log('[SSE] 解析到内容块', chunkCount, ':', content.substring(0, 50))
                    callbacks.onChunk(content)
                  }
                } else if (line === '[DONE]') {
                  console.log('[SSE] 收到结束标记')
                  resolve()
                  return
                }
              }

              read()
            }).catch(reject)
          }

          read()
        })
        .catch(reject)
  })
}
