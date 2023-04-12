import i18n from '@/utils/lang'
const userPolicyRoutes = {
    path: '/',
    component: () => import('@/views/layouts/dashboard/index'),
    meta: {
        auth: true,
        scope: ['auth'],
        title: i18n.t('utilities.home'),
    },
    children: [
        {
            path: '/user-policy',
            name: 'user-policy.index',
            component: () => import('@/views/pages/UserPolicy/index'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: i18n.t('utilities.policy'),
            }
        }
    ]
}

export default userPolicyRoutes