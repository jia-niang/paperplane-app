import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export interface IProjectInfo {
  title: string
  desc: string
  link: string
  disabled?: boolean
}

export interface IProjectCardProps extends IProjectInfo, IProps {}

export default function ProjectCard(props: IProjectCardProps): RC {
  const { title, desc, link, disabled } = props

  const navigate = useNavigate()

  return (
    <Card variant="outlined" sx={{ width: 250, position: 'relative', paddingBottom: '48px' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions sx={{ position: 'absolute', bottom: 0 }}>
        <Button disabled={disabled} onClick={() => void navigate(link)} size="small">
          {disabled ? '不可用' : '前往'}
        </Button>
      </CardActions>
    </Card>
  )
}
