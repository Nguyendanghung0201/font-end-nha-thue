<template>
    <div id="bank-service" class="nk-ibx">
        <!-- .nk-ibx-aside -->
        <sub-sidebar />
        <div class="nk-ibx-body bg-white">
            <add-bank v-if="currentRoute == 'bank.add'" />
            <create-bank v-else-if="currentRoute == 'bank.create'" />
            <detail-bank v-else-if="currentRoute == 'bank.index'" />
            <activity-block v-else-if="currentRoute == 'bank.activities'" />
            <integrated v-else-if="currentRoute == 'bank.integrated'" />
            <saving v-else-if="currentRoute == 'bank.saving'" />
        </div><!-- .nk-ibx-body -->
    </div><!-- .nk-ibx -->
</template>
<script>
import i18n from '@/utils/i18n'
import SubSidebar from '@/views/pages/bank/components/SubSidebar'
import addBank from '@/views/pages/bank/add/index'
import createBank from '@/views/pages/bank/add/_form'
import detailBank from '@/views/pages/bank/detail/index'
import activityBlock from '@/views/pages/bank/activities/index'
import Integrated from '@/views/pages/bank/integrated'
import Saving from '@/views/pages/bank/saving/index'

export default {
    name: 'ServiceBank',
    components: {
        SubSidebar,
        addBank,
        createBank,
        detailBank,
        activityBlock,
        Integrated,
        Saving
    },
    data() {
        return {
            currentRoute: this.$route.name ?? ''
        }
    },
    metaInfo() {
        return {
            title: this.$t('menu.bankService')
        }
    }
}
</script>

