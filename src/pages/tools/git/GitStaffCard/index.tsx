import DeleteIcon from '@mui/icons-material/Delete'
import { Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material'
import { useState } from 'react'

import { deleteGitStaffApi } from '@/apis/git'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'

const emptyArray: any[] = []

export interface IGitStaffCardProps extends IGitStaff {
  project: IGitProject
  onMutate?(): void
}

export default function GitStaffCard(props: IGitStaffCardProps): RC {
  const { _id, name, emails = emptyArray, alternativeNames = emptyArray, project, onMutate } = props

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const confirmDeleteHandler = () => {
    deleteGitStaffApi(project._id, _id).then(() => void onMutate?.())
  }

  return (
    <Card sx={{ display: 'block' }}>
      <CardHeader title={name} />

      <CardContent sx={{ whiteSpace: 'pre-wrap' }}>
        邮箱：
        <br />
        {emails.join('\n')}
      </CardContent>

      {alternativeNames.length > 0 ? (
        <CardContent sx={{ whiteSpace: 'pre-wrap' }}>
          替用名：
          <br />
          {alternativeNames.join('\n')}
        </CardContent>
      ) : null}

      <CardActions disableSpacing>
        <IconButton onClick={() => void setIsDeleteDialogOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title={`确定要删除用户 ${name} 吗？`}
        onSubmit={confirmDeleteHandler}
      />
    </Card>
  )
}
