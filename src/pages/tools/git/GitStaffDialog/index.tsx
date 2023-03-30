import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { trim } from 'lodash'
import { useEffect, useState } from 'react'

export interface IGitStaffDialogProps extends IProps {
  open?: boolean
  onOpenChange?(isOpen: boolean): void
  onSubmit?(gitStaff: IGitStaff): void
}

export default function GitStaffDialog(props: IGitStaffDialogProps) {
  const { open = false, onOpenChange, onSubmit } = props

  const [name, setName] = useState('')
  const [emailText, setEmailText] = useState('')
  const [alternativeNameText, setAlternativeNameText] = useState('')

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setName('')
        setEmailText('')
        setAlternativeNameText('')
      }, 200)
    }
  }, [open])

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={() => void onOpenChange?.(false)}>
      <DialogTitle>关联用户</DialogTitle>

      <DialogContent>
        <DialogContentText>
          请填写曾在仓库中用到的所有用户名和邮箱，如果遗漏了可能会导致统计缺失
        </DialogContentText>

        <TextField
          label="用户名"
          placeholder="请输入用户名"
          margin="dense"
          variant="standard"
          value={name}
          onChange={e => void setName(e.target.value)}
          autoFocus
          fullWidth
        />

        <TextField
          label="邮箱"
          placeholder="请输入邮箱，多个之间用分号分隔"
          margin="dense"
          variant="standard"
          value={emailText}
          onChange={e => void setEmailText(e.target.value)}
          fullWidth
        />

        <TextField
          label="替用用户名"
          placeholder="还用过的其他用户名，多个之间以分号分隔"
          margin="dense"
          variant="standard"
          value={alternativeNameText}
          onChange={e => void setAlternativeNameText(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => void onOpenChange?.(false)}>取消</Button>
        <Button
          onClick={() => {
            if (name && emailText) {
              onSubmit?.({
                name,
                emails: emailText.split(/[；;]/).filter(Boolean).map(trim),
                alternativeNames: alternativeNameText.split(/[；;]/).filter(Boolean).map(trim),
              })
              onOpenChange?.(false)
            } else {
            }
          }}
        >
          确认
        </Button>
      </DialogActions>
    </Dialog>
  )
}
