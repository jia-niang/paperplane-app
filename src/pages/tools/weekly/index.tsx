import SendIcon from '@mui/icons-material/Send'
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { aiWeeklyApi } from '@/apis/ai'

/** 周报生成器 */
export default function WeeklyPage(): RC {
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<weeklyModeType>('normal')
  const [text, setText] = useState('')

  const [result, setResult] = useState('')

  const sendText = () => {
    if (!text) return

    setIsLoading(true)
    aiWeeklyApi(text, mode)
      .then(setResult)
      .finally(() => void setIsLoading(false))
  }

  return (
    <Container maxWidth="md">
      <Grid container direction="row" justifyContent="center">
        <TextField
          label="描述工作内容"
          placeholder="例如：完成了 1.2 版本 “发布优先职位” 功能的开发"
          value={text}
          onChange={e => void setText(e.target.value)}
          disabled={isLoading}
          fullWidth
          multiline
        />
      </Grid>

      <Grid marginTop={2} container direction="row" justifyContent="center">
        <ToggleButtonGroup
          color="primary"
          value={mode}
          onChange={(_e, value) => void setMode(m => (value ? value : m))}
          aria-label="mode"
          disabled={isLoading}
          exclusive
        >
          <ToggleButton value="normal">普通格式</ToggleButton>
          <ToggleButton value="career">科锐国际格式</ToggleButton>
          <ToggleButton value="career-fe">科锐前端格式</ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      <Grid container direction="row" justifyContent="center">
        <Button
          sx={{ margin: 2 }}
          disabled={isLoading}
          onClick={sendText}
          variant="contained"
          endIcon={<SendIcon />}
        >
          {isLoading ? '生成中……' : '生成周报'}
        </Button>
      </Grid>

      {result && !isLoading ? (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <ReactMarkdown children={result} />
        </Paper>
      ) : null}
    </Container>
  )
}
