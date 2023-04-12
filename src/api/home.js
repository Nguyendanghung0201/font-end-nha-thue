import ApiService from '@/utils/api'

export function getListHome(data) {
    return ApiService.post('client/build', data, {
        timeout: 10000
    })
}
export function getListProvice(data) {
    return ApiService.get('client/location?mod=list_province', data, {
        timeout: 10000
    })
}
export function getListCity(data) {
    return ApiService.get('client/location?mod=list_city', data, {
        timeout: 10000
    })
}
export function getListAlong(data) {
    console.log('data',data)
    return ApiService.get('client/location?mod=list_along', data, {
        timeout: 10000
    })
}

export function saveOrDeleteCareHome(data) {
    return ApiService.post('client/my_build', data, {
        timeout: 10000
    })
}
export function listCareHome(data) {
    return ApiService.get('client/my_build?mod=list', data, {
        timeout: 10000
    })
}
export function detailHome(data) {
    return ApiService.get('client/build?mod=detail', data, {
        timeout: 10000
    })
}


export function getListBankServiceRegistered() {
    return ApiService.get('/agent/sidebar/bank')
}
export function getDetailMap(data) {
    return ApiService.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data}&key=AIzaSyAaHZ6LVyzZAhnBKHCrb7PcTjBcUttqIeY`, {
        timeout: 10000
    })
}


/*
 * Integrated
 * */
export function createIntegrated(data) {
    return ApiService.post('/agent/service/bank-integrated', data, {
        timeout: 10000
    })
}