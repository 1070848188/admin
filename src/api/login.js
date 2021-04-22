import { get } from '@/api';

// 登录
export const _login = params => {
    return get('/login', params)
}

// 获取用户信息
export const getInfo = params => {
    return get('/getInfo', params)
}