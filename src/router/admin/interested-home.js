import i18n from '@/utils/lang'

const interestedHome = {
    path: '/',
    component: () =>
        import ('@/views/layouts/dashboard/index'),
    meta: {
        auth: true,
        scope: ['auth'],
        title: i18n.t('home.interested_home')
    },
    children: [{
        path: '/interested-home',
        name: 'interested_home.index',
        component: () =>
            import ('@/views/pages/interestedHome/index'),
        meta: {
            auth: true,
            scope: ['auth'],
            title: i18n.t('home.interested_home')
        }
    }, {
        path: '/interested-home/detail/:id',
        name: 'interested_home.detail',
        component: () =>
            import ('@/views/pages/searchHome/_detailHome'),
        meta: {
            auth: true,
            scope: ['auth'],
            title: i18n.t('home.interested_home')
        }
    }, ]
}

export default interestedHome