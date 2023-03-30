import { client } from '@/utils/client'

export async function fetchSSHKeyApi(): Promise<string> {
  return client.get('/git/public-key')
}

export async function listAllProjectApi(): Promise<IGitProject[]> {
  return client.get('/git-helper/project')
}

export async function addGitProjectApi(name: string): Promise<IGitProject> {
  return client.post('/git-helper/project', { name })
}

export async function addGitRepoApi(projectName: string, url: string): Promise<IGitRepo> {
  return client.post(`/git-helper/project/${projectName}/repo`, { url })
}

export async function addGitStaffApi(projectName: string, staff: IGitStaff): Promise<IGitStaff> {
  return client.post(`/git-helper/project/${projectName}/staff`, { staff })
}

export async function syncRepoApi(projectName: string, repoName: string): Promise<string[]> {
  return client.post(`/git-helper/project/${projectName}/repo/${repoName}/sync`)
}
