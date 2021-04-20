import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout';

Vue.use(VueRouter)

/**
 * hidden: 是否在左侧菜单栏中显示出来
 * meta 中属性：
 *  title:   左侧菜单栏名称
 *  icon:    左侧菜单栏图标
 *  noCache: 是否需要缓存
 */

// 通用路由 不需要任何权限即可查看
export const currencyRoutes = [
  { // 登录页面
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/err-page/404.vue'),
    hidden: true
  }, 
  { // 外部layout框架
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/dashbord',
    children: [
      { // 主页
        path: 'dashbord',
        name: 'Dashbord',
        component: () => import('@/views/dashboard'),
        meta: { title: '首页', icon: 'el-icon-s-data' }
      }
    ]
  }
]

// 动态路由 根据权限进行查看
export const asyncRoutes = [
]

// 初始化路由
const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: currencyRoutes
  })
}

const router = createRouter()

export default router
