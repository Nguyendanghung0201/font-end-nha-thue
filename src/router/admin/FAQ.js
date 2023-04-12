import i18n from '@/utils/lang'
const faqRoutes = {
    path: '/',
    component: () => import('@/views/layouts/dashboard/index'),
    meta: {
        auth: true,
        scope: ['auth'],
        title: i18n.t('utilities.home'),
    },
    children: [
        {
            path: '/faq',
            name: 'faq.index',
            component: () => import('@/views/pages/FAQ/index'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: 'FAQ',
            }
        }
    ]
}

export default faqRoutes