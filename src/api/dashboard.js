import ApiService from '@/utils/api'

export function info(data) {
    return ApiService.get('/statistic/total-statistic-for-group', data, {
        timeout: 30 * 1000
    })
}
