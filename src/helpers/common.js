import _, { trimEnd } from 'lodash'
import numeral from 'numeral'
const WAValidator = require('multicoin-address-validator')
const UPLOAD_PREFIX = process.env.VUE_APP_UPLOAD_PREFIX || ''
const ASSET_PREFIX = process.env.VUE_APP_ASSET_PREFIX || '/uploads'
export const isSSL = () => {
    return process.env.VUE_APP_USE_HTTPS === true || process.env.VUE_APP_USE_HTTPS === 'true'
}


export const getSocketUrl = () => {
    let url = 'http'
    if (+process.env.VUE_APP_SOCKET_PORT === 443 || isSSL()) {
        url += 's'
    }
    url += '://'
    url += process.env.VUE_APP_SOCKET_URL
    if (+process.env.VUE_APP_SOCKET_PORT !== 80) {
        url += ':' + process.env.VUE_APP_SOCKET_PORT
    }
    return url
}

export const getBaseUrl = (path) => {
    let url = 'http'
    if (+process.env.VUE_APP_API_PORT === 443 || isSSL()) {
        url += 's'
    }
    url += '://'
    url += process.env.VUE_APP_API_ADDRESS
    if (+process.env.VUE_APP_API_PORT !== 80) {
        url += ':' + process.env.VUE_APP_API_PORT
    }
    if (process.env.VUE_APP_API_PREFIX) {
        url += '/' + _.trimStart(process.env.VUE_APP_API_PREFIX, '/')
    }
    if (path) url += '/' + _.trimStart(path, '/')
    return url
}
export const getUploadBaseUrl = () => {
    return getBaseUrl() + '/auth/agent/upload-avatar'
}
export const getPublicAssetUrl = (path) => {
    let url = 'http'
    if (+process.env.VUE_APP_API_PORT === 443 || isSSL()) {
        url += 's'
    }
    url += '://'
    url += process.env.VUE_APP_API_ADDRESS
    if (+process.env.VUE_APP_API_PORT !== 80) {
        url += ':' + process.env.VUE_APP_API_PORT
    }
    if (path) return url + ASSET_PREFIX + '/' + path
    return url + ASSET_PREFIX + '/'
}
export const getLanguage = () => {
    let locale = localStorage.getItem('CRM_USER_LOCALE')
    if (locale) {
        return locale
    }
    if (document) {
        locale = document.getElementsByTagName('html')[0].getAttribute('lang')
    }
    if (!locale) locale = process.env.VUE_APP_LOCALE
    localStorage.setItem('CRM_USER_LOCALE', locale)
    return locale
}
export const setLanguage = (lang) => {
    if (!lang) lang = getLanguage()
    localStorage.setItem('CRM_USER_LOCALE', lang)
    window.location.reload()
}

export const toNumber = function (value, minimumDecimal = 0, maximumFractionDigits = 8, locale = 'en-US') {
    if (typeof value !== 'number') {
        return value
    }
    /*minimumDecimal = parseInt(minimumDecimal);
    if (isNaN(minimumDecimal) || minimumDecimal < 0) minimumDecimal = 0;

    maximumFractionDigits = parseInt(maximumFractionDigits);
    if (isNaN(maximumFractionDigits) || maximumFractionDigits < 0) maximumFractionDigits = 0;

    if (minimumDecimal< maximumFractionDigits) {
        const _bkMinFractionDigits = minimumDecimal;
        minimumDecimal = maximumFractionDigits;
        maximumFractionDigits = _bkMinFractionDigits
    }*/
    const formatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: minimumDecimal,
        maximumFractionDigits: maximumFractionDigits
    })
    return formatter.format(value)
}
/*
* Giống toNumber nhưng giới hạn số và ko làm tròn
* */
export const toNumberNoRound = (value, maximumFractionDigitsDisplay = 2) => {
    const truncateFractionAndFormat = (value, maxDigits) => {
        let returnValue = numeral(value).format('0,0[.]' + '0'.repeat(maxDigits), Math.floor)
        // Kiểm tra có phải là số thập phân
        if (returnValue.indexOf('.') !== -1) {
            // Bỏ những số 0 cuối
            returnValue = trimEnd(returnValue, '0')
        }
        // Kiểm tra nếu dấu . ở cuối sau khi bỏ số 0
        if (returnValue.substr(-1) === '.') {
            returnValue = returnValue.replace('.', '')
        }
        return returnValue
    }
    return truncateFractionAndFormat(value, maximumFractionDigitsDisplay)
}

export function toQueryString(data){
    return Object.keys(data).map(key => key + '=' + data[key]).join('&');
}

export function formatViDate(data) {
    return this.moment(data).format('L')
}
export function formatEnDate(data) {
    return this.moment(data).format("MM/DD/YYYY")
}

// Remove Vietnamese accents
export function removeAccents(str) {
    let AccentsMap = [
        'aàảãáạăằẳẵắặâầẩẫấậ',
        'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
        'dđ', 'DĐ',
        'eèẻẽéẹêềểễếệ',
        'EÈẺẼÉẸÊỀỂỄẾỆ',
        'iìỉĩíị',
        'IÌỈĨÍỊ',
        'oòỏõóọôồổỗốộơờởỡớợ',
        'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
        'uùủũúụưừửữứự',
        'UÙỦŨÚỤƯỪỬỮỨỰ',
        'yỳỷỹýỵ',
        'YỲỶỸÝỴ'
    ]
    for (let i = 0; i < AccentsMap.length; i++) {
        let re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
        let char = AccentsMap[i][0]
        str = str.replace(re, char)
    }
    return str
}
