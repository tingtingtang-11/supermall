import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

import toast from 'components/common/toast'

// vue实例是可以作为事件总线的
Vue.prototype.$bus = new Vue()

// 安装toast插件
// Vue.use(toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
