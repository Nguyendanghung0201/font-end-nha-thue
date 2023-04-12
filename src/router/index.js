import Vue from 'vue'
import Router from 'vue-router'
import adminRoutes from '@/router/admin'
import { checkAuth } from '@/middleware/check-auth'


const routes = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('@/views/_main/layout'),
            children: adminRoutes
        },
        {
            path: '*',
            name: 'catchAll',
            component: () => import('@/views/errors/404')
        },
    ]
})


checkAuth(routes)

Vue.use(Router)

export default routes
