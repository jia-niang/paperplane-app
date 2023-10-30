import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { SK_SETTING } from '@/utils/storageKeys'

export interface IGloalSetting {
  gptSetting: {
    saveHisotry: boolean
  }
}

export const useGloalSetting = create(
  persist(
    () => ({
      gptSetting: {
        saveHisotry: true,
      },
    }),
    { name: SK_SETTING }
  )
)
