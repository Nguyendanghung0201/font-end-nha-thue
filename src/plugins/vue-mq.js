import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: { // default breakpoints - customize this
        /*
         tablet: 900,
         laptop: 1250,
         desktop: Infinity,*/
        mobile: 900,
        laptop: 1440,
        desktop: Infinity,
    },
    defaultBreakpoint: 'desktop' // customize this for SSR
})
