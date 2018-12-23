import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
axios.defaults.baseURL = process.env.API_URL || 'restapi.fz';

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('__token__') || null,
  },
  getters: {
    loggedIn (state) {
      return state.token !== null;
    },
  },
  mutations: {
    retrieveToken (state, token) {
      state.token = token;
    },
    destroyToken (state) {
      state.token = null;
    },
  },
  actions: {
    destroyToken (context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('__token__');
              context.commit('destroyToken');
              resolve(response);
            })
            .catch(error => {
              localStorage.removeItem('__token__');
              context.commit('destroyToken');
              reject(error);
            });
        });
      }
    },
    retrieveToken (context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.data.api_token;

            localStorage.setItem('__token__', token);
            context.commit('retrieveToken', token);
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
  }
});