import { getToken, setToken, removeToken } from '@/utils/auth';
import { _login, getInfo } from '@/api/login';
import { Message } from 'element-ui';
import router, { resetRouter } from '@/router';

const state = {
    userName: null, // 用户名
    token: getToken(), // token
    roles: null, // 用户权限列表
}

const mutations = {
    SET_NAME(state, val) {
        state.userName = val;
    },
    SET_TOKEN(state, val) {
        state.token = val;
    },
    DEL_TOKEN(state) {
        state.token = null;
    },
    DEL_ROLES(state) {
        state.roles = null;
    },
    SET_ROLES(state, roles) {
        state.roles = roles;
    }
}

const actions = {
    // 登录
    _login({ commit }, params) { 
        return new Promise((resolve, reject) => {
            _login(params).then(res => {
                if (res.code === 0) {
                    // 储存token
                    commit('SET_TOKEN', res.data.token)
                    setToken(res.data.token)
                    Message.success(res.message)
                    resolve(res)
                } else {
                    Message.error(res.message)
                }
            }).catch(err => reject(err))
        })
    },

    // 退出
    layout({ commit }) {
        // 清空token
        commit('DEL_TOKEN');
        commit('DEL_ROLES');
        removeToken();
        // 重置路由
        resetRouter()
        // 重定向到登录界面
        router.push({
            path: '/login',
            query: {
                redirect: '/'
            }
        })
    },

    // 获取用户信息
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(res => {
                commit('SET_NAME', res.data?.name);
                commit('SET_ROLES', res.data?.roles);
                resolve(res.data)
            }).catch(err => reject(err))
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}