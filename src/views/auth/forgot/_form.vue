<template>
    <b-form @submit.prevent="" autocomplete="off">
        <b-form-group
            :invalid-feedback="showHtmlError('email', 'form')"
            label-class="form-label-group"
        >
            <template #label>
                <label class="form-label">
                    {{ getLabel('email', 'form', true) }}
                </label>
            </template>
            <b-form-input
                v-model.trim="$v.form.email.$model"
                :placeholder="getLabel('email', 'form')"
                :class="{'is-invalid':(showHtmlError('email', 'form'))}"
                autocomplete="off"
                type="email"
                ref="autofocus"
                :counter="getInputMaxLength('email', 'form')"
                size="lg"
            />
        </b-form-group>
        <div class="form-group">
            <b-button
                size="lg"
                variant="primary"
                block
                type="submit"
                @click="handleSubmit"
                :disabled="requestLoading || $v.form.$error || !form.email"
            >
                <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />
                <span class="visually-hidden">Loading...</span>
                {{ $t('login.get_verification_code') }}
            </b-button>
        </div>
        <p @click="backLogin" class="link link-primary fs-14px cursor-pointer w-100 d-flex justify-content-end">
            {{ $t('login.return_login') }}
        </p>
    </b-form>
</template>

<script>

const
    { validators } = window,
    { email, required, phone, $label, maxLength } = validators
export default {
    name: 'ForgotForm',
    validations() {
        const rules = {
            email: {
                required,
                email,
                $label: $label(this.$t('login.email')),
                maxLength: maxLength(50)
            }
        }
        return {
            form: rules
        }
    },
    data() {
        return {
            form: {
                email: null
            },
            requestLoading: false
        }
    },
    methods: {
        handleSubmit() {
            this.$v.form.$touch()
            const isError = this.$v.form.$error
            if (!isError) {
                this.requestLoading = true
                let postData = { email: this.form.email }

        
                    this.$store.dispatch('Auth/checkEmail', postData).then((response) => {
                        this.$store.dispatch('Auth/confirm', postData).then((response) => {
                            this.$awnSuccess(this.$t('message.email_check'))
                            this.$emit('resetPassword', true)
                        }).catch(e => {
                            this.setFormError(e)
                            this.$emit('backLogin', false)
                            this.requestLoading = false
                        })
                    }).catch(e => {
                        this.setFormError(e)
                        this.$emit('backLogin', false)
                        this.requestLoading = false
                    })
            }
        },
        backLogin() {
            this.$emit('backLogin', false)
            this.$router.push({ name: 'auth.login' })
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
