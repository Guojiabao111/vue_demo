import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my.vue')
      }
    ]
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article.vue'),
    // 这样组件route.params 将会被设置为组件属性
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
