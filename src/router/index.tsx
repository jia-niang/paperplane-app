import { pick } from 'lodash'
import { ReactNode } from 'react'
import { createBrowserRouter, Navigate, IndexRouteObject, RouterProvider } from 'react-router-dom'

import MainLayout from '@/components/layout/MainLayout'
import PageLoading from '@/components/loading/PageLoading'
import Page404 from '@/pages/fallbacks/page-404'
import HomePage from '@/pages/home'
import { traverseTree } from '@/utils/traverseTree'

import lazy from './lazy'

export type RouterHandleType = {
  /** 网页标题 title */
  title?: string

  /** 覆盖面包屑中使用的标题 */
  breadcrumbTitle?: ReactNode
}

export type RouteObjectType = Omit<IndexRouteObject, 'index' | 'children' | 'handle'> &
  RouterHandleType & {
    children?: RouteObjectType[]
    index?: any
    handle?: RouterHandleType
  }

export const routerConfig: RouteObjectType[] = [
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: 'gpt',
        title: 'GPT 问答',
        element: lazy(() => import(/* webpackPrefetch: true */ '@/pages/gpt')),
      },

      { path: '404', title: '页面不见了', element: <Page404 /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
]

traverseTree(routerConfig, item => {
  item.handle = { ...pick(item, ['title', 'breadcrumbTitle']), ...item.handle }
})

export const router = createBrowserRouter(routerConfig, { basename: process.env.PUBLIC_URL })

export default function RouterEntry(): RC {
  return <RouterProvider router={router} fallbackElement={<PageLoading />} />
}
