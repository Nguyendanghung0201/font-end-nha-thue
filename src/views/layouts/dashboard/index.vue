<template>
  <div>
    <!-- <dashboard-side-bar></dashboard-side-bar> -->
    <div id="content-wrapper" class="nk-wrap isHide">
      <div class="nk-header nk-header-fixed is-light">
        <div id="overlay-sidebar" @click.capture="hideMobileSidebar" class="d-xl-none"></div>
        <div class="container-fluid h-100 header_custom">
          <div class="nk-header-wrap h-100">
            <!-- <div @click="handleShowSidebar" id="toggle-sideBar"
              class="pe-2 cursor-pointer mr-5 h-100 d-none d-xl-block isShow">
              <em class="icon ni ni-view-row-wd fs-22px"></em>
            </div> -->
            <div class="nk-menu-trigger d-xl-none ml-n1">
              <a class="nk-nav-toggle nk-quick-nav-icon cursor-pointer" @click="handleShowMobileSideBar">
                <em class="icon ni ni-menu"></em>
              </a>
            </div>
            <!-- <router-link :to="{name: 'support.index'}" class="d-flex align-items-center btn btn-primary subscribe-btn p-2">
                            <em class="icon ni ni-headphone-fill"></em>
                            <span class="pl-0">{{ $t('button.support_now') }}</span>
                        </router-link> -->
            <div class="nk-header-brand d-xl-none">
              <router-link :to="{ name: 'dashboard.index' }" class="logo-link">
                <div class="d-flex align-items-center">
                  <em class="icon ni ni-package-fill fs-26px me-1"></em>
                  <span class="fs-24px fw-bold text-red">logo</span>
                </div>
              </router-link>
            </div>
            <div class="header-menu">
              <ul>
                <li>
                  <router-link :to="{name: 'search_home.index'}">
                    Tìm Nhà
                  </router-link>
                
                </li>
                <li>
                  <router-link :to="{name: 'support.index'}"> 
                    Tuyển Dụng
                  </router-link>
                
                </li>
                <li>
                  <router-link :to="{name: 'support.index'}"> 
                    Nhà Đã Xem
                  </router-link>
                 
                </li>
                <li>
                  <router-link :to="{name: 'support.index'}"> 
                    Liên Hệ
                  </router-link>
                
                </li>
              </ul>
            </div>
            <div class="nk-header-tools py-0 h-100">
              <ul class="nk-quick-nav h-100">
                <li v-if="user" class="dropdown user-dropdown position-relative h-100">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <div class="user-toggle">
                      <div v-if="user.avatar" class="user-avatar sm bg-transparent">
                        <b-img class="rounded-circle h-100 w-100" :src="getPublicAssetUrl(user.avatar)"
                          @error="getNoAvatar" style="object-fit: cover" width="35" />
                      </div>
                      <!--                                            <img v-if="user.avatar" class="user-avatar sm" :src="getPublicAssetUrl(user.avatar)" :alt="user.username">-->

                      <div v-else-if="user.email" class="user-avatar sm">
                        {{ user.email.charAt(0) }}
                      </div>
                      <div v-else class="user-avatar sm">
                        <em class="icon ni ni-user-alt"></em>
                      </div>
                      <div class="user-info d-none d-md-block ms-1">
                        <div v-if="user.display_name" class="user-name dropdown-indicator line-1">
                          {{ user.display_name }}
                        </div>
                        <div v-else class="user-name dropdown-indicator line-1">
                          {{ user.email }}
                        </div>
                      </div>
                    </div>
                  </a>
                  <div class="custom-dropdown dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1">
                    <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                      <div class="user-car d-flex align-items-center">
                        <div v-if="user.avatar" class="user-avatar sm bg-transparent">
                          <b-img class="rounded-circle h-100 w-100" :src="getPublicAssetUrl(user.avatar)"
                            @error="getNoAvatar" style="object-fit: cover" width="35" />
                        </div>

                        <div v-else-if="user.email" class="user-avatar">
                          <span>
                            {{ user.email.charAt(0) }}
                          </span>
                        </div>
                        <div v-else class="user-avatar">
                          <em class="icon ni ni-user-alt fs-20px"></em>
                        </div>
                        <div class="user-info">
                          <p class="lead-text line-1 mb-0">
                            {{ user.display_name }}
                          </p>
                          <span class="sub-text">{{ user.email }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-inner">
                      <ul class="link-list">
                        <li>
                          <router-link :to="{ name: 'profile.info' }">
                            <em class="icon ni ni-user-alt"></em>
                            <span>{{ $t("menu.view_profile") }}</span>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'profile.password' }">
                            <em class="icon ni ni-edit"></em>
                            <span>{{ $t("menu.change_password") }}</span>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                    <div class="dropdown-inner">
                      <ul class="link-list">
                        <li>
                          <a class="cursor-pointer" @click="handleLogout()">
                            <em class="icon ni ni-signout"></em>
                            <span>{{ $t("menu.logout") }}</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li
                  class="dropdown language-dropdown d-none d-sm-flex align-items-center mr-n1 position-relative h-100 ps-4">
                  <a class="dropdown-toggle nk-quick-nav-icon py-0 h-100" data-toggle="dropdown">
                    <div class="quick-icon">
                      <img class="icon" :src="
                        locale === 'en'
                          ? require('@/assets/images/svg/flags/226-united-states.svg')
                          : require('@/assets/images/svg/flags/220-vietnam.svg')
                      " alt="" />
                    </div>
                  </a>
                  <div class="custom-dropdown dropdown-menu dropdown-menu-right dropdown-menu-s1">
                    <ul class="language-list">
                      <li>
                        <a v-if="locale != 'en'" class="language-item cursor-pointer" @click="setLanguage('en')">
                          <img :src="require('@/assets/images/flags/english.png')" alt="" class="language-flag" />
                          <span class="language-name">{{
                            $t("utilities.english")
                          }}</span>
                        </a>
                        <a v-else class="language-item cursor-pointer">
                          <img :src="require('@/assets/images/flags/english.png')" alt="" class="language-flag" />
                          <span class="language-name">{{
                            $t("utilities.english")
                          }}</span>
                        </a>
                      </li>
                      <li>
                        <a v-if="locale != 'vi'" class="language-item cursor-pointer" @click="setLanguage('vi')">
                          <img :src="require('@/assets/images/flags/vietnam.png')" alt="" class="language-flag" />
                          <span class="language-name">{{
                            $t("utilities.vietnamese")
                          }}</span>
                        </a>
                        <a v-else class="language-item cursor-pointer">
                          <img :src="require('@/assets/images/flags/vietnam.png')" alt="" class="language-flag" />
                          <span class="language-name">{{
                            $t("utilities.vietnamese")
                          }}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Breadcrumb -->
      <nav class="mb-3" v-if="breadcrumbs.length">
        <ul class="breadcrumb breadcrumb-arrow">
          <li class="breadcrumb-item" v-for="(row, key) in breadcrumbs" :key="key">
            <router-link :to="{ name: row.name }">
              {{ $t(row.meta.title || row.name) }}
            </router-link>
          </li>
          <li class="breadcrumb-item active" v-if="$route.meta.title">
            <span>{{ $t($route.meta.title) }}</span>
          </li>
        </ul>
      </nav>
      <!-- Breadcrumb -->
      <router-view :key="$route.fullPath" />
    </div>

  </div>
