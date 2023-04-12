// import { checkPermission, checkPermissionBy } from '@/middleware/check-auth'
import { mapGetters } from 'vuex'

export default {
    methods: {
        // checkPermission,
        // checkPermissionBy,
        activeMenu(name) {
            if (typeof name == 'undefined' || !name) return ''
            setTimeout(() => {
                let el = this.$refs[name]
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 1000)
            let exist = this.lodash.find(name,(v)=> v == this.$route.name)
            return typeof exist !== 'undefined'
        },
    },
    mounted() {
        this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
            const elm = $('#' + collapseId)
            if (collapseId.indexOf('sidebar-for') >= 0 && elm.length && isJustShown) {
                const currentHeight = elm.innerHeight()
                setTimeout(() => {
                    elm.height(currentHeight)
                }, 50)
            }
        })
    },
    watch: {},
    computed: {
        ...mapGetters(['user'])
    }
}