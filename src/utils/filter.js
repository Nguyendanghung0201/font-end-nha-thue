import Vue from 'vue'
import moment from 'moment-timezone'
import { getLanguage } from '@/helpers/common'
import lodash, { trimEnd } from 'lodash'
import numeral from 'numeral'
const locale = getLanguage()
moment.locale('vi')
moment.updateLocale('vi', {
    months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    monthsShort: ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'],
    weekdays: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    weekdaysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    week: {
        dow: 1
    },
    firstDayOfWeek: 1,
    relativeTime: {
        M: '1 tháng',
        d: '1 ngày',
        h: '1 giờ',
        m: '1 phút',
        w: '1 tuần',
        y: '1 năm'
    }
})

moment.locale(locale)
moment.relativeTimeThreshold('ss', 0)

Vue.prototype.moment = moment

Vue.filter('dateFormat', (value) => {
    return moment(value).format('LL')
})
Vue.filter('dateTimeFormat', (value, format = 'YYYY-MM-DD HH:mm') => {
    return moment(value).format(format)
})
Vue.filter('longDateTimeFormat', (value) => {
    return moment(value).format('LLLL')
})
Vue.filter('timeFormat', (value) => {
    return moment(value).format('LT')
})
Vue.filter('longTimeFormat', (value) => {
    return moment(value).format('LTS')
})
Vue.filter('timestampToDateFormat', (value) => {
    return moment.unix(value).format('LLL')
})
Vue.filter('timestampToDate', (value) => {
    return moment.unix(value).format('LL')
})
Vue.filter('timestampToTime', (value) => {
    return moment.unix(value).format('LT')
})
Vue.filter('fromNow', (value) => {
    return moment(value).fromNow()
})
Vue.filter('toNow', function (date) {
    return moment(date).toNow()
})
Vue.filter('toNumber', (value, minimumDecimal = 0, maximumFractionDigits = 8, locale = 'en-US') => {
    if (typeof value !== 'number') {
        return value
    }
    const formatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: minimumDecimal,
        maximumFractionDigits: maximumFractionDigits
    })
    return formatter.format(value)
})
/*
* Giống toNumber nhưng giới hạn số và ko làm tròn
* */
Vue.filter('toNumberNoRound', (value, maximumFractionDigitsDisplay = 2) => {
    const truncateFractionAndFormat = (value, maxDigits) => {
        let returnValue = numeral(value).format('0,0[.]' + '0'.repeat(maxDigits), Math.floor)
        // Kiểm tra có phải là số thập phân
        if (returnValue.indexOf('.') != -1) {
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
})

Vue.filter('charLimit', (str, length = 30, omission = '...') => {
    return lodash.truncate(str, { length: length, omission: omission })
})

Vue.filter('toCurrency', (value, currency, minimumFractionDigits = 0, locale = 'en-US') => {
    if (typeof value !== 'number') {
        return value
    }
    const formatter = new Intl.NumberFormat(locale, {
        style: 'decimal',
        minimumFractionDigits,
        maximumFractionDigits: minimumFractionDigits
    })
    return formatter.format(value)
})

// Hide customer email and phone
Vue.filter('censorEmail', (email, startLength = 4, endLength = 4) => {
    if(!email) return 'INVALID_EMAIL'
    let array, start, end

    array = email.split('@')
    start = array[0]; end = array[1]

    if(start <= 6) {
        startLength = endLength = 2
    }
    start = email.substr(0, startLength)
    end = email.substr((email.length - endLength), endLength)

    return `${start}***@${end}`
})

Vue.filter('censorPhone', (phone, startLength = 4, endLength = 3) => {
    if(!phone) return 'INVALID_VALUE'
    let start, end

    if(phone > 12) {
        startLength = 4
        endLength = 3
    }
    start = phone.substr(0, startLength)
    end = phone.substr((phone.length - endLength), endLength)

    return `${start}***${end}`
})

Vue.filter('shortBankNumber', (bankNumber, startLength = 4, endLength = 4) => {
    if (!bankNumber) return ''
    bankNumber = bankNumber.toString()
    if (bankNumber.length <= 9) {
        return bankNumber
    } else {
        let end, start

        start = bankNumber.substr(0, startLength)
        end = bankNumber.substr((bankNumber.length) - endLength, endLength)

        return `${start}...${end}`
    }
})

// Short Wallet address
Vue.filter('shortWalletAddress', (walletAddress,startLength = 4,endLength = 4,onlyStart = false,onlyEnd=false) => {
    if (!walletAddress) return ''
    let end, start

    if (walletAddress.length <= 9) {
        startLength = endLength = 3
    }

    start = walletAddress.substr(0, startLength)
    end = walletAddress.substr((walletAddress.length) - endLength, endLength)
    if (onlyStart) return start
    if (onlyEnd) return end
    return `${start}...${end}`
})
