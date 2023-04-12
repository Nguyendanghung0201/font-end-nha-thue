import i18n from '@/utils/lang'
const termRoutes = {
    path: '/',
    component: () => import('@/views/layouts/dashboard/index'),
    meta: {
        auth: true,
        scope: ['auth'],
        title: i18n.t('utilities.home'),
    },
    children: [
        {
            path: '/terms-of-use',
            name: 'terms-of-use.index',
            component: () => import('@/views/pages/TermsOfUse/index'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: i18n.t('utilities.terms'),
            }
        }
    ]
}

export default termRoutes