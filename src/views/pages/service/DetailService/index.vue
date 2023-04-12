<template>
    <div class="nk-content ">
        <div class="container-fluid">
            <no-data v-if="!data"></no-data>
            <template v-else>
                <div class="nk-content nk-content-fluid pt-0">
                    <div class="container-xl wide-lg">
                        <div class="nk-content-body">
                            <div class="nk-block-head nk-block-head-sm">
                                <div class="nk-block-between g-3">
                                    <div class="nk-block-head-content">
                                        <div class="d-flex align-items-center">
                                            <h3 class="nk-block-title page-title mb-0">{{ data.name }}</h3>
                                        </div>
                                    </div>
                                    <div class="nk-block-head-content">
                                        <router-link class="btn btn-outline-light bg-white d-none d-sm-inline-flex" :to="{name: 'my-service.index'}">
                                            <em class="icon ni ni-arrow-left"></em>
                                            <span>{{ $t('button.back') }}</span>
                                        </router-link>
                                        <router-link class="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none" :to="{name: 'my-service.index'}">
                                            <em class="icon ni ni-arrow-left"></em>
                                        </router-link>
                                    </div>
                                </div>
                            </div><!-- .nk-block-head -->
                            <div class="nk-block">
                                <div class="card card-bordered">
                                    <div class="card-aside-wrap">
                                        <div class="card-content">
                                            <ul class="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                                                <li class="nav-item">
                                                    <router-link
                                                        :to="{name: 'my-service-detail', params: { id: id, type: 'service'}}"
                                                        class="nav-link"
                                                        :class="{'active': type === 'service'}"
                                                    >
                                                        <em class="icon ni ni-list"></em>
                                                        <span>{{ $t('service.list_func') }}</span>
                                                    </router-link>
                                                </li>
                                                <li class="nav-item">
                                                    <router-link
                                                        :to="{name: 'my-service-detail', params: { id: id, type: 'config'}}"
                                                        :class="{'active': type === 'config'}"
                                                        class="nav-link"
                                                    >
                                                        <em class="icon ni ni-setting"></em>
                                                        <span>{{ $t('service.config') }}</span>
                                                    </router-link>
                                                </li>
                                                <li class="nav-item nav-item-trigger d-xxl-none">
                                                    <a @click="showSidebar = true" class="toggle btn btn-icon btn-trigger">
                                                        <em class="icon ni ni-info fs-26px"></em>
                                                    </a>
                                                </li>
                                            </ul><!-- .nav-tabs -->
                                            <div class="card-inner p-lg-4">
                                                <template>
                                                    <transition name="fade">
                                                        <list-service-function v-if="type === 'service'" :service="{name: data.name, code: data.code}"></list-service-function>
                                                    </transition>
                                                    <transition name="fade">
                                                        <config-form v-if="type === 'config'" :code="data.code"></config-form>
                                                    </transition>
                                                </template>
                                            </div><!-- .card-inner -->
                                        </div><!-- .card-content -->
                                        <div id="card-aside-content" :class="{'isShow': showSidebar}" class="card-aside card-aside-right user-aside toggle-slide toggle-slide-right toggle-break-xxl" data-content="userAside" data-toggle-screen="xxl"
                                             data-toggle-overlay="true" data-toggle-body="true">
                                            <div class="card-inner-group mt-lg-2">
                                                <div class="card-inner">
                                                    <div class="user-card user-card-s2">
                                                        <div v-if="data.avatar" class="user-avatar lg bg-primary">
                                                            <b-img
                                                                class="rounded-circle h-100 w-100"
                                                                :src="getPublicAssetUrl(data.avatar)"
                                                                @error="getNoImage"
                                                                style="object-fit: cover;"
                                                                width="35" />
                                                        </div>
                                                        <div v-else-if="data.name" class="user-avatar lg bg-primary">
                                                            <span>{{ data.name.charAt(0) }}</span>
                                                        </div>
                                                        <div v-else class="user-avatar lg bg-primary">
                                                            <em class="icon ni ni-file-img"></em>
                                                        </div>
                                                        <div class="user-info">
                                                            <h5 class="line-2">{{ data.name || '--' }}</h5>
                                                            <!--                                                        <p v-if="lang === 'en'" class="sub-text" v-html="data.description_en ? data.description_en.replace(/(?:\r\n|\r|\n)/g, '<br />') : ''"></p>-->
                                                            <!--                                                        <p v-else class="sub-text" v-html="data.description_vi ? data.description_vi.replace(/(?:\r\n|\r|\n)/g, '<br />') : ''"></p>-->
                                                            <p v-if="lang === 'en'" class="sub-text line-3">{{ data.description_en }}</p>
                                                            <p v-else class="sub-text line-3">{{ data.description_vi }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-inner card-inner-sm d-flex align-items-center justify-content-between px-5">
                                                    <span>{{ $t('service.status') }}</span>
                                                    <div class="badge badge-sm" :class="getStatusBadgeBorder(data.status)">{{ getStatusService(data.status) }}</div>
                                                </div>
                                                <div class="card-inner card-inner-sm d-flex align-items-center justify-content-between px-5">
                                                    <span>{{ $t('service.version') }}</span>
                                                    <div>{{ data.version || '- - - -' }}</div>
                                                </div>
                                                <div class="card-inner card-inner-sm d-flex align-items-center justify-content-between px-5">
                                                    <span>{{ $t('service.created_at') }}</span>
                                                    <div v-if="lang === 'en'">{{ formatViDate(data.created_at) }}</div>
                                                    <div v-if="lang === 'vi'">{{ formatViDate(data.created_at) }}</div>
                                                </div>
                                                <div class="card-inner card-inner-sm d-flex align-items-center justify-content-between px-5">
                                                    <span>{{ $t('service.documentation') }}</span>
                                                    <a :href="data.url_document" v-if="data.url_document" class="text-primary d-flex align-items-center">{{ $t('service.documentation') }}
                                                        <em class="icon ni ni-link-h text-primary fs-18px ml-1"></em>
                                                    </a>
                                                    <span v-else class="text-soft font-italic fs-14px">{{ $t('service.no_document') }}</span>
                                                </div>
                                            </div>
                                        </div><!-- .card-aside -->
                                    </div><!-- .card-aside-wrap -->
                                </div><!-- .card -->
                            </div>
                            <!--                        <div class="nk-block">-->
                            <!--                            <div class="card card-bordered">-->
                            <!--                                <div class="card-aside-wrap">-->
                            <!--                                    <div class="card-inner card-inner-lg">-->
                            <!--                                        <div class="nk-block-head-content align-self-start d-lg-none show-sub-sidebar-btn pt-2">-->
                            <!--                                            <a href="javascript:" class="toggle btn btn-icon btn-trigger mt-n1"-->
                            <!--                                               :class="{ 'active' : showSidebar}"-->
                            <!--                                               data-target="userAsideProfile"-->
                            <!--                                               @click="handleShowSideBar"-->
                            <!--                                            >-->
                            <!--                                                <em class="icon ni ni-menu-alt-r"></em>-->
                            <!--                                            </a>-->
                            <!--                                        </div>-->
                            <!--                                        <template>-->
                            <!--                                            <info-service v-if="type === 'info'" :data="data"></info-service>-->
                            <!--                                            <list-service-function v-if="type === 'service'" :service="data.name"></list-service-function>-->
                            <!--                                            <config-form v-if="type === 'config'" :code="data.code"></config-form>-->
                            <!--                                        </template>-->
                            <!--                                    </div>-->
                            <!--                                    <div :class="{'content-active' : showSidebar}" class="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg toggle-screen-lg"-->
                            <!--                                         data-toggle-body="true"-->
                            <!--                                         data-content="userAsideProfile"-->
                            <!--                                         data-toggle-screen="lg"-->
                            <!--                                         data-toggle-overlay="true"-->
                            <!--                                    >-->
                            <!--                                        <div class="card-inner-group">-->
                            <!--                                            <div class="card-inner d-flex align-items-center justify-content-between">-->
                            <!--                                                <div class="user-card">-->
                            <!--                                                    <div class="user-avatar bg-primary p-1">-->
                            <!--                                                        <b-img-->
                            <!--                                                            width="100"-->
                            <!--                                                            :src="require('@/assets/images/svg/bank.svg')"-->
                            <!--                                                        />-->
                            <!--                                                    </div>-->

                            <!--                                                    <div class="user-info">-->
                            <!--                                                        <span class="text-dark fw-medium fs-16px">{{ data.name }}</span>-->
                            <!--                                                        <br>-->
                            <!--                                                        <span class="fs-14px" :class="getStatusColor(data.status)">{{ getStatusService(data.status)}}</span>-->
                            <!--                                                    </div>-->
                            <!--                                                </div>-->
                            <!--                                            </div>-->
                            <!--                                            <div class="card-inner p-0">-->
                            <!--                                                <div id="accordion" class="accordion border-0">-->
                            <!--                                                    <div class="accordion-item">-->
                            <!--                                                        <a href="#" class="accordion-head" data-toggle="collapse" data-target="#accordion-item-1">-->
                            <!--                                                            <div class="d-flex align-items-center">-->
                            <!--                                                                <em class="icon ni ni-alert-circle fs-18px mr-1"></em>-->
                            <!--                                                                <span class="form-label mb-0 active">{{ $t('service.main_info')}}</span>-->
                            <!--                                                            </div>-->
                            <!--                                                            <span class="accordion-icon"></span>-->
                            <!--                                                        </a>-->
                            <!--                                                        <div class="accordion-body collapse show" id="accordion-item-1" data-parent="#accordion">-->
                            <!--                                                            <div class="accordion-inner">-->
                            <!--                                                                <ul class="nk-ibx-label px-0">-->
                            <!--                                                                    <li :class="{'tab-active': type === 'info'}">-->
                            <!--                                                                        <router-link :to="{name: 'my-service-detail', params: { id: id, type: 'info'}}" class="cursor-pointer">-->
                            <!--                                                                            <span class="dot dot-lg sq bg-primary"></span>-->
                            <!--                                                                            <span class="nk-ibx-label-text" :class="{'text-primary':type === 'info'}">{{ $t('service.information')}}</span>-->
                            <!--                                                                        </router-link>-->
                            <!--                                                                    </li>-->
                            <!--                                                                    <li :class="{'tab-active': type === 'service'}">-->
                            <!--                                                                        <router-link :to="{name: 'my-service-detail', params: { id: id, type: 'service'}}" class="cursor-pointer">-->
                            <!--                                                                            <span class="dot dot-lg sq bg-warning"></span>-->
                            <!--                                                                            <span class="nk-ibx-label-text" :class="{'text-primary':type === 'service'}">{{ $t('service.list_func')}}</span>-->
                            <!--                                                                        </router-link>-->
                            <!--                                                                    </li>-->
                            <!--                                                                </ul>-->
                            <!--                                                            </div>-->
                            <!--                                                        </div>-->
                            <!--                                                    </div>-->
                            <!--                                                    <div class="accordion-item">-->
                            <!--                                                        <a href="#" class="accordion-head collapsed" data-toggle="collapse" data-target="#accordion-item-2">-->
                            <!--                                                            <div class="d-flex align-items-center">-->
                            <!--                                                                <em class="icon ni ni-setting fs-18px mr-1"></em>-->
                            <!--                                                                <span class="form-label mb-0 active">{{ $t('service.settings')}}</span>-->
                            <!--                                                            </div>-->
                            <!--                                                            <span class="accordion-icon"></span>-->
                            <!--                                                        </a>-->
                            <!--                                                        <div class="accordion-body collapse show" id="accordion-item-2" data-parent="#accordion">-->
                            <!--                                                            <div class="accordion-inner">-->
                            <!--                                                                <ul class="nk-ibx-label px-0">-->
                            <!--                                                                    <li :class="{'tab-active': type === 'config'}">-->
                            <!--                                                                        <router-link :to="{name: 'my-service-detail', params: { id: id, type: 'config'}}" class="cursor-pointer d-flex align-items-center">-->
                            <!--                                                                            <span class="nk-ibx-label-dot dot dot-lg dot-label bg-pink"></span>-->
                            <!--                                                                            <span class="nk-ibx-label-text" :class="{'text-primary':type === 'settings-webhook'}">{{ $t('service.config') }}</span>-->
                            <!--                                                                        </router-link>-->
                            <!--                                                                    </li>-->
                            <!--                                                                </ul>-->
                            <!--                                                            </div>-->
                            <!--                                                        </div>-->
                            <!--                                                    </div>-->
                            <!--                                                </div>-->
                            <!--                                            </div>-->
                            <!--                                        </div>-->
                            <!--                                    </div>-->
                            <!--                                </div>-->
                            <!--                            </div>-->
                            <!--                        </div>-->
                        </div><!-- .nk-block -->
                    </div>
                </div>
                <div v-if="showSidebar" class="toggle-overlay" @click="handleShowSideBar"></div>
                <b-modal ref="my-modal" hide-footer hide-header class="modal-sm">
                    <div class="d-block text-left pb-3">
                        <p v-if="active" class="fs-18px d-flex align-items-center lh-20">{{ $t('message.on_service') }}</p>
                        <p v-else class="fs-18px d-flex align-items-center lh-20">
                            <em class="icon ni ni-info me-1 fs-20px"></em>
                            {{ $t('message.off_service') }}
                        </p>
                    </div>
                    <div class="d-flex align-items-center justify-content-end mt-2">
                        <b-button class="w-fit-content" variant="outline-light" block @click="hideModal">{{ $t('button.cancel') }}</b-button>
                        <b-button class="w-fit-content mt-0 ms-2" variant="success" block @click="handleOnOffService">{{ $t('button.update') }}</b-button>
                    </div>
                </b-modal>
            </template>
        </div>
    </div>
</template>

<script>
import InfoService from '@/views/pages/service/DetailService/_infoService'
import ListServiceFunction from '@/views/pages/service/ListServiceFunction/index'
import ConfigForm from '@/views/pages/service/DetailService/_configForm'
import { getLanguage, getPublicAssetUrl } from '@/helpers/common'

import { formatViDate, formatEnDate } from '@/helpers/common'
import NoData from '@/views/components/NoData/index'

export default {
    name: 'DetailService',
    data() {
        return {
            id: this.$route.params.id ?? null,
            type: this.$route.params.type ?? 'service',
            active: true,
            agree: true,
            showSidebar: false,
            data: []
        }
    },
    components: {
        InfoService,
        ListServiceFunction,
        ConfigForm,
        NoData
    },
    mounted() {
        this.getDetailMyService()
    },
    methods: {
        formatViDate,
        formatEnDate,
        getPublicAssetUrl,
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
        handleShowSideBar() {
            this.showSidebar = !this.showSidebar
        },
        getDetailMyService() {
            this.setLoadingState(true)

            this.$store.dispatch('Service/getDetailService', this.id).then((response) => {
                if (response.code === 0 && response.success) {
                    this.data = response.data

                    // this.getConfigService(this.data.code)
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
    },
    watch: {
        active() {
            if (this.agree) {
                this.showModal()
            }
            this.agree = true
        }
    }
}
</script>

