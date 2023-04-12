<template>
    <div>
        <div class="nk-ibx-head">
            <div class="nk-ibx-head-actions">
                <h6>{{ $t('bank.passbook') }}</h6>
            </div>
            <div>
                <ul class="nk-ibx-head-tools g-1">
                    <li @click="showSubSidebar" class="me-n1 d-lg-none">
                        <a href="#" class="btn btn-trigger btn-icon toggle" data-target="inbox-aside">
                            <em class="icon ni ni-menu-alt-r"></em>
                        </a>
                    </li>
                </ul>
            </div>
        </div><!-- .nk-ibx-head -->
        <div class="nk-block py-3 px-4">
            <div class="card card-bordered sp-plan">
                <div class="row no-gutters">
                    <div class="col-md-8">
                        <div class="sp-plan-info card-inner">
                            <div class="row gx-0 gy-3">
                                <div class="col-xl-9 col-sm-8">
                                    <div class="sp-plan-name">
                                        <h6 class="title"><a href="html/subscription/subscriptions-detail.html">Tài Khoản ngân hàng <span class="badge bg-success rounded-pill">Kết nối</span></a></h6>
                                        <p>Số tài khoản: <span class="text-base">100394949</span></p>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-sm-4">
                                    <div class="sp-plan-opt">
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="auto-plan-p1" checked>
                                            <label class="custom-control-label text-soft" for="auto-plan-p1">Auto Renew</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!-- .sp-plan-info -->
                        <div class="sp-plan-desc card-inner">
                            <ul class="row gx-1">
                                <li class="col-6 col-lg-3">
                                    <p><span class="text-soft">Started On</span> Oct 12, 2018</p>
                                </li>
                                <li class="col-6 col-lg-3">
                                    <p><span class="text-soft">Recuring</span> Yes</p>
                                </li>
                                <li class="col-6 col-lg-3">
                                    <p><span class="text-soft">Price</span> $599.00</p>
                                </li>
                                <li class="col-6 col-lg-3">
                                    <p><span class="text-soft">Access</span> Unlimited</p>
                                </li>
                            </ul>
                        </div><!-- .sp-plan-desc -->
                    </div><!-- .col -->
                    <div class="col-md-4">
                        <div class="sp-plan-action border-left bg-gray-100 h-100 d-flex align-items-center justify-content-center flex-column card-inner">
                            <div class="sp-plan-btn">
                                <a class="btn btn-primary" data-bs-toggle="modal" href="#subscription-change"><span>Change Plan</span></a>
                            </div>
                            <div class="sp-plan-note text-md-center mt-2">
                                <p>Next Billing on <span>Oct 11, 2020</span></p>
                            </div>
                        </div>
                    </div><!-- .col -->
                </div><!-- .row -->
            </div><!-- .sp-plan -->
            <div class="card card-bordered sp-plan">
                <div class="row no-gutters">
                    <div class="col-md-8">
                        <div class="sp-plan-info card-inner">
                            <div class="row gx-0 gy-3">
                                <div class="col-xl-9 col-sm-8">
                                    <div class="sp-plan-name">
                                        <h6 class="title"><a href="html/subscription/subscriptions-detail.html">Pro Plan <span class="badge bg-light rounded-pill">Expired</span></a></h6>
                                        <p>Subscription ID: <span class="text-base">100142725</span></p>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-sm-4">
                                    <div class="sp-plan-opt">
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="auto-plan-p2" disabled>
                                            <label class="custom-control-label text-soft" for="auto-plan-p2">Auto Renew</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!-- .sp-plan-info -->
                        <div class="sp-plan-desc card-inner">
                            <ul class="row gx-1">
                                <li class="col-6 col-lg-3">
                                    <p><span class="text-soft">Started On</span> Oct 12, 2017</p>
                                </li>
                                <li class="col-6 col-lg-3">
                                    <p><span class="text-soft">Recuring</span> Yes</p>
                                </li>
                                <li class="col-6 col-lg-3">
                                    <p><span class="text-soft">Price</span> $249.00</p>
                                </li>
                                <li class="col-6 col-lg-3">
                                    <p><span class="text-soft">Access</span> Up to 10 Members</p>
                                </li>
                            </ul>
                        </div><!-- .sp-plan-desc -->
                    </div><!-- .col -->
                    <div class="col-md-4">
                        <div class="sp-plan-action border-left bg-gray-100 h-100 d-flex align-items-center justify-content-center flex-column card-inner">
                            <div class="sp-plan-btn">
                                <a href="#" class="btn btn-dim btn-white btn-outline-primary"><span>Renew Plan</span></a>
                            </div>
                            <div class="sp-plan-note text-md-center mt-2">
                                <p>You can renew the plan anytime.</p>
                            </div>
                        </div>
                    </div><!-- .col -->
                </div><!-- .row -->
            </div><!-- .sp-plan -->
        </div><!-- .nk-block -->

    </div>
