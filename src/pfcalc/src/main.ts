import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

import VueTheMask from 'vue-the-mask';

Vue.config.productionTip = false

Vue.use(VueTheMask);
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
