import dashboardRoute from './dashboard'
import authRoutes from '@/router/admin/auth'
import supportRoutes from '@/router/admin/support'
import faqRoutes from '@/router/admin/FAQ'
import serviceRoutes from '@/router/admin/service'
import profileRoutes from '@/router/admin/profile'
import termRoutes from '@/router/admin/terms-of-use'
import userPolicyRoutes from '@/router/admin/user-policy'
import bankRoutes from '@/router/admin/bank'
import searchHomeRoute from '@/router/admin/search-home'
import interestedHomeRoute from '@/router/admin/interested-home'
const adminRoutes = [
    authRoutes,
    {
        path: '/',
        component: () =>
            import ('@/views/_main/index'),
        redirect: { name: 'dashboard.index' },
        children: [
            dashboardRoute,
            supportRoutes,
            faqRoutes,
            serviceRoutes,
            profileRoutes,
            termRoutes,
            userPolicyRoutes,
            bankRoutes,
            searchHomeRoute,
            interestedHomeRoute
        ]
    },

]


export default adminRoutes