const i18n = {
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
        if (window.Lang.has(title)) {
            value = window.Lang.get(title, params)
            if (typeof value != 'undefined') {
                return value
            }
        }
        if (window.settings.fallbackLocale) {
            value = window.Lang.get(title, params, window.settings.fallbackLocale)
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
export default i18n
