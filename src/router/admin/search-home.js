import i18n from '@/utils/lang'

const searchHomeRoute = {
    path: '/',
    component: () =>
        import ('@/views/layouts/dashboard/index'),
    meta: {
        auth: true,
        scope: ['auth'],
        title: i18n.t('home.search_home')
    },
    children: [{
        path: '/search-home',
        name: 'search_home.index',
        component: () =>
            import ('@/views/pages/searchHome/index'),
        meta: {
            auth: true,
            scope: ['auth'],
            title: i18n.t('home.search_home')
        }
    }, {
        path: '/search-home/detail/:id',
        name: 'search_home.detail',
        component: () =>
            import ('@/views/pages/searchHome/_detailHome'),
        meta: {
            auth: true,
            scope: ['auth'],
            title: i18n.t('home.search_home')
        }
    }, ]
}

export default searchHomeRoute