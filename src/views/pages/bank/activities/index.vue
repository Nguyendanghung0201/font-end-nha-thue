<template>
    <div>
        <div class="nk-ibx-head">
            <div class="nk-ibx-head-actions">
                <h6>{{ $t('bank.history_bank') }}</h6>
            </div>
            <div class="d-flex align-items-stretch">
                <div class="card-title-group d-none d-md-block">
                    <div class="card-tools">
                        <div class="form-inline flex-nowrap gx-3">
                            <b-dropdown v-if="listBanks"
                                        class="c-dropdown">
                                <template #button-content>
                                    {{ filterDisplay.bank }}
                                    <em class="icon ni ni-chevron-down dropdown-icon"></em>
                                </template>
                                <b-dropdown-item
                                    :key="i"
                                    :class="{'active': item.code == filter.bank}"
                                    @click="chooseAccount(item.code)"
                                    v-for="(item, i) in listBanks">
                                    {{ item.name }}
                                </b-dropdown-item>
                            </b-dropdown>
                            <date-picker
                                class="c-datepicker"
                                v-model="filter.date"
                                :placeholder="$t('bank.choose_time_placeholder')"
                                range
                                valueType="format">
                            </date-picker>
                            <!--                            <div class="btn-wrap">
                                                            <span class="d-none d-md-block">
                                                                <button class="btn btn-dim btn-outline-light me-2">Đặt lại</button>
                                                                <button class="btn btn-dim btn-outline-primary">Áp dụng</button>
                                                            </span>
                                                            <span class="d-md-none">
                                                                <button class="btn btn-dim btn-outline-light btn-icon disabled">
                                                                    <em class="icon ni ni-arrow-right"></em>
                                                                </button>
                                                            </span>
                                                        </div>-->
                        </div>
                    </div>
                </div>
                <ul class="nk-ibx-head-tools g-1">
                    <li class="me-n1 d-lg-none">
                        <div @click="showFilterMobile = !showFilterMobile" class="btn btn-trigger btn-icon toggle d-md-none" data-target="inbox-aside">
                            <em class="icon ni ni-filter"></em>
                        </div>
                        <div @click="showSubSidebar" class="btn btn-trigger btn-icon toggle ms-2" data-target="inbox-aside">
                            <em class="icon ni ni-menu-alt-r"></em>
                        </div>
                    </li>
                </ul>
            </div>
        </div><!-- .nk-ibx-head -->
        <div class="nk-ibx-list">
            <div class="card">
                <div class="card-inner-group">
                    <div v-if="showFilterMobile" class="form-inline py-2 p-sm-20 d-flex d-md-none justify-content-start border-bottom-dashed">
                        <b-dropdown v-if="listBanks"
                                    class="c-dropdown w-sm-30">
                            <template #button-content>
                                {{ charLimit(filterDisplay.bank, 10) }}
                                <em class="icon ni ni-chevron-down dropdown-icon"></em>
                            </template>
                            <b-dropdown-item
                                :key="i"
                                :class="{'active': item.code == filter.bank}"
                                @click="chooseAccount(item.code)"
                                v-for="(item, i) in listBanks">
                                {{ item.name }}
                            </b-dropdown-item>
                        </b-dropdown>
                        <date-picker
                            class="c-datepicker ms-2"
                            v-model="filter.date"
                            :placeholder="$t('bank.choose_time_placeholder')"
                            range
                            valueType="format">
                        </date-picker>
                    </div>
                    <div class="card-inner p-0">
                        <div class="nk-tb-list nk-tb-ulist">
                            <div class="nk-tb-item nk-tb-head">
                                <div class="nk-tb-col tb-col-md">
                                    <span class="sub-text">{{ $t('bank.time') }}</span>
                                </div>
                                <div class="nk-tb-col">
                                    <span class="sub-text d-inline-block ps-2 ps-md-0">{{ $t('bank.trading_code') }}</span>
                                </div>
                                <div class="nk-tb-col tb-col-md">
                                    <span class="sub-text">{{ $t('bank.reference_code') }}</span>
                                </div>
                                <div class="nk-tb-col">
                                    <span class="sub-text">{{ $t('bank.value') }}</span>
                                </div>
                                <div class="nk-tb-col tb-col-lg">
                                    <span class="sub-text">{{ $t('bank.balance') }}</span>
                                </div>
                                <div class="nk-tb-col tb-col-lg">
                                    <span class="sub-text">{{ $t('utilities.description') }}</span>
                                </div>
                                <div class="nk-tb-col">
                                    <span class="sub-text">{{ $t('service.status') }}</span>
                                </div>
                                <div class="nk-tb-col nk-tb-col-tools text-end">
                                </div>
                            </div>
                            <template v-if="!requestLoading && data">
                                <div v-for="(item, i) in data"
                                     :key="i"
                                     class="nk-tb-item">
                                    <div class="nk-tb-col tb-col-md">
                                        <span v-if="lang === 'en'">{{ formatEnDate(item.created_at) }}</span>
                                        <span v-else>{{ formatViDate(item.created_at) }}</span>
                                    </div>
                                    <div class="nk-tb-col">
                                        <span class="tb-amount d-inline-block ps-2 ps-md-0">{{ item.transaction_code }}</span>
                                    </div>
                                    <div class="nk-tb-col tb-col-md">
                                        <span class="tb-amount">{{ item.ref_code }}</span>
                                    </div>
                                    <div class="nk-tb-col">
                                        <span class="tb-amount">{{ item.amount | toCurrency }}
                                            <span class="currency">{{ item.currency }}</span>
                                        </span>
                                    </div>
                                    <div class="nk-tb-col tb-col-lg">
                                        <span class="tb-amount">{{ item.balance | toCurrency }}
                                            <span class="currency">{{ item.currency }}</span>
                                        </span>
                                    </div>
                                    <div class="nk-tb-col tb-col-lg">
                                        <span class="text-break">{{ item.description | charLimit(20) }}</span>
                                    </div>
                                    <div class="nk-tb-col">
                                        <span class="tb-status text-success" v-if="item.status == 1">{{ $t('bank.completed') }}</span>
                                        <span class="tb-status text-danger" v-else>{{ $t('bank.failed') }}</span>
                                    </div>
                                    <div class="nk-tb-col nk-tb-col-tools">
                                        <div
                                            @click="showDetail(item)"
                                            class="btn btn-trigger btn-icon"
                                        >
                                            <em class="icon ni ni-eye-fill"></em>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <!-- Preloader -->
                        <div v-if="requestLoading"
                             class="min-h-300px d-flex align-items-center justify-content-center w-100 bg-white"
                        >
                            <div class="text-center">
                                <div class="spinner-border spinner-border-lg" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                        <!-- End Preloader -->
                        <!-- No Data -->
                        <div v-else-if="!requestLoading && !data"
                             class="min-h-300px d-flex align-items-center justify-content-center w-100 bg-white"
                        >
                            <div class="text-center">
                                <span>{{ $t('utilities.no_data') }}</span>
                            </div>
                        </div>
                        <!-- No Data -->
                    </div>
                    <div v-if="!requestLoading && data" class="card-inner">
                        <b-row class="row">
                            <b-col class="ml-auto col-auto">
                                <nav>
                                    <b-pagination
                                        v-model.trim="paginationData.currentPage"
                                        :per-page="paginationData.perPage"
                                        :total-rows="paginationData.total"
                                        align="right"
                                        size="sm"
                                    ></b-pagination>
                                </nav>
                            </b-col>
                        </b-row>
                    </div>
                    <!--End Paginate -->
                </div>
            </div>
        </div><!-- .nk-ibx-list -->

        <!-- Detail Modal -->
        <detail-modal
            v-if="showDetailModal"
            :show="showDetailModal"
            :data="detail"
            @close="handleClose"
        />
    </div>
