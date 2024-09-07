import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/style.css';

import 'primevue/resources/themes/saga-blue/theme.css'; 
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';                           //icons

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
