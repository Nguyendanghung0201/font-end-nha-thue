import { getListService, getDetailService, getListMyService, getDetailFunction, getSupport, getListFunction, getConfigService, changeStatusFunction, updateConfigService, getHistorySupport, getDetailSupport } from '@/api/service'

const actions = {
    getListService({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getListService(payload).then(response => {
                if (response.code == 0) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    getDetailService({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getDetailService(payload).then(response => {
                if (response.code == 0) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    getListMyService({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getListMyService(payload).then(response => {
                if(response.code == 0) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    getConfigService({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getConfigService(payload).then(response => {
                if(response.code == 0) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    updateConfigService({ commit }, payload) {
        return new Promise((resolve, reject) => {
            updateConfigService(payload).then(response => {
                if(response.code == 0) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    getListFunction({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getListFunction(payload).then(response => {
                if(response.code == 0) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    getDetailFunction({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getDetailFunction(payload).then(response => {
                if(response.code == 0) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    changeStatusFunction({ commit }, payload) {
        return new Promise((resolve, reject) => {
            changeStatusFunction(payload).then(response => {
                if(response.code == 0) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    getSupport({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getSupport(payload).then(response => {
                if(response.code == 0) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    getHistorySupport({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getHistorySupport(payload).then(response => {
                if(response.code == 0) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    getDetailSupport({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getDetailSupport(payload).then(response => {
                if(response.code == 0) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
}

export default {
    namespaced: true,
    actions,
}
