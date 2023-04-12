import { validationMessage } from 'vuelidate-messages'
import Vue from 'vue'
import { formMessages } from '@/utils/vuelidate'
import _ from 'lodash'
import getUniqId from 'vue-uniq-ids/src/get-uniq-id'
import { validationCode } from '@/utils/validation'
import i18n, { getCoinMaxPrecision, getCoinPrecision } from '@/utils/lang'
import ApiService from '@/utils/api'
// import { checkPermission, checkRole } from '@/middleware/check-auth'
import numeral from 'numeral'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { getUploadBaseUrl } from '@/helpers/common'
import NO_IMAGE from '@/assets/images/error/no-image.svg'
import NO_IMAGE2 from '@/assets/images/error/no-image-2.png'
import NO_AVATAR from '@/assets/images/error/person-circle-outline.svg'
import QRCode from '@/plugins/qr-code'


Swal.prototype.didClose = (...args) => {
    console.log('clicked.close')
    console.log(args)
    return false
}
// if (!options.close) options.close = (...args) => {
//     console.log('clicked.close')
//     console.log(args)
//     return false
// }
const { sprintf, vsprintf } = require('sprintf-js')
const i18nLang = {
    t(title, value, params) {
        let old_params
        if (typeof value === 'undefined') {
            params = undefined
        } else if (typeof value === 'string') {
            if (typeof params !== 'object') {
                params = {}
            }
        } else if (typeof value === 'object') {
            old_params = params
            params = value
            value = old_params
        }
        if (typeof value !== 'string') {
            value = ''
        }
        if (typeof params !== 'object') {
            params = {}
        }
        if (i18n.t(title)) {
            value = i18n.tc(title, params)
            if (typeof value != 'undefined') {
                return value
            }
        }
        return value || title
    },
    tc(title, value, params) {
        return window.Lang.choice(title, value, params)
    },
    te(title) {
        return window.Lang.has(title)
    }
}
Vue.prototype.$t = (key, value, params) => {
    return i18nLang.t(key, value, params)
}
Vue.prototype.$tc = (key, value, params) => {
    return i18nLang.tc(key, value, params)
}
Vue.prototype.$te = (key) => {
    return i18nLang.te(key)
}

// noinspection JSCheckFunctionSignatures
const UPLOAD_IMAGE_CONFIG = {
    MAX_SIZE: 20000,
    SERVER_URL: getUploadBaseUrl()
}

const SOUND = require('@/assets/audio/notification.mp3')
const ICON_NOTIFICATION = require('@/assets/images/logos/timebit-favicon.png')
const ICON_TOAST = require('@/assets/images/users/toast-warn.png')

