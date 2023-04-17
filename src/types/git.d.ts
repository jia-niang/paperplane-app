/**
 * Git 仓库的状态
 * - `"init"` = 初始化
 * - `"ready"` = 空闲状态
 * - `"pending"` = 执行耗时任务中
 * - `"error"` = 出错
 */
type GitRepoStatusType = 'init' | 'ready' | 'pending' | 'error'

interface IGitCommit extends IWithId {
  hash: string
  date: string
  message: string
  author_name: string
  author_email: string
  refs?: string
}

interface IGitRepo extends IWithId {
  name: string
  url: string
  status: GitRepoStatusType
  lastSyncTs: TimestampType
  recentBranches: string[]
  recentCommits: IGitCommit[]
}

interface IGitStaff extends IWithId {
  name: string
  emails: string[]
  alternativeNames: string[]
  weeklyText?: string
}

interface IGitProject extends IWithId {
  name: string
  repos: IGitRepo[]
  staffs: IGitStaff[]
  weeklyStatus: GitRepoStatusType
  publicKey: string
}
