<template>
    <div class="login-wrapper px-4 border-radius-10">
        <div class="nk-block nk-block-middle nk-auth-body">
            <div class="nk-block-head">
                <div class="nk-block-head-content text-center">
                    <h5 class="nk-block-title fs-22px">{{ $t('login.forgot_password') }}</h5>
                    <div class="nk-block-des">
                        <p>{{ $t('login.forgot_message') }}</p>
                    </div>
                </div>
            </div>

            <forgot-form @backLogin="handleBackLogin" @resetPassword="handleReset"></forgot-form>

        </div>
        <div class="nk-block nk-auth-footer text-center">
            <div class="mt-3">
                <p >&copy; 2022 ePayGate Agent. </p>
            </div>
        </div>
    </div>
</template>

<script>
import ForgotForm from '@/views/auth/forgot/_form'

export default {
    name: 'Forgot',
    components: { ForgotForm },
    methods: {
        handleBackLogin(val) {
            this.$emit('backLogin', val)
        },
        handleReset(val) {
            this.$emit('resetPassword', val)
        }
    }
}
</script>

