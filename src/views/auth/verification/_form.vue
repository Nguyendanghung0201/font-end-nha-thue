<template>
    <b-form @submit.prevent="handleSubmit" autocomplete="off">
        <b-form-group
            :invalid-feedback="showHtmlError('code', 'form')"
            label-class="form-label-group"
        >
            <template #label>
                <label class="form-label">
                    {{ getLabel('code', 'form', true) }}
                </label>
            </template>
            <b-form-input
                v-model.trim="$v.form.code.$model"
                :placeholder="getLabel('code', 'form')"
                :class="{'is-invalid':(showHtmlError('code', 'form'))}"
                autocomplete="off"
                type="number"
                ref="autofocus"
                size="lg"
            />
        </b-form-group>
        <div class="form-group">
            <b-button
                size="lg"
                variant="primary"
                block
                type="submit"
                :disabled="requestLoading || $v.form.$error || !form.code"
            >
                <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />
                <span class="visually-hidden">Loading...</span>
                {{ $t('button.confirm') }}
            </b-button>
        </div>
        <p @click="backRegister" class="link link-primary fs-13px cursor-pointer w-100 d-flex justify-content-end">
            {{ $t('login.return_register') }}
        </p>
    </b-form>
</template>

<script>
import md5 from 'md5'

const
    { validators } = window,
    { required, $label, minLength } = validators
export default {
    name: 'VerificationForm',
    validations() {
        const rules = {
            code: {
                required,
                $label: $label(this.$t('login.code')),
                minLength: minLength(6)
            }
        }
        return {
            form: rules
        }
    },
    data() {
        return {
            form: {
                code: null
            },
            requestLoading: false,
            count: 0
        }
    },
    methods: {
        handleSubmit() {
            this.$v.form.$touch()
            const isError = this.$v.form.$error
            if (!isError) {
                this.$v.form.$touch()
                const isError = this.$v.form.$error
                if (!isError) {
                    let json = localStorage.getItem('REGISTER_INFO')
                    let info = JSON.parse(json)

                    let postData = {
                        email: info.email,
                        password: md5(md5(info.password)),
                        code: this.form.code,
                        phone: info.phone
                    }

                    this.requestLoading = true

                    this.$store.dispatch('Auth/register', postData).then((response) => {
                        this.$awnSuccess(this.$t('message.signup_successfully'))
                        this.$emit('backLogin', false)
                    }).catch(e => {
                        if (e.code === 506) {
                            this.$awnAlert(this.$t('message.code_error'))
                        } else {
                            this.$awnAlert(this.$t('message.code_incorrect'))
                        }
                        this.count++
                        if (+this.count === 5) {
                            this.$emit('backRegister', false)
                        }
                    }).finally(() => {
                        this.requestLoading = false
                    })
                }
            }
        },
        backRegister() {
            this.$emit('backRegister', false)
            this.$router.push({ name: 'auth.register' })
        }
    }
}
</script>
