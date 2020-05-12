import Home from '../views/Home.vue'
import Layout from '../views/Layout'
import Info from '../views/Info'
import Experiment from '../views/Experiment'
import problemList from '../views/ProblemList'
import problem from '../views/Problem'
import problemDetail from '../views/ProblemDetail'
import experimentDetail from '../views/ExperimentDetail'
import classList from '../views/ClassList'
import classInfo from '../views/ClassInfo'
import classExperiment from '../views/ClassExperiment'
import experimentDistributed from '../views/ExperimentDistributed'
import uploadProblem from '../views/UploadProblem'
export default [
  {
    path: '/',
    name: 'Home_Page',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'info',
        component: Info
      }
    ]
  },
  {
    path: '/experiment',
    component: Layout,
    children: [
      {
        path: 'list',
        component: Experiment
      },
      {
        path: 'problems/:groupId',
        component: problemList
      },
      {
        path: 'problem/detail/:problemId',
        component: problemDetail,
      },
      {
        path: ':groupId/:problemId',
        component: problem
      }
    ]
  },
  {
    path: '/problem',
    component: Layout,
    children: [
      {
        path: 'upload',
        component: uploadProblem
      }
    ]
  },
  {
    path: '/result',
    component: Layout,
    children: [
      {
        path: ':groupId',
        component: experimentDetail
      }
    ]
  },
  {
    path: '/class',
    component: Layout,
    children: [
      {
        path: 'list/:tid',
        component: classList
      },
      {
        path: 'detail/:classId',
        component: classInfo
      },
      {
        path: 'experiment/detail',
        component: classExperiment
      },
      {
        path: 'experiment/distributed',
        component: experimentDistributed
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/404',
    component: () => import('@/components/404'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
