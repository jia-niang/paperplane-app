import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

import './index.scss'

/** 工具入口页的 Layout */
export default function ToolsLayout(): RC {
  return (
    <Container className="tools-layout">
      <Outlet />
    </Container>
  )
}
