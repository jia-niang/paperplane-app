import loadable from '@loadable/component'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import MainLayout from '@/components/layout/main'
import HomePage from '@/pages'

const ToolsPage = loadable(() => import(/* webpackPrefetch: true */ '@/pages/tools'))
const DingtalkPage = loadable(() => import(/* webpackPrefetch: true */ '@/pages/tools/dingtalk'))
const WeeklyPage = loadable(() => import(/* webpackPrefetch: true */ '@/pages/tools/weekly'))
const GPTChatPage = loadable(() => import(/* webpackPrefetch: true */ '@/pages/tools/gptchat'))
const GitPage = loadable(() => import(/* webpackPrefetch: true */ '@/pages/tools/git'))

const routerConfig: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },

      { path: '/tools', element: <ToolsPage /> },
      { path: '/tools/dingtalk', element: <DingtalkPage /> },
      { path: '/tools/weekly', element: <WeeklyPage /> },
      { path: '/tools/gptchat', element: <GPTChatPage /> },
      { path: '/tools/git', element: <GitPage /> },
    ],
  },
]

const router = createBrowserRouter(routerConfig, { basename: process.env.PUBLIC_URL })

export default function RouterEntry(): RC {
  return <RouterProvider router={router} />
}
