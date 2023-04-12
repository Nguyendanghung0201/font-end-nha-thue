import ApiService from '@/utils/api'

export function getListBank(data) {
    return ApiService.get('/agent/service/bank-network', data, {
        timeout: 10000
    })
}

export function getListBankServiceRegistered() {
    return ApiService.get('/agent/sidebar/bank')
}


/*
* Integrated
* */
export function createIntegrated(data) {
    return ApiService.post('/agent/service/bank-integrated', data, {
        timeout: 10000
    })
}