</template>

<script>
import detailModal from '@/views/pages/bank/activities/_detailModal'
import { formatViDate, formatEnDate, getLanguage, toNumberNoRound } from '@/helpers/common'

export default {
    name: 'index',
    components: { detailModal },
    data() {
        return {
            listBanks: [
                {
                    'name': 'Tất cả',
                    'code': 'ALL'
                },
                {
                    'name': 'BIDV',
                    'code': 'BIDV'
                },
                {
                    'name': 'Vietcombank',
                    'code': 'VCB'
                }
            ],
            filter: {
                bank: 'all',
                date: null
            },
            filterDisplay: {
                bank: 'Tất cả'
            },
            showDetailModal: false,
            showFilterMobile: false,
            requestLoading: false,
            paginationData: {
                perPage: 8,
                currentPage: 1,
                total: 0,
                sort: 'desc'
            },
            detail: null,
            data: [
                {
                    id: 1,
                    transaction_code: 3522928299,
                    ref_code: 38299,
                    balance: 10000000000,
                    amount: 100000000,
                    description: 'Chuyển khoản',
                    status: 1,
                    currency: 'VND',
                    bank_code: 'SCB',
                    created_at: '2022-12-15T02:52:16.000+00:00',
                    updated_at: '2022-12-15T02:52:16.000+00:00'
                },
                {
                    id: 2,
                    transaction_code: 3522928293,
                    ref_code: 38294,
                    balance: 10000000000,
                    amount: 200000000,
                    description: 'Chuyển khoản',
                    status: 1,
                    currency: 'VND',
                    bank_code: 'TCG',
                    created_at: '2022-11-15T02:52:16.000+00:00',
                    updated_at: '2022-11-15T02:52:16.000+00:00'
                },
                {
                    id: 3,
                    transaction_code: 3522928291,
                    ref_code: 38296,
                    balance: 20000000000,
                    amount: 8000000,
                    description: 'Chuyển khoản',
                    status: 1,
                    currency: 'VND',
                    bank_code: 'ACB',
                    created_at: '2022-11-15T02:52:15.000+00:00',
                    updated_at: '2022-11-15T02:52:15.000+00:00'
                },
                {
                    id: 4,
                    transaction_code: 3522928221,
                    ref_code: 38245,
                    balance: 20004560000,
                    amount: 32000000,
                    description: 'Chuyển khoản',
                    status: 1,
                    currency: 'VND',
                    bank_code: 'VIB',
                    created_at: '2022-11-15T02:52:15.000+00:00',
                    updated_at: '2022-11-15T02:52:15.000+00:00'
                },
                {
                    id: 5,
                    transaction_code: 3522928231,
                    ref_code: 38247,
                    balance: 20004560005,
                    amount: 10000000,
                    description: 'Chuyển khoản',
                    status: 0,
                    currency: 'VND',
                    bank_code: 'VCB',
                    created_at: '2022-11-15T02:52:15.000+00:00',
                    updated_at: '2022-11-15T02:52:15.000+00:00'
                }
            ]
        }
    },
    methods: {
        formatViDate,
        formatEnDate,
        toNumberNoRound,
        chooseAccount(code) {
            this.filter.bank = code
            let currentBank = this.listBanks.find(i => i.code == code)
            this.filterDisplay.bank = currentBank.name
        },
        showDetail(item) {
            this.showDetailModal = true
            this.detail = item
        },
        handleClose(val) {
            this.showDetailModal = val
            this.detail = null
        },
        getListActivity() {
            this.requestLoading = true
            let postData = {
                page: this.paginationData.currentPage,
                limit: this.paginationData.perPage,
                sort: this.paginationData.sort
            }

            if (this.filter.bank === 'all') this.filter.bank = null
            if (this.filter) {
                this.lodash.forEach(this.filter, (v, k) => {
                    if (!v) return
                    postData[k] = v
                })
                if (this.filter.date) {
                    postData['from'] = postData.date[0]
                    postData['to'] = postData.date[1]
                }
                delete postData['date']
            }

            setTimeout(() => {
                this.requestLoading = false
            }, 1000)
        }
    },
    mounted() {
        this.getListActivity()
    },
    computed: {
        lang() {
            return getLanguage()
        }
    },
    watch: {
        'paginationData.currentPage'(newVal) {
            if (newVal) {
                this.getListActivity()
            }
        },
        'paginationData.perPage'(newVal) {
            if (newVal) {
                this.paginationData.currentPage = 1
                this.getListActivity()
            }
        },
        'filter.bank'(newVal) {
            if (newVal) {
                this.getListActivity()
            }
        },
        'filter.date'(newVal) {
            if (newVal) {
                this.getListActivity()
            }
            this.detail = null
        }
    }
}
</script>
