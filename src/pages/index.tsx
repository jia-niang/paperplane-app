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
    title: 'AI 周报生成',
    desc: '提供一段工作描述，让 AI 帮你生成一份周报。',
    link: '/tools/weekly',
    disabled: false,
  },
  {
    title: '钉钉机器人',
    desc: '使用钉钉机器人发送消息。',
    link: '/tools/dingtalk',
    disabled: true,
  },
  {
    title: 'Git 助手',
    desc: '同步和分析 Git 的各个分支和提交记录。',
    link: '/tools/git',
    disabled: true,
  },
  {
    title: '医脉同道助手',
    desc: '查询手机号和 ID、一键注销账号、拉取 IM 记录和会话等功能。',
    link: '/tools/ymtd',
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
  return (
    <Container>
      <Typography align="center" variant="h4" gutterBottom>
        工具
      </Typography>
      <Grid container gap={2}>
        {toolsList.map(tool => (
          <ProjectCard {...tool} key={tool.title} />
        ))}
      </Grid>
    </Container>
  )
}
