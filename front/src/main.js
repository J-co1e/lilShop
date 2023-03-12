import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/utils/rem'
import Vant from 'vant'
import 'vant/lib/index.css'
import { showSuccessToast } from 'vant'
Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
Vue.prototype.$successToast = showSuccessToast