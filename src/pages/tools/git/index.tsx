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
import { useEffect, useState } from 'react'

import {
  addGitRepoApi,
  addGitProjectApi,
  fetchSSHKeyApi,
  listAllProjectApi,
  addGitStaffApi,
} from '@/apis/git'
import InputDialog from '@/components/dialogs/InputDialog'

import GitRepoCard from './GitRepoCard'
import GitStaffCard from './GitStaffCard'
import GitStaffDialog from './GitStaffDialog'

import '@/global/source-code-pro.scss'

/** Git 助手页面 */
export default function GitPage(): RC {
  const [isLoading, setIsLoading] = useState(false)

  const [sshKey, setSshKey] = useState('')

  const [projectList, setProjectList] = useState<IGitProject[]>([])
  const [project, setProject] = useState<IGitProject>()

  const [isProjDialogOpen, setIsProjDialogOpen] = useState(false)
  const [isRepoDialogOpen, setIsRepoDialogOpen] = useState(false)
  const [isStaffDialogOpen, setIsStaffDialogOpen] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    Promise.allSettled([
      listAllProjectApi().then(res => {
        setProjectList(res)
        setProject(res[0])
      }),

      fetchSSHKeyApi().then(setSshKey),
    ]).finally(() => void setIsLoading(false))
  }, [])

  const addProjectHandler = (name: string) => {
    setIsLoading(true)
    addGitProjectApi(name)
      .then(res => {
        setProjectList(list => [...list, res])
        setProject(res)
      })
      .finally(() => void setIsLoading(false))
  }

  const addRepoHandler = (url: string) => {
    setIsLoading(true)
    addGitRepoApi(project!.name, url)
      .then(res => {
        const repos = [...project!.repos, res]
        setProject(p => ({ ...p!, repos }))
      })
      .finally(() => void setIsLoading(false))
  }

  const addStaffHandler = (gitStaff: IGitStaff) => {
    setIsLoading(true)
    addGitStaffApi(project!.name, gitStaff)
      .then(res => {
        const staffs = [...project!.staffs, res]
        setProject(p => ({ ...p!, staffs }))
      })
      .finally(() => void setIsLoading(false))
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
                onChange={e => void setProject(projectList.find(t => t._id === e.target.value))}
                required
              >
                {projectList.map(project => (
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
            关联 Git 和用户
          </Typography>

          <Grid container spacing={2} alignItems="flex-start">
            <Grid item md={6} sm={12} xs={12}>
              <Stack justifyContent="center" rowGap={1}>
                {project.repos.map(repo => (
                  <GitRepoCard {...repo} project={project} key={repo.url} />
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
                  <GitStaffCard {...staff} key={staff.name} />
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
