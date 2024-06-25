import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { setDefaultOptions } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, merge } from 'tdesign-react'
import 'tdesign-react/dist/reset.css'
import zhConfig from 'tdesign-react/es/locale/zh_CN'

import RouterEntry from './router'
import { ensureClientId } from './utils/clientId'

import '@/styles/global.scss'
import '@/styles/tailwind.css'
import '@/styles/theme.scss'

setDefaultOptions({ locale: zhCN })

ensureClientId()

const globalConfig = merge(zhConfig, {})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const emotionCacheConfig = createCache({
  key: 'paperplane-app-default',
  nonce: 'emotion',
})

root.render(
  <ConfigProvider globalConfig={globalConfig}>
    <CacheProvider value={emotionCacheConfig}>
      <RouterEntry />
    </CacheProvider>
  </ConfigProvider>
)
