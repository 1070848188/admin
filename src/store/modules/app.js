const state = {
    opened: false,
    routes: []
}

const mutations = {
    SET_OPEN(state) {
        state.opened = !state.opened;
    }
}

const actions = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}