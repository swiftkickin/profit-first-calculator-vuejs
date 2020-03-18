import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

import VueTheMask from 'vue-the-mask';
import money from 'v-money';

Vue.config.productionTip = false

Vue.use(VueTheMask);
Vue.use(money);
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
