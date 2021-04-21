import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout';

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
  navTest
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
console.log(router);

export default router
