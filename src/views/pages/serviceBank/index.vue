<template>
    <div id="serivce-bank">
        <div class="nk-ibx-head">
            <div class="nk-ibx-head-actions">
                <h6>{{ $t('bank.list_bank_support') }}</h6>
            </div>
            <div>
                <ul class="nk-ibx-head-tools g-1">
                    <li class="me-n1 d-lg-none">
                        <div @click="showSubSidebar" class="btn btn-trigger btn-icon toggle" data-target="inbox-aside">
                            <em class="icon ni ni-menu-alt-r"></em>
                        </div>
                    </li>
                </ul>
            </div>
        </div><!-- .nk-ibx-head -->
        <div class="flex-grow-1 min-h-300px d-flex align-items-center justify-content-center" v-if="!data || !data.length">
            <span>Chưa có dữ liệu</span>
        </div>
        <div class="nk-ibx-list" v-else>
            <div class="card-sm">
                <div class="nk-fmg-quick-list nk-block">
                    <div class="toggle-expand-content expanded" data-content="quick-access">
                        <div class="nk-files nk-files-view-grid">
                            <div class="nk-files-list bank-list-icon" v-if="data">
                                <router-link
                                    v-for="(item,i) in data"
                                    v-if="item.code"
                                    :key="i"
                                    :to="{name: 'bank.index', params: { id: item.code}}"
                                    v-b-tooltip="$t('button.view')"
                                    class="nk-file-item nk-file border-0 bank"
                                >
                                    <div class="nk-file-info">
                                        <div class="nk-file-link">
                                            <div class="nk-file-title">
                                                <div class="nk-file-icon d-flex align-items-center">
                                                    <div class="nk-file-icon-type">
                                                        <span class="user-avatar lg bg-primary">
                                                            <b-img :src="getBankLogo(item.name)" @error="getNoImage2"></b-img>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="nk-file-name mt-2">
                                                    <div class="user-info d-flex flex-column align-items-center">
                                                        <h6 class="mb-8px">{{ item.name ?? '--' }}</h6>
                                                        <h6 class="mb-8px">{{ item.code ?? '--' }}</h6>
                                                        <span class="sub-text">{{ item.version ?? '--' }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nk-file-actions hideable">
                                        <a href="#" class="btn btn-sm btn-icon btn-trigger">
                                            <em class="icon ni ni-eye"></em>
                                        </a>
                                    </div>
                                </router-link>
                            </div>
                        </div><!-- .nk-files -->
                    </div>
                </div>
            </div>
        </div><!-- .nk-ibx-list -->
    </div>
</template>

<script>
export default {
    name: 'AddBank',
    metaInfo() {
        return {
            title: this.$t('menu.bankService')
        }
    },
    data() {
        return {
            data: [
                {
                    id: 1,
                    bank_name: 'BIDV',
                    bank_code: 'BIDV',
                    type: 'personal',
                    logo: 'http://localhost:8888/assets/1.0/img/BIDV.8c1d9e37.png'
                },
                {
                    id: 2,
                    bank_name: 'VCB',
                    bank_code: 'VCB',
                    type: 'personal',
                    logo: 'http://localhost:8888/assets/1.0/img/VCB.8219d586.png'
                },
                {
                    id: 3,
                    bank_name: 'PVCB',
                    bank_code: 'PVCB',
                    type: 'personal',
                    logo: 'http://localhost:8888/assets/1.0/img/PVCB.16d1985f.png'
                },
                {
                    id: 4,
                    bank_name: 'VIB',
                    bank_code: 'VIB',
                    type: 'enterprise',
                    logo: 'http://localhost:8888/assets/1.0/img/VIB.7d0e85c7.png'
                },
                {
                    id: 5,
                    bank_name: 'Agribank',
                    bank_code: 'agribank',
                    type: 'personal',
                    logo: 'https://inkythuatso.com/uploads/images/2021/11/logo-agribank-inkythuatso-3-01-09-15-15-16.jpg'
                },
                {
                    id: 6,
                    bank_name: 'Vietinbank',
                    bank_code: 'CTG ',
                    type: 'personal',
                    logo: 'https://inkythuatso.com/uploads/images/2021/09/logo-vietinbank-inkythuatso-10-13-22-06.jpg'
                },
                {
                    id: 7,
                    bank_name: 'Techcombank',
                    bank_code: 'techcombank ',
                    type: 'personal',
                    logo: 'https://inuvdp.com/wp-content/uploads/2022/08/file-vector-logo-techcombank-02.jpg'
                }
            ]
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            this.setLoadingState(true)

            this.$store.dispatch('Bank/listBankServiceRegistered').then((response) => {
                this.data = response
            }).catch(e => {
                this.setFormError(e)
            }).finally(() => {
                this.requestLoading = false
                this.setLoadingState(false)
            })
        },

        handleAddBank(id) {
            this.$router.push({ name: 'bank.create', params: { bank_id: id } })
        }
    }
}
</script>
