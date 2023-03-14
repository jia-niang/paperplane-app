import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

import './index.scss'

/** 全站主 Layout */
export default function MainLayout(): RC {
  return (
    <Container maxWidth="lg" className="tools-layout">
      <Box display="flex" justifyContent="center">
        <div>Paperplane App</div>
      </Box>
      <Outlet />
    </Container>
  )
}
