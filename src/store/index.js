//add to store/index.js

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Make Axios good with django csrf
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default new Vuex.Store({
  state: {
    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem('token'),
    APIData:'',
    endpoints: {
      // Change these with your endpoints.
      obtainJWT: 'http://127.0.0.1:8000/api/v1/auth/obtain_token/',
      refreshJWT: 'http://127.0.0.1:8000/api/v1/auth/refresh_token/',
      baseUrl: 'http://127.0.0.1:8000'
    }
  },

  mutations: {
    setAuthUser(state, {
      authUser,
      isAuthenticated
    }) {
      Vue.set(state, 'authUser', authUser)
      Vue.set(state, 'isAuthenticated', isAuthenticated)
    },
    //You should find a better alternative to storing in local storage
    updateToken(state, newToken) {
      localStorage.setItem('token', newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      localStorage.removeItem('token');
      state.jwt = null;
    }
  }
})