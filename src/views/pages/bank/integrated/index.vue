<template>
    <div>
        <div class="nk-ibx-head">
            <div class="nk-ibx-head-actions">
                <h6 class="mb-0 mr-1">{{ $t('bank.integration')}}</h6>
                <a @click="addIntegrated" class="btn btn-icon btn-white btn-dim btn-sm btn-primary">
                    <em class="icon ni ni-plus"></em>
                </a>
            </div>
            <div>
                <div class="nk-ibx-head-tools g-1">
                    <input :class="{'show': showSearch}"
                           :placeholder="$t('button.search')"
                           type="search" class="c-search me-3">
                    <div v-if="!showSearch"
                        @click="showSearch = !showSearch">
                        <div class="btn btn-trigger btn-icon search-toggle toggle-search" data-target="search">
                            <em class="icon ni ni-search"></em>
                        </div>
                    </div>
                    <div v-else
                        @click="showSearch = !showSearch">
                        <div class="btn btn-trigger btn-icon search-toggle toggle-search" data-target="search">
                            <em class="icon ni ni-cross-sm"></em>
                        </div>
                    </div>
                    <div class="me-n1 d-lg-none">
                        <div @click="showSubSidebar" class="btn btn-trigger btn-icon toggle" data-target="inbox-aside">
                            <em class="icon ni ni-menu-alt-r"></em>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-inner" v-if="integratedList && integratedList.length">
            <div class="nk-block-head nk-block-head-lg wide-md mx-auto">
                <div class="card-bordered card card-bank" v-for="(item, i) in integratedList" :key="i">
                    <div class="card-inner p-3 flex-column flex-md-row d-flex align-items-md-center justify-content-md-between position-relative">
                        <div class="user-card">
                            <div class="user-avatar" style="background: none">
                                <img :src="item.img" alt="">
                            </div>
                            <div class="user-info">
                                <span class="lead-text">{{ item.name ?? '--' }}</span>
                                <div class="sub-text">
                                    <div class="tb-tnx-status">
                                        <span class="badge badge-dot text-success" v-if="item.status == 1">Đã kích hoạt</span>
                                        <span class="badge badge-dot text-danger" v-else>Không kích hoạt</span>
                                    </div>
                                </div>
<!--                                <span class="badge rounded-pill badge-dim bg-gray" v-for="item2 in item.setting">-->
<!--                                    {{ item2.value ?? '&#45;&#45;' }}-->
<!--                                </span>-->
                                <span class="badge rounded-pill badge-dim bg-gray">
                                    {{ item.setting[0] ? item.setting[0].value : '--' }}
                                </span>
                            </div>
                        </div>
                        <div class="tb-odr-btns d-md-inline onOff-btn-mobile d-flex flex-row-reverse align-items-start">
                            <b-form-checkbox
                                v-model="item.status"
                                class="pt-1"
                                switch
                                :value="1"
                                :unchecked-value="0"
                                @click.native="handeChangeStatus(item.id)"
                            >
                            </b-form-checkbox>
                            <a @click="openModalEdit(item)" target="_blank" class="btn btn-icon btn-white btn-dim btn-sm btn-primary">
                                <em class="icon ni ni-edit-fill"></em>
                            </a>
                            <a @click="handeDeleted(item.id)" class="btn btn-icon btn-white btn-dim btn-sm btn-danger">
                                <em class="icon ni ni-trash-empty"></em>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <modal-edit
            v-if="dataEdit"
            v-model="showEdit"
            :data="dataEdit"
            @close="handleDoneActionEdit"
        />

        <modal-create
            v-if="showCreate"
            v-model="showCreate"
            @close="handleDoneActionCreate"
        />
    </div>
</template>

<script>
import ModalEdit from './modal/ModalEdit'
import ModalCreate from './modal/ModalCreate'

export default {
    name: 'integrated',
    metaInfo() {
        return {
            title: 'Tích hợp'
        }
    },
    components: {
        ModalEdit, ModalCreate
    },
    data() {
        return {
            integratedList: [
                {
                    id: 1,
                    name: 'Telegram',
                    description: 'Cài đặt tài khoản Telegram',
                    status: 1,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png',
                    setting: [
                        {
                            key: 'email',
                            value: 'httzip@gmail.com'
                        },
                        {
                            key: 'username',
                            value: '🐋 Blue Whale 🐋 (P2P)'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Webhook',
                    description: 'Cài đặt webhook',
                    status: 0,
                    img: 'https://my.casso.vn/assets/brandLogo/webhook.png',
                    setting: [
                        {
                            'key': 'link_webhook',
                            'description': 'Link nhận webhook',
                            'value': 'https://www.google.com.vn/'
                        },
                        {
                            'key': 'token',
                            'description': 'token giao tiếp',
                            'value': 'Mjc.bH1fjAcere65tdM6nC1p223QrgZ'
                        },
                        {
                            'key': 'ip',
                            'description': 'ip server',
                            'value': 'http://192.168.1.199'
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Bigo Live',
                    description: 'Cài đặt tài khoản Bigo Live',
                    status: 1,
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ZhfllK2hyitbX9UeDMURk0sG4vemjIyWgSxCmo5DXUDsjl5qdhgPnVTl9IVXMX5Jkz4&usqp=CAU',
                    setting: [
                        {
                            key: 'email',
                            value: 'httzip@gmail.com'
                        },
                        {
                            key: 'username',
                            value: '🐋 Blue Whale 🐋 (P2P)'
                        }
                    ]
                },
                {
                    id: 4,
                    name: 'Slack',
                    description: 'Cài đặt tài khoản Slack',
                    status: 1,
                    img: 'https://play-lh.googleusercontent.com/lV1DhBeSuikQy6fLPhgfNHUxDqterNlur4oB1Z_Yr0NOSiWwQOD0g8gWCjVf1mmMuw',
                    setting: [
                        {
                            key: 'email',
                            value: 'httzip@gmail.com'
                        },
                        {
                            key: 'username',
                            value: '🐋 Blue Whale 🐋 (P2P)'
                        }
                    ]
                }
            ],
            showEdit: false,
            dataEdit: null,
            showCreate: false,
            showSearch: false
        }
    },
    methods: {
        handeDeleted(id) {
            if (!id) return
            this.$confirm('Bạn không thể hoàn lại sau khi thực hiện hành động này', 'Vui lòng xác nhận', {
                icon: 'warning',
                confirmButtonColor: '#1ee0ac',
                cancelButtonColor: '#d33'
            }).then(({ value }) => {
                if (value) {
                    this.$awnSuccess(this.$t('dialog.remove_success'))
                }
            })
        },

        handeChangeStatus(id) {
            if (!id) return
            this.$confirm('Bạn có muốn thay đổi cài đặt này?', 'Vui lòng xác nhận', {
                icon: 'warning',
                confirmButtonColor: '#1ee0ac',
                cancelButtonColor: '#d33'
            }).then(({ value }) => {
                if (value) {
                    this.$awnSuccess(this.$t('dialog.successfully'))
                }
            })
        },

        openModalEdit(value) {
            this.showEdit = true
            this.dataEdit = value
        },

        handleDoneActionEdit() {
            this.showEdit = false
            this.dataEdit = null
        },

        handleDoneActionCreate() {
            this.showCreate = false
        },

        addIntegrated() {
            this.showCreate = true
        }
    }
}
</script>

