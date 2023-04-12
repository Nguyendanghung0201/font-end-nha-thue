import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/utils/store'
import i18n from '@/utils/lang'
import moment from 'moment-timezone'

require('@/utils/scripts')
import { makeServer } from '@/mocks/server'

//
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.config.productionTip = false

const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.'
Vue.config.warnHandler = function (msg, vm, trace) {
    if (msg === ignoreWarnMessage) {
        msg = null
        vm = null
        trace = null
    }
}

if (process.env.VUE_USE_MOCK === 'true' || process.env.VUE_USE_MOCK === true || process.env.VUE_USE_MOCK === 1) {
    makeServer()
}
/*
* Ẩn thông báo lỗi của BootstrapSelect
*/
const ignoredMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.'
Vue.config.warnHandler = (message, vm, componentTrace) => {
    if (message !== ignoredMessage) {
        console.error(message + componentTrace)
    }
}
Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAaHZ6LVyzZAhnBKHCrb7PcTjBcUttqIeY',
      libraries: 'places,drawing,visualization', // Tùy chọn để tải thêm các thư viện khác của Google Maps
    },
    
    installComponents: true
  });
  Vue.component('google-maps-map', VueGoogleMaps.Map);
Vue.component('google-maps-marker', VueGoogleMaps.Marker);
new Vue({
    el: '#app',
    i18n,
    router,
    store,
    moment,
    render: h => h(App)
})
