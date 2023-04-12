import { createIntegrated, getListBank, getListBankServiceRegistered } from '@/api/bank'

const actions = {
    getListBank({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getListBank(payload).then(response => {
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
    listBankServiceRegistered({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getListBankServiceRegistered(payload).then(response => {
                if (response.code == 0) {
                    resolve(response.data)
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },


    /*
    * Created
    * */
    getSettingBank({ commit }, payload) {
        return new Promise((resolve, reject) => {
            const banks = [
                {
                    id: 1,
                    bank_name: 'BIDV',
                    bank_code: 'BIDV',
                    type: 'personal',
                    logo: 'http://localhost:8888/assets/1.0/img/BIDV.8c1d9e37.png',
                    setting: [
                        { key: 'bank_account' },
                        { key: 'password' }
                    ]
                },
                {
                    id: 2,
                    bank_name: 'Vietcombank',
                    bank_code: 'VCB',
                    type: 'personal',
                    logo: 'http://localhost:8888/assets/1.0/img/VCB.8219d586.png',
                    setting: [
                        { key: 'bank_account' },
                        { key: 'password' }
                    ]
                },
                {
                    id: 3,
                    bank_name: 'PVCB',
                    bank_code: 'PVCB',
                    type: 'personal',
                    logo: 'http://localhost:8888/assets/1.0/img/PVCB.16d1985f.png',
                    setting: [
                        { key: 'bank_account' },
                        { key: 'password' }
                    ]
                },
                {
                    id: 4,
                    bank_name: 'VIB',
                    bank_code: 'VIB',
                    type: 'enterprise',
                    logo: 'http://localhost:8888/assets/1.0/img/VIB.7d0e85c7.png',
                    setting: [
                        { key: 'bank_account' },
                        { key: 'password' }
                    ]
                },
                {
                    id: 5,
                    bank_name: 'Agribank',
                    bank_code: 'agribank',
                    type: 'personal',
                    logo: 'https://inkythuatso.com/uploads/images/2021/11/logo-agribank-inkythuatso-3-01-09-15-15-16.jpg',
                    setting: [
                        { key: 'bank_account' },
                        { key: 'password' }
                    ]
                },
                {
                    id: 6,
                    bank_name: 'Vietinbank',
                    bank_code: 'CTG ',
                    type: 'personal',
                    logo: 'https://inkythuatso.com/uploads/images/2021/09/logo-vietinbank-inkythuatso-10-13-22-06.jpg',
                    setting: [
                        { key: 'bank_account' },
                        { key: 'password' }
                    ]
                },
                {
                    id: 7,
                    bank_name: 'Techcombank',
                    bank_code: 'techcombank ',
                    type: 'personal',
                    logo: 'https://inuvdp.com/wp-content/uploads/2022/08/file-vector-logo-techcombank-02.jpg',
                    setting: [
                        { key: 'bank_account' },
                        { key: 'password' }
                    ]
                }
            ]
            const response = banks.find(item => item.id == payload.id)
            resolve(response)
        })
    },


    /*
    * Integrated
    * */
    createIntegrated({ commit }, payload) {
        return new Promise((resolve, reject) => {
            createIntegrated(payload).then(response => {
                if (response.code == 0) {
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
    actions
}
