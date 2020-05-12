import user from '../../api/user'
import util from '../../lib/util'

const state = {

}

const actions = {
  login ({ commit }, {number, password}) {
    return new Promise((resolve, reject) => {
      user.login({number, password}).then(res => {
        // 登陆成功后
        if (res.code === 0 && res.data.token) {
          // 安全性较高的情况下，应该有后端完成 set-cookie 并且设置 http-only 属性避免跨站脚本攻击
          util.user.set(res, number)
          resolve()
          // commit('SET_USER_NAME', res.data.userName)
        } else {
          reject(new Error('token invaild'))
        }
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  logout () {
    util.user.clear()
  },
}

const mutations = {
  SET_USER_NAME (state, params) {
    state.userName = params
  }
}

export default {
  state,
  actions,
  mutations,
  modules: {

  }
}
