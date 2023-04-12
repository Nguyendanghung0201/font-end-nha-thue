<template>
    <div class="card-inner card-inner-lg">
        <div class="nk-block-head nk-block-head-lg pb-4">
            <div class="nk-block-between">
                <div class="nk-block-head-content">
                    <h4 class="nk-block-title">{{ $t('profile.change_password') }}</h4>
                </div>
            </div>
        </div>
        <div class="nk-block">
            <b-form @submit.prevent="" aria-autocomplete="off">
                <div class="border-bottom-0">
                    <b-form-group
                        label-class="form-label-group d-flex align-item-center"
                        :invalid-feedback="showHtmlError('password', 'form')"
                    >
                        <template #label>
                            <label class="form-label">
                                {{ getLabel('password', 'form', true) }}
                            </label>
                        </template>
                        <div class="form-control-wrap">
                            <span class="form-icon form-icon-right passcode-switch cursor" @click="showPassword = !showPassword">
                                <em class="passcode-icon icon-show icon ni ni-eye" v-if="!showPassword"></em>
                                <em class="passcode-icon icon-show icon ni ni-eye-off" v-else></em>
                            </span>
                            <b-form-input
                                :type="showPassword ? 'text' : 'password'"
                                v-model.trim="$v.form.password.$model"
                                autocomplete="off"
                                :placeholder="getLabel('password', 'form')"
                                :class="{'is-invalid':(showHtmlError('password', 'form'))}"
                                size="lg"
                            />
                        </div>
                    </b-form-group>
                </div>
                <div class="d-flex justify-content-between border-bottom-0 pt-0 pb-2 mt-3 flex-wrap flex-sm-nowrap input-fixed">
                    <b-form-group
                        class="me-sm-1 mb-0"
                        label-class="form-label-group"
                        :invalid-feedback="showHtmlError('new_password', 'form')"
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
                                v-model.trim="$v.form.new_password.$model"
                                autocomplete="off"
                                :placeholder="getLabel('new_password', 'form')"
                                :class="{'is-invalid':(showHtmlError('new_password', 'form'))}"
                                size="lg"
                            />
                        </div>
                        <span class="fs-12px mt-2" :class="{'d-none': (showHtmlError('new_password', 'form')), 'd-none': form.new_password !== null}">* {{ $t('message.password_format')}}</span>
                    </b-form-group>
                    <b-form-group
                        class="ms-sm-1 mb-0"
                        :invalid-feedback="showHtmlError('confirm_password', 'form')"
                        label-class="form-label-group"
                    >
                        <template #label>
                            <label class="form-label">
                                {{ getLabel('confirm_password', 'form', true) }}
                            </label>
                        </template>
                        <div class="form-control-wrap">
                            <span class="form-icon form-icon-right passcode-switch cursor" @click="showPassword = !showPassword">
                                <em class="passcode-icon icon-show icon ni ni-eye" v-if="!showPassword"></em>
                                <em class="passcode-icon icon-show icon ni ni-eye-off" v-else></em>
                            </span>
                            <b-form-input
                                :type="showPassword ? 'text' : 'password'"
                                v-model.trim="$v.form.confirm_password.$model"
                                autocomplete="off"
                                :placeholder="getLabel('confirm_password', 'form')"
                                :class="{'is-invalid':(showHtmlError('confirm_password', 'form'))}"
                                size="lg"
                            />
                        </div>
                    </b-form-group>
                </div>
                <div class="form-group text-end" :class="{'mt-0': (showHtmlError('confirm_password', 'form') || (showHtmlError('new_password', 'form'))),
                'mt-3': (!(showHtmlError('new_password', 'form')) && form.new_password != null && form.confirm_password === null) || (!(showHtmlError('confirm_password', 'form')) && form.confirm_password != null && form.new_password === null)
                || (!(showHtmlError('new_password', 'form')) && form.new_password != null && !(showHtmlError('confirm_password', 'form')) && form.confirm_password != null)}">
                    <b-button
                        size="md"
                        variant="success"
                        block
                        class="w-fit-content"
                        type="submit"
                        @click="showModal"
                        :disabled="true"
                 
                    >
                        {{ $t('login.change_password') }}
                    </b-button>
                </div>
            </b-form>
        </div>
        <b-modal ref="my-modal" hide-footer hide-header class="modal-sm">
            <div class="d-block text-left pb-3">
                <p class="fs-18px d-flex align-items-center lh-20"><em class="icon ni ni-info me-1 fs-20px"></em>{{ $t('message.change_password') }}</p>
            </div>
            <div class="d-flex align-items-center justify-content-end mt-2">
                <b-button class="w-fit-content" variant="outline-light" block @click="hideModal">{{ $t('button.cancel') }}</b-button>
                <b-button class="w-fit-content mt-0 ms-2" variant="success" block @click="handleSubmit">
                    <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />
                    <span class="visually-hidden">Loading...</span>
                    {{ $t('button.update') }}
                </b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import md5 from 'md5'
//     <!-- $v.form.$error || !form.password || !form.new_password || !form.confirm_password --> 
const
    { validators } = window,
    {required, $label, sameAs, minLength, maxLength, password } = validators

export default {
    name: 'changePasswordForm',
    metaInfo() {
        return {
            title: this.$t('menu.change_password')
        }
    },
    validations() {
        const rules = {
            password: {
                required,
                $label: $label(this.$t('profile.current_password')),
                minLength: minLength(8),
                maxLength: maxLength(32)
            },
            new_password: {
                required,
                password,
                $label: $label(this.$t('profile.new_password')),
                minLength: minLength(8),
                maxLength: maxLength(32)
            },
            confirm_password: {
                required,
                sameAs: sameAs('new_password'),
                $label: $label(this.$t('profile.confirm_password')),
                sameLabel: $label(this.$t('profile.new_password')),
                minLength: minLength(6),
                maxLength: maxLength(32)
            }
        }
        return {
            form: rules
        }
    },
    data() {
        return {
            form: {
                password: null,
                new_password: null,
                confirm_password: null,
            },
            showPassword: false,
            requestLoading: false
        }
    },
    methods: {
        handleSubmit() {
            this.$v.form.$touch()
            const isError = this.$v.form.$error
            if (!isError) {
                this.requestLoading = true

                if(this.form.password === this.form.new_password) {
                    this.hideModal()
                    this.requestLoading = false
                    this.$awnAlert(this.$t('message.not_same_password'))
                    return
                }
                const {
                    password,
                    new_password,
                    confirm_password
                } = this.form

                let postData = {
                    old_password: md5(md5(password)),
                    new_password: md5(md5(new_password)),
                    re_password: md5(md5(confirm_password))
                }

                this.$store.dispatch('Auth/updatePassword', postData).then((response) => {
                    if(!response.success) {
                        this.setFormError(e)
                        this.$awnAlert(this.$t('message.change_password_failed'))
                    }
                    this.$awnSuccess(this.$t('message.change_password_successfully'))
                    this.resetForm()
                    this.$v.$reset()

                    this.handleLogout()
                }).catch(e => {
                    this.setFormError(e)
                }).finally(() => {
                    this.hideModal()
                    this.requestLoading = false
                })
            }
        },
        resetForm() {
            this.form.password = null
            this.form.new_password = null
            this.form.confirm_password = null
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        handleLogout() {
            this.$store.dispatch('Auth/logout').then(() => {
                this.$router.push({ name: 'auth.login' })
            })
        },
        changeInfo() {
            this.$emit('changeInfo', 'INFO')
        }
    }
}
</script>
<style scoped lang="scss">
:deep{
    .input-counter {
        display: none !important;
    }
}
</style>
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>
