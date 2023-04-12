<template>
    <b-form @submit.prevent="handleSubmit" aria-autocomplete="off">
        <b-form-group label-class="form-label-group" :invalid-feedback="showHtmlError('code', 'form')">
            <template #label>
                <label class="form-label">
                    {{ getLabel('code', 'form', true) }}
                </label>
            </template>
            <div class="form-control-wrap">
                <b-form-input id="code-input" type="number" v-model.trim="$v.form.code.$model" autocomplete="off"
                    :placeholder="getLabel('code', 'form')" :class="{ 'is-invalid': (showHtmlError('code', 'form')) }"
                    size="lg" />
            </div>
        </b-form-group>
        <b-form-group label-class="form-label-group" :invalid-feedback="showHtmlError('password', 'form')">
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
                <b-form-input :type="showPassword ? 'text' : 'password'" v-model.trim="$v.form.password.$model"
                    autocomplete="off" :placeholder="getLabel('password', 'form')"
                    :class="{ 'is-invalid': (showHtmlError('password', 'form')) }" size="lg" />
            </div>
            <span class="fs-12px mt-2"
                :class="{ 'd-none': (showHtmlError('password', 'form')), 'd-none': form.password !== null }">* {{
                    $t('message.password_format') }}</span>
        </b-form-group>
        <b-form-group class="mb-3" :invalid-feedback="showHtmlError('new_password', 'form')" label-class="form-label-group">
            <template #label>
                <label class="form-label">
                    {{ getLabel('new_password', 'form', true) }}
                </label>
            </template>
            <div class="form-control-wrap">
                <span class="form-icon form-icon-right passcode-switch cursor"
                    @click="showConfirmPassword = !showConfirmPassword">
                    <em class="passcode-icon icon-show icon ni ni-eye" v-if="!showPassword"></em>
                    <em class="passcode-icon icon-show icon ni ni-eye-off" v-else></em>
                </span>
                <b-form-input :type="showPassword ? 'text' : 'password'" v-model.trim="$v.form.new_password.$model"
                    autocomplete="off" :placeholder="getLabel('new_password', 'form')"
                    :class="{ 'is-invalid': (showHtmlError('new_password', 'form')) }" size="lg" />
            </div>
        </b-form-group>
        <p @click="backLogin" class="link link-primary fs-14px cursor-pointer w-100 d-flex justify-content-end mb-4">
            {{ $t('login.return_login') }}
        </p>
        <div class="form-group">
            <b-button size="lg" variant="primary" block type="submit"
                :disabled="requestLoading || $v.form.$error || !form.code || !form.password || !form.new_password">
                <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />
                <span class="visually-hidden">Loading...</span>
                {{ $t('login.reset_password') }}
            </b-button>
        </div>
    </b-form>
</template>

<script>
import md5 from 'md5'

const
    { validators } = window,
    { email, required, phone, $label, sameAs, minLength, maxLength, numeric, password } = validators
export default {
    name: 'LoginForm',
    validations() {
        const rules = {
            code: {
                required,
                numeric,
                minLength: minLength(6),
                $label: $label(this.$t('utilities.verification_code')),
            },
            password: {
                required,
                password,
                $label: $label(this.$t('utilities.new_password')),
                minLength: minLength(8),
                maxLength: maxLength(32)
            },
            new_password: {
                required,
                sameAs: sameAs('password'),
                $label: $label(this.$t('utilities.confirm_password')),
                sameLabel: $label(this.$t('utilities.new_password')),
                minLength: minLength(8),
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
                code: null,
                new_password: null,
                password: null
            },
            showPassword: false,
            showConfirmPassword: false,
            requestLoading: false
        }
    },
    mounted() {
        this.resetForm()
    },
    methods: {
        handleSubmit() {
            this.$v.form.$touch()
            const isError = this.$v.form.$error
            if (!isError) {
                this.requestLoading = true

                const {
                    code,
                    new_password,
                    password,
                } = this.form

                let postData = {
                    code,
                    password: md5(md5(password)),
                    confirm_password: md5(md5(new_password)),
                }

                this.$store.dispatch('Auth/forgot', postData).then((response) => {
                    this.$awnSuccess(this.$t('message.change_password_successfully'))
                    this.$emit('backLogin', false)

                })
            }
        },
        backLogin() {
            this.$emit('backLogin', false)
        },
        resetForm() {
            this.form.code = null
            this.form.new_password = null
            this.form.password = null
        }
    }
}
</script>
<style scoped lang="scss">
:deep {
    .input-counter {
        display: none !important;
    }

    input#code-input:-webkit-autofill {
        -webkit-text-fill-color: #B6C5E3 !important;
    }
}
</style>
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>