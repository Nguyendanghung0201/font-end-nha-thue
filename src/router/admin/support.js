import i18n from '@/utils/lang'
const supportRoutes = {
    path: '/',
    component: () => import('@/views/layouts/dashboard/index'),
    meta: {
        auth: true,
        scope: ['auth'],
        title: i18n.t('utilities.home'),
    },
    children: [
        {
            path: '/support',
            name: 'support.index',
            component: () => import('@/views/pages/support/index'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: i18n.t('support.support'),
            }
        },
        {
            path: '/history-support',
            name: 'history-support.index',
            component: () => import('@/views/pages/support/_historySupport'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: i18n.t('support.support_history'),
            }
        },
    ]
}

export default supportRoutes