import { client } from '@/utils/client'

export async function listAllProjectApi(): Promise<Pick<IGitProject, '_id' | 'name'>[]> {
  return client.get('/git-helper/project')
}

export async function addGitProjectApi(project: Pick<IGitProject, 'name'>): Promise<IGitProject> {
  return client.post('/git-helper/project', { project })
}

export async function fetchGitProjectApi(projectId: string): Promise<IGitProject> {
  return client.get(`/git-helper/project/${projectId}`)
}

export async function addGitRepoApi(
  projectId: IdType,
  repo: Pick<IGitRepo, 'url'>
): Promise<IGitRepo> {
  return client.post(`/git-helper/project/${projectId}/repo`, { repo })
}

export async function deleteGitRepoApi(projectId: IdType, repoId: IdType) {
  return client.delete(`/git-helper/project/${projectId}/repo/${repoId}`)
}

export async function syncRepoApi(projectId: IdType, repoId: IdType) {
  return client.post(`/git-helper/project/${projectId}/repo/${repoId}/sync`)
}

export async function addGitStaffApi(
  projectId: IdType,
  staff: Draft<IGitStaff>
): Promise<IGitStaff> {
  return client.post(`/git-helper/project/${projectId}/staff`, { staff })
}

export async function deleteGitStaffApi(projectId: IdType, staffId: IdType) {
  return client.delete(`/git-helper/project/${projectId}/staff/${staffId}`)
}

export async function generateGitWeeklyApi(projectId: IdType) {
  return client.post(`/git-helper/project/${projectId}/git-weekly`)
}

export async function generateGitWeeklyByStaffApi(projectId: IdType, staffId: IdType) {
  return client.post(`/git-helper/project/${projectId}/staff/${staffId}/git-weekly`)
}
