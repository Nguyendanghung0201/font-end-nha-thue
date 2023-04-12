<template>
    <ul class="nk-menu" v-if="menuLists.length">
        <template v-for="(menu, index) in menuLists">
            <template >
                <li v-if="!menu.heading" class="nk-menu-item" :class="{ 'active': activeMenu(menu.activeAt), 'has-sub': !(!menu.children || menu.children.length == 0) }">
                    <router-link
                        v-if="!menu.children || menu.children.length == 0" :to="menu.route"
                        :class="{'router-link-active':activeMenu(menu.activeAt)}"
                        class="nk-menu-link px-4 px-xl-2">
                        <span class="nk-menu-icon">
                            <em :class="menu.icon"></em>
                        </span>
                        <span class="nk-menu-text" v-text="menu.label" />
                        <span
                            class="nk-menu-badge"
                            :class="{'bg-danger text-light':menu.badge > 0}"
                            v-text="menu.badge && menu.badge > 99 ? '99+' : menu.badge" />
                    </router-link>
                    <a v-else class="nk-menu-link nk-menu-toggle cursor-pointer" @click.prevent v-b-toggle="'sidebar-for-' + index">
                        <span class="nk-menu-icon">
                            <em :class="menu.icon"></em>
                        </span>
                        <span class="nk-menu-text" v-text="menu.label" />
                    </a>
                    <template v-if="menu.children && menu.children.length">
                        <b-collapse
                            :id="'sidebar-for-' + index"
                            :class="{'show':activeMenu(menu.activeAt)}"
                            class="nk-menu-sub">
                            <template v-for="child in menu.children">
                                <div
                                     class="nk-menu-item"
                                     :class="{'active':activeMenu(child.activeAt)}">
                                    <router-link :to="child.route" class="nk-menu-link">
                                        <span class="nk-menu-icon">
                                            <em :class="child.icon"></em>
                                        </span>
                                        <span class="nk-menu-text" v-text="child.label" />
                                        <span class="nk-menu-badge" v-text="child.badge" />
                                    </router-link>
                                </div>
                            </template>
                        </b-collapse>
                    </template>
                </li>
                <template v-else>
                    <li class="nk-menu-heading">
                        <h6 class="overline-title text-primary-alt" v-text="menu.label" />
                    </li>
                </template>
            </template>
        </template>

        <li class="nk-menu-heading d-sm-none mb-2"><h6 class="overline-title text-primary-alt">{{ $t('menu.languages')}}</h6></li>
        <li class="language-list px-4 d-sm-none">
            <div :class="{'bg-gray-100': locale == 'vi'}" class="rounded-3 border mb-2">
                <a v-if="locale != 'vi'" class="language-item cursor-pointer" @click="setLanguage('vi')">
                    <img :src="require('@/assets/images/flags/vietnam.png')" alt="" class="language-flag">
                    <span class="language-name">{{ $t('utilities.vietnamese') }}</span>
                </a>
                <a v-else class="language-item cursor-pointer">
                    <img :src="require('@/assets/images/flags/vietnam.png')" alt="" class="language-flag">
                    <span class="language-name">{{ $t('utilities.vietnamese') }}</span>
                </a>
            </div>
            <div :class="{'bg-gray-100': locale == 'en'}" class="rounded-3 border">
                <a v-if="locale != 'en'" class="language-item cursor-pointer" @click="setLanguage('en')">
                    <img :src="require('@/assets/images/flags/english.png')" alt="" class="language-flag">
                    <span class="language-name">{{ $t('utilities.english') }}</span>
                </a>
                <a v-else class="language-item cursor-pointer">
                    <img :src="require('@/assets/images/flags/english.png')" alt="" class="language-flag">
                    <span class="language-name">{{ $t('utilities.english') }}</span>
                </a>
            </div>
        </li>
    </ul>
</template>

<script>
import Mixin from './_all'
import { getLanguage, setLanguage } from '@/helpers/common'
import EventBus from '@/utils/event-bus'

export default {
    name: 'Sidebar',
    mixins: [Mixin],
    data() {
        return {
            locale: null
        }
    },
    props: {
        menuLists: {
            type: Object | Array,
            default() {
                return []
            }
        }
    },
    methods: {
        setLanguage,
        checkRoute(value) {
            if (['admin.order.index', 'client.order.index'].includes(value)) return true
        }
    },
    mounted() {
        this.locale = getLanguage()
        EventBus.$on('closeMobileSidebar', this.handleCloseMobileMenu)
    },
}
</script>

<style scoped lang="scss" src="./_style.scss"></style>
