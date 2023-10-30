import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import useSWR from 'swr'

import {
  addGitRepoApi,
  addGitProjectApi,
  listAllProjectApi,
  addGitStaffApi,
  generateGitWeeklyApi,
  generateGitWeeklyByStaffApi,
  fetchGitProjectApi,
} from '@/apis/git'

import GitRepoCard from './GitRepoCard'
import GitStaffCard from './GitStaffCard'
import GitStaffDialog from './GitStaffDialog'
import SSHKey from './SSHKey'

import '@/global/source-code-pro.scss'

/** Git 助手页面 */
export default function GitPage(): RC {
  const [isProjDialogOpen, setIsProjDialogOpen] = useState(false)
  const [isRepoDialogOpen, setIsRepoDialogOpen] = useState(false)
  const [isStaffDialogOpen, setIsStaffDialogOpen] = useState(false)

  const [currentProjectId, setCurrentProjectId] = useState<string>()

  const { data: projectList, mutate: refreshProjectList } = useSWR(
    '/git-helper/project',
    listAllProjectApi
  )
  const {
    data: project,
    isLoading,
    mutate,
  } = useSWR(
    currentProjectId ? `/git-helper/project/${currentProjectId}` : null,
    () => fetchGitProjectApi(currentProjectId!),
    {
      refreshInterval: newProject => {
        const shouldPoll =
          newProject &&
          (newProject.weeklyStatus === 'pending' ||
            newProject?.repos.some(repo => repo.status === 'pending'))

        return shouldPoll ? 2000 : 0
      },
    }
  )

  const staffsWithWeekly = useMemo(
    () => project?.staffs?.filter(staff => staff.weeklyText) ?? [],
    [project?.staffs]
  )

  const isWeeklyButtonReady = useMemo(
    () =>
      project?.weeklyStatus !== 'pending' &&
      project?.repos.every(repo => repo.status !== 'pending'),
    [project?.repos, project?.weeklyStatus]
  )

  const addProjectHandler = (name: string) => {
    addGitProjectApi({ name }).then(res => {
      mutate().then(() => void setCurrentProjectId(res._id))
    })
  }

  const addRepoHandler = (url: string) => {
    addGitRepoApi(project!._id, { url }).then(() => void mutate())
  }

  const addStaffHandler = (gitStaff: IGitStaff) => {
    addGitStaffApi(project!._id, gitStaff).then(() => void mutate())
  }

  const makeWeeklyHandler = () => {
    generateGitWeeklyApi(project!._id).then(() => void mutate())
  }

  const resetWeeklyReportHandler = (staffId: string) => {
    generateGitWeeklyByStaffApi(project!._id, staffId).then(() => void mutate())
  }

  return null

  // return (
  //   <Container maxWidth="md">
  //     <Stack rowGap={2}>
  //       <Typography align="center" variant="h4">
  //         选择项目
  //       </Typography>

  //       <Grid container columnSpacing={2} rowSpacing={{ md: 0, xs: 2 }} alignItems="center">
  //         <Grid item md={10} sm={8} xs={12}>
  //           <FormControl disabled={isLoading} size="small" fullWidth>
  //             <InputLabel id="git-project-picker">选择项目</InputLabel>
  //             <Select
  //               labelId="git-project-picker"
  //               value={project?._id || ''}
  //               label="选择项目"
  //               onChange={e => void setCurrentProjectId(e.target.value)}
  //               onOpen={() => void refreshProjectList()}
  //               required
  //             >
  //               {projectList?.map(project => (
  //                 <MenuItem key={project._id} value={project._id}>
  //                   {project.name}
  //                 </MenuItem>
  //               ))}
  //             </Select>
  //           </FormControl>
  //         </Grid>

  //         <Grid item md={2} sm={4} xs={12} justifyContent="center" alignItems="center">
  //           <Button
  //             onClick={() => void setIsProjDialogOpen(true)}
  //             disabled={isLoading}
  //             variant="contained"
  //             startIcon={<AddIcon />}
  //             fullWidth
  //           >
  //             新增项目
  //           </Button>
  //         </Grid>
  //       </Grid>
  //     </Stack>

  //     {project ? (
  //       <Stack columnGap={2} rowGap={4} sx={{ mt: 4 }}>
  //         <SSHKey sshKey={project.publicKey} />

  //         <Typography align="center" variant="h4">
  //           关联 Git 和用户
  //         </Typography>

  //         <Grid container spacing={2} alignItems="flex-start">
  //           <Grid item md={6} sm={12} xs={12}>
  //             <Stack justifyContent="center" rowGap={1}>
  //               {project.repos.map(repo => (
  //                 <GitRepoCard
  //                   {...repo}
  //                   project={project}
  //                   onMutate={mutate}
  //                   key={repo._id + '#' + repo.status}
  //                 />
  //               ))}

  //               <Button
  //                 onClick={() => void setIsRepoDialogOpen(true)}
  //                 variant="contained"
  //                 startIcon={<AddCircleIcon />}
  //                 sx={{ mt: 4 }}
  //                 fullWidth
  //               >
  //                 添加仓库
  //               </Button>
  //             </Stack>
  //           </Grid>

  //           <Grid item md={6} sm={12} xs={12}>
  //             <Stack justifyContent="center" rowGap={1}>
  //               {project.staffs.map(staff => (
  //                 <GitStaffCard {...staff} project={project} onMutate={mutate} key={staff._id} />
  //               ))}

  //               <Button
  //                 onClick={() => void setIsStaffDialogOpen(true)}
  //                 variant="contained"
  //                 startIcon={<AddCircleIcon />}
  //                 sx={{ mt: 4 }}
  //                 fullWidth
  //               >
  //                 添加用户
  //               </Button>
  //             </Stack>
  //           </Grid>
  //         </Grid>

  //         <Typography align="center" variant="h4">
  //           智能周报
  //         </Typography>

  //         <Grid item justifyContent="center">
  //           <Button
  //             disabled={!isWeeklyButtonReady}
  //             onClick={makeWeeklyHandler}
  //             variant="contained"
  //             fullWidth
  //           >
  //             点我生成
  //           </Button>
  //         </Grid>

  //         {staffsWithWeekly.length > 0 ? (
  //           <Stack rowGap={2}>
  //             {staffsWithWeekly.map(staff => (
  //               <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }} key={staff._id}>
  //                 <Typography align="center" variant="h4">
  //                   {staff.name} 的{project.name}周报
  //                 </Typography>
  //                 <Button
  //                   disabled={!isWeeklyButtonReady}
  //                   onClick={() => resetWeeklyReportHandler(staff._id)}
  //                   variant="contained"
  //                 >
  //                   重新生成
  //                 </Button>
  //                 <Typography variant="body1">
  //                   <ReactMarkdown children={staff.weeklyText || ''}></ReactMarkdown>
  //                 </Typography>
  //               </Paper>
  //             ))}
  //           </Stack>
  //         ) : null}
  //       </Stack>
  //     ) : null}

  //     <InputDialog
  //       title="新增项目"
  //       inputLabel="项目名"
  //       inputPlaceholder="请输入项目名称"
  //       open={isProjDialogOpen}
  //       onOpenChange={setIsProjDialogOpen}
  //       onSubmit={addProjectHandler}
  //     />
  //     <InputDialog
  //       title="关联 Git 仓库"
  //       inputLabel="仓库地址"
  //       inputPlaceholder="请输入 git 协议的仓库地址"
  //       open={isRepoDialogOpen}
  //       onOpenChange={setIsRepoDialogOpen}
  //       onSubmit={addRepoHandler}
  //     />
  //     <GitStaffDialog
  //       open={isStaffDialogOpen}
  //       onOpenChange={setIsStaffDialogOpen}
  //       onSubmit={addStaffHandler}
  //     />
  //   </Container>
  // )
}
