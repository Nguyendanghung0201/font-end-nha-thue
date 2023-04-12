import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'

library.add(faTimes, faCaretDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)
