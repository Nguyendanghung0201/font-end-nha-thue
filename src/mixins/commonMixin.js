import Vue from 'vue'
import i18n from '@/utils/i18n'
const STATUS_SERVICE = {
    PAUSE: 0,
    ACTIVE: 1
}

const CONFIG_SERVICE = {
    WEBHOOK: "link_webhook",
    BANK_CODE: "bank_code",
    BANK_ACCOUNT: "account_bank",
    BANK_PASSWORD: "password_bank",
    IP: "ip"
}

const STATUS_SUPPORT = {
    PROCESSING: 0,
    SUCCESS: 1,
    REJECTED: 2
}
Vue.mixin({
    methods: {
        getStatusService(status = '') {
            let name = '--'

            if (status === STATUS_SERVICE.ACTIVE) name = i18n.t('service.active')
            if (status === STATUS_SERVICE.PAUSE) name = i18n.t('service.pause')

            return name
        },
        getStatusBadge(status = '') {
            let color = '--'
            if (status === STATUS_SERVICE.ACTIVE) color = 'bg-success'
            if (status === STATUS_SERVICE.PAUSE) color = 'bg-danger'

            return color
        },
        getStatusBadgeBorder(status = '') {
            let color = '--'
            if (status === STATUS_SERVICE.ACTIVE) color = 'bg-outline-success'
            if (status === STATUS_SERVICE.PAUSE) color = 'bg-outline-danger'

            return color
        },
        getStatusColor(status = '') {
            let color = '--'
            if (status === STATUS_SERVICE.ACTIVE) color = 'text-success'
            if (status === STATUS_SERVICE.PAUSE) color = 'text-danger'

            return color
        },
        getNameConfig(key = '') {
            let name = '--'

            if (key === CONFIG_SERVICE.WEBHOOK) name = i18n.t('service.webhook')
            if (key === CONFIG_SERVICE.BANK_CODE) name = i18n.t('service.bank_code')
            if (key === CONFIG_SERVICE.BANK_ACCOUNT) name = i18n.t('service.bank_account')
            if (key === CONFIG_SERVICE.BANK_PASSWORD) name = i18n.t('service.bank_password')
            if (key === CONFIG_SERVICE.IP) name = i18n.t('service.ip')

            return name
        },
        getIconConfig(key = '') {
            let color = '--'

            if (key === CONFIG_SERVICE.WEBHOOK) color = 'bg-primary'
            if (key === CONFIG_SERVICE.BANK_CODE) color = 'bg-warning'
            if (key === CONFIG_SERVICE.BANK_ACCOUNT) color = 'bg-info'
            if (key === CONFIG_SERVICE.BANK_PASSWORD) color = 'bg-pink'
            if (key === CONFIG_SERVICE.IP) color = 'bg-success'

            return color
        },
        getStatusSupport(status = '') {
            let name = '--'

            if (status === STATUS_SUPPORT.PROCESSING) name = i18n.t('support.processing')
            if (status === STATUS_SUPPORT.SUCCESS) name = i18n.t('support.success')
            if (status === STATUS_SUPPORT.REJECTED) name = i18n.t('support.rejected')

            return name
        },
        getStatusOutlineBadge(status = '') {
            let color = '--'
            if (status === STATUS_SUPPORT.SUCCESS) color = 'badge-outline-success'
            if (status === STATUS_SUPPORT.PROCESSING) color = 'badge-outline-warning'
            if (status === STATUS_SUPPORT.REJECTED) color = 'badge-outline-danger'

            return color
        },
    }
})
