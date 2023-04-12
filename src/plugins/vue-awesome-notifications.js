import Vue from 'vue'
import VueAWN from 'vue-awesome-notifications'
import 'vue-awesome-notifications/dist/styles/style.css'
import i18n from '@/utils/lang'


// Your custom options

const lang = localStorage.getItem('CRM_USER_LOCALE')

let options = {
    position: 'top-right',
    maxNotifications: 1,
    durations: {
        global: 2000
    },
    icons: {
        enabled: true,
    }
}
Vue.use(VueAWN, options)