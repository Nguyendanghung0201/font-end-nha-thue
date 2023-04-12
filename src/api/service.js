import ApiService from '@/utils/api'

export function getListService(data) {
    return ApiService.get('/agent/service', data, {
        timeout: 30 * 1000
    })
}

export function getDetailService(id, data) {
    return ApiService.get(`/agent/service/${id}`, data, {
        timeout: 30 * 1000
    })
}

export function getListMyService(data) {
    return ApiService.get(`/agent/service/register`, data, {
        timeout: 30 * 1000
    })
}

export function getConfigService(data) {
    return ApiService.get('/agent/service/config', data, {
        timeout: 10000
    })
}
export function updateConfigService(data) {
    return ApiService.post('/agent/service/update-config', data, {
        json: true,
        timeout: 10000
    })
}

export function getListFunction(data) {
    return ApiService.get('/agent/service/function', data, {
        timeout: 30 * 1000
    })
}

export function getDetailFunction(id, data) {
    return ApiService.get(`/agent/service/function/${id}`, data, {
        timeout: 30 * 1000
    })
}

export function changeStatusFunction(data) {
    return ApiService.post(`/agent/service/function/change-status`, data, {
        json: true,
        timeout: 10000
    })
}

export function getSupport(data) {
    return ApiService.post('/support/create', data, {
        json: true,
        timeout: 10000
    })
}
export function getHistorySupport(data) {
    return ApiService.get('/agent/support', data, {
        timeout: 10000
    })
}
export function getDetailSupport(id, data) {
    return ApiService.get(`/agent/support/${id}`, data, {
        timeout: 10000
    })
}