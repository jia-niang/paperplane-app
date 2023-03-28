import SendIcon from '@mui/icons-material/Send'
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import hljs from 'highlight.js'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { gptChatApi } from '@/apis/ai'
import '@/global/highlight.scss'

import './index.scss'

/** GPT 聊天 */
export default function GPTChatPage(): RC {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [answer, setAnswer] = useState('')

  const sendText = () => {
    if (!text) return

    setIsLoading(true)
    gptChatApi(text)
      .then(answer => {
        setAnswer(answer)
        setTimeout(() => {
          document
            .querySelectorAll<HTMLElement>('.gptchat__answer-md pre code')
            .forEach(hljs.highlightElement)
        }, 100)
      })
      .finally(() => void setIsLoading(false))
  }

  return (
    <Container maxWidth="md">
      <Grid container direction="row" justifyContent="center">
        <TextField
          label="对 AI 说"
          placeholder="例如：中国有多少个省份？"
          value={text}
          onChange={e => void setText(e.target.value)}
          disabled={isLoading}
          fullWidth
          multiline
        />
        <Button
          sx={{ margin: 2 }}
          disabled={isLoading}
          onClick={sendText}
          variant="contained"
          endIcon={<SendIcon />}
        >
          {isLoading ? '等待答复……' : '发给 GPT-3'}
        </Button>
      </Grid>

      {answer && !isLoading ? (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Typography align="center" variant="h5" gutterBottom>
            GPT 的回答
          </Typography>
          <ReactMarkdown className="gptchat__answer-md" children={answer} />
        </Paper>
      ) : null}
    </Container>
  )
}
