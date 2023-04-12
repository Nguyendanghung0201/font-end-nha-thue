import Vue from 'vue'
import _ from 'lodash'
import Vuelidate from 'vuelidate'
import i18n from '@/utils/i18n'
import { getLanguage, toNumber, toNumberNoRound } from '@/helpers/common'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

_.mixin(require('lodash-inflection'))
const validators = require('vuelidate/lib/validators')

export const phoneValidation = (phoneNumber, countryCode) => {
    const parsing = phoneNumber && countryCode ? parsePhoneNumberFromString(phoneNumber, countryCode) : null
    return {
        countryCode: countryCode,
        isValid: false,
        ...(phoneNumber && (phoneNumber !== '') ? { phoneNumber: phoneNumber }
                : null
        ),
        ...(parsing ? {
                countryCallingCode: parsing.countryCallingCode,
                formattedNumber: parsing.number,
                nationalNumber: parsing.nationalNumber,
                isValid: parsing.isValid(),
                type: parsing.getType(),
                formatInternational: parsing.formatInternational(),
                formatNational: parsing.formatNational(),
                uri: parsing.getURI(),
                e164: parsing.format('E.164')
            } : null
        )
    }
}
const getMessage = (rule, $params) => {
    if ($params && $params.$message && $params.$message.value && $params.$message.value[rule]) return $params.$message.value[rule]
    return null
}
const getLabel = ($params, label) => {
    let _label = ''
    if ($params && $params.$label && $params.$label.value) {
        _label = $params.$label.value
    }
    if (!_label && label) {
        _label = label
    }
    if (!_label) {
        _label = i18n.t('validation.attribute')
    }
    return _label
}
export const formMessages = {
    alpha: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.alpha', { attribute })
    },
    alphaNum: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.alpha_num', { attribute })
    },
    numeric: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.numeric', { attribute })
    },
    string: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.string', { attribute })
    },
    array: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.array', { attribute })
    },
    integer: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.integer', { attribute })
    },
    decimal: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.decimal', { attribute })
    },
    email: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.email', { attribute })
    },
    date: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.date', { attribute })
    },
    datetime: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.datetime', { attribute })
    },
    url: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.url', { attribute })
    },
    ipAddress: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.ip', { attribute })
    },
    macAddress: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.mac_address', { attribute })
    },
    sameAs: function ({ $params, label }) {
        const attribute = getLabel($params, label), other = $params.sameLabel ? $params.sameLabel.value : $params.sameAs.eq
        return i18n.t('validation.same', { attribute, other })
    },
    oneOf: function ({ $params, label }) {
        const attribute = getLabel($params, label), other = $params.oneOf.value.join(', ')
        return i18n.t('validation.in_array', { attribute, other })
    },
    required: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.required', { attribute })
    },
    unique: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.unique', { attribute })
    },
    boolean: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.boolean', { attribute })
    },
    minValue: function ({ $params, label }) {
        const attribute = getLabel($params, label), min = toNumberNoRound($params.minValue.min, getLanguage())
        return i18n.t('validation.min.numeric', { attribute, min })
    },
    maxValue: function ({ $params, label }) {
        let precious = 0
        if ($params && $params.$precious && $params.$precious.value) precious = $params.$precious.value
        const attribute = getLabel($params, label), max = toNumberNoRound($params.maxValue.max, precious)
        return i18n.t('validation.max.numeric', { attribute, max })
    },
    between: function ({ $params, label }) {
        const attribute = getLabel($params, label),
            max = toNumberNoRound($params.between.max, getLanguage()),
            min = toNumberNoRound($params.between.min, getLanguage())
        return i18n.t('validation.between.numeric', { attribute, min, max })
    },
    minLength: function ({ $params, label }) {
        const attribute = getLabel($params, label), min = $params.minLength.min
        return i18n.t('validation.min.string', { attribute, min })
    },
    maxLength: function ({ $params, label }) {
        const attribute = getLabel($params, label), max = $params.maxLength.max
        return i18n.t('validation.max.string', { attribute, max })
    },
    password: function ({ $params, label}) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.password', { attribute })
    },
    phone: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.phone', { attribute })
    },
    isPhone: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        return i18n.t('validation.phone', { attribute })
    },
    gte: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        if ($params.gte.message) return $params.gte.message
        if ($params.gte.label) return i18n.t('validation.gte.numeric', { attribute, value: $params.gte.label })
        return 'error'
    },
    lte: function ({ $params, label }) {
        const attribute = getLabel($params, label)
        if ($params.lte.message) return $params.lte.message
        if ($params.lte.label) return i18n.t('validation.lte.numeric', { attribute, value: $params.lte.label })
        return 'error'
    }
}

