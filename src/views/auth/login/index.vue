<template>
  <div>
    <!-- <div class="auth-block d-flex justify-content-start flex-column align-items-center">
            <div class="brand-logo d-flex align-items-center justify-content-center pb-4">
                <a href="/" class="logo-link d-flex align-items-center justify-content-center">
                    <div class="d-flex align-items-center text-white">
                        <em class="icon ni ni-package-fill fs-26px me-1"></em>
                        <span class="fs-26px fw-bold text-red text-nowrap">Real - House</span>
                    </div>
                </a>
            </div>
            <div v-if="!showForgotPasswordForm && !showResetPasswordForm && !showRegister && !showConfirm" class="login-wrapper px-4 border-radius-10">
                <div class="nk-block nk-block-middle nk-auth-body mr-0">
                    <div class="nk-block-head">
                        <div class="nk-block-head-content text-center">
                            <h5 class="nk-block-title fs-22px">{{ $t('login.login') }}</h5>
                            <div class="nk-block-des">
                                <p>{{ $t('login.login_subtitle') }}</p>
                            </div>
                        </div>
                    </div>
                  
                    <login-form @forgotPassword="handleForgot" @register="handleRegister"></login-form>

                </div>
                <div class="nk-block nk-auth-footer text-center">
                    <div class="mt-3">
                        <p>&copy; 2022 ePayGate Agent.</p>
                    </div>
                </div>
            </div>

            <register v-if="showRegister" @backLogin="handleBackLogin" @confirm="handleConfirm"></register>

            <verification v-if="showConfirm" @backRegister="handleBackRegister" @backLogin="handleBackLogin"></verification>
            <forgot v-if="showForgotPasswordForm && !showResetPasswordForm" @backLogin="handleBackLogin" @resetPassword="handleReset" />
            <reset @backLogin="handleBackLogin" @backForgot="handleBackForgot" v-if="!showForgotPasswordForm && showResetPasswordForm"></reset>
        </div> -->

    <div class="nk-split nk-split-page nk-split-md flex-direction-reverse">
      <login-form
        v-if="
          !showForgotPasswordForm &&
          !showResetPasswordForm &&
          !showRegister &&
          !showConfirm
        "
        @forgotPassword="handleForgot"
        @register="handleRegister"
      ></login-form>
      <register
        v-if="showRegister"
        @backLogin="handleBackLogin"
        @confirm="handleConfirm"
      ></register>

      <!-- .nk-split-content -->
      <div class="nk-split-content nk-split-stretch bg-abstract"></div>
      <!-- .nk-split-content -->
    </div>
    <!-- .nk-split -->
  </div>
</template>

<script>
import LoginForm from "@/views/auth/login/_form";
import Forgot from "@/views/auth/forgot/index";
import Reset from "@/views/auth/reset/index";
import Register from "@/views/auth/register/index";
import Verification from "@/views/auth/verification/index";
import i18n from "@/utils/i18n";

export default {
  name: "Login",
  components: { LoginForm, Forgot, Reset, Register, Verification },
  data() {
    return {
      showForgotPasswordForm: false,
      showResetPasswordForm: false,
      showRegister: false,
      showConfirm: false,
      ok: true,
      router: this.$route.name || "auth.login",
    };
  },
  methods: {
    checkInfo() {
      this.$store
        .dispatch("Auth/info")
        .catch((e) => {
          console.log(e.statusCode);
          this.$awn.alert(this.$t("auth.loginRequired"));
        })
        .then((response) => {
          console.log(response);
        });
    },
    handleForgot(val) {
      this.showResetPasswordForm = false;
      this.showForgotPasswordForm = val;
    },
    handleReset(val) {
      this.showForgotPasswordForm = false;
      this.showResetPasswordForm = val;
    },
    handleBackLogin(val) {
      this.showConfirm = val;
      this.showRegister = val;
      this.showForgotPasswordForm = val;
      this.showResetPasswordForm = val;
    },
    handleRegister(val) {
      this.router = "auth.register";
      this.showRegister = val;
    },
    handleConfirm(val) {
      this.showConfirm = val;
      this.showRegister = false;
    },
    handleBackRegister(val) {
      this.showConfirm = val;
      this.showRegister = true;
    },
    handleBackForgot(val) {
      this.showResetPasswordForm = val;
      this.showForgotPasswordForm = true;
    },
  },
  mounted() {
    this.$store.dispatch("Auth/resetToken").then();
  },
  watch: {
    router: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue && newValue === "auth.register") this.showRegister = true;
        if (newValue && newValue === "auth.login") {
          this.showConfirm = false;
          this.showRegister = false;
          this.showForgotPasswordForm = false;
          this.showResetPasswordForm = false;
        }
        if (newValue && newValue === "auth.forgot") {
          this.showResetPasswordForm = false;
          this.showForgotPasswordForm = true;
        }
      },
    },
  },
  metaInfo() {
    return {
      title: i18n.t("login.login"),
    };
  },
};
</script>
<style scoped>
.flex-direction-reverse {
  flex-direction: row-reverse;
}
</style>
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>
