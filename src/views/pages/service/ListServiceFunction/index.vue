<template>
    <div class="nk-content p-0">
        <div class="container-fluid">
            <div class="nk-block-head">
                <div class="nk-block-between flex-column flex-sm-row align-items-start align-items-sm-center justify-content-start justify-content-sm-between">
                    <div class="nk-block-head-content">
                        <h5 class="nk-block-title">{{ $t('service.list_func') }}</h5>
                        <span class="text-soft">{{ $tc('service.total_message', 1) }} {{ paginationData.total }} {{ $t('service.function') }}</span>
                    </div>
                    <div class="search-input mt-2 mt-sm-0 d-flex align-items-center">
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
                                            <!--                                        <ul class="link-check">-->
                                            <!--                                            <li>-->
                                            <!--                                                <span>{{ $t('button.sort') }}</span>-->
                                            <!--                                            </li>-->
                                            <!--                                            <li v-for="item in optionSort"-->
                                            <!--                                                @click="paginationData.sort = item.value"-->
                                            <!--                                                :class="[(item.value === paginationData.sort) ? 'active' : '']"-->
                                            <!--                                            >-->
                                            <!--                                                <a class="cursor-pointer">-->
                                            <!--                                                    <em class="icon ni ni-arrow-long-down"-->
                                            <!--                                                        v-if="item.value === 'desc'"></em>-->
                                            <!--                                                    <em class="icon ni ni-arrow-long-up" v-else></em>-->
                                            <!--                                                </a>-->
                                            <!--                                            </li>-->
                                            <!--                                        </ul>-->
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!data.length" class="d-flex align-items-center justify-content-center min-h-300px border rounded-3">
                {{ $t('utilities.no_data') }}
            </div>
            <div v-else class="row g-gs">
                <div v-for="(item, index) in data" :key="index" class="col-sm-6 col-xl-6">
                    <div class="card card-bordered h-100">
                        <div class="card-inner">
                            <div class="project">
                                <div class="project-hea mb-1">
                                    <div class="project-title d-flex flex-column align-items-start w-100">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="user-avatar sq bg-primary">
                                                <b-img
                                                    v-if="item.avatar" :alt="item.name"
                                                    class="rounded-circle h-100 w-100"
                                                    :src="getPublicAssetUrl(item.avatar)"
                                                    @error="getNoImage"
                                                    style="object-fit: cover;"
                                                    width="35" />
                                                <span v-else>{{ item.service_name.charAt(0) }}</span>
                                            </div>
                                            <div>
                                                <router-link
                                                    :to="{name: 'service-function-detail', params: {service_id: item.service_id, id: item.id}}"
                                                    class="mt-3 mb-1"
                                                >
                                                    <h6 class="fw-medium text-primary line-1 fs-18px">{{ item.service_name }}</h6>
                                                </router-link>
                                                <div v-if="service" class="sub-text text-soft">{{ service.name }} -
                                                    <span class="text-dark">{{ item.version_service }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <span>{{ $t('service.code') }}: </span>
                                    <span class="text-dark fw-medium">{{ item.service_code }}</span>
                                </div>
                                <div class="mt-0">
                                    <span>{{ $t('service.status') }}:</span>
                                    <span class="fw-medium" :class="getStatusColor(item.status)">
                                        {{ getStatusService(item.status) }}
                                        <template v-if="item.disable_reason">
                                            <a class="dropdown-toggle pt-1" data-toggle="dropdown">
                                                <em class="icon ni ni-alert-circle cursor-pointer"></em>
                                            </a>
                                            <div class="dropdown-menu reject-note dropdown-menu-left" :data-id="item.id">
                                                <div class="link-list-opt no-bdr p-3 w-300px text-break-spaces">
                                                    <span class="text-break-word-all">{{ item.disable_reason ?? '' }}</span>
                                                </div>
                                            </div>
                                        </template>
                                    </span>
                                </div>
                                <div class="mb-0">
                                    <template v-if="lang === 'en'">
                                        <div class="line-2 mb-2">{{ item.description_en }}</div>
                                        <hr>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <p class="card-text line-3 m-0">{{ $t('tittle.start_date') }}:
                                                <br>
                                                <span class="text-dark fw-medium">{{ formatEnDate(item.created_at) }}</span>
                                            </p>
                                            <p class="card-text line-3 m-0">{{ $t('tittle.end_date') }}:
                                                <br>
                                                <span class="text-dark fw-medium">{{ formatEnDate(item.time_expired) }}</span>
                                            </p>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="line-2 mb-2">{{ item.description_vi }}</div>
                                        <hr>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <p class="card-text line-3 m-0">{{ $t('tittle.start_date') }}:
                                                <br>
                                                <span class="text-dark fw-medium">{{ formatViDate(item.created_at) }}</span>
                                            </p>
                                            <p class="card-text line-3 m-0">{{ $t('tittle.end_date') }}:
                                                <br>
                                                <span class="text-dark fw-medium">{{ formatViDate(item.time_expired) }}</span>
                                            </p>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Paginate -->
                <b-row v-if="data.length" class="row mt-4 px-0">
                    <b-col class="ml-auto col-auto pr-0">
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
                <!--End Paginate -->
            </div>
        </div>
    </div>
</template>

<script>
import NoData from '@/views/components/NoData/index'
import { formatEnDate, formatViDate, getLanguage } from '@/helpers/common'
import { getPublicAssetUrl } from '@/helpers/common'

export default {
    name: 'index',
    data() {
        return {
            data: [],
            paginationData: {
                currentPage: 1,
                perPage: 4,
                total: 0,
                sort: 'desc'
            },
            filter: {
                search: null
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
            ]
        }
    },
    props: {
        service: {
            type: Object,
            default: ''
        }
    },
    components: {
        NoData
    },
    methods: {
        formatViDate,
        formatEnDate,
        getPublicAssetUrl,
        getListMyFunction(code) {
            this.setLoadingState(true)

            let postData = {
                code_service: code,
                page: this.paginationData.currentPage,
                limit: this.paginationData.perPage,
                sort: this.paginationData.sort
            }

            if (this.filter) {
                this.lodash.forEach(this.filter, (v, k) => {
                    if (!v) return
                    postData[k] = v
                })
            }
            this.$store.dispatch('Service/getListFunction', postData).then((response) => {
                if (response.code === 0 && response.success) {
                    this.data = response.data

                    const pagination = response.pagination

                    this.paginationData = this.lodash.extend({}, this.paginationData, {
                        currentPage: pagination.current_page,
                        total: pagination.total
                    })
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
    watch: {
        'paginationData.perPage'(newVal) {
            if (newVal) {
                this.paginationData.currentPage = 1
                this.getListMyFunction(this.service.code)
            }
        },
        'paginationData.currentPage'(newVal) {
            if (newVal) {
                this.getListMyFunction(this.service.code)
            }
        },
        'paginationData.sort'(newVal) {
            if (newVal) {
                this.getListMyFunction(this.service.code)
            }
        },
        'filter.search'(newVal, oldVal) {
            if (this.searchTimer) clearTimeout(this.searchTimer)
            this.searchTimer = setTimeout(() => {
                this.paginationData.currentPage = 1
                this.getListMyFunction(this.service.code)
            }, 500)
        },
        'service': {
            immediate: true,
            deep: true,
            handler(newVal) {
                if (newVal.code) {
                    this.getListMyFunction(newVal.code)
                }
            }
        }
    },
    computed: {
        lang() {
            return getLanguage()
        }
    }
}
</script>

