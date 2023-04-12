import i18n from '@/utils/lang'
const profileRoutes = {
    path: '/',
    component: () => import('@/views/layouts/dashboard/index'),
    meta: {
        auth: true,
        scope: ['auth'],
        title: i18n.t('utilities.home')
    },
    children: [
        {
            path: '/profile',
            name: 'profile.index',
            component: () => import('@/views/pages/profile/index'),
            meta: {
                auth: true,
                scope: ['auth'],
                title: i18n.t('profile.profile'),
            },
            children: [
                {
                    path: '/profile/info',
                    name: 'profile.info',
                    component: () => import('@/views/pages/profile/index'),
                    meta: {
                        auth: true,
                        scope: ['auth'],
                        title: i18n.t('profile.information'),
                    }
                },
                {
                    path: '/profile/password',
                    name: 'profile.password',
                    component: () => import('@/views/pages/profile/index'),
                    meta: {
                        auth: true,
                        scope: ['auth'],
                        title: i18n.t('profile.password'),
                    }
                },
                {
                    path: '/profile/setting',
                    name: 'profile.setting',
                    component: () => import('@/views/pages/profile/index'),
                    meta: {
                        auth: true,
                        scope: ['auth'],
                        title: i18n.t('profile.setting'),
                    }
                }
            ]
        }
    ]
}

export default profileRoutes