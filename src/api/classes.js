import { axios } from './index'

export default {
  getClassList: (tid) => {
    return axios.request({
      url: '/class/' + tid,
      method: 'get'
    })
  },
  getClassDetail: (classId) => {
    return axios.request({
      url: '/class/' + classId + '/detail',
      method: 'get'
    })
  },
  getClassExperiment: (classId, groupId) => {
    return axios.request({
      url: '/experiment/class/detail',
      method: 'get',
      params: {
        classId: classId,
        groupId: groupId
      }
    })
  }
}
