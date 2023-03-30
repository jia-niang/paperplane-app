import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { noop } from 'lodash'

export interface INormalCardProps extends IProps {
  title: string
  desc?: string
  disabled?: boolean
  onButtonClick?(): void
}

export default function NormalCard(props: INormalCardProps): RC {
  const { title, desc, disabled, onButtonClick = noop } = props

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
        <Button disabled={disabled} onClick={onButtonClick} size="small">
          {disabled ? '不可用' : '前往'}
        </Button>
      </CardActions>
    </Card>
  )
}
