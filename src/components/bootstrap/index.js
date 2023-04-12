import Vue from 'vue'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue, {
    BFormTags: {
        // addButtonText: 'Thêm',
        tagVariant: 'default'
    }
});
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import BFormGroup from './fix/BFormGroup';
import {BFormInput} from './fix/BFormInput';
import {BIconZalo, BIconZaloSquare, BIconCompany, BIconSave} from './fix/BIcon';

Vue.component('b-form-group', BFormGroup);
Vue.component('b-form-input', BFormInput);
Vue.component('b-icon-zalo', BIconZalo);
Vue.component('b-icon-zalo-square', BIconZaloSquare);
Vue.component('b-icon-company', BIconCompany);
Vue.component('b-icon-save', BIconSave);