<template>
    <b-modal
        ref="modal"
        v-model="show"
        no-close-on-backdrop
        no-close-on-esc
        title-class="w-100 text-center"
        header-class=""
        size="lg"
        body-class="pt-lg-0 pt-2"
        hide-footer
        :hide-header="application"
        no-enforce-focus
        @hidden="onModalHidden()"
    >
        <template #header-close-content>
            <button type="button" aria-label="Close" class="close">×</button>
        </template>

        <template #modal-title>
            <h5>
                {{ $t('bank.choose_app_integration')}}
            </h5>
        </template>

        <div class="mt-3">
            <div class="modal-body p-0 p-lg-3">

                <div v-show="!application" class="h-300px card" data-simplebar>
                    <div class="card-inner py-0 px-md-3">
                        <b-row class="gy-2">
                            <div class="col-lg-6 px-0 px-lg-2" v-for="(item, i) in options" :key="i">
                                <div class="example-alert cursor-pointer" @click="application = item">
                                    <div
                                        class="alert alert-gray alert-icon px-4"
                                        :class="[application && application.code == item.code ? 'border-success' : 'border-transparent']"
                                    >
                                        <div class="user-card">
                                            <div class="user-avatar" style="background: none">
                                                <img :src="item.img" alt="">
                                            </div>
                                            <div class="user-info">
                                                <span class="lead-text">{{ item.name }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-row>
                    </div>
                </div>

                <template v-if="application">
<!--                    <hr class="dashed">-->
                    <div class="d-flex align-items-start justify-content-between flex-column flex-lg-row">
                        <div class="d-flex">
                            <div class="card card-bordered flex-shrink-0">
                                <div class="card-inner">
                                    <div class="team">
                                        <div class="user-card user-card-s2">
                                            <div class="user-avatar lg bg-info">
                                                <b-img v-if="application.img" :src="application.img" @error="getNoImage2" />
                                                <span v-else-if="application.name">{{ application.name.charAt(0) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-lg-none ms-3">
                                <h3>{{ application.name }}</h3>
                                <span class="text-dark d-block mt-4 mb-1">{{ $t('bank.choose_another_app')}}:</span>
                                <b-dropdown v-if="options"
                                            class="c-dropdown mb-2">
                                    <template #button-content>
                                        {{ application.name }}
                                        <em class="icon ni ni-chevron-down dropdown-icon"></em>
                                    </template>
                                    <b-dropdown-item
                                        :key="i"
                                        @click="application = item"
                                        :class="{'active': item.name == application.name}"
                                        v-for="(item, i) in options">
                                        {{ item.name }}
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                        <b-form @submit.prevent="handleSubmitForm" aria-autocomplete="off"
                                class="card-inner-group mx-auto px-lg-3 flex-grow-1">
                            <div class="align-items-center justify-content-between d-none d-lg-flex">
                                <h3>{{ application.name }}</h3>
                                <b-dropdown v-if="options"
                                            class="c-dropdown mb-2">
                                    <template #button-content>
                                        {{ application.name }}
                                        <em class="icon ni ni-chevron-down dropdown-icon"></em>
                                    </template>
                                    <b-dropdown-item
                                        :key="i"
                                        @click="application = item"
                                        :class="{'active': item.name == application.name}"
                                        v-for="(item, i) in options">
                                        {{ item.name }}
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                            <p class="mt-3 mt-lg-0">{{ application.content }}</p>
                            <span class="text-dark fw-500 fs-16px mb-2 d-block">{{ $t('bank.enter_to_integration')}}:</span>
                            <b-form-group
                                v-if="settings"
                                v-for="(item, i) in settings"
                                :key="i"
                                label-cols-lg="3"
                                content-cols-sm
                                content-cols-lg="9"
                                class="flex-grow-1 text-left"
                                label-class="form-label-group d-flex align-item-center"
                                :invalid-feedback="showHtmlError(item, 'form')"
                            >
                                <template #label>
                                    <label class="form-label">
                                        {{ (item.charAt(0).toUpperCase() + item.slice(1)).replace('_', ' ') }}
                                        <span class="text-danger">*</span>
                                    </label>
                                </template>
                                <div class="form-control-wrap">
                                    <b-form-input
                                        type="text"
                                        v-model="$v.form[item].$model"
                                        autocomplete="off"
                                        :placeholder="item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ')"
                                        :class="{'is-invalid':(showHtmlError(item, 'form'))}"
                                        size="lg"
                                    />
                                </div>
                            </b-form-group>
                            <hr class="dashed">
                            <b-row>
                                <div class="d-flex align-items-center justify-content-end">
                                    <button
                                        @click="hideModal()"
                                        type="reset"
                                        class="btn w-fit-content btn-outline-light btn-block btn-lg"
                                    >
                                        {{ $t('button.cancel')}}
                                    </button>
                                    <button
                                        type="submit"
                                        class="btn w-fit-content mt-0 ms-2 btn-primary btn-block btn-lg"
                                    >
                                        <span v-if="requestSubmit" class="spinner-border spinner-border-sm mr-2" role="status" />
                                        <span class="visually-hidden">Loading...</span>
                                        {{ $t('button.save')}}
                                    </button>
                                </div>
                            </b-row>
                        </b-form>
                    </div>
                </template>
            </div>
        </div>
    </b-modal>

</template>

<script>
const
    { validators } = window,
    { email, required, phone, $label, sameAs, minLength, maxLength, numeric } = validators
export default {
    name: 'ModalCreate',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'md'
        },
        data: {
            type: Object,
            default: () => {
                return null
            }
        }
    },
    validations() {
        let settingRules = {}
        if (this.settings && this.settings.length) {
            for (const setting of this.settings) {
                settingRules = Object.assign({}, settingRules, {
                    [setting]: {
                        required,
                        $label: $label([setting.replace('_', ' ')])
                    }
                })
            }
        }
        return {
            form: Object.assign({}, settingRules)
        }
    },
    data() {
        return {
            show: true,
            requestSubmit: false,
            options: [
                {
                    name: 'Telegram', code: 'telegram',
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png',
                    setting: [
                        { key: 'email', value: null },
                        { key: 'username', value: null }
                    ],
                    content: "Tích hợp với ePayGate, khách hàng không chỉ nhận được thông báo biến động số dư, theo dõi dòng tiền vào - ra ngay tại nhóm chat nội bộ một cách tiện lợi, mà còn có thể tuyệt đối yên tâm về độ an toàn thông tin - dữ liệu do chính Telegram mang lại."
                },
                {
                    name: 'Webhook', code: 'webhook',
                    img: 'https://my.casso.vn/assets/brandLogo/webhook.png',
                    setting: [
                        { key: 'link_webhook', value: null },
                        { key: 'token', value: null },
                        { key: 'ip', value: null }
                    ],
                    content: "Webhook cho phép đồng bộ các thông báo về biến động số dư từ nhiều nguồn tài khoản ngân hàng vào các website cá nhân, doanh nghiệp. Đồng thời, hệ thống sẽ có khả năng tự động xác nhận thanh toán thành công và chuyển trạng thái đơn hàng."
                },
                {
                    name: 'Sapo', code: 'sapo',
                    img: 'https://yt3.ggpht.com/ytc/AMLnZu_SMCwdsEQUDcfKm5bleBU_6TZBrpt8-Rkj755XgQ=s900-c-k-c0x00ffffff-no-rj',
                    setting: [
                        { key: 'email', value: null },
                        { key: 'username', value: null }
                    ],
                    content: "Tích hợp với ePayGate không chỉ mang đến cho Sapo website thêm một cổng thanh toán VietQR, mà còn là chức năng tự động xác nhận và chuyển trạng thái đơn hàng khi khách hàng thanh toán bằng hình thức chuyển khoản."
                },
                {
                    name: 'Slack', code: 'slack',
                    img: 'https://play-lh.googleusercontent.com/lV1DhBeSuikQy6fLPhgfNHUxDqterNlur4oB1Z_Yr0NOSiWwQOD0g8gWCjVf1mmMuw',
                    setting: [
                        { key: 'email', value: null },
                        { key: 'username', value: null }
                    ],
                    content: "Việc tích hợp với ePayGate mang đến cho Slack một sức mạnh toàn diện khi tất cả vấn đề về quản lý và tài chính đều có thể được theo dõi tập trung chỉ sau một vài thao tác đơn giản."
                },
                {
                    name: 'Zalo OA', code: 'zalo_oa',
                    img: 'https://play-lh.googleusercontent.com/rFIOt4fDSCgJh_FkHU2qP8YiZUUhfVoKoNfQFbPEM-Wl8zuyuwn7vzkEx_XMh5B6FfO3',
                    setting: [
                        { key: 'phone', value: null },
                        { key: 'password', value: null }
                    ],
                    content: "Tích hợp ePayGate bot vào Zalo Official Account nhằm hỗ trợ người dùng tự động hóa quy trình chăm sóc khách hàng, tăng khả năng “chốt sale” và tiết kiệm thời gian để tái phân phối cho các hạng mục khác trong hoạt động kinh doanh."
                },
                {
                    name: 'Bigo Live', code: 'bigolive',
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ZhfllK2hyitbX9UeDMURk0sG4vemjIyWgSxCmo5DXUDsjl5qdhgPnVTl9IVXMX5Jkz4&usqp=CAU',
                    setting: [
                        { key: 'phone', value: null },
                        { key: 'password', value: null }
                    ],
                    content: "Việc tích hợp với ePayGate mang đến cho Bigo Live một sức mạnh toàn diện khi tất cả vấn đề về quản lý và tài chính đều có thể được theo dõi tập trung chỉ sau một vài thao tác đơn giản."
                },
                {
                    name: 'Haravan',
                    code: 'haravan',
                    img: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.18169-1/12122825_740319142768787_1875715644858830276_n.png?stp=dst-png_p148x148&_nc_cat=101&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=3qGSvkkK8-UAX-6-ymE&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfBWg1Jk4V4fHR_rV7B4rEYIr6G8_k-vIaqQUqNa1dorXg&oe=63D4C308',
                    setting: [
                        { key: 'phone', value: null },
                        { key: 'password', value: null }
                    ],
                     content: "Website bán hàng đa kênh của Haravan có tích hợp ePayGate sẽ sở hữu thêm cổng thanh toán VietQR, đi kèm với đó là tính năng tự động xác nhận và chuyển trạng thái đơn hàng khi phát sinh giao dịch bằng hình thức chuyển khoản. "
                },
                {
                    name: 'Google Chat',
                    code: 'googlechat',
                    img: 'https://play-lh.googleusercontent.com/cF_oWC9Io_I9smEBhjhUHkOO6vX5wMbZJgFpGny4MkMMtz25iIJEh2wASdbbEN7jseAx',
                    setting: [
                        { key: 'phone', value: null },
                        { key: 'password', value: null }
                    ],
                     content: "Google Chat tích hợp với ePayGate mang đến sự đơn giản hóa việc nhận biến động số dư từ nhiều tài khoản ngân hàng, thông qua hình thức thông báo trực tiếp vào nhóm chat nội bộ của người dùng."
                },
                {
                    name: 'Discord',
                    code: 'discord',
                    img: 'https://sparkcdnwus2.azureedge.net/sparkimageassets/XPDC2RH70K22MN-08afd558-a61c-4a63-9171-d3f199738e9f',
                    setting: [
                        { key: 'phone', value: null },
                        { key: 'token', value: null }
                    ],
                     content: "Tích hợp với ePayGate, Discord trở thành nơi mà người dùng vừa có thể trao đổi, kết nối với nhau về game, lại vừa có thể theo dõi thông tin các hoạt động, giao dịch phát sinh (từ các hoạt động qua game) hàng ngày."
                }
            ],
            application: null,
            form: {
                email: null,
                username: null,
                phone: null,
                ip: null,
                link_webhook: null,
                token: null
            },
            settings: []
        }
    },
    methods: {
        hideModal() {
            this.$refs['modal'].hide()
        },

        onModalHidden() {
            this.$emit('close', this.value)
        },

        handleSubmitForm() {
            this.$v.form.$touch()
            const isError = this.$v.form.$error
            if (!isError) {
                this.requestSubmit = true

                let dataSetting = {}
                for (const setting of this.settings) {
                    dataSetting = Object.assign({}, dataSetting, {
                        [setting]: this.form[setting]
                    })
                }

                let keySetting = this.application.code
                let postData = {
                    [keySetting]: dataSetting
                }

                this.$store.dispatch('Bank/createIntegrated', postData).then((response) => {
                    if (!response.success) {
                        this.setFormError(e)
                        return this.$awnAlert(this.$t('message.change_key_failed'))
                    }
                    this.$awnSuccess(this.$t('message.change_key_successfully'))
                    this.$v.$reset()
                }).catch(e => {
                    this.setFormError(e)
                }).finally(() => {
                    this.hideModal()
                    this.requestSubmit = false
                })
            }
        }
    },
    watch: {
        value(newValue, oldValue) {
            this.show = newValue
        },
        application(newValue, oldValue) {
            if (newValue) {
                /* this.form = newValue.setting.reduce((acc, item) => {
                     acc[item.key] = null
                     return acc
                 }, {})*/

                let keySetting = this.lodash.map(newValue.setting, (v) => {
                    if (!v) return
                    let temp = {}
                    temp[v['key']] = v['value'] ?? null
                    return temp
                })
                let data = []
                this.lodash.forEach(keySetting, (v) => {
                    data.push(...Object.keys(v))
                })
                this.settings = data
            }
        }
    }
}
</script>

<style scoped lang="scss">
.overlay {
    opacity: 1 !important;
    position: relative;

    &:after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(#FFF, 0.5);
        z-index: 99;
    }
}

</style>
