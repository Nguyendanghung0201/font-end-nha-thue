import { getListFAQs } from '@/api/faq'

const actions = {
    getListFAQs({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getListFAQs(payload).then(response => {
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