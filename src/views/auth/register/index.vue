<template>
  <div
    class="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white"
  >
    <div class="nk-block nk-block-middle nk-auth-body">
      <div class="nk-block-head">
        <div class="nk-block-head-content text-center">
          <h5 class="nk-block-title fs-22px">{{ $t("login.register") }}</h5>
          <div class="nk-block-des">
            <p>{{ $t("login.register_subtitle") }}</p>
          </div>
        </div>
      </div>

      <register-form
        @backLogin="handleBackLogin"
        @confirm="handleConfirm"
      ></register-form>
    </div>
  </div>
</template>
<script>
import RegisterForm from "@/views/auth/register/_form";

export default {
  name: "Forgot",
  components: { RegisterForm },
  data() {
    return {
      title: "",
    };
  },
  created() {
    window.addEventListener("popstate", this.onBackButtonEvent);
    history.pushState(null, null, location.href);
  },
  beforeDestroy() {
    window.removeEventListener("popstate", this.onBackButtonEvent);
  },
  methods: {
    handleBackLogin(val) {
      this.$emit("backLogin", val);
    },
    handleConfirm(val) {
      this.$emit("confirm", val);
    },
    onBackButtonEvent(event, val) {
      event.preventDefault();
      this.$emit("backLogin", val);
      this.$router.go(-1);
    },
  },
  mounted() {},
};
</script>
<style scoped>
@media (min-width: 992px) {
  .nk-auth-container {
    width: 35% !important;
  }
}
</style>
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>
