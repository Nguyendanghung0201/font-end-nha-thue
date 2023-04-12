<template>
    <div class="nk-content">
        <div class="container-fluid">
            <div class="nk-content nk-content-fluid pt-0">
                <div class="container-xl wide-lg">
                    <div v-if="data.length === 0" class="card card-bordered w-sm-75 mx-auto">
                        <div class="card-inner p-4 p-sm-5">
                            <div class="d-flex justify-content-end mb-3">
                                <div class="nk-block-head-content">
                                    <router-link class="btn btn-outline-light bg-white d-none d-sm-inline-flex" :to="{name: 'my-service-detail', params: {id: service_id, type: 'service'}}">
                                        <em class="icon ni ni-arrow-left"></em>
                                        <span>{{ $t('button.back') }}</span>
                                    </router-link>
                                    <router-link class="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none" :to="{name: 'my-service-detail', params: {id: service_id, type: 'service'}}">
                                        <em class="icon ni ni-arrow-left"></em>
                                    </router-link>
                                </div>
                            </div>
                            <div class="nk-block">
                                <no-data></no-data>
                            </div>
                        </div>
                    </div>
                    <div v-else class="card card-bordered w-sm-75 mx-auto">
                        <div class="card-inner p-4 p-sm-5">
                            <div class="nk-block-between mb-3 flex-column-reverse align-items-start align-items-sm-center flex-sm-row">
                                <div class="nk-block-head-content d-flex align-items-center">
                                    <div class="user-avatar-md sq bg-primary mr-3">
                                        <img v-if="data.avatar" :src="data.avatar" :alt="data.name">
                                        <span v-else-if="data.name" class="fs-22px">{{ data.name.charAt(0) }}</span>
                                        <span v-else class="fs-22px">
                                            <em class="icon ni ni-user-alt fs-26px"></em>
                                        </span>
                                    </div>
                                    <div class="d-flex align-items-start flex-column">
                                        <div class="d-flex align-items-center">
                                            <h3 class="nk-block-title page-title mb-0 line-1">{{ data.name }}</h3>
                                        </div>
                                        <div>
                                            <span>{{ data.service_data.name }}</span>
                                            -
                                            <span>{{ $t('service.version') }}
                                                <b>{{ data.service_data.version }}</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nk-block-head-content ml-auto">
                                    <router-link class="btn btn-outline-light bg-white d-none d-sm-inline-flex" :to="{name: 'my-service-detail', params: {id: service_id, type: 'service'}}">
                                        <em class="icon ni ni-arrow-left"></em>
                                        <span>{{ $t('button.back') }}</span>
                                    </router-link>
                                    <router-link class="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none mb-3 ml-auto" :to="{name: 'my-service-detail', params: {id: service_id, type: 'service'}}">
                                        <em class="icon ni ni-arrow-left"></em>
                                    </router-link>
                                </div>
                            </div>
                            <div class="nk-block mt-5">
                                <div class="row">
                                    <div class="col-12" :class="[data.user_updated ? 'col-md-8' : 'col-md-12']">
                                        <div class="card card-bordered">
                                            <div class="card-inner">
                                                <p v-if="lang === 'en'" class="mb-0">{{ data.description_en }}</p>
                                                <p v-else class="mb-0">{{ data.description_vi }}</p>
                                                <div class="nk-data data-list mt-2">
                                                    <div class="data-item px-0 py-3 no-cursor-pointer" data-toggle="modal" data-target="#profile-edit">
                                                        <div class="data-col">
                                                            <span class="data-label">{{ $t('service.func_name') }}</span>
                                                            <span class="data-value">{{ data.name }}</span>
                                                        </div>
                                                    </div>
                                                    <template v-if="lang === 'en'">
                                                        <div class="data-item px-0 py-3" data-toggle="modal" data-target="#profile-edit">
                                                            <div class="data-col">
                                                                <span class="data-label">{{ $t('service.start_date') }}</span>
                                                                <span class="data-value">{{ formatEnDate(data.created_at) }}</span>
                                                            </div>
                                                        </div>
                                                        <div class="data-item px-0 py-3" data-toggle="modal" data-target="#profile-edit">
                                                            <div class="data-col">
                                                                <span class="data-label">{{ $t('service.end_date') }}</span>
                                                                <span class="data-value">{{ formatEnDate(data.time_expired) }}</span>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <template v-else>
                                                        <div class="data-item px-0 py-3" data-toggle="modal" data-target="#profile-edit">
                                                            <div class="data-col">
                                                                <span class="data-label">{{ $t('service.start_date') }}</span>
                                                                <span class="data-value">{{ formatViDate(data.created_at) }}</span>
                                                            </div>
                                                        </div>
                                                        <div class="data-item px-0 py-3" data-toggle="modal" data-target="#profile-edit">
                                                            <div class="data-col">
                                                                <span class="data-label">{{ $t('service.end_date') }}</span>
                                                                <span class="data-value">{{ formatViDate(data.time_expired) }}</span>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <div class="data-item px-0 py-3" data-toggle="modal" data-target="#profile-edit">
                                                        <div class="data-col">
                                                            <span class="data-label">{{ $t('service.status') }}</span>
                                                            <span class="data-value">
                                                                <span class="badge badge-dim fs-12px py-1 px-2" :class="getStatusBadge(data.status_register_function)">{{ getStatusService(data.status_register_function) }}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="data-item px-0 py-3" data-toggle="modal" data-target="#profile-edit">
                                                        <div class="data-col">
                                                            <span class="data-label">{{ $t('service.func_activate') }}</span>
                                                            <div class="preview-block">
                                                                <span class="preview-title overline-title"></span>
                                                                <div class="custom-control custom-switch">
                                                                    <input v-model="active" @change="handleOnOffStatus()" type="checkbox" class="custom-control-input" id="customSwitch1">
                                                                    <label class="custom-control-label" for="customSwitch1"></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="data-item px-0 py-3" data-toggle="modal" data-target="#profile-edit">
                                                        <div class="data-col">
                                                            <span class="data-label">{{ $tc('service.document', 1) }}</span>
                                                            <a :href="data.url_document" v-if="data.url_document" class="data-value text-primary line-1 d-flex align-items-center">{{ $t('service.documentation') }}
                                                                <em class="icon ni ni-link-h text-primary fs-18px ml-1"></em>
                                                            </a>
                                                            <span v-else class="text-soft font-italic fs-14px">{{ $t('service.no_document') }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4 mt-4 mt-sm-0" v-if="data.user_updated">
                                        <div class="card card-bordered">
                                            <div class="card-inner">
                                                <div class="team">
                                                    <div class="user-card user-card-s2">
                                                        <div class="user-avatar lg bg-primary">
                                                            <img v-if="data?.user_updated?.avatar" :src="getPublicAssetUrl(data?.user_updated?.avatar)" alt="">
                                                            <span v-else-if="data?.user_updated?.username">{{ data?.user_updated?.username.charAt(0) }}</span>
                                                            <span v-else>
                                                                <em class="icon ni ni-user-alt fs-26px"></em>
                                                            </span>
                                                        </div>
                                                        <div class="user-info">
                                                            <h6>{{ data.user_updated.username }}</h6>
                                                            <span class="sub-text">{{ data.user_updated.email }}</span>
                                                        </div>
                                                    </div>
                                                    <ul class="team-info">
                                                        <li class="d-flex align-items-start">
                                                            <span class="w-50 flex-shrink-0">{{ $t('utilities.phone') }}</span>
                                                            <span class="text-right text-break">{{ data.user_updated.phone }}</span>
                                                        </li>
                                                        <li class="d-flex align-items-start">
                                                            <span class="w-50 flex-shrink-0">{{ $t('utilities.birthday') }}</span>
                                                            <span v-if="lang === 'en'" class="text-right text-break">{{ formatEnDate(data.user_updated.birthday) }}</span>
                                                            <span v-else class="text-right text-break">{{ formatViDate(data.user_updated.birthday) }}</span>
                                                        </li>
                                                        <li class="d-flex align-items-start">
                                                            <span class="w-50 flex-shrink-0">{{ $t('utilities.address') }}</span>
                                                            <a
                                                                class="text-right text-break cursor-pointer"
                                                                data-toggle="dropdown"
                                                            >
                                                                <span v-b-popover.hover.bottom="$t('button.detail')">
                                                                    {{ charLimit(data.user_updated.address, 15) }}
                                                                </span>
                                                            </a>
                                                            <div class="dropdown-menu reject-note dropdown-menu-left" data-id="data">
                                                                <div class="link-list-opt no-bdr p-3 w-300px text-break-spaces">
                                                                    <span class="text-break-word-all">{{ data.user_updated.address }}</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <b-modal ref="my-modal" hide-footer hide-header class="modal-sm">
                <div class="d-block text-left pb-3">
                    <p v-if="active" class="fs-18px d-flex align-items-center lh-20">{{ $t('message.on_function') }}</p>
                    <p v-else class="fs-18px d-flex align-items-center lh-20">
                        {{ $t('message.off_function') }}
                    </p>
                </div>
                <div class="d-flex align-items-center justify-content-end mt-2">
                    <b-button class="w-fit-content" variant="outline-light" block @click="hideModal">{{ $t('button.cancel') }}</b-button>
                    <b-button class="w-fit-content mt-0 ms-2" variant="success" block @click="changeStatusFunction(data.id)">{{ $t('button.update') }}</b-button>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
import NoData from '@/views/components/NoData/index'
import { formatEnDate, formatViDate, getLanguage } from '@/helpers/common'
import { getPublicAssetUrl } from '@/helpers/common'

export default {
    name: 'detail',
    data() {
        return {
            tab: 'info',
            settings: null,
            active: null,
            agree: true,
            id: this.$route.params.id ?? '',
            service_id: this.$route.params.service_id ?? '',
            data: []
        }
    },
    components: {
        NoData
    },
    mounted() {
        this.getDetailFunction()
    },
    methods: {
        formatEnDate,
        formatViDate,
        getPublicAssetUrl,
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.active = !this.active
            this.$refs['my-modal'].hide()
        },
        getDetailFunction() {
            this.setLoadingState(true)
            this.$store.dispatch('Service/getDetailFunction', this.id).then((response) => {
                if (response.code === 0 && response.success) {
                    this.data = response.data

                    this.active = this.data.status_register_function === 1;
                    this.setLoadingState(false)
                }
            }).catch(e => {
                this.setFormError(e)
            }).finally(() => {
                this.setLoadingState(false)
            })
        },
        changeStatusFunction(id) {
            this.setLoadingState(true)

            let postData = {
                agent_function_service_id: this.id,
                status: this.active
            }
            this.$store.dispatch('Service/changeStatusFunction', postData).then((response) => {
                if (response.code === 0 && response.success) {
                    this.setLoadingState(false)
                    this.getDetailFunction()
                    if (this.active) {
                        this.$awnSuccess(this.$t('message.turn_on_success'))
                    } else {
                        this.$awnSuccess(this.$t('message.turn_off_success'))
                    }
                }
            }).catch(e => {
                if (this.active) {
                    this.$awnAlert(this.$t('message.turn_on_failed'))
                } else {
                    this.$awnAlert(this.$t('message.turn_off_failed'))
                }
            }).finally(() => {
                this.requestLoading = false
                this.$refs['my-modal'].hide()
                this.setLoadingState(false)
            })
        },
        handleOnOffStatus() {
            if (this.agree) {
                this.showModal()
            }
            this.agree = true
        }
    },
    computed: {
        lang() {
            return getLanguage()
        }
    }
}
</script>
>
