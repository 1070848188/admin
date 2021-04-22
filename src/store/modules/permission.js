import { currencyRoutes, asyncRoutes } from '@/router';

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES(state, paylod) {
        state.routes = [...currencyRoutes, ...paylod]
        state.addRoutes = paylod; // 有权限的路由
    }
}

function forRachRoles(routes, roles) {
    let newArr = [];
    for (let item of routes) {
        let itemNew = { ...item } //解决浅拷贝共享同一内存地址
        if (roles.includes(itemNew.name)) { // 父路由存在
            if (itemNew.children && itemNew.children.length > 0) { // 子路由存在
                itemNew.children = forRachRoles(itemNew.children, roles)
            }
        }
        newArr.push(itemNew);
    }
    return newArr;
}

const actions = {
    // commit 用来触发mutations rootGetters 获取getters
    getAsyncRoutes({ commit, rootGetters }, roles) {
        return new Promise(reslove => {
            let routes = [];
            if (rootGetters.userName === 'admin') {
                routes = asyncRoutes;
            } else {
                routes = forRachRoles(asyncRoutes, roles)
            }
            commit('SET_ROUTES', routes);
            reslove(routes);
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}