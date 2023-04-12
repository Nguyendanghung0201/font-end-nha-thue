<template>
    <div>
        <div class="nk-ibx-head">
            <div class="nk-ibx-head-actions">
                <h6>{{ $t('utilities.my_detail_service')}}</h6>
            </div>
            <div>
                <ul class="nk-ibx-head-tools g-1">
                    <li @click="showSubSidebar" class="me-n1 d-lg-none"><a href="#" class="btn btn-trigger btn-icon toggle" data-target="inbox-aside"><em class="icon ni ni-menu-alt-r"></em></a></li>
                </ul>
            </div>
        </div><!-- .nk-ibx-head -->
        <div class="nk-block py-3">
            <div class="row align-items-center justify-content-between w-100 c-m-sm-0">
                <div class="col-md-6 col-xl-4">
                    <div class="nk-block">
                        <div class="bank-card bank-card-sm position-relative w-100">
                            <div class="bank-info d-flex flex-column align-items-start justify-content-between h-100">
                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <span class="bank-name fs-20px fw-600 text-white">ACB</span>
                                    <span class="badge bg-outline-success ms-3">Kết nối</span>
                                </div>
                                <div class="d-flex align-items-center mt-2">
                                    <div class="bank-chip">
                                        <span class="line-1"></span>
                                        <span class="line-2"></span>
                                        <span class="line-3"></span>
                                        <span class="line-4"></span>
                                        <span class="line-5"></span>
                                    </div>
                                    <b-img
                                        :src="require('@/assets/images/svg/Wave.svg')"></b-img>
                                </div>
                                <div>
                                    <span class="account_number fw-600 text-white line-1">228822888</span>
                                    <span class="account_name fw-600 text-white text-uppercase">Huynh Thanh Tung</span>
                                </div>
                            </div>
                        </div>
                    </div><!-- .nk-block -->
                </div><!-- .col -->
                <div class="col-md-6 col-xl-4">
                    <div class="profile-ud-list py-3 py-md-0 px-md-4">
                        <div class="profile-ud-item w-100">
                            <div class="profile-ud wider">
                                <span class="profile-ud-label">{{ $t('menu.bank') }}</span>
                                <span class="profile-ud-value">ACB</span>
                            </div>
                        </div>
                        <div class="profile-ud-item w-100">
                            <div class="profile-ud wider">
                                <span class="profile-ud-label">{{ $t('service.account') }}</span>
                                <span class="profile-ud-value">220202929</span>
                            </div>
                        </div>
                        <div class="profile-ud-item w-100">
                            <div class="profile-ud wider">
                                <span class="profile-ud-label">{{ $t('login.password') }}</span>
                                <span class="profile-ud-value">******
                                    <em @click="showModal('modalChangePassword')" class="icon ni ni-edit fs-18px ms-1 cursor-pointer text-success"></em>
                                </span>
                            </div>
                        </div>
                        <div class="profile-ud-item w-100">
                            <div class="profile-ud wider">
                                <span class="profile-ud-label">{{ $t('service.status') }}</span>
                                <span class="profile-ud-value text-success">Kết nối</span>
                            </div>
                        </div>
                    </div>
                </div><!-- .col -->
                <div class="col-md-12 ms-md-auto ms-xl-0 ps-3 ps-md-40 ps-xl-0 col-xl-4">
                    <div class="card card-bordered">
                        <div class="card-inner">
                            <div class="nk-block-head nk-block-head-line">
                                <h6 class="title overline-title text-base">{{ $t('bank.status_bank_account')}}</h6>
                            </div>
                            <div class="profile-ud-list">
                                <div class="profile-ud-item w-100">
                                    <div class="profile-ud wider">
                                        <span class="profile-ud-label">{{ $t('bank.status')}}</span>
                                        <span class="profile-ud-value text-success">Đang hoạt động</span>
                                    </div>
                                </div>
                                <div class="profile-ud-item w-100">
                                    <div class="profile-ud wider">
                                        <span class="profile-ud-label nowrap">{{ $t('bank.lastest_active')}}</span>
                                        <span class="profile-ud-value">Vài giây trước</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- .col -->
            </div><!-- .row -->
            <div class="mt-3 px-3 px-md-4">
                <div class="card card-bordered">
                    <div class="d-flex flex-column flex-md-row align-items-stretch">
                        <div class="card-inner card-info">
                            <div class="card-title-group align-start mb-0">
                                <div class="card-title">
                                    <h6 class="subtitle">{{ $t('bank.initial_balance')}}</h6>
                                </div>
                            </div>
                            <div class="card-amount">
                                <span class="amount"> 49,595.34
                                    <span class="currency currency-usd">USD</span>
                                </span>
                            </div>
                            <div class="invest-data mt-2">
                                <div class="invest-data-amount g-2">
                                    <div class="invest-data-history">
                                        <div class="title">{{ $t('bank.start_conect')}}</div>
                                        <div class="amount">28/12/2022
                                            <span class="currency currency-usd">(12 ngày)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-inner card-info">
                            <div class="card-title-group align-start mb-0">
                                <div class="card-title">
                                    <h6 class="subtitle"> {{ $t('bank.current_balance')}}</h6>
                                </div>
                            </div>
                            <div class="card-amount">
                                <span class="amount"> 49,595.34
                                    <span class="currency currency-usd">USD</span>
                                </span>
                            </div>
                            <div class="invest-data mt-2">
                                <div class="invest-data-amount g-2">
                                    <div class="invest-data-history">
                                        <div class="title">{{ $t('bank.lastest_trade')}}</div>
                                        <div class="amount">26/12/2022
                                            <span class="currency currency-usd">(2 ngày)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-inner card-info">
                            <div class="card-title-group align-start mb-0">
                                <div class="card-title">
                                    <h6 class="subtitle">{{ $t('bank.total_trasaction')}}</h6>
                                </div>
                            </div>
                            <div class="card-amount">
                                <span class="amount"> 12
                                </span>
                            </div>
                            <div class="invest-data mt-2">
                                <div class="invest-data-amount g-2">
                                    <div class="invest-data-history">
                                        <div class="title">{{ $t('bank.total_value')}}</div>
                                        <div class="amount">2,940.59
                                            <span class="currency currency-usd">USD</span>
                                        </div>
                                    </div>
                                    <div class="invest-data-history">
                                        <div class="title">{{ $t('bank.status')}}</div>
                                        <div class="amount text-success">Khớp</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row px-4 mt-5">
                <div class="col-md-6 col-12">
                    <div class="timeline">
                        <h6 class="text-dark mb-4">{{ $t('bank.setting_bank')}}</h6>
                        <ul class="timeline-list">
                            <li class="timeline-item">
                                <div class="timeline-status bg-primary is-outline"></div>
                                <div class="timeline-data">
                                    <h6 @click="showModal('modalChangeDate')"
                                        class="timeline-title cursor-pointer text-primary">{{ $t('bank.setting_bank1')}}</h6>
                                </div>
                            </li>
                            <li class="timeline-item">
                                <div class="timeline-status bg-primary"></div>
                                <div class="timeline-data">
                                    <h6 class="timeline-title cursor-pointer text-primary">{{ $t('bank.setting_bank2')}}</h6>
                                </div>
                            </li>
                            <li class="timeline-item">
                                <div class="timeline-status bg-pink"></div>
                                <div class="timeline-data">
                                    <h6 class="timeline-title cursor-pointer text-primary">{{ $t('bank.setting_bank3')}}</h6>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-6 col-12">
                    <div class="timeline pt-4 pt-md-0">
                        <h6 class="text-dark mb-4">{{ $t('bank.setting_bank_more')}}</h6>
                        <ul class="timeline-list">
                            <li class="timeline-item">
                                <div class="timeline-status bg-primary is-outline"></div>
                                <div class="timeline-data">
                                    <h6 @click="handleStopConnect" class="timeline-title cursor-pointer text-primary">{{ $t('bank.setting_bank4')}}</h6>
                                </div>
                            </li>
                            <li class="timeline-item">
                                <div class="timeline-status bg-primary"></div>
                                <div class="timeline-data">
                                    <h6 @click="handleDeleteAccount" class="timeline-title cursor-pointer text-primary">{{ $t('bank.setting_bank5')}}</h6>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div><!-- .nk-block -->

        <!-- Change new password -->
        <b-modal ref="modalChangePassword" hide-footer hide-header dialog-class="modal-xs">
            <div class="d-flex justify-content-center flex-column align-items-center pb-3 text-dark">
                <p class="fs-18px d-flex mx-auto lh-20 fw-bold">Ngân hàng ACB</p>
                <p class="d-flex mx-auto lh-20 mt-2">Số tài khoản: 22020022</p>
            </div>
            <form @submit.prevent="handleSubmit">
                <b-form-group
                    class="mb-2"
                    :invalid-feedback="showHtmlError('new_password', 'form')"
                    label-class="form-label-group"
                >
                    <template #label>
                        <label class="form-label">
                            {{ getLabel('new_password', 'form', true) }}
                        </label>
                    </template>
                    <div class="form-control-wrap">
                        <span class="form-icon form-icon-right passcode-switch cursor" @click="showPassword = !showPassword">
                            <em class="passcode-icon icon-show icon ni ni-eye" v-if="!showPassword"></em>
                            <em class="passcode-icon icon-show icon ni ni-eye-off" v-else></em>
                        </span>
                        <b-form-input
                            :type="showPassword ? 'text' : 'password'"
                            v-model="$v.form.new_password.$model"
                            @keyup="resetError"
                            :class="{'is-invalid':(showHtmlError('new_password', 'form'))}"
                            :placeholder="getLabel('new_password', 'form')"
                            :counter="getInputMaxLength('new_password', 'form')"
                            size="lg"
                        />
                    </div>
                </b-form-group>
                <div class="form-group text-right mt-4">
                    <b-button class="w-fit-content" variant="outline-light" block @click="hideModal('modalChangePassword')">{{ $t('button.cancel') }}</b-button>
                    <b-button class="w-fit-content mt-0 ms-2"
                              variant="success"
                              :disabled="requestLoading || $v.form.$error || !form.new_password"
                              block>
                        <!--                    <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />-->
                        <span class="visually-hidden">Loading...</span>
                        {{ $t('bank.change_password') }}
                    </b-button>
                </div>
            </form>
        </b-modal>

        <!-- Change date connect -->
        <b-modal ref="modalChangeDate" hide-footer hide-header dialog-class="modal-xs">
            <div class="d-flex justify-content-center flex-column align-items-center pb-3 text-dark">
                <p class="fs-18px d-flex mx-auto lh-20 fw-bold">{{ $t('bank.setting_bank1')}}</p>
                <p class="d-flex mx-auto lh-20 d-flex align-items-start">
                    <em class="icon ni ni-alert-circle me-1 mt-2px fs-16px"></em>
                    {{ $t('message.note_change_date')}}
                </p>
            </div>
            <form @submit.prevent="handleChangeDate">
                <date-picker
                    class="c-datepicker w-100"
                    v-model="date_connect"
                    valueType="format">
                </date-picker>
                <div class="form-group text-right mt-4">
                    <b-button class="w-fit-content" variant="outline-light" block @click="hideModal('modalChangeDate')">{{ $t('button.cancel') }}</b-button>
                    <b-button class="w-fit-content mt-0 ms-2"
                              variant="success"
                              :disabled="requestLoading || !date_connect"
                              block>
                        <!--                    <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />-->
                        <span class="visually-hidden">Loading...</span>
                        {{ $t('button.save_change') }}
                    </b-button>
                </div>
            </form>
        </b-modal>
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
            detail:  {
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
                    new_password: md5(md5(new_password)),
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
            if(!this.date_connect) return
        },
        getDetail() {
            this.detail = {
                id: 1
            }
        },
        handleDeleteAccount() {
            if (!this.detail.id) return
            this.$confirm(this.$i18n.t('message.confirm_delete_account',{code: this.detail.code_bank}), i18n.t('message.are_you_sure_delete'), {
                icon: 'warning',
                confirmButtonColor: '#1ee0ac',
                cancelButtonColor: '#d33',
                cancelButtonText: i18n.t('button.cancel'),
                confirmButtonText: i18n.t('button.delete'),
                input: 'text',
                inputPlaceholder: '',
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
                confirmButtonText: i18n.t('button.agree'),
            }).then(({ value }) => {
                if (value) {
                    this.$awnSuccess(this.$t('dialog.successfully'))
                }
            })
        },
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
