<template>
    <div class="nk-content">
        <div class="container-fluid">
            <div class="nk-content nk-content-fluid pt-0">
                <div class="container-xl wide-lg">
                    <div class="nk-content-body">
                        <div class="content-page wide-sm m-auto">
                            <div class="nk-block-head nk-block-head-lg wide-xs mx-auto">
                                <div class="nk-block-head-content text-center">
                                    <h2 class="nk-block-title fw-normal">{{ $t('tittle.faq_tittle')}}</h2>
                                    <div class="nk-block-des">
                                        <p class="lead">{{$t('support.support_tittle')}} <router-link :to="{name: 'support.index'}">{{ $t('support.support_team')}}</router-link>.</p>
                                    </div>
                                </div>
                            </div><!-- .nk-block-head -->
                            <div class="nk-block">
                                <div class="card">
                                    <no-data v-if="!data.length"></no-data>
                                    <div v-else id="faqs" class="accordion">
                                        <div v-for="(item, index) in data" :key="index" class="accordion-item">
                                            <a href="#" class="accordion-head collapsed" data-toggle="collapse" :data-target="`#faq-q${index}`">
                                                <h6 class="title" v-html="item.question"></h6>
                                                <span class="accordion-icon"></span>
                                            </a>
                                            <div class="accordion-body collapse" :id="`faq-q${index}`" data-parent="#faqs">
                                                <div class="accordion-inner">
                                                    <p v-html="item.answer"></p>
                                                </div>
                                            </div>
                                        </div><!-- .accordion-item -->
                                    </div><!-- .accordion -->
                                </div><!-- .card -->
                                <!-- Paginate -->
                                <b-row v-if="data.length" class="row mt-4 mb-3">
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
                                <!--End Paginate -->
                            </div><!-- .nk-block -->
                            <div class="nk-block">
                                <div class="card card-bordered">
                                    <div class="card-inner">
                                        <div class="align-center flex-column g-4">
                                            <div class="nk-block-content">
                                                <div class="nk-block-content-head px-lg-4">
                                                    <h5 class="text-center">{{ $tc('support.support_sub', 1)}}</h5>
                                                    <p class="text-soft text-center mt-2 mt-sm-0">{{ $tc('support.support_sub', 2)}}</p>
                                                </div>
                                            </div>
                                            <div class="nk-block-content flex-shrink-0">
                                                <router-link :to="{name: 'support.index'}" class="btn btn-lg border d-flex align-items-center">
                                                    <div class="bg-primary p-1 rounded mr-2"><em class="icon ni ni-headphone-fill text-white"></em></div>
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
        </div>
    </div>
</template>

<script>
import NoData from '@/views/components/NoData/index'
export default {
    name: 'index',
    metaInfo() {
        return {
            title: this.$t('menu.faq')
        }
    },
    data() {
        return {
            data: [],
            paginationData: {
                perPage: 10,
                currentPage: 1,
                total: 0
            },
            searchTimer: null,
            filter: {
                search: null
            }
        }
    },
    components: {
        NoData
    },
    mounted() {
        this.getListQuestion()
    },
    methods: {
        getListQuestion() {
            this.setLoadingState(true)

            let postData = {
                page: this.paginationData.currentPage,
                limit: this.paginationData.perPage
            }

            if(this.filter) {
                this.lodash.forEach(this.filter, (v, k) => {
                    if(!v) return
                    postData[k] = v
                })
            }

            this.$store.dispatch('FAQs/getListFAQs', postData).then((response) => {
                if (response.code === 0 && response.success) {

                    this.data = response.data.faqs

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
        }
    },
    watch: {
        'paginationData.currentPage'(newVal) {
            if(newVal) {
                this.getListQuestion()
            }
        },
        'paginationData.perPage'(newVal) {
            if(newVal) {
                this.paginationData.currentPage = 1
                this.getListQuestion()
            }
        },
        'filter.search'(newVal, oldVal) {
            if(this.searchTimer) clearTimeout(this.searchTimer)
            this.searchTimer = setTimeout(() => {
                this.paginationData.currentPage = 1
                this.getListMyService()
            }, 1000)
        }
    }
}
</script>
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>
