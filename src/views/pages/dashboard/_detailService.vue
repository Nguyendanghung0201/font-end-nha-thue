<template>
    <div class="nk-content">
        <div class="container-fluid">
            <div class="nk-content nk-content-fluid pt-0">
                <div class="container-xl wide-lg">
                    <no-data v-if="!data"></no-data>
                    <div v-else class="nk-content-body card card-bordered">
                        <div class="card-inner px-4 px-sm-5">
                            <div class="nk-block-head nk-block-head-sm">
                                <div class="nk-block-between g-3">
                                    <div class="nk-block-head-content">
                                        <div class="d-flex align-items-center">
                                            <h3 class="nk-block-title page-title mb-0">{{ data.name }}</h3>
                                        </div>
                                    </div>
                                    <div class="nk-block-head-content">
                                        <router-link class="btn btn-outline-light bg-white d-none d-sm-inline-flex" :to="{name: 'dashboard.index'}">
                                            <em class="icon ni ni-arrow-left"></em>
                                            <span>{{ $t('button.back') }}</span>
                                        </router-link>
                                        <router-link class="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none" :to="{name: 'dashboard.index'}">
                                            <em class="icon ni ni-arrow-left"></em>
                                        </router-link>
                                    </div>
                                </div>
                            </div><!-- .nk-block-head -->
                            <div class="nk-block">
                                <p v-if="lang === 'en'">{{ data.description_en }}</p>
                                <p v-else>{{ data.description_vi }}</p>
                                <div class="nk-block-head">
                                    <div class="nk-block-head-content">
                                        <h5 class="nk-block-title title">{{ $t('service.information') }}</h5>
                                        <p>{{ $t('service.service_sub')}}</p>
                                    </div>
                                </div>
                                <table class="table table-striped">
                                    <tbody>
                                        <tr>
                                            <th colspan="2">{{ $t('service.service_name')}}</th>
                                            <td class="w-75 table-content">{{ data.name }}</td>
                                        </tr>
                                        <tr>
                                            <th colspan="2">{{ $t('service.service_des')}}</th>
                                            <td v-if="lang === 'en'" class="w-75 table-content">{{ data.description_en }}</td>
                                            <td v-else class="w-75 table-content">{{ data.description_vi }}</td>
                                        </tr>
                                        <tr>
                                            <th colspan="2">{{ $t('service.version')}}</th>
                                            <td class="w-75 table-content">{{ data.version }}</td>
                                        </tr>
                                        <tr>
                                            <th colspan="2">{{ $t('service.updated_at')}}</th>
                                            <td v-if="lang === 'en'" class="w-75 table-content">{{ formatEnDate(data.updated_at) }}</td>
                                            <td v-else class="w-75 table-content">{{ formatViDate(data.updated_at) }}</td>
                                        </tr>
                                        <tr>
                                            <th colspan="2">{{ $t('service.status')}}</th>
                                            <td class="w-75 table-content">
                                                <span class="badge badge-dim badge-sm" :class="getStatusBadgeBorder(data.status)">{{ getStatusService(data.status)}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-if="data.status === 1" class="nk-block text-right">
                                <div class="btn btn-primary">
                                    <router-link :to="{name: 'support.index'}" class="text-white d-flex align-items-center">
                                        <em class="icon ni ni-bell"></em>
                                        <span class="pl-0">{{ $t('button.subscribe') }}</span>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatViDate, formatEnDate, getLanguage } from '@/helpers/common'
import NoData from '@/views/components/NoData/index'

export default {
    name: 'detailService',
    data() {
        return {
            data: [],
            id: this.$route.params.name ?? ''
        }
    },
    components: {
        NoData
    },
    mounted() {
        this.getDetailService()
    },
    methods: {
        formatViDate,
        formatEnDate,
        getDetailService() {
            this.setLoadingState(true)
            this.$store.dispatch('Service/getDetailService', this.id).then((response) => {
                if (response.code === 0 && response.success) {
                    this.data = response.data
                    this.setLoadingState(false)
                }
            }).catch(e => {
                this.setFormError(e)
            }).finally(() => {
                this.requestLoading = false
                this.setLoadingState(false)
            })
        }
    },
    computed: {
        lang() {
            return getLanguage()
        }
    }
}
</script>