</template>

<script>
import DashboardHeader from "./section/_header";
import DashboardSideBar from "./section/_sidebar";
import { getLanguage, getPublicAssetUrl, setLanguage } from "@/helpers/common";
import EventBus from "@/utils/event-bus";
import EnableDesktopNotification from "@/views/layouts/components/EnableDesktopNotification";
import sidebarMixins from "@/mixins/sidebarMixins";

export default {
  components: {
    EnableDesktopNotification,
    DashboardHeader,
    DashboardSideBar,
  },
  mixins: [sidebarMixins],
  data() {
    return {
      sidebarToggle: false,
      locale: null,
      showSidebar: false,
      showMobileSidebar: false,
      metaTitle: null,
      time: null,
      unread: 0,
      currentTitle: this.$route.meta.title,
      notifications: [],
      firstLoadingNotification: true,
      paginationData: {
        currentPage: 1,
        perPage: 10,
        lastPage: null,
        total: 0,
        sort: "DESC",
      },
      showRequestDesktopNotification: false,
      soundTimer: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters["Auth/user"];
    },
    breadcrumbs() {
      const lists = this.buildBreadcrumb(this.$route);
      if (lists.length > 1)
        lists.unshift(
          this.$router
            .getRoutes()
            .find((v) => v.name === "client.dashboard.index")
        );
      lists.pop();
      return lists;
    },
  },
  mounted() {
    this.locale = getLanguage();
    EventBus.$on("closeMobileSidebar", this.handleCloseMobileMenu);
    // this.$nextTick(() => {
    //     this.getNotifications()
    //     if (this.$refs.listNotification) {
    //         const el = this.$refs.listNotification
    //         el.addEventListener('scroll', () => {
    //             if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
    //                 if (this.paginationData.currentPage < this.paginationData.lastPage) {
    //                     ++this.paginationData.currentPage
    //                     this.getNotifications(true)
    //                 }
    //             }
    //         })
    //     }
    // })
  },
  methods: {
    getPublicAssetUrl,
    changeTitle(title) {
      if (title) {
        let oldTitle = title;
        const newTitle = "1 thông báo mới";
        let isUsing = "old";
        this.time = setInterval(() => {
          if (isUsing === "old") {
            isUsing = "new";
            this.metaTitle = newTitle;
          } else {
            isUsing = "old";
            this.metaTitle = oldTitle;
          }
        }, 1000);
      }
    },
    playSound() {
      if (this.soundTimer) clearTimeout(this.soundTimer);
      this.soundTimer = setTimeout(() => {
        let audio = new Audio(this.SOUND);
        audio.play().then();
      }, 300);
    },
    buildBreadcrumb($route) {
      if ($route.meta && $route.meta.parent) {
        const parent = this.$router
          .getRoutes()
          .find((v) => v.name === $route.meta.parent);
        return [...this.buildBreadcrumb(parent), $route];
      }
      return [$route];
    },
    handleSidebarToggle(data) {
      this.sidebarToggle = data;
    },
    setLanguage,
    handleLogout() {
      this.$store
        .dispatch("Auth/resetToken")
        .then(this.$router.push({ name: "auth.login" }));

      //   this.$store.dispatch("Auth/logout").then(() => {
      //     this.$router.push({ name: "auth.login" });
      //   });
    },
    handleShowSideBar(value) {
      this.showSidebarMenu = value;
    },
    handleShowMobileMenu() {
      this.showMobileSidebar = !this.showMobileSidebar;
      EventBus.$emit("showMobileSidebar", this.showMobileSidebar);
    },
    handleCloseMobileMenu(val) {
      this.showMobileSidebar = !val;
    },
  },
  watch: {
    sidebarToggle(newValue, oldValue) {
      this.handleSidebarToggle(newValue);
    },
    $route(to, from) {
      if (to) {
        clearInterval(this.time);
      }
    },
  },
  metaInfo() {
    return {
      title: "REAL HOUSE",
    };
  },
};
</script>
<style lang="scss">

.header_custom{
padding: 7px 0px;
}
.header-menu {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

}
.header-menu ul{ display: flex;}
.header-menu ul li{
  padding: 7px 20px;
    line-height: 16px;
    font-weight: 700;
    text-transform: uppercase;}
@media (min-width: 1200px) {
  .is-compact {
    width: 74px;
    .nk-menu-text {
      white-space: nowrap;
      opacity: 0 !important;
      transition: 0.4s linear !important;
    }
  }
  .is-compact:hover {
    width: 320px;
    .nk-menu-text {
      opacity: unset !important;
      transition: 0.4s linear !important;
    }
  }
  .nk-sidebar .nk-menu > li:hover > a,
  .nk-sidebar .nk-menu > li.active > a,
  .nk-sidebar .nk-menu > li.current-menu > a {
    background: unset;
  }

  .nk-menu-text {
    white-space: nowrap;
  }
}
</style>

<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>
