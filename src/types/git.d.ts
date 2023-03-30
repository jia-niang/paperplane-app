/**
 * Git 仓库的状态
 * - `"init"` = 初始化
 * - `"ready"` = 空闲状态
 * - `"pending"` = 执行耗时任务中
 * - `"error"` = 出错
 */
type GitRepoStatusType = 'init' | 'ready' | 'pending' | 'error'

interface IGitRepo {
  name: string
  url: string
  status: GitRepoStatusType
  lastSyncTs: TimestampType
  recentBranches: string[]
}

interface IGitStaff {
  name: string
  emails: string[]
  alternativeNames: string[]
}

interface IGitProject extends IWithId {
  name: string
  repos: IGitRepo[]
  staffs: IGitStaff[]
}
