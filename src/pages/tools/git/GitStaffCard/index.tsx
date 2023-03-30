import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import SyncIcon from '@mui/icons-material/Sync'
import { Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material'

const emptyArray: any[] = []

export interface IGitStaffCardProps extends IGitStaff {}

export default function GitStaffCard(props: IGitStaffCardProps): RC {
  const { name, emails = emptyArray, alternativeNames = emptyArray } = props

  const editHandler = () => {}

  const deleteHandler = () => {}

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
        <IconButton onClick={editHandler}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={deleteHandler}>
          <DeleteForeverIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
