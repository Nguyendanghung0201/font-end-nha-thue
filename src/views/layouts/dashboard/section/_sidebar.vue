<template>
  <div id="sidebar" class="nk-sidebar nk-sidebar-fixed is-compact">
    <div class="nk-sidebar-element nk-sidebar-head">
      <div class="nk-sidebar-brand">
        <router-link
          :to="{ name: 'dashboard.index' }"
          class="logo-link nk-sidebar-logo"
        >
          <div class="d-flex align-items-center">
            <em class="icon ni ni-package-fill fs-26px me-1"></em>
            <span class="fs-24px fw-bold text-red">House For Rent</span>
          </div>

          <!--                                        <img class="logo-light logo-img" :src="require('@/assets/images/logos/timebit-otc-512.png')"-->
          <!--                                             :srcset="require('@/assets/images/logos/timebit-otc-512.png') + ' 2x'" alt="logo">-->
          <!--                    <img class="logo-dark logo-img" :src="require('@/assets/images/logos/timebit-otc-512.png')"-->
          <!--                         :srcset="require('@/assets/images/logos/timebit-otc-512.png') + ' 2x'" alt="logo-dark">-->
        </router-link>
      </div>
      <div class="nk-menu-trigger mr-n2">
        <a
          type="button"
          class="nk-nav-toggle nk-quick-nav-icon d-none d-xl-block"
          @click.capture="hideSidebar"
        >
          <em class="icon ni ni-arrow-left"></em>
        </a>
      </div>
      <div class="nk-menu-trigger mr-n2 d-lg-block d-xl-none">
        <a
          type="button"
          class="nk-nav-toggle nk-quick-nav-icon"
          @click.capture="hideMobileSidebar"
        >
          <em class="icon ni ni-arrow-left"></em>
        </a>
      </div>
    </div>
    <div class="nk-sidebar-element nk-sidebar-body">
      <vue-simplebar>
        <div class="nk-sidebar-content">
          <div class="nk-sidebar-menu">
            <Sidebar :menuLists="menuLists" />
            <div :style="menuStyles()"></div>
          </div>
        </div>
      </vue-simplebar>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/views/layouts/components/sidebar";
import EventBus from "@/utils/event-bus";
import sidebarMixin from "@/mixins/sidebarMixins";

export default {
  name: "DashboardSidebar",
  components: {
    Sidebar,
  },
  data() {
    return {
      isSupperAdmin: false,
      menuLists: [
        {
          icon: "icon ni ni-dashboard-fill",
          label: this.$t("menu.dashboard"),
          route: { name: "dashboard.index" },
          activeAt: ["dashboard.index", "service.detail"],
          permissions: [],
        },
        {
          icon: "icon ni ni-search",
          label: this.$t("home.search_home"),
          route: { name: "search_home.index" },
          activeAt: ["search_home.index",'search_home.detail'],
          permissions: [],
        },
        {
          icon: "icon ni ni-home",
          label: this.$t("home.interested_home"),
          route: { name: "interested_home.index" },
          activeAt: ["interested_home.index",'interested_home.detail'],
          permissions: [],
        },
        // {
        //     label: this.$t('menu.service'),
        //     permissions: [],
        //     heading: true
        // },
        {
            icon: 'icon ni ni-user-list',
            label: this.$t('menu.my_service'),
            route: { name: 'my-service.index' },
            activeAt: ['my-service.index', 'my-service-detail', 'service-function-detail'],
            permissions: []
        },
        // {
        //     label: this.$t('menu.bank'),
        //     permissions: [],
        //     heading: true
        // },
        // {
        //     icon: 'icon ni ni-cc-alt',
        //     label: this.$t('menu.bankService'),
        //     route: { name: 'service-bank.index' },
        //     activeAt: ['service-bank.index', 'bank.index', 'bank.detail', 'bank.create', 'bank.add', 'bank.activities', 'bank.saving', 'bank.integrated'],
        //     permissions: []
        // },
        // {
        //     label: this.$t('menu.support'),
        //     permissions: [],
        //     heading: true
        // },
        // {
        //     icon: 'icon ni ni-help-alt',
        //     label: this.$t('menu.support'),
        //     route: { name: 'history-support.index' },
        //     activeAt: ['history-support.index'],
        //     permissions: []
        // },
        // {
        //     icon: 'icon ni ni-question',
        //     label: this.$t('menu.faq'),
        //     route: { name: 'faq.index' },
        //     activeAt: ['faq.index'],
        //     permissions: []
        // },
        // {
        //     label: this.$t('menu.term_policy'),
        //     permissions: [],
        //     heading: true
        // },
        // {
        //     icon: 'icon ni ni-policy',
        //     label: this.$t('menu.term_of_use'),
        //     route: { name: 'terms-of-use.index' },
        //     activeAt: ['terms-of-use.index'],
        //     permissions: []
        // },
        // {
        //     icon: 'icon ni ni-book-read',
        //     label: this.$t('menu.user_policy'),
        //     route: { name: 'user-policy.index' },
        //     activeAt: ['user-policy.index'],
        //     permissions: []
        // }
      ],
      showSidebarMenu: false,
      showSidebarMenuMobile: false,
      pushedNotification: {},
      toggleSidebar: false,
    };
  },
  mixins: [sidebarMixin],
  mounted() {
    EventBus.$on("showMobileSidebar", this.handleShowMobileSidebar);
    this.scrollToActiveMenu();
  },
  methods: {
    handleShowSideBar() {
      this.showSidebarMenu = !this.showSidebarMenu;
    },
    handleShowMobileSidebar(val) {
      this.showSidebarMenuMobile = val;
      if (val) {
        $("body").addClass("nav-shown");
      } else {
        setTimeout(() => {
          $("body").removeClass("nav-shown");
        }, 200);
      }
    },
    handleCloseMobileSidebar() {
      this.showSidebarMenuMobile = false;
      EventBus.$emit("closeMobileSidebar", true);
      if ($("body").addClass("nav-shown")) {
        setTimeout(() => {
          $("body").removeClass("nav-shown");
        }, 200);
      }
    },
    handleSidebarHover() {
      const sidebar = $(".nk-sidebar");
      if (sidebar.length) {
        if (sidebar.hasClass("is-compact")) {
          sidebar.addClass("has-hover");
        }
      }
    },
    handleSidebarLeave() {
      const sidebar = $(".nk-sidebar");
      if (sidebar.length) {
        if (sidebar.hasClass("is-compact")) {
          sidebar.removeClass("has-hover");
        }
      }
    },
    scrollToActiveMenu() {},
  },
  watch: {
    showSidebarMenuMobile(value) {
      const overlay = $(".nk-sidebar-overlay");
      const sidebar = $(".nk-sidebar");
      const vm = this;

      if (value) {
        if (!overlay.length) {
          $(sidebar).after(
            $("<div />", {
              class: "nk-sidebar-overlay",
              "data-target": "sidebarMenu",
            }).click(() => {
              vm.handleCloseMobileSidebar();
            })
          );
        }
      } else {
        overlay.remove();
      }
    },
  },
};
</script>
<style lang="scss">
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
