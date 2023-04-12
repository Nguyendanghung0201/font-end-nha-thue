import i18n from '@/utils/lang'

const bankRoutes = {
    path: '/',
    component: () =>
        import ('@/views/layouts/dashboard/index'),
    meta: {
        auth: true,
        scope: ['auth'],
        title: i18n.t('utilities.home')
    },
    children: [{
            path: '/bank/:id',
            name: 'bank.index',
            component: () =>
                import ('@/views/pages/bank/index'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: i18n.t('menu.bank')
            }
        },
        {
            path: '/service-bank',
            name: 'service-bank.index',
            component: () =>
                import ('@/views/pages/serviceBank/index'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: i18n.t('menu.bank')
            }
        },
        {
            path: '/bank/create/:id',
            name: 'bank.create',
            component: () =>
                import ('@/views/pages/bank/index'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: i18n.t('menu.bank')
            }
        },
        {
            path: '/bank/:id/activities',
            name: 'bank.activities',
            component: () =>
                import ('@/views/pages/bank/index'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: i18n.t('menu.bank')
            }
        },
        {
            path: '/bank/:id/saving',
            name: 'bank.saving',
            component: () =>
                import ('@/views/pages/bank/index'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: i18n.t('menu.saving')
            }
        },
        {
            path: '/bank/:id/integrated',
            name: 'bank.integrated',
            component: () =>
                import ('@/views/pages/bank/index'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: i18n.t('menu.integrated')
            }
        }
    ]
}

export default bankRoutes