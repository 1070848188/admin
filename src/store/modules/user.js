import { getToken, setToken } from '@/utils/auth';

const state = {
    userName: 'admin',
    token: getToken()
}

const mutations = {
    SET_USER_NAME(state, val) {
        state.userName = val;
    },
    SET_TOKEN(state, val) {
        state.token = val;
    }
}

const actions = {
    setUserName({ commit }, data) {
        commit('SET_USER_NAME', data);
    },
    _login({ commit }) {
        return new Promise((resolve) => {
            setTimeout(() => {
                setToken('1236486164181')
                commit('SET_TOKEN', '1236486164181');
                resolve({ code: 0 })
            }, 1000);
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}