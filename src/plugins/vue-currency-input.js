import Vue from 'vue'
import VueCurrencyInput from 'vue-currency-input'

const pluginOptions = {

    globalOptions: {
        locale: 'en-US',
        distractionFree: true,
        precision: 0,
        valueRange: {min: 0},
        currency: null,
    }
}
Vue.use(VueCurrencyInput, pluginOptions)
