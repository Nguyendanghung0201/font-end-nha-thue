import Vue from 'vue'
import VueRoast from '@/components/vue-roast'
import '@/components/vue-roast/style/message.scss'
import '@/components/vue-roast/style/positions.scss'
import '@/components/vue-roast/style/transitions.scss'

let config = {
    position: 'bottom-right', // top, bottom, left, right
    threshold: 10
}
Vue.use(VueRoast, config)
