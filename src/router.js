import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './views/recommend.vue'
import Rank from './views/rank.vue'
import Singer from './views/singer.vue'
import User from './views/user.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 默认跳转到 recommend
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/user',
      component: User
    },
  ]
});
