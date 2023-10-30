import store from 'store'

import { SK_CLIENT_ID } from './storageKeys'

function uuid(len: number = 8): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const uuid: string[] = []
  const radix = 16

  for (let i = 0; i < len; i++) {
    uuid[i] = chars[0 | (Math.random() * radix)]
  }

  return uuid.join('')
}

/** 获取客户端 ID */
export function ensureClientId() {
  const storagedClientId = store.get(SK_CLIENT_ID)

  if (storagedClientId) {
    return storagedClientId
  }

  const newClientId = uuid()
  store.set(SK_CLIENT_ID, newClientId)

  return newClientId
}
