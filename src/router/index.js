import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../HomePage.vue'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: HomePage },
  ]
});
