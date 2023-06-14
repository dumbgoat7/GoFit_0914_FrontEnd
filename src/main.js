import Vue from 'vue'
import App from './App.vue'
import vuetify from "@/plugins/vuetify";
import router from "./router";
import axios from 'axios';
import Chart from 'chart.js/auto';

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$api = 'https://backend-raka.danielriq221.com/GoFit_0914/public/api';
new Vue({
  vuetify,
  router,
  Chart,
  render: (h) => h(App),
}).$mount("#app")
