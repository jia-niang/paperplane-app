import { Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { fetchSSHKeyApi } from '@/apis/git'

export default function SSHKey(): RC {
  const [sshKey, setSshKey] = useState('')

  useEffect(() => {
    fetchSSHKeyApi().then(setSshKey)
  }, [])

  return (
    <>
      <Typography align="center" variant="h4">
        添加 SSH 公钥
      </Typography>

      <Paper sx={{ p: 2 }} elevation={1}>
        <Typography
          variant="body2"
          sx={{
            wordBreak: 'break-all',
            fontFamily: `"Source Code Pro", -apple-system, sans-serif`,
          }}
        >
          {sshKey}
        </Typography>
      </Paper>
    </>
  )
}
