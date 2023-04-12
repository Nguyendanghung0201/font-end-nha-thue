<template>
  <!-- <div v-if="showError" class="alert alert-danger d-flex align-center">
            <em class="icon ni ni-cross-circle fs-18px mr-2"></em>
            {{ $t('message.login_failed_2') }}
        </div>
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
                autocomplete="off"
                type="email"
                @keyup="resetError"
                :class="{'is-invalid':(showHtmlError('email', 'form'))}"
                :counter="getInputMaxLength('email', 'form')"
                ref="autofocus"
                size="lg"
            />
        </b-form-group>
        <b-form-group
            class="mb-2"
            :invalid-feedback="showHtmlError('password', 'form')"
            label-class="form-label-group"
        >
            <template #label>
                <label class="form-label">
                    {{ getLabel('password', 'form', true) }}
                </label>
                <p @click="forgot" class="link link-primary link-sm cursor-pointer">
                    {{ $t('login.forgot_password') }}?
                </p>
            </template>
            <div class="form-control-wrap">
                <span class="form-icon form-icon-right passcode-switch cursor" @click="showPassword = !showPassword">
                    <em class="passcode-icon icon-show icon ni ni-eye" v-if="!showPassword"></em>
                    <em class="passcode-icon icon-show icon ni ni-eye-off" v-else></em>
                </span>
                <b-form-input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="$v.form.password.$model"
                    @keyup="resetError"
                    :class="{'is-invalid':(showHtmlError('password', 'form'))}"
                    :placeholder="getLabel('password', 'form')"
                    :counter="getInputMaxLength('password', 'form')"
                    size="lg"
                />
            </div>
        </b-form-group>
        <p>
            {{ $t('login.redirect_signup') }}
            <span @click="register" class="link link-primary fs-14px cursor-pointer">{{ $t('login.register') }}</span>
        </p>
        <div class="form-group">
            <b-button
                size="lg"
                variant="primary"
                block
                type="submit"
                :disabled="requestLoading || $v.form.$error || !form.email || !form.password"
            >
                <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />
                <span class="visually-hidden">Loading...</span>
                {{ $t('login.login') }}
            </b-button>
        </div> -->

  <div
    class="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white"
  >
    <div class="nk-block nk-block-middle nk-auth-body">
      <div class="nk-block-head">
        <div class="nk-block-head-content">
          <h5 class="nk-block-title">{{ $t("login.login") }}</h5>
          <div class="nk-block-des">
            <p>{{ $t("login.login_subtitle") }}</p>
          </div>
        </div>
      </div>
      <div v-if="showError" class="alert alert-danger d-flex align-center">
        <em class="icon ni ni-cross-circle fs-18px mr-2"></em>
        {{ $t("message.login_failed_2") }}
      </div>
      <!-- .nk-block-head -->
      <form @submit.prevent="handleSubmit">
        <b-form-group
          :invalid-feedback="showHtmlError('email', 'form')"
          label-class="form-label-group"
        >
          <template #label>
            <label class="form-label">
              {{ getLabel("email", "form", true) }}
            </label>
          </template>
          <b-form-input
            v-model.trim="$v.form.email.$model"
            :placeholder="getLabel('email', 'form')"
            autocomplete="off"
            type="email"
            @keyup="resetError"
            :class="{ 'is-invalid': showHtmlError('email', 'form') }"
            :counter="getInputMaxLength('email', 'form')"
            ref="autofocus"
            size="lg"
          />
        </b-form-group>

        <!-- .form-group -->

        <b-form-group
          class="mb-2"
          :invalid-feedback="showHtmlError('password', 'form')"
          label-class="form-label-group"
        >
          <template #label>
            <label class="form-label">
              {{ getLabel("password", "form", true) }}
            </label>
            <p @click="forgot" class="link link-primary link-sm cursor-pointer">
              {{ $t("login.forgot_password") }}?
            </p>
          </template>
          <div class="form-control-wrap">
            <span
              class="form-icon form-icon-right passcode-switch cursor"
              @click="showPassword = !showPassword"
            >
              <em
                class="passcode-icon icon-show icon ni ni-eye"
                v-if="!showPassword"
              ></em>
              <em
                class="passcode-icon icon-show icon ni ni-eye-off"
                v-else
              ></em>
            </span>
            <b-form-input
              :type="showPassword ? 'text' : 'password'"
              v-model="$v.form.password.$model"
              @keyup="resetError"
              :class="{ 'is-invalid': showHtmlError('password', 'form') }"
              :placeholder="getLabel('password', 'form')"
              :counter="getInputMaxLength('password', 'form')"
              size="lg"
            />
          </div>
        </b-form-group>

        <!-- .form-group -->
        <div class="form-group">
          <b-button
            size="lg"
            variant="primary"
            block
            type="submit"
            :disabled="
              requestLoading || $v.form.$error || !form.email || !form.password
            "
          >
            <span
              v-if="requestLoading"
              class="spinner-border spinner-border-sm mr-2"
              role="status"
            />
            <span class="visually-hidden">Loading...</span>
            {{ $t("login.login") }}
          </b-button>
        </div>
      </form>
      <!-- form -->
      <div class="form-note-s2 pt-4">
        <p>
          {{ $t("login.redirect_signup") }}
          <span
            @click="register"
            class="link link-primary fs-14px cursor-pointer"
            >{{ $t("login.register") }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5";

const { validators } = window,
  { email, required, phone, isTrue, $label, maxLength, minLength, minValue } =
    validators;

export default {
  name: "LoginForm",
  validations() {
    const rules = {
      password: {
        required,
        $label: $label(this.$t("login.password")),
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      email: {
        required,
        email,
        $label: $label(this.$t("login.email")),
        maxLength: maxLength(50),
      },
    };
    return {
      form: rules,
    };
  },
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      showPassword: false,
      requestLoading: false,
      showError: false,
    };
  },
  mounted() {
    const recaptcha = this.$recaptchaInstance;

    if (recaptcha) {
      recaptcha.showBadge();
    }
  },
  beforeRouteLeave() {
    const recaptcha = this.$recaptchaInstance;

    if (recaptcha) {
      recaptcha.hideBadge();
    }
  },
  methods: {
    handleSubmit() {

      this.$v.form.$touch();
      const isError = this.$v.form.$error;
      this.showError = false;
      if (!isError) {
        const { password, email } = this.form;
        let postData = {
          password: password,
          username: email,
        };
        this.requestLoading = true;
      
            this.$store
              .dispatch("Auth/login", postData)
              .then((response) => {
                this.$router.replace(
                  this.$route.query.redirect
                    ? this.$route.query.redirect
                    : { name: "dashboard.index" }
                );
              })
              .catch((e) => {
                this.showError = true;
                this.resetForm();
                this.$awnAlert(this.$t("message.login_failed"));
                this.requestLoading = false;
              });
       
      }
    },
    forgot() {
      this.$emit("forgotPassword", true);
      this.$router.push({ name: "auth.forgot" });
    },
    register() {
      this.$emit("register", true);
      this.$router.push({ name: "auth.register" });
    },
    resetForm() {
      // this.form.email = null
      this.form.password = null;
      this.$v.$reset();
    },
    resetError() {
      this.showError = false;
    },
  },
};
</script>
<style scoped lang="scss">
:deep {
  .input-counter {
    display: none !important;
  }
}
@media (min-width: 992px) {
  .nk-auth-container {
    width: 35% !important;
  }
}
</style>
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>
