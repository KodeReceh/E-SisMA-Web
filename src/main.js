// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import router from './router';
import 'font-awesome/css/font-awesome.css';  
import './theme/default.styl';
import VeeValidate from 'vee-validate';
import colors from 'vuetify/es5/util/colors';
import Truncate from 'lodash.truncate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueMomentLib from 'vue-moment-lib';
import TimeAgo from 'javascript-time-ago';
import id from 'javascript-time-ago/locale/id';
import VTooltip from 'v-tooltip';
import './theme/tooltip.css';
import VuetifyDialog from 'vuetify-dialog';
import { store } from './store/store';


// uncomment for working offline
// import 'material-design-icons/iconfont/material-icons.css';
// import 'roboto-fontface/css/roboto/roboto-fontface.css';
TimeAgo.addLocale(id);
const timeAgo = new TimeAgo('id-ID');
Vue.prototype.timeAgo = timeAgo;
Vue.config.productionTip = false;


// Helpers
// Global filters
Vue.filter('truncate', Truncate);
Vue.use(VeeValidate, { fieldsBagName: 'formFields' });
Vue.use(VueMomentLib);
Vue.use(VTooltip);
Vue.use(Vuex);
Vue.use(VuetifyDialog);
Vue.use(Vuetify, {
  // theme: {
  //   primary: colors.indigo.base, // #E53935
  //   secondary: colors.indigo.lighten4, // #FFCDD2
  //   accent: colors.indigo.base // #3F51B5
  // },
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary',
      },
      sideToolbar: {
      },
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: '',
    }
  }
});
Vue.use(VueAxios, axios);
// Bootstrap application components

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

window.vue = vm;

vm.axios.interceptors.response.use((response) => { // intercept the global error
  return response;
}, function (error) {
  if (error.response.status === 401) {
    localStorage.removeItem('__token__');
    console.log(alert('Anda belum login atau sesi telah habis.'));
    return location.replace('/');
  } else if (error.response.status === 403) {
    vm.$router.replace({ name: 'AccessDenied' });
  } else if (error.response.status === 404) {
    vm.$router.replace({ name: 'NotFound' });
  } else if (error.response.status === 500) {
    vm.$router.replace({ name: 'ServerError' });
  }
  // Do something with response error
  return Promise.reject(error);
});