Vue.mixin({
    methods: {
        validationMsg: validationMessage(formMessages),
        $sprintf: sprintf,
        $vsprintf: vsprintf,
        getLabel(name, parent, showRequired = false) {
            const val = _.get(this.$v, parent)
            let valName
            if (val && (valName = _.get(val, name)) && valName.$params && valName.$params.$label) {
                let labelRequires = ''
                if (showRequired && this.hasRuleRequired(name, parent)) {
                    labelRequires = ' *'
                }
                return valName.$params.$label.value + labelRequires
            }
            return null
        },
        hasRuleRequired(name, parent) {
            if (!parent) parent = 'form'
            const val = _.get(this.$v, parent)
            let valName
            if (val && (valName = _.get(val, name))) {
                return valName.hasOwnProperty('required')
            }
            return false
        },
        showHtmlError(name, parent) {
            if (this.errors[name]) {
                return typeof this.errors[name] == 'object' ? _.first(this.errors[name]) : this.errors[name]
            }
            if (!parent) parent = 'form'
            const val = _.get(this.$v, parent)
            let valName
            if (val && (valName = _.get(val, name))) return this.validationMsg(valName)
            return null
        },
        validateItem(name, parent) {
            if (this.errors[name]) return false
            if (!parent) parent = 'form'
            const val = _.get(this.$v, parent)
            let valName
            if (val && (valName = _.get(val, name))) {
                if (!valName.label) valName.label = 'mục'
                const { $error } = valName
                return !$error
            }
            return true
        },
        setFormError(response) {
            if (!response)
                return this.$awn.alert(i18n.t('dialog.failed'), i18n.t('dialog.ops'))

            if (response.data && response.data.length) {
                let temp = _.extend({}, response.data)
                _.forEach(temp, (v) => {
                    this.errors[v.field] = v.field.charAt(0).toUpperCase()+ v.field.slice(1) + ' ' + v.message
                })
            } else {
                if (response.code) {
                    return this.$awn.alert(this.$t('dialog.ops'))
                } else {
                    return this.$awn.alert(this.$t('dialog.failed'))
                }
            }
        },
        addFormError(name, message) {
            const errors = _.extend({}, this.errors)
            errors[name] = message
            this.errors = errors
        },
        removeFormError(name) {
            if (!name) {
                this.errors = {}
                return
            }
            const errors = _.extend({}, this.errors)
            delete errors[name]
            this.errors = errors
        },
        uuid(prefix) {
            return getUniqId({}, 'id', {
                template: '%arg[0]%%qinu%%arg[1]%',
                args: [prefix + '-']
            })
        },
        _form_error_handle(event) {
            if (event.target.tagName === 'INPUT') {
                this.removeFormError()
            }
        },
        removeListenerRemoveError() {
            this.$el.removeEventListener('keydown', this._form_error_handle)
        },
        addListenerRemoveError() {
            this.$nextTick(() => {
                this.$el.addEventListener('keydown', this._form_error_handle)
            })
        },
        execErrors({ code, messages, message, errors }, parent) {
            if (errors && !messages) messages = errors
            if (!parent) parent = 'form'

            if (message) {
                if (Object.prototype.hasOwnProperty.call(validationCode, message)) {
                    this.$awn.alert(this.$t(validationCode[message]))
                }
            } else if (code === 400 || code === 422) {

                if (messages && messages.length) {
                    const newMessages = []
                    const val = _.get(this.$v, parent)

                    _.forEach(messages, (v, i) => {
                        let addedError = false
                        const name = v.property
                        const rule = v.rule
                        let valName
                        if (val && (valName = _.get(val, name)) && valName.$params) {
                            let label = valName.$params.$label ? valName.$params.$label.value : this.$t('validation.attribute')
                            if (Object.prototype.hasOwnProperty.call(formMessages, rule)) {
                                const $params = valName.$params
                                if (v.params && typeof v.params === 'object') _.extend($params, v.params)
                                this.addFormError(name, formMessages[rule]({ $params: $params, label }))
                                addedError = true
                            } else if (this.$te('validation.' + rule)) {
                                this.addFormError(name, this.$t('validation.' + rule, { attribute: label }))
                                addedError = true
                            }
                        } else {
                            console.log(val, name)
                        }
                        if (!addedError) newMessages.push(v)
                    })
                    console.log(newMessages)
                } else {
                    this.$awn.alert(message)
                }
            }
        },
        $confirmToDelete(text, options = {}) {
            if (!text) text = this.$t('dialog.deleteMessage')
            if (!options.confirmButtonText) options.confirmButtonText = this.$t('dialog.yes_delete')
            options.showLoaderOnConfirm = true
            return this.$confirm(text, this.$t('dialog.confirmDelete'), options)
        },
        $awnInfo(text = '') {
            let options = {
                labels: {
                    info: i18n.t('dialog.info')
                }
            }
            return this.$awn.success(text, options)
        },
        $awnSuccess(text = '') {
            let options = {
                labels: {
                    success: i18n.t('dialog.successfully')
                }
            }
            return this.$awn.success(text, options)
        },
        $awnAlert(text = '') {
            let options = {
                labels: {
                    alert: i18n.t('dialog.error')
                }
            }
            return this.$awn.alert(text, options)
        },
        $awnWarning(text = '') {
            let options = {
                labels: {
                    warning: i18n.t('dialog.note')
                }
            }
            return this.$awn.warning(text, options)
        },
        $confirmAction(text, options = {}) {
            if (!text) text = i18n.t('dialog.confirm_note')
            if (!options.confirmButtonText) options.confirmButtonText = this.$t('dialog.ok')
            return this.$confirm(text, this.$t('dialog.confirm_title'), options)
        },
        $alert(text, options = {}) {
            if (!options.customClass) options.customClass = {}
            if (!options.customClass.confirmButton) options.customClass.confirmButton = 'btn btn-sm btn-primary px-3'
            if (!options.confirmButtonText) options.confirmButtonText = this.$t('dialog.close')
            return this.$swal({
                text,
                allowOutsideClick: false,
                ...options
            })
        },
        $confirm(text, title = i18n.t('dialog.confirm_note'), options = {}) {
            const vm = this
            return this.$alert(text, {
                title,
                showCancelButton: true,
                cancelButtonText: this.$t('dialog.cancel'),
                confirmButtonText: this.$t('dialog.ok'),
                customClass: {
                    confirmButton: 'btn btn-sm btn-primary px-3',
                    cancelButton: 'btn btn-sm btn-secondary px-3'
                },
                // showClass: {
                //     backdrop: 'swal2-noanimation', // disable backdrop animation
                //     popup: '',                     // disable popup animation
                //     icon: ''                       // disable icon animation
                // },
                // hideClass: {
                //     popup: ''                     // disable popup fade-out animation
                // },

                ...options
            })
        },
        $alertInfo(text, title = 'Thông báo', options = {}) {
            return this.$alert(text, {
                title,
                icon: 'info',
                ...options
            })
        },
        $alertSuccess(text, title = i18n.t('dialog.successfully'), options = {}) {
            return this.$alert(text, {
                title,
                icon: 'success',
                ...options
            })
        },
        $alertError(text, title = i18n.t('dialog.ops'), options = {}) {
            return this.$alert(text, {
                title,
                icon: 'error',
                ...options
            })
        },
        $desktopNotification(option = {}, events) {
            let options = {
                title: 'Thông báo', //Truyền option { title:'title' } để thay đổi title thông báo
                icon: ICON_NOTIFICATION,
                ...option
            }
            return this.$notification.show(
                options.title,
                options,
                events
            )
        },
        $alertToastNotify({ title, body, footer, ttl }, callback = Function.prototype) {
            let message = {
                title,
                body,
                footer: footer || window.location.hostname,
                level: 'info'
            }
            let options = {
                action: { click: callback },
                ttl: ttl || 10000
            }
            return this.$toast(message, options)
        },
        getInputMaxLength(name, parent) {
            const val = _.get(this.$v, parent)
            if (val && val[name] && val[name].$params && val[name].$params.maxLength) {
                return val[name].$params.maxLength.max
            }
            return 0
        },
        getCodeError(code) {
            if (!code) return false
            return i18n.t('error.' + code)
        },
        getResponseMessage(code = 0) {
            return this.getCodeError(code) ?? i18n.t('dialog.failed')
        },
        sleeper(time = 1000) {
            return new Promise(resolve => setTimeout(resolve, time))
        },
        toQueryString(data) {
            return Object.keys(data).map(key => key + '=' + data[key]).join('&')
        },
        replaceCoin(coin) {
            if (!coin) return null
            if (coin == 'TRX_USDT') coin = 'USDT'
            return coin
        },
        replaceCoinP2P(coin) {
            if (!coin) return null
            if (coin == 'USDT') coin = 'USDT (TRC-20)'
            if (coin == 'TRX_USDT') coin = 'USDT (TRC-20)'
            if (coin == 'BNB_BUSD') coin = 'USDT (BEP-20)'
            if (coin == 'BCDB_ETWD') coin = 'ETWD'
            return coin
        },
        getStatusOrderP2P(status) {
            let name = ''
            if ([6, 7, 8].includes(status)) name = 'Đã hủy'
            if ([1, 2].includes(status)) name = 'Đang xử lý'
            if (status == 4) name = 'Đã hoàn tất'
            return name
        },
        toNumber(value, minimumDecimal = 0, maximumFractionDigits = 8, locale = 'en-US') {
            if (typeof value !== 'number') {
                return value
            }

            const formatter = new Intl.NumberFormat(locale, {
                minimumFractionDigits: minimumDecimal,
                maximumFractionDigits: maximumFractionDigits
            })
            return formatter.format(value)
        },
        toCurrency(value, minimumDecimal = 0, maximumFractionDigits = 0, locale = 'en-US') {
            if (typeof value !== 'number') {
                return value
            }

            const formatter = new Intl.NumberFormat(locale, {
                minimumFractionDigits: minimumDecimal,
                maximumFractionDigits: maximumFractionDigits
            })
            return formatter.format(value)
        },
        getBankBannerImage(code) {
            let file = null
            try {
                file = require('@/assets/images/banks/banner/' + code + '.png')
            } catch (e) {
            }
            if (file)
                return 'background:linear-gradient(to right, #00579e, #040404ba),url(' + require('@/assets/images/banks/banner/' + code + '.png') + ')'
            return 'background:linear-gradient(to right, #00579e, #040404ba)'
        },
        getDomain(url, subdomain) {
            subdomain = subdomain || false
            url = url.replace(/(https?:\/\/)?(www.)?/i, '')
            if (!subdomain) {
                url = url.split('.')
                url = url.slice(url.length - 2).join('.')
            }
            if (url.indexOf('/') !== -1) {
                return url.split('/')[0]
            }
            return url
        },
        changeQuery(query = 'query', value = '', remove = false) {
            let searchParams = new URLSearchParams(window.location.search)
            if (searchParams.get(query)) {
                if (value) {
                    searchParams.set(query, value)
                } else {
                    searchParams.delete(query)
                }
            } else {
                searchParams.append(query, value)
            }
            if (remove) searchParams.delete(query)
            let newRelativePathQuery = window.location.pathname + '?' + searchParams.toString()
            window.history.replaceState(null, '', newRelativePathQuery)
        },
        /*
        * Author: Canh Pham
        * */
        updateQuery(query = 'query', value = '', remove = false) {
            const paramsToObject = function (urlParams) {
                const result = {}
                const entries = urlParams.entries()
                for (const [key, value] of entries) {
                    result[key] = value
                }
                return result
            }
            let searchParams = new URLSearchParams(window.location.search)
            const oldObject = paramsToObject(searchParams)


            if (typeof query === 'object') {
                if (value === true) {
                    searchParams = new URLSearchParams()
                }
                this.lodash.each(query, (value, key) => {
                    if (value === false) {
                        searchParams.delete(key)
                    } else {
                        searchParams.set(key, value)
                    }
                })
            } else {
                if (searchParams.get(query)) {
                    if (value) {
                        searchParams.set(query, value)
                    } else {
                        searchParams.delete(query)
                    }
                } else {
                    searchParams.append(query, value)
                }
            }

            if (remove) searchParams.delete(query)

            const newObject = paramsToObject(searchParams)

            if (JSON.stringify(newObject) != JSON.stringify(oldObject))
                this.$router.push({
                    path: this.$route.path,
                    query: newObject
                }).finally(() => {

                })
        },
        isUrl(url) {
            const regex = RegExp('(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+@]*)*(\\?[;&a-z\\d%_.~+=-@]*)?(\\#[-a-z\\d_@]*)?$', 'i')
            return url.match(regex)
        },
        capitalizeFirstLetter(string) {
            if (!string) return ''
            return string.charAt(0).toUpperCase() + string.slice(1)
        },
        copyToClipBoard(value = '') {
            this.$copyText(value)
                .then(() => {
                    this.$awnSuccess(this.$t('message.copied'))
                })
                .catch((err) => {
                    this.$awnAlert(this.$t('message.copied_failed'))
                    console.log(err)
                })
        },
        replaceCoinNetwork(coin = '', network = '') {
            if (coin == 'USDT') {
                if (network == 'TRX') return 'TRC-20'
                if (network == 'ETH') return 'ERC-20'
                if (network == 'ERC20') return 'ERC-20'
                if (network == 'BSC') return 'BEP-20'
                if (network == 'SOL') return 'SOL'
            }
            return network
        },
        getBankLogo(code) {
            try {
                return require('@/assets/images/banks/logo/' + code + '.png')
            } catch (e) {
                return require('@/assets/images/error/no-image.svg')
            }
        },
        getCoinImg(code) {
            try {
                return require('@/assets/images/coins/' + code + '.png')
            } catch (e) {
                return require('@/assets/images/error/no-image.svg')
            }
        },
        getNoImage(e) {
            return e.target.src = NO_IMAGE
        },
        getNoImage2(e) {
            return e.target.src = NO_IMAGE2
        },
        getNoAvatar(e) {
            return e.target.src = NO_AVATAR
        },
        menuStyles() {
            let style = {}
            if (((window.navigator.userAgent).toLowerCase()).indexOf('safari') || this.$mq == 'mobile') {
                style.height = '100px'
            }
            return style
        },
        getCoinOriginCode(coin, network) {
            if (!coin || !network) return null
            if (coin == 'USDT') {
                if (network == 'TRX') return 'TRX_USDT'
                if (network == 'ETH') return 'EUSDT'
                if (network == 'BSC') return 'BNB_BUSD'
                if (network == 'SOL') return 'SOL_USDT'
            }
            return null
        },
        getCoinPrecision,
        getCoinMaxPrecision,
        charLimit  (str, length = 30, omission = '...') {
            return _.trim(_.truncate(str, { length: length, omission: omission }))
        },
        showSubSidebar() {
            const subSideBar = document.querySelector('.nk-ibx-aside')
            if(subSideBar) {
                subSideBar.classList.toggle('content-active')
            }
        },
        hideSubSideBar() {
            const subSideBar = document.querySelector('.nk-ibx-aside')
            if(subSideBar) {
                subSideBar.classList.remove('content-active')
            }
        }
    },
    data: function () {
        return {
            QRCode: QRCode,
            api: ApiService,
            lodash: _,
            errors: {},
            numeral: numeral,
            UPLOAD_IMAGE_CONFIG,
            SOUND,
            ICON_NOTIFICATION,
            ICON_TOAST
        }
    }
})
