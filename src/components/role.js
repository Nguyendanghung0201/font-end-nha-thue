import Vue from 'vue'
import store from '@/utils/store'


// function checkRoleElm(el, binding) {
//     let { value } = binding
//     const roles = store.getters.roles
//     el.parentNode && el.parentNode.removeChild(el)
// }

Vue.directive('role', {
    // inserted(el, binding) {
    //     checkRoleElm(el, binding)
    // },
    update(el, binding) {
        checkRoleElm(el, binding)
    }
})