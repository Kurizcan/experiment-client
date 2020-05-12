import { axios } from './index'

export default {
  login:  ({number, password}) => {
    return axios.request({
        url: '/login',
        method: 'post',
        data: {
            number: number,
            password: password
        }
    })
  },
  getUserInfo: (userId) => {
    return axios.request({
      url: '/user/' + userId,
      method: 'get',
    })
  }
}
