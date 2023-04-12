<template>
    <div class="nk-content nk-content-fluid pt-0">
        <div class="container-xl wide-lg">
            <section class="section section-tim-kiem" id="section_1723421291">
                <div class="bg section-bg fill bg-fill bg-loaded bg-loaded">
                </div>
                <div class="section-content relative">
                    <div class="banner has-hover" id="banner-1374818765">
                        <div class="banner-inner fill">
                            <div class="banner-bg fill">
                                <div class="bg fill bg-fill bg-loaded"></div>
                                <div class="overlay"></div>
                            </div>
                            <div class="banner-layers container">
                                <div class="fill banner-link"></div>
                                <div id="text-box-54394273"
                                    class="text-box banner-layer x50 md-x50 lg-x50 y50 md-y50 lg-y50 res-text">
                                    <div class="text-box-content text dark">

                                        <div class="text-inner text-center">

                                            <h4><strong>Tìm kiếm ngôi nhà bạn yêu thích</strong></h4>
                                            <div class="searchform-wrapper ux-search-box relative is-xlarge">
                                                <form role="search" method="get" class="searchform"
                                                    action="https://viethomes.jp/">
                                                    <div class="flex-row relative">
                                                        <div class="flex-col flex-grow">
                                                            <label class="screen-reader-text"
                                                                for="woocommerce-product-search-field-0">Tìm kiếm:</label>
                                                            <input type="search" id="woocommerce-product-search-field-0"
                                                                class="search-field mb-0"
                                                                placeholder="Bạn muốn tìm nhà tại ga..." value="" name="s">
                                                            <input type="hidden" name="post_type" value="product">

                                                        </div>
                                                        <div class="flex-col">
                                                            <button type="submit" value="Tìm kiếm"
                                                                class="ux-search-submit submit-button secondary button icon mb-0">
                                                                <i class="icon-search"></i> </button>
                                                        </div>
                                                    </div>
                                                    <div class="live-search-results text-left z-top"></div>
                                                </form>
                                            </div>
                                            <div class="row" id="row-1128673315">

                                                <div id="col-1075870004" class="col small-12 large-12">
                                                    <div class="col-inner">
                                                        <div id="text-2973132224" class="text">
                                                            <p>Cách nhập tên ga:</p>
                                                            <ul>
                                                                <li>ROMAJI ghi liền không dấu. VD: Namba, Imazato,…</li>
                                                                <li>Ghi bằng Kanji: Đây là cách tìm để ra kết quả chính xác
                                                                    nhất.
                                                                    VD: 難波, 新今宮,..</li>
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
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { formatViDate, formatEnDate, getLanguage } from '@/helpers/common'
import NoData from '@/views/components/NoData/index'

export default {
    name: 'Dashboard',
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
    components: {
        NoData
    },
    mounted() {
        // this.getListService()
    },
    computed: {
        lang() {
            return getLanguage()
        }
    },
    methods: {
        formatViDate,
        formatEnDate,
        getListService() {
            this.setLoadingState(true)
            let postData = {
                page: this.paginationData.currentPage,
                perPage: this.paginationData.perPage,
                sort: this.paginationData.sort
            }

            if (this.filter) {
                this.lodash.forEach(this.filter, (v, k) => {
                    if (!v) return
                    postData[k] = v
                })
            }

            this.$store.dispatch('Service/getListService', postData).then((response) => {
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
        'paginationData.currentPage'(newVal) {
            if (newVal) {
                this.getListService()
            }
        },
        'paginationData.perPage'(newVal) {
            if (newVal) {
                this.paginationData.currentPage = 1
                this.getListService()
            }
        },
        'paginationData.sort'(newVal) {
            if (newVal) {
                this.getListService()
            }
        },
        'filter.search'(newVal, oldVal) {
            if (this.searchTimer) clearTimeout(this.searchTimer)
            this.searchTimer = setTimeout(() => {
                this.paginationData.currentPage = 1
                this.getListService()
            }, 500)
        }
    },
    metaInfo() {
        return {
            title: this.$t('menu.dashboard')
        }
    }
}
</script>
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>
<style>
#banner-1374818765 {
  padding-top: 100%;
}
#banner-1374818765 .bg.bg-loaded {
  background-image: url(https://viethomes.jp/wp-content/uploads/2023/01/tai-xuong.jpg);
}
#banner-1374818765 .overlay {
  background-color: rgba(0,0,0,.5);
}
@media (min-width:550px) {
  #banner-1374818765 {
    padding-top: 312%;
  }
}
@media (min-width:850px) {
  #banner-1374818765 {
    padding-top: 522px;
  }
}

</style>
