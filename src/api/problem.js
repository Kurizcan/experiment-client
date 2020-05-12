import { axios } from './index'

export default {
  getProblemInfo: (problemId) => {
    return axios.request({
      url: '/problem/' + problemId,
      method: 'get'
    })
  },
  getProblemDetail: (problemId, groupId) => {
    return axios.request({
      url: '/student/problem/detail',
      method: 'get',
      params: {
        problem: problemId,
        group: groupId
      }
    })
  },
  submitProblem: (params) => {
    console.log(params)
    return axios.request({
      url: '/student/submit',
      method: 'post',
      data: params
    })
  },
  getStatueOfSubmit: (runId) => {
    return axios.request({
      url: '/student/submit/' + runId,
      method: 'get',
    })
  },
  getProblemList: (index, limit) => {
    return axios.request({
      url: '/problems/lists',
      method: 'get',
      params: {
        index,
        limit
      }
    })
  },
  getTotal: () => {
    return axios.request({
      url: '/problems/total',
      method: 'get'
    })
  },
  uploadProblem: (params) => {
    return axios.request({
      url: '/problem',
      method: 'post',
      data: params
    })
  },
  uploadDataSource: (problemId, data) => {
    return axios.request({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: '/problem/' + problemId,
      method: 'put',
      data: data
    })
  }
}
