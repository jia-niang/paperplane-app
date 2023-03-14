import loadable from '@loadable/component'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import MainLayout from '@/components/layout/main'
import HomePage from '@/pages'

const ToolsPage = loadable(() => import('@/pages/tools'))
const DingtalkPage = loadable(() => import('@/pages/tools/dingtalk'))
const WeeklyPage = loadable(() => import('@/pages/tools/weekly'))

const routerConfig: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },

      {
        path: '/tools',
        element: <ToolsPage />,
        children: [
          { path: '/tools/dingtalk', element: <DingtalkPage /> },
          { path: '/tools/weekly', element: <WeeklyPage /> },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routerConfig, { basename: process.env.PUBLIC_URL })

export default function RouterEntry(): RC {
  return <RouterProvider router={router} />
}
