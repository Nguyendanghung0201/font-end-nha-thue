import Vue from 'vue'

Vue.mixin({
    methods: {
        setLoadingState(status){
            this.$store.dispatch("Loading/loaderToggle", {status})
        },
        getLoadingState(){
            return this.$store.getters["Loading/loadingStatus"]
        }
    }
})