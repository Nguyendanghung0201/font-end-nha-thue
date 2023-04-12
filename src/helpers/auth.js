import StorageExpired from "@/utils/storage";

export const hasToken = () => {
    return !!StorageExpired.get('token');
}

/**
 *
 * @returns {*}
 */
export const getToken = () => {
    return StorageExpired.get('token', {});
}

export const setToken = (token) => {
    return StorageExpired.set('token', token, 60 * 60 * 24 * 7)
}

export const clearToken = () => {
    return StorageExpired.remove('token')
}