_.forEach(formMessages, (v, k) => {
    const oldFunc = v
    formMessages[k] = function (obj) {
        const message = getMessage(k, obj.$params)
        if (message) return message
        return oldFunc(obj)
    }
})

validators.date = (value) => {
    if (value) {
        try {
            const matches = /^(\d{4})[-\/](\d{2})[-\/](\d{2})$/.exec(value)
            if (matches == null) return false
            return Vue.prototype.moment(value, 'YYYY-MM-DD', true).isValid()
        } catch (e) {
        }
        return false
    }
    return true
}

validators.password = (value) => {
    if(value) {
        try {
            const matches = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/.exec(value)
            if(matches == null) return false
            return true
        } catch (e) {
            return false
        }
    }
    return true
}

validators.isPhone = (value) => {
    if(value) {
        try {
            const matches = /^([^<>.,_@$%#^&*(){}\[\]|\\+=;:"'?/~`!-])[0-9]*$/ig.exec(value)
            if(matches == null) return false
            return true
        } catch (e) {
            return false
        }
    }
    return true
}
validators.datetime = (value) => {
    if (value) {
        try {
            const matches = /^(\d{4})[-\/](\d{2})[-\/](\d{2}) (\d{2}):(\d{2}):(\d{2})$/.exec(value)
            if (matches == null) return false
            return Vue.prototype.moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()
        } catch (e) {
        }
        return false
    }
    return true
}

validators.oneOf = (lists) => validators.helpers.withParams({
    type: 'oneOf',
    value: lists
}, (value) => !validators.helpers.req(value) || lists.indexOf(value) >= 0)

validators.boolean = (value) => {
    if (value === null) return true
    if (value === true || value === false) return true
    if (value === 'true' || value === 'false') return true
    if (value === 0 || value === 1) return true
    if (value === '0' || value === '1') return true
    return false
}


validators.gte = (column, message = null, label = null) => validators.helpers.withParams({
    type: 'gte',
    value: column,
    message,
    label
}, (value, parentVm) => {
    if (value && Object.prototype.hasOwnProperty.call(parentVm, column) && parentVm[column]) {
        return value >= parentVm[column]
    }
    return true
})
validators.lte = (column, message = null, label = null) => validators.helpers.withParams({
    type: 'lte',
    value: column,
    message,
    label
}, (value, parentVm) => {
    if (value && Object.prototype.hasOwnProperty.call(parentVm, column) && parentVm[column]) {
        return value <= parentVm[column]
    }
    return true
})
validators.phone = (countryCode) => validators.helpers.withParams({
    type: 'phone',
    value: countryCode
}, (value) => {
    if (value) {
        const results = phoneValidation(value, countryCode)
        if (results) return results.isValid
        return false
    }
    return true
})

validators.$label = (label) => validators.helpers.withParams({ type: '$label', value: label }, (value) => true)
validators.$precious = (value) => validators.helpers.withParams({ type: '$precious', value: value }, (value) => true)
validators.$message = (message) => validators.helpers.withParams({ type: '$message', value: message }, (value) => true)

validators.isTrue = (value) => {
    return value === true || value === 'true' || value === 1
}

window.validators = validators


export { validators }
Vue.use(Vuelidate)
