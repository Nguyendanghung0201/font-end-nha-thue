<template>
    <div class="custom-modal" :class="{'show': show}">
        <div class="modal-content d-flex flex-column">

            <!-- Preloader -->
            <div v-if="isLoading" class="h-100 d-flex align-items-center justify-content-center w-100 bg-white">
                <div class="text-center">
                    <div class="spinner-border spinner-border-lg" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
            <!-- End Preloader -->
            <div v-else-if="!detail && !isLoading" class="min-h-500px d-flex align-items-center justify-content-center">
                {{ $t('utilities.no_data') }}
            </div>
            <template v-else>
                <div ref="detailActivity" class="invoice-wrap border-right-0 border-left-0 border-top-0 rounded-0 flex-grow-1">
                    <div class="invoice-head">
                        <div class="invoice-contact">
                            <div class="invoice-contact-info">
                                <h4 class="title">{{ $t('bank.detail_transaction') }} -
                                    <span class="text-primary">#{{ detail.id ?? '' }}</span>
                                </h4>
                                <ul class="list-plain">
                                    <li class="invoice-id">
                                        <span>Mã giao dịch</span>
                                        :
                                        <span class="text-dark fw-500 text-soft">{{ detail.transaction_code ?? '--' }}</span>
                                    </li>
                                    <li class="invoice-date">
                                        <span>Thời gian</span>
                                        :
                                        <span class="text-dark fw-500 text-soft">{{ detail.created_at | dateTimeFormat }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="invoice-bills">
                        <div class="card card-bordered">
                            <ul class="data-list is-compact">
                                <li class="data-item">
                                    <div class="data-col">
                                        <div class="data-label">{{ $t('bank.bank') }}</div>
                                        <div class="data-value">ACB</div>
                                    </div>
                                </li>
                                <li class="data-item">
                                    <div class="data-col">
                                        <div class="data-label">{{ $t('bank.trading_code') }}</div>
                                        <div class="data-value">{{ detail.transaction_code ?? '--' }}</div>
                                    </div>
                                </li>
                                <li class="data-item">
                                    <div class="data-col">
                                        <div class="data-label">{{ $t('bank.reference_code') }}</div>
                                        <div class="data-value">{{ detail.ref_code ?? '--' }}</div>
                                    </div>
                                </li>
                                <li class="data-item">
                                    <div class="data-col">
                                        <div class="data-label">{{ $t('bank.time') }}</div>
                                        <div class="data-value">
                                            {{ detail.created_at | dateTimeFormat }}
                                        </div>
                                    </div>
                                </li>
                                <li class="data-item">
                                    <div class="data-col">
                                        <div class="data-label">{{ $t('utilities.description') }}</div>
                                        <div class="data-value text-break">{{ detail.description ?? '--' }}</div>
                                    </div>
                                </li>
                                <li class="data-item">
                                    <div class="data-col">
                                        <div class="data-label">{{ $t('bank.value') }}</div>
                                        <div class="data-value">{{ detail.amount | toCurrency }} VND</div>
                                    </div>
                                </li>
                                <li class="data-item">
                                    <div class="data-col">
                                        <div class="data-label">{{ $t('service.status') }}</div>
                                        <div class="data-value text-success" v-if="detail.status == 1">
                                            <span class="badge badge-dim badge-sm bg-outline-success">Thành công</span>
                                        </div>
                                        <div class="data-value text-danger" v-else>
                                            <span class="badge badge-dim badge-sm bg-outline-danger">Thất bại</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="d-flex align-items-stretch justify-content-end mt-auto py-4 px-5">
                    <div @click="printDetail"
                         v-b-tooltip="$t('bank.print')"
                         class="btn btn-icon btn-lg btn-white btn-dim btn-outline-primary d-flex w-fit-content" target="_blank">
                        <em class="icon ni ni-printer-fill"></em>
                    </div>
                    <div @click="hideModal" class="btn btn-primary ms-2">{{ $t('button.close') }}</div>
                </div>
            </template>
        </div>
        <div @click="hideModal" class="overlay"></div>
    </div>
</template>

<script>

export default {
    name: 'detailModal',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => {
                return null
            }
        }
    },
    data() {
        return {
            detail: null,
            isLoading: false
        }
    },
    mounted() {
        this.getDetail()
    },
    methods: {
        hideModal() {
            this.$emit('close', false)
        },

        getDetail() {
            this.isLoading = true
            try {

            } catch (e) {

            } finally {
                setTimeout(() => {
                    this.isLoading = false
                }, 1000)
            }
        },

        async printDetail() {
            const el = this.$refs.detailActivity
            const options = {
                type: 'dataURL'
            }

            const canvas = await this.$html2canvas(el, options)
            if (canvas) {
                const downloadLink = document.createElement('a')
                downloadLink.href = canvas
                downloadLink.download = `transaction-${this.detail.id ?? ''}`
                downloadLink.click()
            }
        }
    },
    watch: {
        'data': {
            immediate: true,
            deep: true,
            handler(value) {
                if (value) {
                    this.detail = value
                }
            }
        }
    }
}
</script>
