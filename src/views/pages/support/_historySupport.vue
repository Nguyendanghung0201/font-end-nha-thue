<template>
    <div class="nk-content">
        <div class="container-fluid">
            <div class="nk-content nk-content-fluid pt-0">
                <div class="container-xl wide-lg">
                    <div class="nk-content-body">
                        <div class="nk-block-head nk-block-head-sm">
                            <div class="nk-block-between flex-column flex-sm-row align-items-start align-items-sm-center justify-content-start justify-content-sm-between">
                                <div class="nk-block-head-content">
                                    <h3 class="nk-block-title page-title">{{ $t('support.support_history') }}</h3>
                                    <div class="nk-block-des text-soft">
                                        <p>{{ $tc('service.total_message', 1) }} {{ paginationData.total }} {{ $t('support.support') }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="nk-block mb-5">
                            <div class="d-flex justify-between">
                                <nav>
                                    <ul class="nav nav-switch-s2 nav-tabs bg-white">
                                        <li class="nav-item"
                                            :class="{'active':!filter.status}"
                                        >
                                            <a @click="filter.status = 'all' "
                                               :class="{'active':!filter.status}"
                                               class="nav-link btn btn-sm btn-outline-light cursor-pointer">
                                                <em class="icon ni ni-clock"></em>
                                                {{ $t('support.all')}}
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a @click="filter.status = 'completed' "
                                               :class="{'active':filter.status === 'completed'}"
                                               class="nav-link btn btn-sm btn-outline-light cursor-pointer text-success">
                                                <em class="icon ni ni-check-circle"></em>
                                                {{ $t('support.success')}}
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a @click="filter.status = 'pending' "
                                               :class="{'active':filter.status === 'pending'}"
                                               class="nav-link btn btn-sm btn-outline-light cursor-pointer text-warning">
                                                <em class="icon ni ni-alert-circle"></em>
                                                {{ $t('support.processing')}}
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a @click="filter.status = 'cancel' "
                                               :class="{'active':filter.status === 'cancel'}"
                                               class="nav-link btn btn-sm btn-outline-light cursor-pointer text-danger">
                                                <em class="icon ni ni-na"></em>
                                                {{ $t('support.rejected')}}
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="card card-bordered">
                                <div class="card-inner-group">
                                    <div class="card-inner">
                                        <div class="card-title-group">
                                            <div class="form-control-wrap">
                                                <div class="form-icon form-icon-right">
                                                    <em class="icon ni ni-search"></em>
                                                </div>
                                                <input type="text" v-model.trim="filter.search" class="form-control h-75 border-primary" :placeholder="$t('button.search')">
                                            </div>
                                            <div class="card-tools mr-n1 h-75 ml-2">
                                                <ul class="btn-toolbar gx-1">
                                                    <li>
                                                        <div class="dropdown">
                                                            <a data-toggle="dropdown" class="btn btn-primary btn-icon dropdown-toggle">
                                                                <em class="icon ni ni-setting text-white"></em>
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                                                                <ul class="link-check">
                                                                    <li>
                                                                        <span>{{ $t('button.show') }}</span>
                                                                    </li>
                                                                    <li v-for="item in optionShow"
                                                                        @click="paginationData.perPage = item.value"
                                                                        :class="[(item.value === paginationData.perPage) ? 'active' : '']"
                                                                    >
                                                                        <a class="cursor-pointer">{{ item.text }}</a>
                                                                    </li>
                                                                </ul>
                                                                <!--                                                            <ul class="link-check">-->
                                                                <!--                                                                <li>-->
                                                                <!--                                                                    <span>{{ $t('button.sort') }}</span>-->
                                                                <!--                                                                </li>-->
                                                                <!--                                                                <li v-for="item in optionSort"-->
                                                                <!--                                                                    @click="paginationData.sort = item.value"-->
                                                                <!--                                                                    :class="[(item.value === paginationData.sort) ? 'active' : '']"-->
                                                                <!--                                                                >-->
                                                                <!--                                                                    <a class="cursor-pointer">-->
                                                                <!--                                                                        <em class="icon ni ni-arrow-long-down"-->
                                                                <!--                                                                            v-if="item.value === 'desc'"></em>-->
                                                                <!--                                                                        <em class="icon ni ni-arrow-long-up" v-else></em>-->
                                                                <!--                                                                    </a>-->
                                                                <!--                                                                </li>-->
                                                                <!--                                                            </ul>-->
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div><!-- .card-title-group -->
                                    </div><!-- .card-inner -->
                                    <div v-if="!data.length" class="flex-grow-1 min-h-300px d-flex align-items-center justify-content-center">
                                        <span>{{ $t('utilities.no_data') }}</span>
                                    </div>
                                    <div v-else class="card-inner p-0">
                                        <div class="nk-tb-list nk-tb-tnx">
                                            <div class="nk-tb-item nk-tb-head">
                                                <div class="nk-tb-col tb-col-sm">
                                                    <span>{{ $t('support.support_by') }}</span>
                                                </div>
                                                <div class="nk-tb-col">
                                                    <span>{{ $t('support.support_detail') }}</span>
                                                </div>
                                                <div class="nk-tb-col tb-col-sm">
                                                    <span>{{ $t('support.support_time') }}</span>
                                                </div>
                                                <div class="nk-tb-col tb-col-sm pl-2">
                                                    <span>{{ $t('support.support_person') }}</span>
                                                </div>
                                                <div class="nk-tb-col nk-tb-col-status text-start pl-0">
                                                    <span class="sub-text">{{ $t('support.support_status') }}</span>
                                                </div>
                                                <div class="nk-tb-col">{{ $t('support.reason') }}</div>
                                            </div><!-- .nk-tb-item -->
                                            <div v-for="item in data" :key="item.id" class="nk-tb-item">
                                                <div class="nk-tb-col tb-col-sm">
                                                    <div class="nk-tnx-type">
                                                        <div class="nk-tnx-type-text">
                                                            <span class="tb-lead">{{ item.name }}</span>
                                                            <span class="tb-date">{{ item.email }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="nk-tb-col">
                                                    <div class="nk-tnx-type">
                                                        <div class="nk-tnx-type-text">
                                                            <a class="dropdown-toggle pt-1" data-toggle="dropdown">
                                                                <span class="text-break-word-all line-1 d-block w-100px">{{ item.description }}</span>
                                                                <em class="icon ni ni-alert-circle cursor-pointer"></em>
                                                            </a>
                                                            <div class="dropdown-menu reject-note dropdown-menu-left" :data-id="item.id">
                                                                <div class="link-list-opt no-bdr p-3 w-300px text-break-spaces">
                                                                    <span class="text-break-word-all">{{ item.description }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="nk-tb-col tb-col-sm">
                                                    <span v-if="lang === 'en'">{{ formatEnDate(item.created_at) }}</span>
                                                    <span v-else>{{ formatViDate(item.created_at) }}</span>
                                                </div>
                                                <div class="nk-tb-col tb-col-sm pl-2">
                                                    <template v-if="item.username_user_support || item.email_user_support">
                                                        <span v-if="item.username_user_support" class="tb-lead">{{ item.username_user_support }}</span>
                                                        <span v-if="item.email_user_support" class="tb-date">{{ item.email_user_support }}</span>
                                                    </template>
                                                    <span v-else class="tb-date">- - - -</span>
                                                </div>
                                                <div class="nk-tb-col nk-tb-col-status pl-1">
                                                    <div class="d-flex align-items-center justify-content-start">
                                                        <span class="badge badge-sm badge-dim" :class="getStatusOutlineBadge(item.status)">{{ getStatusSupport(item.status) }}</span>
                                                        <a v-if="item.reason" @click="showModal(item)" class="cursor-pointer d-sm-none">
                                                            <em class="icon ni ni-eye fs-18px ml-1"></em>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="nk-tb-col">
                                                    <a v-if="item.reason" @click="showModal(item)" class="cursor-pointer d-flex align-center pl-2">
                                                        {{ $t('button.detail')}}
                                                    </a>
                                                </div>
                                            </div><!-- .nk-tb-item -->
                                        </div><!-- .nk-tb-list -->
                                    </div><!-- .card-inner -->
                                    <!-- Paginate -->
                                    <div v-if="data.length" class="card-inner">
                                        <b-row class="row mt-4 mb-3">
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
                                </div><!-- .card-inner-group -->
                            </div><!-- .card -->
                        </div>
                        <div class="content-page wide-sm m-auto">
                            <div class="nk-block">
                                <div class="card card-bordered">
                                    <div class="card-inner">
                                        <div class="align-center flex-column g-4">
                                            <div class="nk-block-content">
                                                <div class="nk-block-content-head px-lg-4">
                                                    <h5 class="text-center">{{ $tc('support.support_sub', 1) }}</h5>
                                                    <p class="text-soft text-center mt-2 mt-sm-0">{{ $tc('support.support_sub', 2) }}</p>
                                                </div>
                                            </div>
                                            <div class="nk-block-content flex-shrink-0">
                                                <router-link :to="{name: 'support.index'}" class="btn btn-lg border d-flex align-items-center">
                                                    <div class="bg-primary p-1 rounded mr-2">
                                                        <em class="icon ni ni-headphone-fill text-white"></em>
                                                    </div>
                                                    <div class="d-flex align-items-start flex-column justify-content-start">
                                                        <p class="mb-0 fs-14px fw-medium">{{ $t('button.support_now') }}</p>
                                                        <span class="fw-normal text-soft fs-13px">{{ $t('support.support_note') }}</span>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div><!-- .card-inner -->
                                </div><!-- .card -->
                            </div><!-- .nk-block -->
                        </div><!-- .content-page -->
                    </div>
                </div>
            </div>
            <b-modal ref="my-modal"
                     hide-footer
                     hide-header
                     class="modal-sm"
                     no-enforce-focus
            >
                <div v-if="detail" class="d-block text-left pb-3">
                    <div class="alert alert-danger">
                        <p class="fs-18px d-flex align-items-center lh-1 mb-2">
                            {{ $t('support.reason') }}:
                        </p>
                        <p class="text-break-word-all">{{ detail.reason }}</p>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-end mt-2">
                    <b-button class="w-fit-content" variant="primary" block @click="hideModal">{{ $t('button.close') }}</b-button>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
import NoData from '@/views/components/NoData/index'
import { formatViDate, formatEnDate, getLanguage } from '@/helpers/common'

export default {
    name: 'HistorySupport',
    metaInfo() {
        return {
            title: this.$t('menu.support')
        }
    },
    data() {
        return {
            data: [],
            paginationData: {
                perPage: 8,
                currentPage: 1,
                total: 0,
                sort: 'desc'
            },
            filter: {
                search: null,
                status: null
            },
            searchTimer: null,
            optionShow: [
                { value: 4, text: 4 },
                { value: 8, text: 8 },
                { value: 12, text: 12 }
            ],
            optionSort: [
                { value: 'desc', text: 'DESC' },
                { value: 'asc', text: 'ASC' }
            ],
            detail: null
        }
    },
    components: {
        NoData
    },
    mounted() {
        this.getHistorySupport()
    },
    methods: {
        formatViDate,
        formatEnDate,
        getHistorySupport() {
            this.setLoadingState(true)

            let postData = {
                page: this.paginationData.currentPage,
                limit: this.paginationData.perPage,
                sort: this.paginationData.sort
            }

            if(this.filter.status === 'all') this.filter.status = null
            if (this.filter) {
                this.lodash.forEach(this.filter, (v, k) => {
                    if (!v) return
                    postData[k] = v
                })
            }

            this.$store.dispatch('Service/getHistorySupport', postData).then((response) => {
                if (response.code === 0 && response.success) {

                    this.data = response.data

                    const pagination = response.pagination

                    this.paginationData = this.lodash.extend({}, this.paginationData, {
                        currentPage: pagination.current_page,
                        total: pagination.total
                    })
                }
            }).catch(e => {
                this.setFormError(e)
            }).finally(() => {
                this.requestLoading = false
                this.setLoadingState(false)
            })
        },
        showModal(item) {
            this.detail = item
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        }
    },
    computed: {
        lang() {
            return getLanguage()
        }
    },
    watch: {
        'paginationData.currentPage'(newVal) {
            if (newVal) {
                this.getHistorySupport()
            }
        },
        'paginationData.perPage'(newVal) {
            if (newVal) {
                this.paginationData.currentPage = 1
                this.getHistorySupport()
            }
        },
        'paginationData.sort'(newValue, oldValue) {
            if (newValue) {
                this.getHistorySupport()
            }
        },
        'filter.search'(newVal, oldVal) {
            if (this.searchTimer) clearTimeout(this.searchTimer)
            this.searchTimer = setTimeout(() => {
                this.paginationData.currentPage = 1
                this.getHistorySupport()
            }, 1000)
        },
        'filter.status'(newValue, oldValue) {
            if (newValue) {
                this.getHistorySupport()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@media screen  and (max-width: 549px){
    .nav-switch-s2 {
        justify-content: space-between;
        margin-bottom: 10px;
        .nav-item {
            width: calc(50% - 5px);
            margin-left: 0 !important;
            margin-right: 0 !important;
            margin-bottom: 10px;
            .nav-link {
                width: 100%;
                border-radius: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
                justify-content: center;
            }
        }
    }
}
</style>
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>
