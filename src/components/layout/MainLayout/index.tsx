import { useTitle } from 'ahooks'
import { last } from 'lodash'
import { Fragment } from 'react'
import { Outlet, useMatches } from 'react-router-dom'

import { RouteObjectType } from '@/router'

import PageHeader from './PageHeader'

export default function MainLayout(): RC {
  const currentRoute = last(useMatches())

  const routeMeta = currentRoute?.handle as RouteObjectType | undefined

  useTitle(
    routeMeta?.title
      ? `${routeMeta?.title} | ${process.env.REACT_APP_WEBSITE_TITLE}`
      : `${process.env.REACT_APP_WEBSITE_TITLE}`
  )

  return (
    <Fragment>
      <PageHeader />
      <Outlet />
    </Fragment>
  )
}
