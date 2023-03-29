import { client } from '@/utils/client'

export async function gptChatApi(text: string): Promise<string> {
  return client.post('/ai/chat', { text }).then(res => res.answer)
}

export async function aiWeeklyApi(text: string, mode: weeklyModeType): Promise<string> {
  return client.post('/ai/weekly', { text, mode }).then(res => res.answer)
}
