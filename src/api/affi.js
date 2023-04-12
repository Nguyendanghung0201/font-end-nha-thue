import ApiService from '@/utils/api'

/*
* Integrated
* */
export function getListRef() {
    return ApiService.get('client/users?mod=list_ref', {
        timeout: 10000
    })
}
