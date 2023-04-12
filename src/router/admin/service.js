import i18n from '@/utils/lang'
const serviceRoutes = {
    path: '/',
    component: () => import('@/views/layouts/dashboard/index'),
    meta: {
        // auth: true,
        // scope: ['auth'],
        title: i18n.t('utilities.home')
    },
    children: [
        {
            path: '/list-affiliate',
            name: 'my-service.index',
            component: () => import('@/views/pages/service/MyService/index'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: i18n.t('utilities.service'),
            }
        }
    ]
}

export default serviceRoutes