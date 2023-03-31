import AddIcon from '@mui/icons-material/Add'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

import {
  addGitRepoApi,
  addGitProjectApi,
  fetchSSHKeyApi,
  listAllProjectApi,
  addGitStaffApi,
  generateGitWeeklyApi,
} from '@/apis/git'
import InputDialog from '@/components/dialogs/InputDialog'

import GitRepoCard from './GitRepoCard'
import GitStaffCard from './GitStaffCard'
import GitStaffDialog from './GitStaffDialog'

import '@/global/source-code-pro.scss'

const emptyObject: any = {}

/** Git 助手页面 */
export default function GitPage(): RC {
  const [sshKey, setSshKey] = useState('')

  const [isProjDialogOpen, setIsProjDialogOpen] = useState(false)
  const [isRepoDialogOpen, setIsRepoDialogOpen] = useState(false)
  const [isStaffDialogOpen, setIsStaffDialogOpen] = useState(false)

  const [gitWeekly, setGitWeekly] = useState<Record<string, string>>(emptyObject)

  const {
    data: projectList,
    isLoading,
    mutate,
  } = useSWR('/git-helper/project', listAllProjectApi, { refreshInterval: 2000 })

  const [currentProjectId, setCurrentProjectId] = useState<string>()
  const project = useMemo(
    () => projectList?.find(item => item._id === currentProjectId),
    [currentProjectId, projectList]
  )

  useEffect(() => {
    fetchSSHKeyApi().then(setSshKey)
  }, [])

  useEffect(() => void console.log(projectList), [projectList])

  const addProjectHandler = (name: string) => {
    addGitProjectApi(name).then(res => {
      mutate().then(() => void setCurrentProjectId(res.name))
    })
  }

  const addRepoHandler = (url: string) => {
    addGitRepoApi(project!.name, url).then(() => void mutate())
  }

  const addStaffHandler = (gitStaff: IGitStaff) => {
    addGitStaffApi(project!.name, gitStaff).then(() => void mutate())
  }

  const makeWeeklyHandler = () => {
    generateGitWeeklyApi(project!.name).then(setGitWeekly)
  }

  return (
    <Container maxWidth="md">
      <Stack rowGap={2}>
        <Typography align="center" variant="h4">
          选择项目
        </Typography>

        <Grid container columnSpacing={2} rowSpacing={{ md: 0, xs: 2 }} alignItems="center">
          <Grid item md={10} sm={8} xs={12}>
            <FormControl disabled={isLoading} size="small" fullWidth>
              <InputLabel id="git-project-picker">选择项目</InputLabel>
              <Select
                labelId="git-project-picker"
                value={project?._id || ''}
                label="选择项目"
                onChange={e => void setCurrentProjectId(e.target.value)}
                required
              >
                {projectList?.map(project => (
                  <MenuItem key={project._id} value={project._id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={2} sm={4} xs={12} justifyContent="center" alignItems="center">
            <Button
              onClick={() => void setIsProjDialogOpen(true)}
              disabled={isLoading}
              variant="contained"
              startIcon={<AddIcon />}
              fullWidth
            >
              新增项目
            </Button>
          </Grid>
        </Grid>
      </Stack>

      {project ? (
        <Stack columnGap={2} rowGap={4} sx={{ mt: 4 }}>
          <Typography align="center" variant="h4">
            添加 SSH 公钥
          </Typography>

          <Paper sx={{ p: 2 }} elevation={1}>
            <Typography
              variant="body2"
              sx={{
                wordBreak: 'break-all',
                fontFamily: `"Source Code Pro", -apple-system, sans-serif`,
              }}
            >
              {sshKey}
            </Typography>
          </Paper>

          <Typography align="center" variant="h4">
            关联 Git 和用户
          </Typography>

          <Grid container spacing={2} alignItems="flex-start">
            <Grid item md={6} sm={12} xs={12}>
              <Stack justifyContent="center" rowGap={1}>
                {project.repos.map(repo => (
                  <GitRepoCard
                    {...repo}
                    project={project}
                    onMutate={mutate}
                    key={`${repo.url}#${repo.status}`}
                  />
                ))}

                <Button
                  onClick={() => void setIsRepoDialogOpen(true)}
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  sx={{ mt: 4 }}
                  fullWidth
                >
                  添加仓库
                </Button>
              </Stack>
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <Stack justifyContent="center" rowGap={1}>
                {project.staffs.map(staff => (
                  <GitStaffCard {...staff} project={project} onMutate={mutate} key={staff.name} />
                ))}

                <Button
                  onClick={() => void setIsStaffDialogOpen(true)}
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  sx={{ mt: 4 }}
                  fullWidth
                >
                  添加用户
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <Typography align="center" variant="h4">
            智能周报
          </Typography>

          {gitWeekly === emptyObject ? (
            <Grid item justifyContent="center">
              <Button onClick={makeWeeklyHandler} variant="contained" fullWidth>
                点我生成
              </Button>
            </Grid>
          ) : (
            project?.staffs.map(staff => (
              <>
                <Typography align="center" variant="h6" key={staff.name + '-title'}>
                  {staff.name}
                </Typography>
                <Typography align="center" variant="body2" key={staff.name + 'body'}>
                  {gitWeekly[staff.name]}
                </Typography>
              </>
            ))
          )}
        </Stack>
      ) : null}

      <InputDialog
        title="新增项目"
        inputLabel="项目名"
        inputPlaceholder="请输入项目名称"
        open={isProjDialogOpen}
        onOpenChange={setIsProjDialogOpen}
        onSubmit={addProjectHandler}
      />
      <InputDialog
        title="关联 Git 仓库"
        inputLabel="仓库地址"
        inputPlaceholder="请输入 git 协议的仓库地址"
        open={isRepoDialogOpen}
        onOpenChange={setIsRepoDialogOpen}
        onSubmit={addRepoHandler}
      />
      <GitStaffDialog
        open={isStaffDialogOpen}
        onOpenChange={setIsStaffDialogOpen}
        onSubmit={addStaffHandler}
      />
    </Container>
  )
}
