<template>
    <div class="nk-header nk-header-fixed is-light nk-header-fixed">
        <div class="container-lg wide-xl">
            <div class="nk-header-wrap">
                <div class="nk-header-brand">
                    <a href="/" class="logo-link">
                        <img class="logo-light logo-img" :src="require('@/assets/images/logos/timebit-otc-512.png')" :srcset="require('@/assets/images/logos/timebit-otc-512.png').default" alt="logo">
                        <img class="logo-dark logo-img" :src="require('@/assets/images/logos/timebit-otc-512.png')" :srcset="require('@/assets/images/logos/timebit-otc-512.png').default" alt="logo-dark">
                    </a>
                </div>
                <div class="nk-header-tools">
                    <ul class="nk-quick-nav">
                        <li class="dropdown user-dropdown">
                            <a href="#" class="dropdown-toggle mr-lg-n1"
                               data-toggle="dropdown">
                                <div class="user-toggle">
                                    <div class="user-avatar sm">
                                        <em class="icon ni ni-user-alt"></em>
                                    </div>
                                </div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1"
                            >
                                <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                    <div class="user-card">
                                        <div class="user-card">
                                            <div class="user-avatar">
                                                <span>AB</span>
                                            </div>
                                            <div class="user-info">
                                                <span class="lead-text">Abu Bin Ishtiyak</span>
                                                <span class="sub-text">{{ user.email }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="dropdown-inner">
                                    <ul class="link-list">
                                        <li>
                                            <router-link :to="{name: 'admin.profile'}">
                                                <em class="icon ni ni-user-alt"></em>
                                                <span>Thông tin cá nhân</span>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                                <div class="dropdown-inner">
                                    <ul class="link-list">
                                        <li>
                                            <a href="#" @click.prevent="logout()">
                                                <em class="icon ni ni-signout"></em>
                                                <span>Đăng xuất</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="d-lg-none">
                            <a class="toggle nk-quick-nav-icon mr-n1 cursor-pointer" @click="toggleSidebar()"
                               data-target="sideNav">
                                <em class="icon ni ni-menu"></em>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DashboardHeader',
    props: {
        sidebarToggle: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showSidebar: false
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('Auth/logout').then(() => {
                this.$router.go(this.$route.fullPath)
            })
        },
        toggleSidebar() {
            if (this.showSidebar) {
                return this.$emit('sidebarToggle', false)
            }
            this.$emit('sidebarToggle', !this.showSidebar)
        }
    },
    watch: {
        sidebarToggle: {
            immediate: true,
            handler(newValue, oldValue) {
                this.showSidebar = newValue
            }
        },
        'showSidebar'(newValue, oldValue) {
            this.$emit('sidebarToggle', newValue)
        }
    },
    computed: {
        user() {
            return this.$store.getters['Auth/user']
        }
    }
}
</script>

<style scoped lang="scss">
@media screen and (max-width: $mobile-breakpoint) {
    .dropdown-menu-right {
        position: absolute;
        transform: translate3d(-216px, 36px, 0px);
        top: 0px;
        left: 0px;
        will-change: transform;
    }
}
</style>
