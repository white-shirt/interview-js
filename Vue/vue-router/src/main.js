import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)

Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  console.log(`Error${err},${vm},${info}`)
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
