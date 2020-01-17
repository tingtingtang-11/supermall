import Vue from 'vue'
import App from './App.vue'
import router from './router'

// vue实例是可以作为事件总线的
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
