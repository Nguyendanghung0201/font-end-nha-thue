import ApiService from '@/utils/api'

export function login(data) {
    return ApiService.post('client/users', data, {
        json: true
    })
}

export function update(data) {
    return ApiService.post('/auth/agent/profile', data, {
        json: true,
        timeout: 10000
    })
}

export function updateAvatar(data) {
    return ApiService.post('/auth/agent/upload-avatar', data, {
        json: true,
        timeout: 10000
    })
}

export function updatePassword(data) {
    return ApiService.post('/auth/agent/change-password', data, {
        json: true,
        timeout: 10000
    })
}

// export function uploadKyc(data) {
//     return ApiService.post('/user/upload-kyc', data, {
//         json: true,
//         timeout: 10000
//     })
// }
export function register(data) {
    return ApiService.post('client/users', data, {
        json: true,
        timeout: 10000
    })
}

export function logout(data) {
    return ApiService.post('/auth/logout', data)
}

export function info() {
    return ApiService.get('client/users?mod=my_profile')
}

export function confirm(data) {
    return ApiService.post('/auth/agent/get-code', data, {
        json: true,
        timeout: 10000
    })
}

export function checkEmail(data) {
    return ApiService.post('/auth/agent/check-email', data, {
        json: true,
        timeout: 10000
    })
}

export function forgot(data) {
    return ApiService.post('/auth/agent/forget-password', data, {
        json: true,
        timeout: 10000
    })
}

// export function reset(data) {
//     return ApiService.post('/auth/confirm-reset-password', data, {
//         json: true,
//         timeout: 10000
//     })
// }

/*
 * Phước phá thêm 2FA
 * */
export function generateQRCode(data) {
    return ApiService.get('/2fa/generate', data)
}

export function twoFA(data) {
    if (data.type === 'disable') {
        return ApiService.put('/2fa/disable', data, {
            json: true,
            timeout: 10000
        })
    }
    return ApiService.put('/2fa/enable', data, {
        json: true,
        timeout: 10000
    })
}

export function updateSettingKey(data) {
    return ApiService.post('/auth/agent/update-public-key', data, {
        json: true,
        timeout: 10000
    })
}

export function getSettingKey(data) {
    return ApiService.get('/auth/agent/get-public-key', data, {
        timeout: 10000
    })
}