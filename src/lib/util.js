import Cookies from 'js-cookie'

export default {
  auth: {
    setToken: (token, tokenName = 'token') => {
      Cookies.set(tokenName, token)
    },
    getToken: (tokenName = 'token') => {
      return Cookies.get(tokenName)
    }
  },
  cookie: {
    getParam: (param = '') => {
      return Cookies.get(param)
    },
    setParam: (param, value) => {
      Cookies.set(param, value)
    },
    clear: (param) => {
      Cookies.remove(param)
    }
  },
  user: {
    getUserName: () => {
      return Cookies.get("userName")
    },
    getUserNumber: () => {
      return Cookies.get("user_number")
    },
    getUserId: () => {
      return Cookies.get("user_id")
    },
    getType: () => {
      return Cookies.get("type")
    },
    set: (res, number) => {
      Cookies.set("token", res.data.token)
      Cookies.set("userName", res.data.userName)
      Cookies.set("user_id", res.data.user_id)
      Cookies.set("user_number", number)
      Cookies.set("type", res.data.type)
    },
    clear: () => {
      Cookies.remove("token")
      Cookies.remove("userName")
      Cookies.remove("user_id")
      Cookies.remove("user_number")
      Cookies.remove("type")
    }
  }
}
