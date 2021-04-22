const getters = {
    userName: state => state.user.userName,
    opened: state => state.app.opened,
    routes: state => state.permission.routes,
    roles: state => state.user.roles
}

export default getters