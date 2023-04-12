
const getters = {
    user: state => state.Auth.user,
    roles: state => state.Auth.roles || [],
    allRoles: state => state.Role.list || [],
    setting: state => state.P2P.setting || {},
}
export default getters
