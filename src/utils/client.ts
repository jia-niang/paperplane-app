import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  timeout: 60000,
})

client.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

client.interceptors.response.use(
  function (response) {
    return response?.data || null
  },
  function (error) {
    return error?.data || {}
  }
)

export { client }
