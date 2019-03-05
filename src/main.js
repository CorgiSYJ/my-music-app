import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import bus from "vue-bus"


//引入mint-ui 样式文件
import'mint-ui/lib/style.css'

Vue.use(bus);
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})
//导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
//导入 MUI 的样式表，扩展图标样式，购物车图标
//还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'

import {Swipe,SwipeItem} from 'mint-ui'
//注册mint-ui组件
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