</template>

<script>
import md5 from 'md5'
import moment from 'moment-timezone'
import i18n from '@/utils/i18n'

const
    { validators } = window,
    { required, $label, maxLength, minLength, minValue } = validators
export default {
    name: 'index',
    data() {
        return {
            form: {
                new_password: null
            },
            requestLoading: false,
            showPassword: false,
            showError: false,
            showChangeDateConnect: false,
            date_connect: moment(new Date()).format('YYYY-MM-DD'),
            detail: {
                id: 12,
                code_bank: 29393939
            }
        }
    },
    validations() {
        const rules = {
            new_password: {
                required,
                $label: $label(this.$t('utilities.new_password')),
                minLength: minLength(8),
                maxLength: maxLength(32)
            }
        }
        return {
            form: rules
        }
    },
    methods: {
        showModal(name) {
            this.$refs[name].show()
        },
        hideModal(name) {
            this.resetForm()
            this.resetError()
            this.$refs[name].hide()
        },
        handleSubmit() {
            this.$v.form.$touch()
            const isError = this.$v.form.$error

            if (!isError) {
                const { new_password } = this.form
                let postData = {
                    new_password: md5(md5(new_password))
                }
                // this.requestLoading = true
            }
        },
        resetError() {
            this.showError = false
        },
        resetForm() {
            this.form.new_password = null
        },
        handleChangeDate() {
            if (!this.date_connect) return
        },
        getDetail() {
            this.detail = {
                id: 1
            }
        },
        handleDeleteAccount() {
            if (!this.detail.id) return
            this.$confirm(this.$i18n.t('message.confirm_delete_account', { code: this.detail.code_bank }), i18n.t('message.are_you_sure_delete'), {
                icon: 'warning',
                confirmButtonColor: '#1ee0ac',
                cancelButtonColor: '#d33',
                cancelButtonText: i18n.t('button.cancel'),
                confirmButtonText: i18n.t('button.delete'),
                input: 'text',
                inputPlaceholder: ''
            }).then(({ value }) => {
                if (value) {
                    this.$awnSuccess(this.$t('dialog.successfully'))
                }
            })
        },
        handleStopConnect() {
            if (!this.detail.id) return
            this.$confirm('Thao tác này sẽ tạm ngừng tài khoản của bạn, mọi phát sinh giao dịch mới của tài khoản này sẽ không tự động đồng bộ. Nếu như bạn muốn Đăng ký lại, bạn có thể thực hiện thao tác "Đăng ký nhận Biến động số dư" ở trên sau khi bạn hủy đăng ký thành công.', 'Bạn có thật sự muốn hủy đăng ký?', {
                icon: 'warning',
                confirmButtonColor: '#1ee0ac',
                cancelButtonColor: '#d33',
                cancelButtonText: i18n.t('button.cancel'),
                confirmButtonText: i18n.t('button.agree')
            }).then(({ value }) => {
                if (value) {
                    this.$awnSuccess(this.$t('dialog.successfully'))
                }
            })
        }
    }
}
</script>
<style scoped lang="scss">
:deep {
    .input-counter {
        display: none !important;
    }
}
</style>
