import Vue from 'vue'
import VueRouter from 'vue-router'

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('views/home/Home.vue'),
  },
  {
    path: '/chart',
    component: () => import('views/chart/Chart.vue'),
  },
  {
    path: '/shop',
    component: () => import('views/shop/Shop.vue'),
  },
  {
    path: '/profile',
    component: () => import('views/profile/Profile.vue'),
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

// 3. 导出
export default router
