import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import i18n from "@/utils/lang";

// Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue, {
//     BTable: {
//         emptyText: () => {
//             return i18n.t('admin.crud.emptyText');
//         }
//     }
// });

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

