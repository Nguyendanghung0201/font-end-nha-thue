import Vue from 'vue'

// Prefered: as a plugin (directive + filter) + custom placeholders support
import VueMask from 'v-mask'
Vue.use(VueMask);

// Or as a directive-only
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

// Or only as a filter-only
import { VueMaskFilter } from 'v-mask'
Vue.filter('VMask', VueMaskFilter)