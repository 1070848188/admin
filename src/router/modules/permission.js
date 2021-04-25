import Layout from '@/layout';

export default {
    path: '/permission',
    name: 'Permission',
    component: Layout,
    redirect: 'permission/character',
    meta: {
        title: '权限许可',
        icon: 'el-icon-setting'
    },
    children: [
        {
            path: 'character',
            name: 'Character',
            component: () => import('@/views/permission/character'),
            meta: {
                title: '角色管理',
                icon: 'el-icon-female'
            }
        },
        {
            path: 'useredit',
            name: 'Useredit',
            component: () => import('@/views/permission/user'),
            meta: {
                title: '用户管理',
                icon: 'el-icon-user'
            }
        }
    ]
}