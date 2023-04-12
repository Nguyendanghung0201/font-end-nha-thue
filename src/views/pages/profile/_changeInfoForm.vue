<template>
    <div class="card-inner card-inner-lg">
        <template v-if="!isShow">
            <div class="nk-block-head nk-block-head-lg pb-4">
                <div class="nk-block-between">
                    <div class="nk-block-head-content">
                        <h4 class="nk-block-title">{{ $t('profile.personal_info') }}</h4>
                    </div>
                </div>
            </div><!-- .nk-block-head -->
            <div class="nk-block">
                <div v-if="user" class="nk-data data-list">
                    <div class="data-head">
                        <h6 class="overline-title">{{ $t('profile.basic') }}</h6>
                    </div>
                    <div class="data-item py-2 px-1 px-sm-2" data-toggle="modal" data-target="#profile-edit">
                        <div class="data-col">
                            <span class="data-label">{{ $t('profile.username') }}</span>
                            <div class="data-value">
                                <p class="line-1">{{ user.display_name || '- - - -' }}</p>
                            </div>
                        </div>
                        <div @click="isShow = !isShow" class="data-col data-col-end"><span class="data-more"><em
                                    class="icon ni ni-edit"></em></span></div>
                    </div><!-- data-item -->
                    <div class="data-item py-2 py-2 px-1 px-sm-2">
                        <div class="data-col">
                            <span class="data-label">{{ $t('profile.email') }}</span>
                            <span class="data-value">{{ user.email }}</span>
                        </div>
                        <div class="data-col data-col-end"><span class="data-more disable"><em
                                    class="icon ni ni-lock-alt"></em></span></div>
                    </div><!-- data-item -->
                    <div class="data-item py-2 py-2 px-1 px-sm-2" data-toggle="modal" data-target="#profile-edit">
                        <div class="data-col">
                            <span class="data-label">{{ $t('profile.phone') }}</span>
                            <span class="data-value text-soft">{{ user.phone }}</span>
                        </div>
                        <div @click="isShow = !isShow" class="data-col data-col-end"><span class="data-more"><em
                                    class="icon ni ni-edit"></em></span></div>
                    </div>
                    <div class="data-item py-2 py-2 px-1 px-sm-2" data-toggle="modal" data-target="#profile-edit"
                        data-tab-target="#address">
                        <div class="data-col">
                            <span class="data-label">{{ $t('profile.address') }}</span>
                            <div class="data-value">
                                <p class="line-2">{{ href + user.ref || '- - - -' }}</p>
                            </div>
                        </div>
                        <div @click="handcopy"
                            :class='copy ? "data-col data-col-end clipboard-success" : "data-col data-col-end"'><span class="data-more"><em
                                    class="icon ni ni-copy"></em></span></div>
                    </div>
                </div><!-- data-list -->
            </div>
        </template>
        <template v-else>
            <div class="nk-block-head nk-block-head-lg pb-4">
                <div class="nk-block-between">
                    <div class="nk-block-head-content">
                        <h4 class="nk-block-title">{{ $t('profile.change_information') }}</h4>
                    </div>
                    <div class="nk-block-head-content align-self-start d-lg-none">
                        <a href="#" class="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside">
                            <em class="icon ni ni-menu-alt-r"></em>
                        </a>
                    </div>
                </div>
            </div>
            <div class="nk-block">
                <b-form @submit.prevent="" aria-autocomplete="off">
                    <div class="d-flex justify-between border-bottom-0 py-0 input-fixed">
                        <b-form-group class="flex-grow-1 me-1" label-class="form-label-group d-flex align-item-center"
                            :invalid-feedback="showHtmlError('username', 'form')">
                            <template #label>
                                <label class="form-label">
                                    {{ getLabel('username', 'form', true) }}
                                </label>
                            </template>
                            <div class="form-control-wrap">
                                <b-form-input type="text" v-model.trim="$v.form.username.$model" autocomplete="off"
                                    :placeholder="getLabel('username', 'form')"
                                    :class="{ 'is-invalid': (showHtmlError('username', 'form')) }"
                                    :counter="getInputMaxLength('username', 'form')" size="lg" />
                            </div>
                        </b-form-group>

                        <b-form-group class="flex-grow-1 ms-1" :invalid-feedback="showHtmlError('phone', 'form')"
                            label-class="form-label-group">
                            <template #label>
                                <label class="form-label">
                                    {{ getLabel('phone', 'form', true) }}
                                </label>
                            </template>
                            <div class="form-control-wrap">
                                <b-form-input type="text" v-model.trim="$v.form.phone.$model" autocomplete="off"
                                    :placeholder="getLabel('phone', 'form')"
                                    :class="{ 'is-invalid': (showHtmlError('phone', 'form')) }" size="lg" />
                            </div>
                            <span v-if="isMaxPhone && !(showHtmlError('phone', 'form'))" class="text-danger mt-1 fs-12px">{{
                                $t('message.phone_error') }}</span>
                        </b-form-group>
                    </div>
                    <div class="d-flex justify-content-between border-bottom-0 py-0">
                        <b-form-group class="flex-grow-1 me-1" label-class="form-label-group"
                            :invalid-feedback="showHtmlError('address', 'form')">
                            <template #label>
                                <label class="form-label">
                                    {{ getLabel('address', 'form', true) }}
                                </label>
                            </template>
                            <div class="form-control-wrap">
                                <b-form-input type="text" v-model.trim="$v.form.address.$model" autocomplete="off"
                                    :placeholder="getLabel('address', 'form')"
                                    :class="{ 'is-invalid': (showHtmlError('address', 'form')) }"
                                    :counter="getInputMaxLength('address', 'form')" size="lg" />
                            </div>
                        </b-form-group>
                    </div>
                    <div class="border-bottom-0 pt-4">
                        <div class="form-group d-flex justify-content-end align-items-stretch">
                            <b-button class="me-1 w-fit-content" size="md" variant="outline-light" block
                                @click="returnInfo">
                                <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />
                                <span class="visually-hidden">Loading...</span>
                                {{ $t('button.return') }}
                            </b-button>
                            <b-button class="ms-1 w-fit-content" size="md" variant="success mt-0" block type="submit"
                                @click="showModal"
                                :disabled="requestLoading || $v.form.$error || !form.phone || !form.username || !form.address || isMaxPhone">
                                {{ $t('button.update') }}
                            </b-button>
                        </div>
                    </div>
                </b-form>
            </div>
            <b-modal ref="my-modal" hide-footer hide-header class="modal-sm">
                <div class="d-block text-left pb-3">
                    <p class="fs-18px d-flex align-items-center lh-20">{{ $t('message.change_info_confirm') }}</p>
                </div>
                <div class="d-flex align-items-center justify-content-end mt-2">
                    <b-button class="w-fit-content" variant="outline-light" block @click="hideModal">{{ $t('button.cancel')
                    }}</b-button>
                    <b-button class="w-fit-content mt-0 ms-2" variant="success" block @click="handleSubmit">
                        <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />
                        <span class="visually-hidden">Loading...</span>
                        {{ $t('button.update') }}
                    </b-button>
                </div>
            </b-modal>
        </template>
    </div>
