import { Container, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import NormalCard from '@/components/cards/NormalCard'

const toolsList: IProjectInfo[] = [
  {
    title: 'GPT 问答',
    desc: '基于 OpenAI 的 GPT-3.5 模型，提供 AI 问答功能。',
    link: '/tools/gptchat',
  },
  {
    title: 'AI 周报生成',
    desc: '提供一段工作描述，让 AI 帮你生成一份周报。',
    link: '/tools/weekly',
  },
  {
    title: 'Git 助手',
    desc: '同步和分析 Git 的各个分支和提交记录。',
    link: '/tools/git',
  },
  {
    title: '钉钉机器人',
    desc: '使用钉钉机器人发送消息。',
    link: '/tools/dingtalk',
    disabled: true,
  },
  {
    title: '短网址',
    desc: 'paperplane.cc 域名下的短网址功能',
    link: '/tools/dwz',
    disabled: true,
  },
]

/** 首页 */
export default function HomePage(): RC {
  const navigate = useNavigate()

  return (
    <Container>
      <Typography align="center" variant="h4" sx={{ mb: 4 }}>
        工具箱
      </Typography>
      <Grid container gap={2}>
        {toolsList.map(tool => (
          <NormalCard {...tool} key={tool.title} onButtonClick={() => void navigate(tool.link)} />
        ))}
      </Grid>
    </Container>
  )
}
