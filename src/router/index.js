import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'main',
        component: () =>
            import ('../views/main'),
        redirect: '/login',
        children: [
            // {
            //         path: '/home',
            //         name: 'home',
            //         component: () =>
            //             import ('@/views/home')
            //     },
            //     {
            //         path: '/user',
            //         name: 'user',
            //         component: () =>
            //             import ('@/views/user')
            //     },
            //     {
            //         path: '/mall',
            //         name: 'mall',
            //         component: () =>
            //             import ('@/views/mall')
            //     },
            //     {
            //         path: '/pageOne',
            //         name: 'pageOne',
            //         component: () =>
            //             import ('@/views/other/pageOne')
            //     },
            //     {
            //         path: '/pageTwo',
            //         name: 'pageTwo',
            //         component: () =>
            //             import ('@/views/other/pageTwo')
            //     }
        ],
    },
    {
        path: '/login',
        name: 'userlogin',
        component: () =>
            import ('@/views/login')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router