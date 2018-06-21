import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Routes from './routes.js'
import jQuery from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'


global.$ = jQuery
require('bootstrap');
let Cookies = require('vue-cookies')

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Cookies);
Vue.use(VueResource);

const router = new VueRouter({
routes:Routes,
mode:'history'
});

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
