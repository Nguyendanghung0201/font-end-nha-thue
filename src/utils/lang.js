import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getLanguage, setLanguage } from '@/helpers/common'
import _ from 'lodash'

// import globalLang from './global_lang.json'
import globalLang from '/public/languages/global.json'

Vue.use(VueI18n)
export const getCoinPrecision = function (currency) {
    //return 2
    if (currency === 'USDT') return 2
    if (currency === 'TRX_USDT') return 2
    /**/
    else if (currency == 'VND') return 0
    else if (currency == 'VNDT') return 0
    /**/
    else if (currency === 'BTC') return 8
    else if (currency === 'ETH') return 8
    else if (currency === 'BNB') return 8
    else if (currency === 'ADA') return 8
    else if (currency === 'BCDB_ETWD' || currency === 'ETWD') return 0
    else if (currency === 'VNDT') return 0
    return 8

}
export const getCoinMaxPrecision = function (currency) {
    if (currency === 'USDT' || currency === 'TRX_USDT') return 2
    /**/
    else if (currency == 'VND') return 0
    else if (currency == 'VNDT') return 0
    /**/
    else if (currency === 'BTC') return 8
    else if (currency === 'ETH') return 8
    else if (currency === 'BNB') return 8
    else if (currency === 'ADA') return 8
    else if (currency === 'BCDB_ETWD' || currency === 'ETWD') return 0
    else if (currency === 'VNDT') return 0
    return 8
}
export const getCurrencyPrecision = function (currency) {
    if (currency === 'USDT') return 2
    else if (currency === 'BTC') return 8
    else if (currency === 'ETH') return 8
    else if (currency === 'BNB') return 8
    else if (currency === 'ADA') return 6
    else if (currency === 'OTHER') return 8
    else if (currency === 'BCDB_ETWD' || currency === 'ETWD') return 0
    else if (currency === 'VNDT') return 0
    return 2
}

const i18n = new VueI18n({
    locale: 'vi', // set locale
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages: {}
})

function setI18nLanguage(lang) {
    i18n.locale = lang
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}

const langFiles = require.context('@/lang', true)
const folders = []
/*
* Danh sách folder ngôn ngữ local
* */
const langFolders = langFiles.keys().reduce((lang, modulePath) => {
    const moduleName = (modulePath.replace(/^\.\/(.*)\.\w+$/, '')).replace(/-([a-z])/g, g => g[1].toUpperCase())
    const folderArr = moduleName.split('/')
    if (!folderArr || folderArr.length < 3) {
        return
    }
    if (folders.indexOf(folderArr[1]) !== -1) return
    return folders.push(folderArr[1])
}, {})

/*
* Tách và gán key language của ngôn ngữ local
* ví dụ : sidebar -> sidebar.dashboard
* */
async function autoloadLocalLanguage() {
    if (!folders.length) return false

    let message = {}

    const lang = getLanguage()
    const dataWait = []
    /*
    * Tự load local truóc
    * */
    _.forEach(folders, (v) => {
        dataWait.push(loadLanguageLocalAsync(v))
    })

    let loaded = await Promise.all(dataWait)
    /*
    * Lấy array đầy đủ nhất
    * */
    let last = loaded[loaded.length - 1]
    /*
    * Tách value array
    * */
    let temp = _.map(last[lang], (v, k) => {
        return v
    })
    /*
   * Tách key array
   * */
    let tempKey = _.map(last[lang], (v, k) => {
        return k
    })
    /*
    * Gán lại đầy đủ
    * ví dụ: {sidebar:{ dashboard:"Dashboard"} } -> {"sidebar.dashboard":"Dashboard"}
    * */
    let final = {}
    _.map(temp, (v, k) => {
        _.forEach(v, (val, key) => {
            final = Object.assign(final, { [tempKey[k] + '.' + key]: val })
        })
    })
    message = Object.assign(message, final)
    return { [lang]: message }
}

/*
* Thêm nội dung Lang cho js-localization
* */
function appendLocaleMessage(message = null, locale = '') {
    if (!locale) locale = getLanguage()
    const script = document.getElementById('locale-message')
    script.innerText = 'Lang.addMessages(' + JSON.stringify(message) + ');Lang.setLocale(\'' + locale + '\');'
}

/*
* Hàm load gộp ngôn ngữ
* */
export function loadLanguageAsync(lang) {
    return new Promise(async (resolve) => {
        let local = {}
        await autoloadLocalLanguage().then(data => {
            // clientLanguage()
            tempLang.then((result) => {
                let localMerge = Object.assign(data[lang], result[lang])
                local = { [lang]: localMerge }
                resolve(local)
            }).catch(() => {
                local = { [lang]: data[lang] }
                resolve(local)
            })
        })
    })
}

const tempLang = new Promise((resolve => resolve(globalLang)))

/*
* Load cả ngôn ngữ local và API
* */
export function initLanguage() {
    return new Promise(async (resolve) => {
        let lang = getLanguage()
        await loadLanguageAsync(lang).then((result) => {
            appendLocaleMessage(result, lang)
            window.Lang.setLocale(lang)
            window.Lang.addMessages(result)
            i18n.setLocaleMessage(lang, result[lang])
            resolve()
        }).finally(() => {
            resolve()
        })
    })
}

const loadedLanguages = { 'en': [] } // our default language that is preloaded

/*
* Load ngôn ngữ local
* */
export function loadLanguageLocalAsync(module, lang) {
    // If the same language
    if (!lang) lang = getLanguage()

    // If the language was already loaded
    if (Object.prototype.hasOwnProperty.call(loadedLanguages, lang) && _.includes(loadedLanguages[lang], module)) {
        return Promise.resolve(setI18nLanguage(lang))
    }
    // If the language hasn't been loaded yet
    return import(`@/lang/${module}/${lang}.js`).then(
        messages => {
            const prefix = module.replace(/([\/]+)/g, '.')
            const message = i18n.getLocaleMessage(lang)
            _.set(message, prefix, messages.default)
            i18n.setLocaleMessage(lang, message)
            if (!Object.prototype.hasOwnProperty.call(loadedLanguages, lang)) loadedLanguages[lang] = []
            loadedLanguages[lang].push(module)
            setI18nLanguage(lang)
            return {
                [lang]: message
            }
        }
    )
}

export default i18n
