import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios';

Vue.config.productionTip = false;
Vue.component('readme', function(resolve, reject){
  axios.get("./readme/readme.html").then(response => {
    resolve({template: response.data})
  }).catch((error) => {
    console.log('error', error);
  })
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');

