import { Container, Grid, Typography } from '@mui/material'

import ProjectCard, { IProjectInfo } from '@/components/cards/ProjectCard'

const toolsList: IProjectInfo[] = [
  {
    title: 'GPT-3 聊天',
    desc: '基于 OpenAI 的 GPT-3 模型，提供 AI 对话功能。',
    link: '/tools/gptchat',
    disabled: false,
  },
  {
    title: '钉钉机器人',
    desc: '使用钉钉机器人发送消息。',
    link: '/tools/dingtalk',
    disabled: true,
  },
  {
    title: 'AI 周报生成',
    desc: '提供一段工作描述，让 AI 帮你生成一份周报。',
    link: '/tools/weekly',
    disabled: true,
  },
]

/** 首页 */
export default function HomePage(): RC {
  return (
    <Container>
      <Typography align="center" variant="h4" gutterBottom>
        工具
      </Typography>
      <Grid container gap={2} justifyContent="center">
        {toolsList.map(ProjectCard)}
      </Grid>
    </Container>
  )
}
