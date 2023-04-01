import { Paper, Typography } from '@mui/material'

export interface ISSHKeyProps {
  sshKey?: string
}

export default function SSHKey(props: ISSHKeyProps): RC {
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
          {props.sshKey}
        </Typography>
      </Paper>
    </>
  )
}
