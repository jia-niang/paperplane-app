import { client } from '@/utils/client'

export async function gptChatApi(text: string): Promise<string> {
  return client
    .post('/ai/chat', { text })
    .then(res => res.data)
    .then(res => res.answer)
}
