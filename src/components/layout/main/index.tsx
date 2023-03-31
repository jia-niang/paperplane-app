import HomeIcon from '@mui/icons-material/Home'
import { Box, Button, Container, Divider, Grid, IconButton, Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'

/** 全站主 Layout */
export default function MainLayout(): RC {
  const navigate = useNavigate()

  return (
    <Container maxWidth="lg" className="tools-layout">
      <Grid height={80} container direction="row" justifyContent="center" alignItems="center">
        <Typography onClick={() => void navigate('/')} style={{ cursor: 'pointer' }} variant="h4">
          Paperplane 🌠 Web App
        </Typography>
      </Grid>

      <Grid container direction="row" justifyContent="center" alignItems="center">
        <IconButton
          onClick={() => void navigate('/')}
          color="primary"
          aria-label="back home"
          component="label"
        >
          <HomeIcon />
        </IconButton>
        <Button
          variant="text"
          onClick={() => void window.open('https://git.paperplane.cc/jia-niang/paperplane-app')}
        >
          源码
        </Button>
        <Button variant="text" onClick={() => void window.open('https://paperplane.cc/')}>
          博客
        </Button>
        <Button variant="text" onClick={() => void window.open('https://share.paperplane.cc/')}>
          分享
        </Button>
        <Button variant="text" onClick={() => void window.open('https://tl.paperplane.cc/')}>
          TimeLine
        </Button>
        <img
          onClick={() => void window.open('https://drone.paperplane.cc/jia-niang/paperplane-app')}
          src="https://drone.paperplane.cc/api/badges/jia-niang/paperplane-app/status.svg"
          alt="build status"
          style={{ cursor: 'pointer', padding: '8px 16px' }}
        />
      </Grid>

      <Divider style={{ marginTop: 24 }}></Divider>

      <Box mt={4} mb={4}>
        <Outlet />
      </Box>
    </Container>
  )
}
