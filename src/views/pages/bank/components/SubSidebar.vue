<template>
    <div>
        <div class="nk-ibx-aside" data-content="inbox-aside" data-toggle-overlay="true" data-toggle-screen="lg">
            <div class="nk-ibx-head">
                <h5 class="mb-0">{{ $t('menu.bankService') }}</h5>
                <router-link :to="{name: 'service-bank.index'}" class="link link-primary" data-bs-toggle="modal">
                    <em class="icon ni ni-back-ios"></em>
                </router-link>
            </div>
            <div class="nk-ibx-nav" data-simplebar>
                <ul class="nk-ibx-menu">
                    <li :class="{'active': currentRoute == 'bank.index'}">
                        <router-link :to="{name: 'bank.index', params: {id: id}}" class="nk-ibx-menu-item" href="#">
                            <em class="icon ni ni-property-alt"></em>
                            <span class="nk-ibx-menu-text">{{ $t('utilities.my_detail_service') }}</span>
                        </router-link>
                    </li>
                    <!--                    <li :class="{'active': currentRoute == 'bank.add' || currentRoute == 'bank.create'}">
                                            <router-link :to="{name: 'bank.add'}" class="nk-ibx-menu-item">
                                                <em class="icon ni ni-plus"></em>
                                                <span class="nk-ibx-menu-text">{{ $t('bank.add_bank')}}</span>
                                            </router-link>
                                        </li>-->
                    <li :class="{'active': currentRoute == 'bank.activities'}">
                        <router-link :to="{name: 'bank.activities', params: {id: id}}" class="nk-ibx-menu-item">
                            <em class="icon ni ni-activity-round"></em>
                            <span class="nk-ibx-menu-text">{{ $t('bank.activity') }}</span>
                            <span class="badge rounded-pill bg-warning">8</span>
                        </router-link>
                    </li>
                    <li :class="{'active': currentRoute == 'bank.saving'}">
                        <router-link :to="{name: 'bank.saving', params: {id: id}}" class="nk-ibx-menu-item">
                            <em class="icon ni ni-book-read"></em>
                            <span class="nk-ibx-menu-text">{{ $t('bank.passbook') }}</span>
                        </router-link>
                    </li>
                    <li :class="{'active': currentRoute == 'bank.integrated'}">
                        <router-link :to="{name: 'bank.integrated', params: {id: id}}" class="nk-ibx-menu-item">
                            <em class="icon ni ni-grid-add-c"></em>
                            <span class="nk-ibx-menu-text">{{ $t('bank.integration') }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div><!-- .nk-ibx-aside -->
        <div @click="hideSubSideBar" class="overlay-sidebar"></div>
    </div>
</template>

<script>
export default {
    name: 'SubSidebar',
    data() {
        return {
            currentRoute: this.$route.name ?? null,
            id: this.$route.params.id ?? null
        }
    }
}
</script>

