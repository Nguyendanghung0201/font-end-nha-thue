import { getBaseUrl, getLanguage } from '@/helpers/common'
import Promise from 'bluebird'
import jQuery from 'jquery'
import { clearToken, getToken, setToken } from '@/helpers/auth'
import router from '@/router'
import { gotoDenied, gotoLogin } from '@/middleware/check-auth'
import _ from 'lodash'
import store from '@/utils/store'

const defaultTimeout = 5000
const defaultRoles = []

Promise.config({
    cancellation: true,
    warnings: {
        wForgottenReturn: false
    }
})

const updateForNewRes = (res) => {
    if (typeof res == 'object') {
        const newRes = {}
        _.each(res, (v, k) => {
            if (k === 'status') k = 'success'
            else if (k === 'msg') k = 'error'
            newRes[k] = v
        })
        return newRes
    }
    return res
}

const ApiService = {
    roles: [],
    setRoles(roles) {
        this.roles = [].concat([], defaultRoles, roles)
    },
    addRole(role) {
        this.roles.push(role)
    },
    url(path) {
        if (String(path).match(/^https?:\/\//)) {
            return path
        }
        return getBaseUrl(path)
    },
    /**
     *
     * @returns {{accessToken: string, tokenType: string}}
     */
    getUserToken() {
        return getToken()
    },
    setUserToken(token) {
        return setToken(token)
    },
    removeUserToken() {
        return clearToken()
    },
    beforeSend(xhr, options) {
        try {
            options.url = options.url.replace(/([?&])_=\d+/, '')
            if (options.url.indexOf(getBaseUrl()) >= 0) {
                const dataToken = this.getUserToken()
                if (dataToken && Object.keys(dataToken).length > 0) {
                    // xhr.setRequestHeader('Authorization', `${userToken.token_type} ${userToken.access_token}`)
                    xhr.setRequestHeader('Authorization', `Bearer ${dataToken}`)
                }
                if (this.roles.length) {
                    xhr.setRequestHeader('X-Roles', `${this.roles.join(',')}`)
                }
                xhr.setRequestHeader('X-Locale', getLanguage())
            }
            return xhr
        } catch (e) {
            console.log(e);
        }

    },
    isTimeout(e) {
        return e.message === 'timeout'
    },
    /**
     *
     * @param {jQuery.ajaxSettings|Object} obj
     * @returns {Promise}
     */
    api(obj) {
        return new Promise((p_resolve, p_reject, p_cancel) => {
            let _promise
            p_cancel(() => {
                if (_promise) {
                    _promise.cancel()
                    _promise = null
                }
                // reject(new Error("cancelled"));
            })
            return new Promise((resolve, reject, cancel) => {
                let xhr
                cancel(() => {
                    if (xhr) {
                        xhr.abort()
                        xhr = null
                    }
                    // reject(new Error("cancelled"));
                })
                obj.beforeSend = (...args) => {
                        args = Array.prototype.slice.call(args)
                        xhr = args[0]
                        return this.beforeSend(...args)
                    }
                    /**
                     *
                     * @param {XMLHttpRequest} xhr
                     * @param status
                     */
                obj.complete = (xhr, status) => {
                    if (status === 'parsererror') {
                        reject(new Error(xhr.responseText))
                    } else if (status === 'success') {
                        if (xhr.hasOwnProperty('responseJSON') && xhr.responseJSON) {
                            const res = xhr.responseJSON
                            resolve(updateForNewRes(res))
                        } else {
                            resolve(xhr.responseText)
                        }
                    } else if (status === 'timeout') {
                        reject(new Error(status))
                    } else if (status === 'nocontent' && +xhr.status === 204) {
                        resolve(true)
                    } else {
                        if (xhr.hasOwnProperty('responseJSON') && xhr.responseJSON) {
                            const res = updateForNewRes(xhr.responseJSON)
                            const error = new Error(res.message)
                            error.name = res.name
                            error.statusCode = xhr.status
                            error.response = res
                            error.responseType = 'json'
                            reject(error)
                        } else if (xhr.responseText) {
                            const error = new Error(xhr.responseText)
                            error.statusCode = xhr.status
                            error.response = xhr.responseText
                            error.responseType = 'text'
                            reject(error)
                        } else {
                            const error = new Error(xhr.statusText)
                            error.statusCode = xhr.status
                            error.response = xhr.statusText
                            error.responseType = 'text'
                            reject(error)
                        }
                    }
                }
                jQuery.ajax(obj)
            }).catch(((e) => {
                if (this.isTimeout(e)) {
                    return this.api(obj)
                } else {
                    // window.router = router
                    if (+e.statusCode === 403) {
                        if (e.message) {
                            router.app.$alert(e.message).then(() => {
                                if (router.app.$route.name !== 'auth.denied')
                                    gotoDenied(router.app.$route, router.replace)
                            })
                        } else {
                            if (router.app.$route.name !== 'auth.denied')
                                gotoDenied(router.app.$route, router.replace)
                        }
                    } else if (+e.statusCode === 401) {
                        if (e.message) {
                            router.app.$alert(e.message).then(() => {
                                if (router.app.$route.name !== 'auth.login')
                                    gotoLogin(router.app.$route, router.replace)
                            })
                        } else {
                            if (router.app.$route.name !== 'auth.login')
                                gotoLogin(router.app.$route, router.replace)
                        }
                    } else if (+e.statusCode === 100) {
                        store.dispatch('Auth/logout').finally(() => {
                            alert('Hệ thống đang bảo trì, vui lòng thử lại sau')
                            gotoLogin(router.app.$route, router.replace)
                        })

                    } else {
                        p_reject(e)
                    }
                }
            })).then(p_resolve)
        })
    },
    /**
     *
     * @param method
     * @param path
     * @param params
     * @param obj
     * @returns {Promise}
     */
    request(method, path, params, obj) {
        if (typeof params != 'object') params = {}
        method = method.toUpperCase()
        if (typeof obj != 'object') obj = {}
        if (method === 'POST' || method === 'PUT') {
            if (params instanceof FormData) {
                method = obj.method || 'PUT'
                obj.processData = false
                obj.contentType = false
            }
        }
        if (obj.json) {
            params = JSON.stringify(params)
            obj.contentType = 'application/json'
        }
        // if (method == 'PUT' || method == 'DELETE') {
        //     /*if (params instanceof FormData) {
        //         params.set('_method', method);
        //         method = 'POST'
        //     } else if (typeof params == "object") {
        //         params['_method'] = method;
        //         method = 'POST'
        //     }*/
        // }
        // if (params instanceof FormData) {
        //     obj.enctype = 'multipart/form-data';
        // }
        obj = _.extend({
            url: `${this.url(path)}`,
            data: params,
            type: method,
            dataType: 'json',
            timeout: defaultTimeout
        }, obj, {
            cache: false
        })

        return this.api(obj)

    },
    /**
     *
     * @param path
     * @param params
     * @param obj
     * @returns {Promise}
     */
    get(path, params, obj = {}) {
        return this.request('get', path, params, obj)
    },
    /**
     *
     * @param path
     * @param params
     * @param obj
     * @returns {Promise}
     */
    post(path, params, obj) {
        if (typeof obj != 'object') obj = {}
        return this.request('post', path, params, obj)
    },
    /**
     *
     * @param path
     * @param params
     * @param obj
     * @returns {Promise}
     */
    patch(path, params, obj) {
        if (typeof obj != 'object') obj = {}
        if (!obj.timeout) obj.timeout = 30000
        return this.request('patch', path, params, obj)
    },
    /**
     *
     * @param path
     * @param params
     * @param obj
     * @returns {Promise}
     */
    put(path, params, obj) {
        if (typeof obj != 'object') obj = {}
        if (!obj.timeout) obj.timeout = 30000
        return this.request('put', path, params, obj)
    },

    /**
     *
     * @param path
     * @param params
     * @param obj
     * @returns {Promise}
     */
    delete(path, params, obj) {
        return this.request('delete', path, params, obj)
    }
}

export default ApiService