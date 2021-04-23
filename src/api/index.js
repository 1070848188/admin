import axios from 'axios';
import Qs from 'qs'
import { Loading } from 'element-ui';
import { getToken } from '@/utils/auth';

const $axios = axios.create({
    baseURL: '/api', // 请求前缀
    timeout: 30000, // 超时时间
})

let loading = null;

// 请求拦截器
$axios.interceptors.request.use(config => {
    loading = Loading.service({ text: '加载中,请稍后。。。' }) // 进入全局loading状态
    const token = getToken()
    if (token) {
        config.headers.authorization = 'Bearer ' + token // 请求头携带token
    }
    return config // 继续进行请求
}, err => {
    return Promise.reject(err)
})

// 响应拦截器
$axios.interceptors.response.use(response => {
    loading && loading.close() // 关闭全局loading提示
    const code = response.status; // 获取响应状态码
    if ((code >= 200 && code < 300) || code === 304) {
        return Promise.resolve(response.data); // 数据没有问题 返回data字段
    } else {
        return Promise.reject(response) // 将错误提示返回
    }
}, err => {
    loading && loading.close() // 关闭全局loading提示
    return Promise.reject(err)
})

// 封装get方法
export const get = (url, params) => {
    return $axios({
        method: 'get',
        url,
        params
    })
}

// 封装post方法
export const post = (url, data) => {
    return $axios({
        method: 'post',
        url,
        data: Qs.stringify(data),
        // data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}