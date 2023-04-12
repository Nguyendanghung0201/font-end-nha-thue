import { getListCity, getListHome, getListProvice, getListAlong, saveOrDeleteCareHome, listCareHome, detailHome ,getDetailMap } from '@/api/home'

const actions = {
    getListHome({ commit }, payload) {
        payload['mod'] = 'list'
        return new Promise((resolve, reject) => {
            getListHome(payload).then(response => {
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

    /*
     * TODO: Get the list of banking services that the agent has registered
     * */

    listCity({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getListCity(payload).then(response => {
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


    listProvice({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getListProvice(payload).then(response => {
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

    listAlong({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getListAlong(payload).then(response => {
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
    saveCareHome({ commit }, payload) {
        payload['mod'] = 'add'
        return new Promise((resolve, reject) => {
            saveOrDeleteCareHome(payload).then(response => {
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
    deleteCareHome({ commit }, payload) {
        payload['mod'] = 'delete'
        return new Promise((resolve, reject) => {
            saveOrDeleteCareHome(payload).then(response => {
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
    listCareHome({ commit }, payload) {
        return new Promise((resolve, reject) => {
            listCareHome(payload).then(response => {
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
    detailHome({ commit }, payload) {
        return new Promise((resolve, reject) => {
            detailHome(payload).then(response => {
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
    getDetailMap({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getDetailMap(payload).then(response => {
                console.log(response)
                if (response.status == "OK") {
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
    actions
}