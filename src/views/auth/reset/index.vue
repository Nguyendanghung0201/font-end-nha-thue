<template>
    <div class="login-wrapper px-4 border-radius-10">
        <div class="nk-block nk-block-middle nk-auth-body me-0">
            <div class="nk-block-head">
                <div class="nk-block-head-content text-center">
                    <h5 class="nk-block-title fs-22px">{{ $t('login.reset_password') }}</h5>
                    <div class="nk-block-des">
                        <p>{{ $t('login.remind_message') }}</p>
                    </div>
                </div>
            </div><!-- .nk-block-head -->

            <reset-form @backLogin="handleBackLogin" @backForgot="handleBackForgot"></reset-form>

        </div><!-- .nk-block -->
        <div class="nk-block nk-auth-footer text-center">
            <!--            <div class="nk-block-between justify-content-center">-->
            <!--                <ul class="nav nav-sm">-->
            <!--                    <li class="nav-item">-->
            <!--                        <a class="nav-link" href="#">Terms & Condition</a>-->
            <!--                    </li>-->
            <!--                    <li class="nav-item">-->
            <!--                        <a class="nav-link" href="#">Privacy Policy</a>-->
            <!--                    </li>-->
            <!--                    <li class="nav-item">-->
            <!--                        <a class="nav-link" href="#">Help</a>-->
            <!--                    </li>-->
            <!--                </ul>&lt;!&ndash; .nav &ndash;&gt;-->
            <!--            </div>-->
            <div class="mt-3">
                <p >&copy; 2022 ePayGate Agent. </p>
            </div>
        </div><!-- .nk-block -->
    </div><!-- .nk-split-content -->
</template>

<script>
import ResetForm from '@/views/auth/reset/_form'

export default {
    name: 'Reset',
    components: { ResetForm },
    methods: {
        handleBackLogin(val) {
            this.$emit('backLogin', val)
        },
        handleBackForgot(val) {
            this.$emit('backForgot', val)
        }
    }
}
</script>

<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>