</template>

<script>
import Datepicker from 'vue2-datepicker'
const
    { validators } = window,
    { email, required, isPhone, $label, sameAs, minLength, maxLength, numeric } = validators

export default {
    name: 'changeInfoForm',
    validations() {

        const rules = {
            username: {
                required,
                $label: $label(this.$t('profile.username')),
                minLength: minLength(6),
                maxLength: maxLength(50)
            },
            phone: {
                required,
                isPhone,
                $label: $label(this.$t('profile.phone')),
                minLength: minLength(10)
            },
            address: {
                required,
                $label: $label(this.$t('profile.address')),
                minLength: minLength(10),
                maxLength: maxLength(200)
            },
        }
        return {
            form: rules
        }
    },
    data() {
        return {
            href: window.location.origin + '/auth/register?ref=',
            copy: false,
            form: {
                username: null,
                phone: null,
                address: null,
            },
            isMaxPhone: false,
            requestLoading: false,
            isShow: false
        }
    },
    components: { Datepicker },
    methods: {
        checkInfo() {
            this.$store.dispatch('Auth/info').catch((e) => {
                this.$awn.alert(this.$t('auth.loginRequired'))
            }).then((response) => {

            })
        },
        handcopy() {
            this.copy = true

            navigator.clipboard.writeText(this.href + this.user.ref).then(function () {
                console.log("Đã sao chép: " + 'textToCopy');
            }, function () {
                console.error("Lỗi khi sao chép: " + 'textToCopy');
            });

        },
        handleSubmit() {
            this.$v.form.$touch()
            const isError = this.$v.form.$error
            if (!isError) {
                this.requestLoading = true

                const {
                    username,
                    phone,
                    address
                } = this.form

                let postData = {
                    username,
                    phone,
                    address
                }

                this.$store.dispatch('Auth/update', postData).then((response) => {
                    this.$awnSuccess(this.$t('message.change_info_successfully'))
                    this.isShow = false
                    this.checkInfo()
                    this.hideModal()
                }).catch(e => {
                    if (e.code === 900) {
                        this.$awnAlert(this.$t('message.phone_invalid'))
                    } else {
                        this.$awnAlert(this.$t('message.change_info_failed'))
                    }
                    this.hideModal()
                }).finally(() => {
                    this.requestLoading = false
                })
            }
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        changePassword() {
            this.$emit('changePassword', 'PASSWORD')
        },
        returnInfo() {
            this.isShow = false
            this.form.username = this.user.username
            this.form.phone = this.user.phone
            this.form.address = this.user.address
            this.$v.$reset()
        }
    },
    computed: {
        user() {
            return this.$store.getters['Auth/user']
        },
        depDisable() {
            return { from: new Date() }
        }
    },
    watch: {
        'user': {
            immediate: true,
            deep: true,
            handler(newVal) {
                if (newVal) {
                    this.form.username = this.user.username
                    this.form.phone = this.user.phone
                    this.form.address = this.user.address
                }
            }
        },
        'form.phone'(newVal) {
            if (newVal) {
                let length = newVal.split('').length
                if (length > 20) {
                    this.isMaxPhone = true
                } else {
                    this.isMaxPhone = false
                }
            }
        },
    }
}
</script>
<style scoped lang="scss">
:deep {
    .input-counter {
        display: none !important;
    }

    .data-label {
        width: 150px;
        max-width: 100%;
        flex-shrink: 0;
    }
}
</style>
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>
