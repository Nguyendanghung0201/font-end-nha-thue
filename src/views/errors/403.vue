<template>
  <div class="nk-wrap nk-wrap-nosidebar">
    <div class="nk-content ">
      <div class="nk-block nk-block-middle wide-xs mx-auto">
        <div class="nk-block-content nk-error-ld text-center">
          <h1 class="nk-error-head">403</h1>
          <h3 class="nk-error-title">Quyền truy cập bị từ chối</h3>
          <p class="nk-error-text">
            Bạn không có quyền truy cập vào trang này, vui lòng trở lại
          </p>
            <div class="d-flex flex-column justify-content-center align-items-center">
                <a href="/" class="btn btn-lg btn-primary mt-2">Về trang chính</a>
                <div class="mt-3">
                    hoặc
                    <a @click="handleLogout()" class="mt-2 cursor-pointer text-primary">Đăng nhập lại</a>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error403',
    methods: {
        handleLogout() {
            this.$store.dispatch('Auth/logout').then(() => {
                this.$router.push({name:'auth.login'})
            })
        },
    },
    metaInfo(){
        return {
            title: '403 - Access Denied',
        }
    }
}
</script>

<style scoped>

</style>