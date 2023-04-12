import { clearToken } from '@/helpers/auth'
import ApiService from '@/utils/api'
import { confirm, forgot, info, login, logout, register, update, updatePassword, twoFA, generateQRCode, updateAvatar, updateSettingKey, checkEmail, getSettingKey } from '@/api/auth'
import StorageExpired from '@/utils/storage'

function setCookie(c_name, value, exdays) {
    const exdate = new Date()
    exdate.setDate(exdate.getDate() + exdays)
    const c_value = escape(value) + ((exdays == null) ? '' : '; expires=' + exdate.toUTCString())
    document.cookie = c_name + '=' + c_value
}

const isLogged = () => {
    return ApiService.getUserToken()
}

const setLogged = (token) => {
    setCookie('token', token.token, 7)
    return ApiService.setUserToken(token.token)
}
const removeToken = () => {
    return ApiService.removeUserToken()
}
const state = {
    user: null,
    emailResetPassword: null,
    roles: [],
    token: isLogged
}
const getters = {
    user: (state) => state.user
}
const mutations = {
    SET_USER(state, user) {
        state.user = user
    },
    SET_ROLES(state, value) {
        state.roles = value
    },
    SET_PERMISSIONS(state, value) {
        state.permissions = value
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_EMAIL_RESET_PASSWORD(state, value) {
        state.emailResetPassword = value
    }
}
const actions = {
    login({ commit }, payload) {
        payload['mod'] = "login"
        return new Promise((resolve, reject) => {
            login(payload).then(response => {
                if (response.code == 0) {
                    setLogged(response.data)
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {
            return logout().then((res) => {
                if (clearToken()) {
                    setCookie('token', null)
                    commit('SET_USER', null)
                    commit('SET_ROLES', [])
                    StorageExpired.remove('orderActiveItem')
                    StorageExpired.remove('followedOrder')
                    StorageExpired.remove('followedOrderDisplayBox')
                    resolve(true)
                } else {
                    reject()
                }
                StorageExpired.remove('orderActiveItem')
                StorageExpired.remove('followedOrder')
                StorageExpired.remove('followedOrderDisplayBox')
                resolve()
            }).catch(reject)
        })
    },

    resetToken({ commit }) {
        return new Promise((resolve, reject) => {
            if (clearToken()) {
                setCookie('token', null)
                commit('SET_USER', null)
                commit('SET_ROLES', [])
                StorageExpired.remove('orderActiveItem')
                StorageExpired.remove('followedOrder')
                StorageExpired.remove('followedOrderDisplayBox')
                resolve(true)
            } else {
                reject()
            }
            StorageExpired.remove('orderActiveItem')
            StorageExpired.remove('followedOrder')
            StorageExpired.remove('followedOrderDisplayBox')
            resolve()
        })
    },

    info({ commit }) {
        return new Promise((resolve, reject) => {
            info().then(resource => {
                if (resource.success) {
                    const data = resource.data[0]

                    // commit('SET_ROLES', resource.data.roles)
                    // let permissions = data.permissions
                    // if (data.email == 'super_admin@gmail.com') {
                    //     permissions = data.permissions = permissions.concat(getPermissionBy('GROUP')
                    //         .concat(getPermissionBy('MEMBER'))).concat(['CREATE_SYSTEM_GROUP']).concat(getPermissionBy('ROLE'))
                    // }
                    commit('SET_USER', data)
                        // commit('SET_PERMISSIONS', permissions)
                    resolve(resource)
                } else {
                    reject(resource)
                }
            }).catch(reject)
        })
    },

    update({ commit }, payload) {
        return new Promise((resolve, reject) => {
            update(payload).then((response) => {
                if (response.success) {
                    resolve(response.data)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    updateAvatar({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            updateAvatar(payload).then((response) => {
                if (response.success) {
                    dispatch('info')
                    resolve(response.data)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    updatePassword({ commit }, payload) {
        return new Promise((resolve, reject) => {
            updatePassword(payload).then((response) => {
                if (response.success) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    uploadKyc({ commit }, payload) {
        return new Promise((resolve, reject) => {
            uploadKyc(payload).then((response) => {
                if (response.success) {
                    resolve(response.data)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    register({ commit }, payload) {
        payload['mod'] = 'register'
        return new Promise((resolve, reject) => {
            register(payload).then(response => {
                if (response.success) {
                    resolve(response.data[0])
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    confirm({ commit }, payload) {
        return new Promise((resolve, reject) => {
            confirm(payload).then(response => {
                if (response.success) {
                    resolve(response.data[0])
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    checkEmail({ commit }, payload) {
        return new Promise((resolve, reject) => {
            checkEmail(payload).then(response => {
                if (response.success) {
                    resolve(response.data[0])
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    forgot({ commit }, payload) {
        return new Promise((resolve, reject) => {
            forgot(payload).then(response => {
                if (response.success) {
                    commit('SET_EMAIL_RESET_PASSWORD', payload.email)
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    reset({ commit }, payload) {
        return new Promise((resolve, reject) => {
            reset(payload).then(response => {
                if (response.success) {
                    resolve(response)
                    commit('SET_EMAIL_RESET_PASSWORD', null)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    /*
     * Phước phá thêm 2FA
     * */
    twoFA({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            twoFA(payload).then(response => {
                if (response.success) {
                    dispatch('info')
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    generateQRCode({ commit }, payload) {
        return new Promise((resolve, reject) => {
            generateQRCode(payload).then(response => {
                if (response.success) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    updateSettingKey({ commit }, payload) {
        return new Promise((resolve, reject) => {
            updateSettingKey(payload).then(response => {
                if (response.success) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    getSettingKey({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getSettingKey(payload).then(response => {
                if (response.success) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}