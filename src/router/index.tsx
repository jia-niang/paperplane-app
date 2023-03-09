import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from '@/pages/homepage'

const router = createBrowserRouter([{ path: '/', element: <Home /> }], {
  basename: process.env.PUBLIC_URL,
})

function RouterEntry(): RC {
  return <RouterProvider router={router} />
}

export default RouterEntry
