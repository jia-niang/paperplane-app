import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'

export interface IInputDialogProps extends IProps {
  open?: boolean
  onOpenChange?(isOpen: boolean): void
  onCancel?(): void
  onSubmit?(text: string): void
  title?: string
  content?: string
  inputLabel?: string
  inputPlaceholder?: string
}

export default function InputDialog(props: IInputDialogProps) {
  const {
    open = false,
    onOpenChange,
    onCancel,
    onSubmit,
    title,
    content,
    inputLabel,
    inputPlaceholder,
  } = props

  const [inputText, setInputText] = useState('')

  useEffect(() => {
    if (!open) {
      setTimeout(() => void setInputText(''), 200)
    }
  }, [open])

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={() => void onOpenChange?.(false)}>
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent>
        {content ? <DialogContentText>{content}</DialogContentText> : null}
        <TextField
          placeholder={inputPlaceholder}
          margin="dense"
          label={inputLabel}
          variant="standard"
          value={inputText}
          onChange={e => void setInputText(e.target.value)}
          autoFocus
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onOpenChange?.(false)
            onCancel?.()
          }}
        >
          取消
        </Button>
        <Button
          onClick={() => {
            if (inputText) {
              onOpenChange?.(false)
              onSubmit?.(inputText)
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
