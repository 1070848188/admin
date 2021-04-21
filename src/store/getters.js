const getters = {
    userName: state => state.user.userName,
    opened: state => state.app.opened,
    routes: state => state.app.routes
}

export default getters