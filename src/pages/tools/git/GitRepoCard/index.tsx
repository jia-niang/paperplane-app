import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SyncIcon from '@mui/icons-material/Sync'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { useState } from 'react'

import { deleteGitRepoApi, syncRepoApi } from '@/apis/git'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export interface IGitRepoCardProps extends IGitRepo, IProps {
  project: IGitProject
  onMutate?(): void
}

export default function GitRepoCard(props: IGitRepoCardProps): RC {
  const { name, status, lastSyncTs, recentBranches, project, onMutate } = props

  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(() => recentBranches.length > 0)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const isLocked = isLoading || status === 'pending'

  const syncHandler = () => {
    setIsLoading(true)
    syncRepoApi(project.name, name).then(() => void onMutate?.())
  }

  const confirmDeleteHandler = () => {
    setIsLoading(true)
    deleteGitRepoApi(project.name, name)
      .then(() => void onMutate?.())
      .finally(() => void setIsLoading(false))
  }

  return (
    <Card sx={{ display: 'block' }}>
      <CardHeader
        title={name}
        subheader={
          status === 'error'
            ? '同步出错'
            : status === 'pending' || isLoading
            ? '同步中……'
            : lastSyncTs
            ? `上次同步：${format(new Date(lastSyncTs), 'yyyy年 MM月 dd日 HH:mm')}`
            : '未曾同步'
        }
      />
      <CardActions disableSpacing>
        <IconButton disabled={isLocked} onClick={syncHandler}>
          <SyncIcon />
        </IconButton>

        <IconButton disabled={isLocked} onClick={() => void setIsDeleteDialogOpen(true)}>
          <DeleteIcon />
        </IconButton>

        {recentBranches.length <= 0 ? null : (
          <ExpandMore
            disabled={isLocked}
            expand={isExpanded}
            onClick={() => void setIsExpanded(!isExpanded)}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>近期提交过的分支：</Typography>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{recentBranches.join('\n')}</Typography>
        </CardContent>
      </Collapse>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title={`确定要删除分支 ${name} 吗？`}
        onSubmit={confirmDeleteHandler}
      />
    </Card>
  )
}
