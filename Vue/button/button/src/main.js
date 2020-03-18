import Vue from 'vue'
import App from './App.vue'

import ButtomUi from '../packages'

Vue.use(ButtomUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
