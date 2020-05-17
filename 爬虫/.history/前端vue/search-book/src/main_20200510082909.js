import Vue from 'vue'
import App from './App.vue'
import api from './util/http'
import store from './store'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.config.productionTip = false
Vue.prototype.$api = api;
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
