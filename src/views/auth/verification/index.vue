<template>
    <div class="login-wrapper px-4 border-radius-10">
        <div class="nk-block nk-block-middle nk-auth-body me-0">
            <div class="nk-block-head">
                <div class="nk-block-head-content text-center">
                    <h5 class="nk-block-title fs-22px">{{ $t('login.code') }}</h5>
                    <div class="nk-block-des">
                        <p>{{ $t('login.code_message') }}</p>
                    </div>
                </div>
            </div>

            <verification-from @backRegister="backRegister" @backLogin="backLogin"></verification-from>

        </div>
        <div class="nk-block nk-auth-footer text-center">
            <div class="mt-3">
                <p >&copy; 2022 ePayGate Agent. </p>
            </div>
        </div>
    </div>
</template>

<script>
import VerificationFrom from '@/views/auth/verification/_form'

export default {
    name: 'Forgot',
    components: { VerificationFrom },
    methods: {
        backRegister(val) {
            this.$emit('backRegister', val)
        },
        backLogin(val) {
            this.$emit('backLogin', val)
        }
    }
}
</script>

<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>