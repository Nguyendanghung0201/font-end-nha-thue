<template>
  <form @submit.prevent="" autocomplete="off">
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
        :class="{ 'is-invalid': showHtmlError('email', 'form') }"
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
          {{ getLabel("password", "form", true) }}
        </label>
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
          <em class="passcode-icon icon-show icon ni ni-eye-off" v-else></em>
        </span>
        <b-form-input
          :type="showPassword ? 'text' : 'password'"
          autocomplete="off"
          v-model.trim="$v.form.password.$model"
          :class="{ 'is-invalid': showHtmlError('password', 'form') }"
          :placeholder="getLabel('password', 'form')"
          :counter="getInputMaxLength('password', 'form')"
          size="lg"
        />
      </div>
      <span
        class="fs-12px mt-2"
       
        >* {{ $t("message.password_format") }}</span
      >
    </b-form-group>
    <b-form-group
      class="mb-2"
      :invalid-feedback="showHtmlError('confirm_password', 'form')"
      label-class="form-label-group"
    >
      <template #label>
        <label class="form-label">
          {{ getLabel("confirm_password", "form", true) }}
        </label>
      </template>
      <div class="form-control-wrap">
        <span
          class="form-icon form-icon-right passcode-switch cursor"
          @click="showConfirmPassword = !showConfirmPassword"
        >
          <em
            class="passcode-icon icon-show icon ni ni-eye"
            v-if="!showConfirmPassword"
          ></em>
          <em class="passcode-icon icon-show icon ni ni-eye-off" v-else></em>
        </span>
        <b-form-input
          :type="showConfirmPassword ? 'text' : 'password'"
          autocomplete="off"
          v-model.trim="$v.form.confirm_password.$model"
          :class="{ 'is-invalid': showHtmlError('confirm_password', 'form') }"
          :placeholder="getLabel('confirm_password', 'form')"
          :counter="getInputMaxLength('confirm_password', 'form')"
          size="lg"
        />
      </div>
    </b-form-group>
    <b-form-group
      :invalid-feedback="showHtmlError('display_name', 'form')"
      label-class="form-label-group"
    >
      <template #label>
        <label class="form-label">
          {{ getLabel("display_name", "form", true) }}
        </label>
      </template>
      <b-form-input
        v-model.trim="$v.form.display_name.$model"
        :placeholder="getLabel('display_name', 'form')"
        autocomplete="off"
        type="email"
        :class="{ 'is-invalid': showHtmlError('display_name', 'form') }"
        :counter="getInputMaxLength('display_name', 'form')"
        ref="autofocus"
        size="lg"
      />
    </b-form-group>

    <b-form-group
      class="flex-grow-1 mb-2"
      :invalid-feedback="showHtmlError('phone', 'form')"
      label-class="form-label-group"
    >
      <template #label>
        <label class="form-label">
          {{ getLabel("phone", "form", true) }}
        </label>
      </template>
      <div class="form-control-wrap">
        <b-form-input
          type="tel"
          v-model.trim="$v.form.phone.$model"
          autocomplete="off"
          :placeholder="getLabel('phone', 'form')"
          :class="{ 'is-invalid': showHtmlError('phone', 'form') }"
          size="lg"
        />
      </div>
      <span
        v-if="isMaxPhone && !showHtmlError('phone', 'form')"
        class="text-danger mt-1 fs-12px"
        >{{ $t("message.phone_error") }}</span
      >
    </b-form-group>
    <b-form-group>
      <template #label>
        <label class="form-label m-0">
          {{ getLabel("gender", "form", true) }}
        </label>
      </template>
        <b-form-radio
          v-model="$v.form.gender.$model"
          name="some-radios"
          value="1"
        >
          <label class="form-label mr-2">
            {{ $t("login.man") }}
          </label>
        </b-form-radio>
        <b-form-radio
          v-model="$v.form.gender.$model"
          name="some-radios"
          value="0"
        >
          <label class="form-label">
            {{ $t("login.woman") }}
          </label>
        </b-form-radio>
    </b-form-group>
    <p class="text-right">
      <span
        @click="backLogin"
        class="link link-primary fs-14px cursor-pointer"
        >{{ $t("login.return_login") }}</span
      >
    </p>
    <div class="form-group">
      <b-button
        @click="handleSubmit"
        size="lg"
        variant="primary"
        block
        type="submit"
        :disabled="
          requestLoading ||
          $v.form.$error ||
          !form.email ||
          !form.password ||
          !form.confirm_password ||
          !form.phone ||
          isMaxPhone
        "
      >
        <span
          v-if="requestLoading"
          class="spinner-border spinner-border-sm mr-2"
          role="status"
        />
        <span class="visually-hidden">Loading...</span>
        {{ $t("login.register") }}
      </b-button>
    </div>
  </form>
