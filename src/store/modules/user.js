const state = {
    userName: 'admin'
}

const mutations = {
    SET_USER_NAME(state, val) {
        state.userName = val;
    }
}

const actions = {
    setUserName({ commit }, data) {
        commit('SET_USER_NAME', data);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}