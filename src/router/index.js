import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import util from '../lib/util'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const token = util.auth.getToken()
  if (token) {
    // 存在 token， 对 token 进行验证，如果过期，后端可以返回一个更新了过期时间的新的 token，前端再进行设置 token
    if (to.name === 'Login') next({ name: 'Home_Page' })
    else next()
  } else {
    if (to.name === 'Login') next()
    else next({ name: 'Login'})
  }
})

export default router
