import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
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

import { syncRepoApi } from '@/apis/git'

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
}

export default function GitRepoCard(props: IGitRepoCardProps): RC {
  const { name, status, lastSyncTs, recentBranches, project } = props
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const [branches, setBranches] = useState<string[]>(recentBranches)

  const isLocked = isLoading || status === 'pending'

  const syncHandler = () => {
    setIsLoading(true)
    syncRepoApi(project.name, name)
      .then(res => {
        setBranches(res)
        setIsExpanded(true)
      })
      .finally(() => void setIsLoading(false))
  }

  const editHandler = () => {}

  const deleteHandler = () => {}

  return (
    <Card sx={{ display: 'block' }}>
      <CardHeader
        title={name}
        subheader={
          status === 'init' && isLoading
            ? '首次克隆中……'
            : status === 'pending' || isLoading
            ? '同步中……'
            : lastSyncTs
            ? `上次同步：${format(new Date(lastSyncTs), 'yyyy年 MM月 dd日')}`
            : '未曾同步'
        }
      />
      <CardActions disableSpacing>
        <IconButton disabled={isLocked} onClick={syncHandler}>
          <SyncIcon />
        </IconButton>

        <IconButton disabled={isLocked} onClick={editHandler}>
          <EditIcon />
        </IconButton>

        <IconButton disabled={isLocked} onClick={deleteHandler}>
          <DeleteForeverIcon />
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
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{branches.join('\n')}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
