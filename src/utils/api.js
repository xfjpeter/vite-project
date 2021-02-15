import axios from 'axios'
import { Message } from 'element3'

const service = axios.create({
  url: ''
})

// 请求拦截器
service.interceptors.request.use((config) => {
  return config
})

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.status && response.status == 200) {
      // 自己业务的判断
      if (response.data.code !== 200) {
        response.data.message && Message.error(response.data.message)
        return
      }
    }
    return response.data
  },
  (error) => {
    if (error.response.code === 504 || error.response.code === 404) {
      Message.error('服务器被吃了')
    } else if (error.response.code === 403) {
      Message.error('权限不足，请联系管理员')
    } else if (error.response.code === 401) {
      Message.error('尚未登陆，请登陆')
    } else {
      if (error.response.data.message) {
        Message.error(error.response.data.message)
      } else {
        Message.error('未知错误！')
      }
    }
    return Promise.reject(error)
  }
)

export default service
