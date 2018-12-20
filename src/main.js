// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VTooltip from 'v-tooltip';
import './theme/tooltip.css';
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
Vue.use(Loading, {
  // props
  color: 'red',
  height: 128,
  width: 128,
  loader: 'spinner',
  backgroundColor: '#ffffff'
}, {
  // slots
});
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
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
