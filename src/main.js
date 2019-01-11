import Vue from "vue";
import "./plugins/vuetify";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router/";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "font-awesome/css/font-awesome.css";
import axios from "axios";
import VueAxios from "vue-axios";
import TimeAgo from "javascript-time-ago";
import id from "javascript-time-ago/locale/id";
import VTooltip from "v-tooltip";
import "./theme/tooltip.css";
import VuetifyDialog from "vuetify-dialog";
import { store } from "./store/store";

Vue.config.productionTip = false;

// uncomment for working offline
// import 'material-design-icons/iconfont/material-icons.css';
// import 'roboto-fontface/css/roboto/roboto-fontface.css';
TimeAgo.addLocale(id);
const timeAgo = new TimeAgo("id-ID");
Vue.prototype.timeAgo = timeAgo;
Vue.config.productionTip = false;

Vue.use(VTooltip);
Vue.use(Vuex);
Vue.use(VuetifyDialog);
Vue.use(VueAxios, axios);
// Bootstrap application components

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

window.vue = vm;

vm.axios.interceptors.response.use(
  response => {
    // intercept the global error
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      localStorage.removeItem("__token__");
      console.log(alert("Anda belum login atau sesi telah habis."));
      return location.replace("/");
    } else if (error.response.status === 403) {
      vm.$router.replace({ name: "AccessDenied" });
    } else if (error.response.status === 404) {
      vm.$router.replace({ name: "NotFound" });
    } else if (error.response.status === 500) {
      vm.$router.replace({ name: "ServerError" });
    }
    // Do something with response error
    return Promise.reject(error);
  }
);
