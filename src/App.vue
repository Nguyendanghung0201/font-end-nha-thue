<template>
    <div id="app" v-if="languageLoaded">
        <router-view />
        <loading-indicator v-if="getLoadingState()"></loading-indicator>
    </div>
</template>

<script>
import '@/assets/scss/vendor.scss'
import '@/assets/scss/theme.scss'
import { initLanguage } from '@/utils/lang'
import LoadingIndicator from '@/views/components/LoadingIndicator/index'
import { setLanguage } from '@/helpers/common'

export default {
    name: 'app',
    data() {
        return {
            languageLoaded: false,
        }
    },
    mounted() {
        initLanguage().finally(() => {
            this.languageLoaded = true
        })
    },
    components: { LoadingIndicator },
    metaInfo() {
        return {
            title: 'REAL HOUSE',
            titleTemplate: '%s | ' + process.env.VUE_APP_TITLE
        }
    },
    watch: {
        '$mq'(newValue) {
            if (newValue) {
                const body = $('body')
                if (body && body.hasClass('nav-shown')) {
                    body.removeClass('nav-shown')
                }
            }
        },
    }
}
</script>
