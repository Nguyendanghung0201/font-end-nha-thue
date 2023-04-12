<template>
    <div>
        <div class="nk-block-head">
            <div class="nk-block-between">
                <div class="nk-block-head-content">
                    <h5 class="nk-block-title">{{ $t('service.service_detail') }}</h5>
                </div>
            </div>
        </div><!-- .nk-block-head -->
        <div v-if="data" class="nk-block">
            <p v-if="lang === 'en'" class="mb-0">{{ data.description_en }}</p>
            <p v-else class="mb-0">{{ data.description_vi }}</p>
            <div class="nk-data data-list mt-2">
                <div class="data-item px-0 py-3" data-toggle="modal">
                    <div class="data-col">
                        <span class="data-label">{{ $t('service.service_name') }}</span>
                        <span class="data-value">{{ data.name }}</span>
                    </div>
                </div>
                <div class="data-item px-0 py-3" data-toggle="modal">
                    <div class="data-col">
                        <span class="data-label">{{ $t('service.version') }}</span>
                        <span class="data-value">{{ data.version }}</span>
                    </div>
                </div>
                <template v-if="lang === 'en'">
                    <div class="data-item px-0 py-3" data-toggle="modal">
                        <div class="data-col">
                            <span class="data-label">{{ $t('service.created_at') }}</span>
                            <span v-if="data.created_at" class="data-value">{{ formatEnDate(data.created_at )}}</span>
                        </div>
                    </div>
<!--                    <div class="data-item px-0 py-3" data-toggle="modal">-->
<!--                        <div class="data-col">-->
<!--                            <span class="data-label">{{ $t('service.end_date') }}</span>-->
<!--                            <span v-if="data.updated_at" class="data-value">{{ formatEnDate(data.updated_at)}}</span>-->
<!--                        </div>-->
<!--                    </div>-->
                </template>
                <template v-else>
                    <div class="data-item px-0 py-3" data-toggle="modal">
                        <div class="data-col">
                            <span class="data-label">{{ $t('service.created_at') }}</span>
                            <span v-if="data.created_at" class="data-value">{{ formatViDate(data.created_at )}}</span>
                        </div>
                    </div>
<!--                    <div class="data-item px-0 py-3" data-toggle="modal">-->
<!--                        <div class="data-col">-->
<!--                            <span class="data-label">{{ $t('service.end_date') }}</span>-->
<!--                            <span v-if="data.updated_at" class="data-value">{{ formatViDate(data.updated_at )}}</span>-->
<!--                        </div>-->
<!--                    </div>-->
                </template>
                <div class="data-item px-0 py-3" data-toggle="modal">
                    <div class="data-col">
                        <span class="data-label">{{ $t('service.status') }}</span>
                        <span class="data-value"><span class="badge badge-dim fs-12px py-1 px-2" :class="getStatusBadge(data.status)">{{ getStatusService(data.status) }}</span></span>
                    </div>
                </div>
<!--                <div class="data-item px-0 py-3" data-toggle="modal">-->
<!--                    <div class="data-col">-->
<!--                        <span class="data-label">{{ $t('service.service_activate') }}</span>-->
<!--                        <div class="preview-block">-->
<!--                            <span class="preview-title overline-title"></span>-->
<!--                            <div class="custom-control custom-switch">-->
<!--                                <input v-model="active" type="checkbox" class="custom-control-input" id="customSwitch1">-->
<!--                                <label class="custom-control-label" for="customSwitch1"></label>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="data-item px-0 py-3" data-toggle="modal">
                    <div class="data-col">
                        <span class="data-label">{{ $t('service.documentation') }}</span>
                        <a :href="data.url_document" v-if="data.url_document" class="data-value text-primary">{{ data.url_document }}</a>
                        <span v-else class="text-soft font-italic fs-14px">{{ $t('service.no_document') }}</span>
                    </div>
                </div>
            </div><!-- data-list -->
        </div><!-- .nk-block -->
        <div v-else class="d-flex align-items-center border rounded-3 mt-3 justify-content-center min-h-300px">
            {{ $t('utilities.no_data') }}
        </div>
        <b-modal ref="my-modal" hide-footer hide-header class="modal-sm">
            <div class="d-block text-left pb-3">
                <p v-if="active" class="fs-18px d-flex align-items-center lh-20">{{ $t('message.on_service') }}</p>
                <p v-else class="fs-18px d-flex align-items-center lh-20">{{ $t('message.off_service') }}</p>
            </div>
            <div class="d-flex align-items-center justify-content-end mt-2">
                <b-button class="w-fit-content" variant="outline-light" block @click="hideModal">{{ $t('button.cancel') }}</b-button>
                <b-button class="w-fit-content mt-0 ms-2" variant="success" block @click="handleOnOffService">{{ $t('button.update') }}</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { formatViDate, formatEnDate, getLanguage } from '@/helpers/common'
export default {
    name: 'infoService',
    data() {
        return {
            active: true,
            agree: true
        }
    },
    props: {
        data: {
            type: Object|Array,
            default: {}
        }
    },
    methods: {
        formatViDate,
        formatEnDate,
        handleOnOffService() {
            this.$refs['my-modal'].hide()
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.agree = false
            this.active = !this.active
            this.$refs['my-modal'].hide()
        },
    },
    computed: {
        lang() {
            return getLanguage()
        }
    },
    watch: {
        active() {
            if(this.agree) {
                this.showModal()
            }
            this.agree = true
        },
    }
}
</script>

