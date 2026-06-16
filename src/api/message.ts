import { post } from '@/utils/request'

export interface Res {
  code: number
  msg: string
  data: string
}

// 发送消息到 AI（非流式）
export const sendAiMessage = (msg: string): Promise<Res> => {
  return post('/api/ai/message', { message: msg })
}

// 发送消息到 AI（流式）
export const sendAiMessageStream = (msg: string, onChunk: (chunk: string) => void): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log('[SSE] 开始流式请求:', msg)
    fetch('/api/ai/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: msg }),
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
            
            // 解码并添加到缓冲区
            const text = decoder.decode(value, { stream: true })

            console.log('[SSE] 收到原始数据:', text.substring(0, 100))
            buffer += text
            
            // 按行分割处理 SSE 格式
            const lines = buffer.split('\n')
            // 保留最后一个不完整的行在缓冲区中
            buffer = lines.pop() || ''
            
            // 处理每一行
            for (const line of lines) {
              // 跳过空行
              if (!line.trim()) continue
              
              // 处理 SSE 格式的 data: 前缀
              if (line.startsWith('data:')) {
                const content = line.substring(5).trim()
                if (content) {
                  chunkCount++
                  console.log('[SSE] 解析到内容块', chunkCount, ':', content.substring(0, 50))
                  onChunk(content)
                }
              } else if (line === '[DONE]') {
                // SSE 结束标记
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

