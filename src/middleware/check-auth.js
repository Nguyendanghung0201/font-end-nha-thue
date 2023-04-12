import { hasToken, getToken } from '@/helpers/auth'
import _ from 'lodash'
import store from '@/utils/store'

export const levelRole = []

export const gotoLogin = (to, next) => {
    return next({
        name: 'auth.login',
        query: {
            redirect: to ? to.fullPath || to.path : null
        }
    })
}
export const gotoClientDashboard = (to, next) => {
    return next({
        name: 'dashboard.index'
    })
}

// export const gotoDashboard = (to, next) => {
//     return next({
//         name: 'dashboard.index'
//     })
// }

// export const gotoCustomerDashboard = (to, next) => {
//     return next({
//         name: 'customer.dashboard.index'
//     })
// }

export const gotoDenied = (to, next) => {
    return next({
        name: 'auth.denied'
    })
}
//
// export const checkRole = (myRoles, requireRoles, noParent = false) => {
//     // return true
//     if (!myRoles) myRoles = []
//     if (myRoles.indexOf(['SUPER_ADMIN']) !== -1) return true
//     if (myRoles && !Array.isArray(myRoles)) myRoles = [myRoles]
//     if (requireRoles && !Array.isArray(requireRoles)) requireRoles = [requireRoles]
//
//     if (requireRoles && requireRoles.length > 0) {
//
//         if (noParent === false) {
//             const _level = [].concat([], levelRole).reverse()
//             _level.forEach((v, k) => {
//                 if (_level[k + 1] && requireRoles.includes(v)) requireRoles.push(_level[k + 1])
//             })
//             requireRoles = _.uniq(requireRoles)
//         }
//         return _.some(myRoles, role => _.includes(requireRoles, role))
//     }
//     return true
// }
// export const checkPermission = (requirePermissions, myPermissions) => {
//     // return true
//     if (!store.getters.user) return false
//     if (store.getters.user.email == 'super_admin@gmail.com'){
//         return true
//     }
//     if (!myPermissions && store.getters.user.permissions) myPermissions = store.getters.user.permissions
//     if (myPermissions && !Array.isArray(myPermissions)) myPermissions = [myPermissions]
//     if (requirePermissions && !Array.isArray(requirePermissions)) requirePermissions = [requirePermissions]
//     if (requirePermissions && requirePermissions.length > 0) {
//         // requirePermissions.push('login_admin')
//         return _.some(myPermissions, permission => _.includes(requirePermissions, permission))
//     }
//     return true
// }
//
// export const checkPermissionBy = (name) => {
//     return checkPermission(getPermissionBy(name))
// }
//
// export const getPermissionBy = (name) => {
//     if (Array.isArray(name)) {
//         let returnLists = []
//         for (const item of name) {
//             returnLists = [].concat([], returnLists, getPermissionBy(item))
//         }
//         return returnLists
//     }
//     name = name.toUpperCase()
//     return [
//         `LIST_${name}`, `DETAIL_${name}`, `CREATE_${name}`, `UPDATE_${name}`, `DELETE_${name}`, `HISTORY_${name}`
//     ]
// }

/**
 *
 * @param {VueRouter} routes
 */
export const checkAuth = (routes) => {
    routes.beforeEach((to, from, next) => {
        if (to.meta && Object.prototype.hasOwnProperty.call(to.meta, 'auth')) {
            if (to.meta.auth) {
                if (hasToken()) {
                    store.dispatch('Auth/info').then(() => {
                        if (store.getters.user) {
                            if (store.getters.user.status) {
                                    next()
                            } else {
                                gotoDenied(to, next)
                            }
                        } else {
                            gotoLogin(to, next)
                        }
                    }).catch((e) => {
                        gotoLogin(to, next)
                    })
                } else {
                    gotoLogin(to, next)
                }
            } else {
                next()
            }
        } else {
            next()
        }

        //Check đã login => return về dashboard
        if (to.name === 'auth.login') {
            if (!hasToken()) return next()
            return gotoClientDashboard(to,next)
        }

    })
}
