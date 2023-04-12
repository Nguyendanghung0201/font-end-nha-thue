import Vuex, {Store} from 'vuex';
import Vue from "vue";
import modules from "@/stores";
import createCache from 'vuex-cache';
import getters from './getters';
Vue.use(Vuex);

const store = new Store({
    plugins: [createCache()],
    modules: modules,
    getters,
})

export default store;
