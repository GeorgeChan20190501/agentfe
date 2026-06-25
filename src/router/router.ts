import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext} from 'vue-router'

const routes: Array<RouteRecordRaw> = [

    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {title: '登录', requiresAuth: false}
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: {title: '控制台', requiresAuth: true}
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {title: '首页', requiresAuth: false}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局前置守卫
router.beforeEach(
    (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
        // 设置页面标题
        document.title = (to.meta.title as string) || 'AgentFE'

        // 检查是否需要认证
        const requiresAuth = to.meta.requiresAuth
        const token = localStorage.getItem('token')

        if (requiresAuth && !token) {
            // 需要登录但未登录，跳转到登录页
            next({
                path: '/login',
                query: {redirect: to.fullPath} // 保存目标路径，登录后跳转回去
            })
        } else if (to.path === '/login' && token) {
            // 已登录用户访问登录页，跳转到首页
            next('/')
        } else {
            // 正常放行
            next()
        }
    }
)

// 全局后置钩子
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    // 可以在这里添加埋点、进度条结束等逻辑
    console.log(`从 ${from.path} 导航到 ${to.path}`)
})

export default router
