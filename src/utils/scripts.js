import '@/components/loader'
import '@/components/sweetalert2'
import '@/components/infinite-loading'
import '@/components/click-outside'
import '@/components/role'
import '@/components/datepicker'
import '@/components/bootstrap'
import '@/utils/bootstrap'
import '@/utils/filter'
import '@/utils/vuelidate'
import '@/utils/vuelidate'
import '@/utils/global'
import '@/mixins/loadingMixin'
import '@/mixins/commonMixin'
import '@/utils/meta'
import '@/assets/scss/vendor.scss'
import '@/assets/scss/theme.scss'

require('@/plugins/datepicker')
require('@/plugins/dashlite-sidebar')
require('@/plugins/vue-currency-input')
require('@/plugins/vue-clipboard2')
require('@/plugins/index')
require('@/plugins/fa-icon')
require('@/plugins/vue-awesome-notifications')
require('@/plugins/vue-simplebar')
require('@/plugins/vue-carousel')
require('@/plugins/vue-agile')
require('@/plugins/vue-native-notification')
require('@/plugins/vue-roast')
require('@/plugins/vue-social-chat')
require('@/plugins/vue-html2canvas')
    //
require('@/utils/dashlite')
require('@/utils/event-bus')
require('bootstrap')
    /*
     * */
import '@/helpers/dropdown'
import '@/components/vue-select'
//
import 'vue-multiselect/dist/vue-multiselect.min.css'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import router from '@/router'

import jquery from 'jquery'
import ApiService from './api'
import { setToken } from '@/helpers/auth'


window.$ = jquery
window.router = router
const whiteList = ['login'] // no redirect whitelist


const redirect = (router, path) => {
    router.push({
        name: 'login',
        query: {
            redirect: path
        }
    })
    NProgress.done()
}
router.beforeEach(async(to, from, next) => {
    if (to.path === '/auto-login') {
        const { redirect, token } = to.query
        if (token && redirect) {
            const res = await ApiService.get('/auth/info', { token })
            if (res && res.data && Array.isArray(res.data) && res.data.length) {
                setToken(res.data[0].token)
                window.location.href = redirect
                return
            }
        }
    }
    // start progress bar
    NProgress.start()
        // set page title
        // document.title = getPageTitle(to.meta.title);

    next()
    NProgress.done()
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
router.afterEach((to) => {
    /*if (to.params && !to.params.locale) {
        to.params.locale = getLanguage()
    }*/
    // finish progress bar
    NProgress.done()
})