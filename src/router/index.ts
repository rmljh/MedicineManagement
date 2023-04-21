import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: '登录' },
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/index',
      name: 'homeView',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../components/Test/test.vue')
        }
      ]
    }
    // {
    //   path: '/main',
    //   component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
    //   meta: { title: '自述文件' },
    //   children: [
    //     {
    //       path: '/homepage',
    //       component: () => import(/* webpackChunkName: "table" */ '../components/page/Dashboard'),
    //       meta: { title: '欢迎页' }
    //     },
    //     {
    //       path: '/producertable',
    //       component: () => import(/* webpackChunkName: "table" */ '../components/page/producer/ProducerTable'),
    //       meta: { title: '药品区块链管理' }
    //     },{
    //       path: '/producerform',
    //       component: () => import(/* webpackChunkName: "table" */ '../components/page/producer/ProducerForm'),
    //       meta: { title: '提交表单' }
    //     },
    //     {
    //       path: '/distributorform',
    //       component: () => import(/* webpackChunkName: "table" */ '../components/page/distributor/DistributorForm'),
    //       meta: { title: '提交表单' }
    //     },{
    //       path: '/distributortable',
    //       component: () => import(/* webpackChunkName: "table" */ '../components/page/distributor/DistributorTable'),
    //       meta: { title: '药品区块链管理' }
    //     },
          
    //     {
    //       path: '/admintable',
    //       component: () => import('../components/page/admin/AdminTable'),
    //       meta: { title: '查询药品' }
    //     },
    //     {
    //       path: '/404',
    //       component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
    //       meta: { title: '404' }
    //     },
    //     {
    //       path: '/403',
    //       component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
    //       meta: { title: '403' }
    //     }
    //   ]
    // },
    // {
    //   path: '/login',
    //   component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
    //   meta: { title: '登录' }
    // },
    // {
    //   path: '/usertable',
    //   component: () => import('../components/page/user/UserTable'),
    //   meta: { title: '查询药品' }
    // },
    // {
    //   path: '*',
    //   redirect: '/404'
    // }
]
})

export default router