</template>

<script>
import md5 from "md5";

const { validators } = window,
  {
    email,
    required,
    phone,
    isTrue,
    $label,
    maxLength,
    minLength,
    minValue,
    sameAs,
    password,
    isPhone,
  } = validators;

export default {
  name: "RegisterForm",
  validations() {
    const rules = {
      password: {
        required,
        password,
        $label: $label(this.$t("login.password")),
        minLength: minLength(8),
        maxLength: maxLength(32),
      },
      confirm_password: {
        required,
        sameAs: sameAs("password"),
        $label: $label(this.$t("login.confirm_password")),
        sameLabel: $label(this.$t("utilities.new_password")),
        maxLength: maxLength(32),
      },
      email: {
        required,
        email,
        $label: $label(this.$t("login.email")),
        maxLength: maxLength(50),
      },
      phone: {
        required,
        isPhone,
        $label: $label(this.$t("login.phone")),
        minLength: minLength(10),
      },
      display_name: {
        required,
        minLength: minLength(6),
        $label: $label(this.$t("login.display_name")),
      },
      gender: {
        required,
        $label: $label(this.$t("login.gender")),
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
        confirm_password: null,
        phone: null,
        display_name: null,
        gender: '1',
        ref:"",
      },
      showPassword: false,
      showConfirmPassword: false,
      requestLoading: false,
      isMaxPhone: false,
    };
  },
  methods: {
    handleSubmit() {
      this.$v.form.$touch();
      const isError = this.$v.form.$error;
      if (!isError) {
        localStorage.setItem("REGISTER_INFO", JSON.stringify(this.form));

        // const { email, password, phone } = this.form;
        // let postData = {
        //   email,
        //   password: md5(md5(password)),
        //   phone,
        // };
        const {
          email,
          password,
          phone,
          display_name,
          gender,
          confirm_password,
          ref
        } = this.form;
        const postData = {
          username: email,
          password,
          display_name,
          re_password: confirm_password,
          phone,
          gender,
          ref
        };
        this.requestLoading = true;

   
            this.$store
              .dispatch("Auth/register", postData)
              .then((response) => {
                this.$awnSuccess(this.$t("message.signup_successfully"));
                this.$emit("backLogin", false);
              })
              .catch((e) => {
                if (e.code === 506) {
                  this.$awnAlert(this.$t("message.code_error"));
                } else {
                  this.$awnAlert(this.$t("message.code_incorrect"));
                }
                this.count++;
                if (+this.count === 5) {
                  this.$emit("backRegister", false);
                }
              })
              .finally(() => {
                this.requestLoading = false;
              });
      }
    },
    backLogin() {
      this.$emit("backLogin", false);
      this.$router.push({ name: "auth.login" });
    },
  },
  watch: {
    "form.phone"(newVal) {
      if (newVal) {
        let length = newVal.split("").length;
        this.isMaxPhone = length > 12;
      }
    },
  },
  mounted(){

      // We will see what `params` is shortly
      console.log('âjjaj', this.$route.query )
      if(this.$route.query && this.$route.query.ref){
        this.form.ref = this.$route.query.ref
      }
     
  
  }
};
</script>
<style scoped lang="scss">
:deep {
  .input-counter {
    display: none !important;
  }
}
</style>
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>
