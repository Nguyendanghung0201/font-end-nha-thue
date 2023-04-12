import ApiService from '@/utils/api'

export function getListFAQs(data) {
    return ApiService.get('/agent/faqs', data, {
        timeout: 10000
    })
}