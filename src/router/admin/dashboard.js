import i18n from '@/utils/lang'

const dashboardRoutes = {
    path: '/',
    component: () =>
        import ('@/views/layouts/dashboard/index'),
    meta: {
        auth: true,
        scope: ['auth'],
        title: i18n.t('utilities.home'),
    },
    children: [{
            path: '',
            name: 'dashboard.index',
            component: () =>
                import ('@/views/pages/dashboard'),
            meta: {
                auth: true,
                title: i18n.t('utilities.home'),
            }
        },
        {
            path: 'service/:name',
            name: 'service.detail',
            component: () =>
                import ('@/views/pages/dashboard/_detailService'),
            meta: {
                auth: true,
                title: 'REAL HOUSE',
            }
        }
    ]
}

export default dashboardRoutes