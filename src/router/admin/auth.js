const authRoutes = {
    path: 'auth',
    children:
        [
            {
                name: 'auth.login',
                path: 'login',
                component: () => import('@/views/auth/login/index'),
                meta: {}
            },
            {
                name: 'auth.register',
                path: 'register',
                component: () => import('@/views/auth/login/index'),
                meta: {}
            },
            {
                name: 'auth.forgot',
                path: 'forgot-password',
                component: () => import('@/views/auth/login/index'),
                meta: {}
            },
            {
                name: 'auth.reset',
                path: 'reset-password',
                component: () => import('@/views/auth/login/index'),
                meta: {}
            },
            {
                name: 'auth.denied',
                path: 'denied',
                component: () => import('@/views/errors/403')
            },
            {
                name: '404',
                path: '404',
                component: () => import('@/views/errors/404')
            }
        ],
    component: () => import('@/views/auth/index')
}
export default authRoutes
