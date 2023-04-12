import {getListRef } from '@/api/affi'

const actions = {
    getListService({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getListRef(payload).then(response => {
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



 

}

export default {
    namespaced: true,
    actions,
}
