import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout';
import Nprogress from 'nprogress';
import { getToken } from '@/utils/auth';

Vue.use(VueRouter)

/**
 * hidden: 是否在左侧菜单栏中显示出来 true为不在左侧菜单栏显示
 * meta 中属性：
 *  title:   左侧菜单栏名称
 *  icon:    左侧菜单栏图标
 *  noCache: 是否需要缓存  true 不需要缓存
 */

// 通用路由 不需要任何权限即可查看
export const currencyRoutes = [
  { // 登录页面
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    hidden: true,
    beforeEnter(to, from, next) {
      getToken() ? next('/') : next();
    }
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

// 测试左侧菜单栏
const navTest = {
  path: '/nav-test',
  component: Layout,
  name: 'NavTest',
  meta: { title: '导航菜单测试', icon: 'el-icon-s-grid' },
  redirect: '/nav-test/nav1',
  children: [
    {
      path: 'nav1',
      name: 'Nav1',
      component: () => import('@/views/nav-test/nav1'),
      meta: { title: '菜单1', icon: 'el-icon-coffee' }
    },
    {
      path: 'nav2',
      name: 'Nav2',
      component: () => import('@/views/nav-test/nav2'),
      meta: { title: '菜单2', icon: 'el-icon-cherry' },
      redirect: '/nav-test/nav2/nav2-1',
      children: [
        {
          path: 'nav2-1',
          name: 'Nav2-1',
          component: () => import('@/views/nav-test/nav2/nav2-1'),
          meta: { title: '菜单2-1' }
        },
        {
          path: 'nav2-2',
          name: 'Nav2-2',
          component: () => import('@/views/nav-test/nav2/nav2-2'),
          meta: { title: '菜单2-2' },
          redirect: '/nav-test/nav2/nav2-2/nav2-2-1',
          children: [
            {
              path: 'nav2-2-1',
              name: 'Nav2-2-1',
              component: () => import('@/views/nav-test/nav2/nav2-2/nav2-2-1'),
              meta: { title: '菜单2-2-1', icon: 'el-icon-lollipop' }
            },
            {
              path: 'nav2-2-2',
              name: 'Nav2-2-2',
              component: () => import('@/views/nav-test/nav2/nav2-2/nav2-2-2'),
              meta: { title: '菜单2-2-2' }
            }
          ]
        }
      ]
    }
  ]
}

// 动态路由 根据权限进行查看
export const asyncRoutes = [
  navTest,
  { path: '*', redirect: '/404', hidden: true }
]

// 初始化路由
const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [...currencyRoutes, ...asyncRoutes]
  })
}

const router = createRouter()

// 解决addRoute不能删除动态路由问题 重新创建一个新的路由列表
export function resetRouter() {
  const reset = createRouter()
  router.matcher = reset.matcher
}

// 路由守卫
router.beforeEach((to, from, next) => {
  Nprogress.start(); // 开启进度条

  const hasToken = getToken() // 获取token

  if (hasToken) { 
    // 已经登录 且要进入login 重定向到主页
    if (to.path === '/login') {
      next({ path: '/' });
      Nprogress.done();
    } else { // 登录且不是进入Login
      next()
      Nprogress.done();
    }
  } else {

    // 未登录且进入login
    if (to.path === '/login') {
      next()
    } else { // 未登录且不仅如此Login
      next(`/login?redirect=${to.fullPath}`)
    }

    Nprogress.done();
  }

})



router.afterEach(() => {
  // 跳转结束 关闭进度条
  Nprogress.done()
})

export default router
