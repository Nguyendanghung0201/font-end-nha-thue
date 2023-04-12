<template>
    <div>
        <div class="nk-ibx-head">
            <div class="nk-ibx-head-actions">
                <h6>Thêm tài khoản ngân hàng</h6>
            </div>
            <div>
                <ul class="nk-ibx-head-tools g-1">
                    <li class="me-n1 d-lg-none"><div @click="showSubSidebar" class="btn btn-trigger btn-icon toggle" data-target="inbox-aside"><em class="icon ni ni-menu-alt-r"></em></div></li>
                </ul>
            </div>
        </div><!-- .nk-ibx-head -->
        <div class="nk-ibx-list">
            <div class="card-sm">
                <div class="nk-fmg-quick-list nk-block">
                    <div class="nk-block-head-xs">
                        <div class="nk-block-between g-2">
                            <div class="nk-block-head-content">
                                <h6 class="nk-block-title title mb-3">Danh sách ngân hàng đang được hỗ trợ</h6>
                            </div>
                        </div>
                    </div><!-- .nk-block-head -->

                    <div class="toggle-expand-content expanded" data-content="quick-access">
                        <div class="nk-files nk-files-view-grid">
                            <div class="nk-files-list bank-list-icon" v-if="data">
                                <router-link
                                    v-for="(item,i) in data"
                                    :key="i"
                                    :to="{name: 'bank.create', params: {id: item.id}}"
                                    v-b-tooltip="'Thêm ngân hàng'"
                                    class="nk-file-item nk-file border-0 bank"
                                >
                                    <div class="nk-file-info">
                                        <a href="#" class="nk-file-link">
                                            <div class="nk-file-title">
                                                <div class="nk-file-icon d-flex align-items-center">
                                                    <div class="nk-file-icon-type">
                                                        <span class="user-avatar lg bg-primary">
                                                            <b-img :src="item.logo" @error="getNoImage2"></b-img>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="nk-file-name mt-2">
                                                    <div class="user-info d-flex flex-column align-items-center">
                                                        <h6 class="mb-8px">{{ item.bank_name }}</h6>
                                                        <span class="sub-text">{{ item.type == 'personal' ? 'Cá nhân' : 'Doanh nghiệp' }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="nk-file-actions hideable">
                                        <a href="#" class="btn btn-sm btn-icon btn-trigger">
                                            <em class="icon ni ni-plus"></em>
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
    methods: {
        handleAddBank(id) {
            this.$router.push({ name: 'bank.create', params: { bank_id: id } })
        }
    }
}
</script>
