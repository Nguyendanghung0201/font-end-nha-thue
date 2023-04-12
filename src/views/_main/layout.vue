<template>
    <div class="nk-app-root nk-body bg-white has-sidebar no-touch nk-nio-theme">
        <div class="nk-main ">
            <router-view />
        </div>
    </div>
</template>

<script>

import { getLanguage } from '@/helpers/common'

export default {
    beforeCreate() {
        this.moment.tz(this.moment.tz.guess()).locale(getLanguage())
    }
}

</script>

<style scoped>
</style>
