import { axios } from './index'

export default {
  getMyExperiment: () => {
    return axios.request({
      url: '/student/experiments',
      method: 'get'
    })
  },
  getExperimentProblemList: (experimentId) => {
    return axios.request({
      url: '/experiment/list/' + experimentId,
      method: 'get'
    })
  },
  submitEXperiment: (experimentId) => {
    return axios.request({
      url: '/student/experiment/submit/' + experimentId,
      method: 'post'
    })
  },
  makeExperiemnt: (params) => {
    return axios.request({
      url: '/experiment',
      method: 'post',
      data: params
    })
  },
  distributedExperiment: (params) => {
    return axios.request({
      url: '/experiment/class/distributed',
      method: 'post',
      data: params
    })
  }
}
