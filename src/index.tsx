import { setDefaultOptions } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, merge } from 'tdesign-react'
import 'tdesign-react/dist/reset.css'
import zhConfig from 'tdesign-react/es/locale/zh_CN'

import RouterEntry from './router'
import { ensureClientId } from './utils/clientId'

import '@/styles/global.scss'
import '@/styles/theme.scss'

setDefaultOptions({ locale: zhCN })

ensureClientId()

const globalConfig = merge(zhConfig, {})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.Fragment>
    <ConfigProvider globalConfig={globalConfig}>
      <RouterEntry />
    </ConfigProvider>
  </React.Fragment>
)
