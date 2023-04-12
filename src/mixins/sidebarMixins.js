export default {
    computed: {
        status() {
            return this.$store.getters["sidebarStatus"];
        },
        classes() {
            return {
                "is-compact": this.status.desktop,
                "nk-sidebar-active": this.status.mobile,
            };
        },
    },
    methods: {
        // toggleSidebar() {
        //     this.$store.dispatch("sidebarToggle", { toggle: true });
        // },
        closeSidebar() {
            this.$store.dispatch("sidebarToggle", {
                desktop: true,
                mobile: false,
            });
        },
        openSidebar() {
            this.$store.dispatch("sidebarToggle", {
                desktop: false,
                mobile: true,
            });
        },
        handleShowSidebar() {
            let button = document.getElementById('toggle-sideBar')
            button.classList.remove('isShow')


            // let sidebar = document.getElementById('sidebar')
            // sidebar.classList.remove('isHide')

            let sidebar = document.getElementById('sidebar')
            sidebar.classList.remove('is-compact')

            let content = document.querySelector('.nk-sidebar + .nk-wrap')
            content.classList.remove('isHide')

            let footer = document.querySelector('.nk-footer')
            footer.classList.remove('isHide')
        },
        handleShowMobileSideBar() {
            let sidebar = document.getElementById('sidebar')
            sidebar.classList.add('isShow')

            let overlay = document.getElementById('overlay-sidebar')
            overlay.classList.add('isShow')
        },
        hideSidebar() {
            let button = document.getElementById('toggle-sideBar')
            button.classList.add('isShow')

            let sidebar = document.getElementById('sidebar')
            sidebar.classList.add('is-compact')

            let content = document.querySelector('.nk-sidebar + .nk-wrap')
            content.classList.add('isHide')

            let footer = document.querySelector('.nk-footer')
            footer.classList.add('isHide')
        },
        hideMobileSidebar() {
            let sidebar = document.getElementById('sidebar')
            sidebar.classList.remove('isShow')

            let overlay = document.getElementById('overlay-sidebar')
            overlay.classList.remove('isShow')
        }
    },
};