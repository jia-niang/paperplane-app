import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

export interface IConfirmDialogProps extends IProps {
  open?: boolean
  onOpenChange?(isOpen: boolean): void
  onCancel?(): void
  onSubmit?(): void
  title?: string
  content?: string
  inputLabel?: string
  inputPlaceholder?: string
}

export default function ConfirmDialog(props: IConfirmDialogProps) {
  const { open = false, onOpenChange, onSubmit, onCancel, title, content } = props

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={() => {
        onOpenChange?.(false)
        onCancel?.()
      }}
    >
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      {content ? (
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      ) : null}

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
            onOpenChange?.(false)
            onSubmit?.()
          }}
        >
          确认
        </Button>
      </DialogActions>
    </Dialog>
  )
}
