import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/utils/rem'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
